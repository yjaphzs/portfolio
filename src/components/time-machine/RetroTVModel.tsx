import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { Box3, Group, MathUtils, Vector3, AdditiveBlending } from "three";
import type { Mesh } from "three";

import {
  crtVertexShader,
  crtFragmentShader,
  glowFragmentShader,
  makeCrtUniforms,
  makeGlowUniforms,
} from "./crtMaterial";
import type { TVDriver } from "./driver";

const MODEL_URL = "/models/retro-tv.glb";

/**
 * Largest silhouette dimension of the fitted model, in world units.
 *
 * Sized off the FRONT FACE, not the centre. The cabinet is ~2.2 deep, so its
 * face sits about 1.1 units nearer the camera than its origin, where the
 * viewport is only ~2.25 units tall — the face therefore projects far larger
 * than the fitted height suggests. At 2.2 it filled ~98% of the frame and the
 * idle bob and pointer tilt pushed the corners outside the canvas.
 *
 * 1.55 puts the front face at roughly 63% of the frame, leaving room for the
 * full tilt range below to swing without clipping.
 */
const TARGET_SIZE = 1.55;

/** Peak pointer-driven tilt, in radians. Bounded so a hard swing stays inside frame. */
const TILT_Y = 0.3;
const TILT_X = 0.2;

/**
 * Where the CRT overlay sits, as fractions of the fitted bounding box.
 *
 * The .glb is a single merged mesh with the screen painted into its texture
 * atlas, so there is no screen mesh to attach a material to — this plane is
 * blended over the screen instead.
 *
 * These are measured, not guessed: the screen's triangles were identified by
 * the region of the baseColor atlas they sample, then their world-space bounds
 * were taken through the full node transform chain. Resulting aspect is 1.37,
 * i.e. 4:3, which is the expected sanity check for a CRT.
 *
 * Load any page with `?tvdebug=1` to draw this plane as a magenta wireframe
 * over the model, with the bounding box and axes, if it ever needs adjusting.
 */
const SCREEN = {
  centerX: -0.051,
  centerY: 0.097,
  width: 0.808,
  height: 0.538,
  /**
   * Fraction of depth from centre. The glass front measures 0.451 and the
   * bezel face is at 0.5, so this sits in the recess between them.
   */
  depth: 0.47,
};

/**
 * The model is authored facing +X. Rotating -90° about Y turns it to face +Z,
 * toward the camera — verified by the screen's mean normal landing on
 * [-0.033, 0, 0.972] afterwards.
 */
const MODEL_ROTATION: [number, number, number] = [0, -Math.PI / 2, 0];

const isDebug = () =>
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("tvdebug");

type Props = {
  driver: React.RefObject<TVDriver>;
  reducedMotion: boolean;
};

export function RetroTVModel({ driver, reducedMotion }: Props) {
  const root = useRef<Group>(null);
  const glow = useRef<Mesh>(null);
  // Smoothed copy of the driver so pointer jumps ease instead of snapping.
  const eased = useRef({ px: 0, py: 0, power: 0 });

  const crtUniforms = useMemo(makeCrtUniforms, []);
  const glowUniforms = useMemo(makeGlowUniforms, []);
  const debug = useMemo(isDebug, []);

  const gltf = useLoader(GLTFLoader, MODEL_URL, (loader) => {
    // The asset is meshopt-compressed (EXT_meshopt_compression). The decoder
    // is ~8KB with its WASM inlined, so there is no extra network request.
    loader.setMeshoptDecoder(MeshoptDecoder);
  });

  /*
   * Fit at runtime rather than hardcoding a transform.
   *
   * This model arrives from Sketchfab/FBX with a chain of nested matrices — a
   * Z-up correction, a 0.01 cm-to-m scale, and a non-uniform node scale — and
   * its geometry is centred nowhere near the origin. Measuring the assembled
   * bounding box and normalising from that is robust to all of it, and stays
   * correct if the model is ever re-exported.
   */
  const { model, dims } = useMemo(() => {
    const object = gltf.scene.clone(true);
    object.rotation.set(...MODEL_ROTATION);
    object.updateWorldMatrix(true, true);

    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    // Fit on the silhouette (width/height) only. This CRT is deeper than it is
    // wide, so including depth would shrink the visible face for no reason.
    const scale = TARGET_SIZE / Math.max(size.x, size.y);

    // Centre inside a wrapper so the fit never fights the model's own rotation.
    const wrapper = new Group();
    object.position.sub(center);
    wrapper.add(object);
    wrapper.scale.setScalar(scale);

    const fitted = size.clone().multiplyScalar(scale);

    if (isDebug()) {
      console.info(
        "[time-machine] fitted model dimensions (x, y, z):",
        fitted.toArray().map((v) => +v.toFixed(3)),
        "\nSCREEN constants in RetroTVModel.tsx are fractions of these.",
        "\nMagenta wireframe = the CRT overlay plane. Green = bounding box."
      );
    }

    return { model: wrapper, dims: fitted };
  }, [gltf]);

  const screenPos: [number, number, number] = [
    dims.x * SCREEN.centerX,
    dims.y * SCREEN.centerY,
    dims.z * SCREEN.depth,
  ];
  const screenSize: [number, number] = [
    dims.x * SCREEN.width,
    dims.y * SCREEN.height,
  ];

  useFrame((state, delta) => {
    const d = driver.current;
    const e = eased.current;
    // Frame-rate independent smoothing, clamped so a long frame can't overshoot.
    const k = 1 - Math.pow(0.0015, Math.min(delta, 0.1));

    e.px = MathUtils.lerp(e.px, d.px, k);
    e.py = MathUtils.lerp(e.py, d.py, k);
    e.power = MathUtils.lerp(e.power, d.power, k);

    if (root.current) {
      const t = state.clock.elapsedTime;
      // Idle bob and drift are motion for motion's sake — dropped when the user
      // asks for less. Pointer tilt is a direct response, so it stays.
      const bob = reducedMotion ? 0 : Math.sin(t * 0.9) * 0.04;
      const drift = reducedMotion ? 0 : Math.sin(t * 0.35) * 0.12;

      root.current.position.y = bob;
      root.current.rotation.y = drift + e.px * TILT_Y;
      root.current.rotation.x = -e.py * TILT_X;
    }

    crtUniforms.uTime.value = state.clock.elapsedTime;
    crtUniforms.uPower.value = e.power;
    glowUniforms.uPower.value = e.power * 0.9;

    if (glow.current) glow.current.scale.setScalar(1 + e.power * 0.12);
  });

  return (
    <group ref={root}>
      <primitive object={model} />

      {/* Animated static, added over the baked screen */}
      <mesh position={screenPos}>
        <planeGeometry args={screenSize} />
        <shaderMaterial
          vertexShader={crtVertexShader}
          fragmentShader={crtFragmentShader}
          uniforms={crtUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Light bleed spilling out past the glass */}
      <mesh ref={glow} position={[screenPos[0], screenPos[1], screenPos[2] + 0.06]}>
        <planeGeometry args={[dims.x * 1.35, dims.y * 1.25]} />
        <shaderMaterial
          vertexShader={crtVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* ?tvdebug=1 — alignment aids, never shipped to normal visitors */}
      {debug && (
        <>
          <mesh position={screenPos}>
            <planeGeometry args={screenSize} />
            <meshBasicMaterial color="#ff00ff" wireframe />
          </mesh>
          <mesh>
            <boxGeometry args={[dims.x, dims.y, dims.z]} />
            <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.4} />
          </mesh>
          <axesHelper args={[TARGET_SIZE * 0.7]} />
        </>
      )}
    </group>
  );
}

useLoader.preload(GLTFLoader, MODEL_URL, (loader: GLTFLoader) => {
  loader.setMeshoptDecoder(MeshoptDecoder);
});
