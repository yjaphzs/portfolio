import { Color } from "three";

/*
 * Shaders for the retro TV screen.
 *
 * Plain shader source + uniform factories, fed to R3F's built-in
 * <shaderMaterial>. Deliberately no drei `shaderMaterial()` helper and no
 * `extend()` — that would pull the whole drei barrel into the 3D chunk for the
 * sake of a class wrapper, and it also drags in a JSX module augmentation.
 *
 * Two materials rather than a postprocessing bloom pass: <EffectComposer> has
 * long-standing trouble preserving canvas alpha, and this canvas is transparent
 * so it can sit over the page. An additive glow quad in front of the screen gets
 * the same light-bleed read at a fraction of the cost and none of the risk.
 */

export const crtVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/*
 * Screen: animated static, scanlines, roll bar, barrel curve.
 *
 * Blended additively OVER the model's baked screen rather than replacing it —
 * the .glb is a single merged mesh, so there is no screen mesh to swap the
 * material on. Additive also means slight misalignment of the overlay plane
 * reads as light bleed instead of a visible rectangle.
 */
export const crtFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uPower;   // 0 = dim idle hum, 1 = fully powered on
  uniform vec3  uTint;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(443.897, 441.423));
    p += dot(p, p.yx + 19.19);
    return fract((p.x + p.y) * p.x);
  }

  void main() {
    // Barrel distortion so the picture reads as curved glass.
    vec2 uv = vUv * 2.0 - 1.0;
    uv *= 1.0 + 0.06 * dot(uv, uv);
    vec2 suv = uv * 0.5 + 0.5;

    // Nothing is added past the curve, so the cabinet never picks up a halo.
    float inside =
      step(0.0, suv.x) * step(suv.x, 1.0) *
      step(0.0, suv.y) * step(suv.y, 1.0);

    // Quantised time gives 24fps analogue noise rather than a 60fps shimmer.
    float t = floor(uTime * 24.0);
    float n = hash(suv * vec2(320.0, 240.0) + t);

    float roll = smoothstep(0.0, 0.2, fract(suv.y - uTime * 0.12));
    float scan = 0.75 + 0.25 * sin(suv.y * 420.0);

    // Kept low: this is added on top of an already-lit baked screen.
    float luma = n * (0.16 + 0.52 * uPower) * scan * (0.85 + 0.15 * roll);

    vec3 col = uTint * luma + uTint * 0.06 * uPower;
    col *= clamp(1.0 - 0.5 * dot(uv, uv), 0.0, 1.0); // vignette
    col *= inside;

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

/* Glow: additive radial falloff quad sitting in front of the screen */
export const glowFragmentShader = /* glsl */ `
  uniform float uPower;
  uniform vec3  uTint;
  varying vec2 vUv;

  void main() {
    vec2 d = vUv - 0.5;
    float r = length(d) * 2.0;
    float falloff = pow(clamp(1.0 - r, 0.0, 1.0), 2.4);
    gl_FragColor = vec4(uTint * falloff * uPower, falloff * uPower);
  }
`;

const TINT = "#9fdcff";

export const makeCrtUniforms = () => ({
  uTime: { value: 0 },
  uPower: { value: 0 },
  uTint: { value: new Color(TINT) },
});

export const makeGlowUniforms = () => ({
  uPower: { value: 0 },
  uTint: { value: new Color(TINT) },
});
