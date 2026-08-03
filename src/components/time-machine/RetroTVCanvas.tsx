import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { RetroTVModel } from "./RetroTVModel";
import type { TVDriver } from "./driver";

/*
 * THE LAZY BOUNDARY.
 *
 * This module and its children are the only place in the app that imports
 * three / @react-three/fiber / @react-three/drei. It must only ever be reached
 * through React.lazy — a single static import of this file from anywhere in the
 * eager graph pulls ~180KB gzip into the entry chunk.
 */

/**
 * Procedural image-based lighting.
 *
 * The model's material is metallic-roughness with a real metalness map. Without
 * an environment to reflect, those areas render black under punctual lights
 * alone. RoomEnvironment is generated in code, so this costs no HDR download.
 */
function StudioEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const target = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = target.texture;
    scene.environmentIntensity = 0.65;

    return () => {
      scene.environment = null;
      target.texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

/**
 * Fires once the model has resolved AND a frame has been painted.
 *
 * Mounted as a sibling of the model inside the inner Suspense, so it cannot run
 * until useLoader has settled. The extra rAF hop means the placeholder only
 * clears when there is genuinely something on screen to replace it.
 */
function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

type Props = {
  driver: React.RefObject<TVDriver>;
  reducedMotion: boolean;
  onReady: () => void;
};

export default function RetroTVCanvas({
  driver,
  reducedMotion,
  onReady,
}: Props) {
  // Resolved once on mount. Small screens get a lower ceiling so "3D everywhere"
  // doesn't mean "shader-bound on a budget Android".
  const [dpr] = useState<[number, number]>(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? [1, 1.25] : [1, 1.75]
  );

  return (
    <Canvas
      dpr={dpr}
      // Dead-on and centred: R3F does not lookAt the origin, so any y offset
      // here would just push the TV toward the bottom of the frame.
      camera={{ position: [0, 0, 4.8], fov: 34 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      // Rendered if context creation fails outright. Context *loss* later is a
      // different failure and is caught by the error boundary in TimeMachine.
      fallback={null}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <directionalLight position={[-4, -1, 2]} intensity={0.35} color="#7fb6ff" />

      {/* Inner boundary: without it, asset suspension unmounts the whole
          canvas and flashes empty instead of just pausing the model. */}
      <Suspense fallback={null}>
        <StudioEnvironment />
        <RetroTVModel driver={driver} reducedMotion={reducedMotion} />
        <ReadySignal onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
