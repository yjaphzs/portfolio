# Model sources

Unoptimised 3D source assets. **Nothing here is bundled** — this folder sits
outside both `public/` and `src/`, so Vite never copies or emits it. Only the
processed output in `public/models/` ships.

| File | Size | Notes |
| --- | --- | --- |
| `retro-tv.original.glb` | 2.78 MB | As downloaded from Sketchfab. Single merged mesh (`Cylinder_1_0`, 10,243 tris), one material, three 1024² PNG textures. |

Output: `public/models/retro-tv.glb` — **297 KB**, a 9.4× reduction.

## Regenerating `public/models/retro-tv.glb`

Two passes, in this order. Textures **must** be converted before geometry
compression: rewriting textures afterwards can disturb an applied
`EXT_meshopt_compression` extension.

### 1. Textures → WebP

`@gltf-transform/cli optimize` and its `webp` command both fail on this machine
with `colourspace: parameter space not set`, from a sharp/libvips version
mismatch inside the npx-installed tree — not a problem with the asset (the PNGs
are ordinary 8-bit RGB, no ICC profile, no interlacing). Convert with sharp
directly instead, from a scratch workspace so the project's `package.json`
stays clean:

```bash
mkdir /tmp/glb-work && cd /tmp/glb-work
npm init -y && npm install sharp @gltf-transform/core @gltf-transform/extensions
```

Then read the document, re-encode every texture, and declare `EXT_texture_webp`
(three's `GLTFLoader` has supported it since r138):

```js
const doc = await io.read(input);
doc.createExtension(EXTTextureWebP).setRequired(true);
for (const tex of doc.getRoot().listTextures()) {
  const webp = await sharp(Buffer.from(tex.getImage()))
    .webp({ quality: 82, effort: 6 }).toBuffer();
  tex.setImage(new Uint8Array(webp)).setMimeType("image/webp");
}
await io.write(output, doc);
```

This step alone does the heavy lifting: **1.91 MB of PNG → 120 KB of WebP.**
Quality 82 is far more than enough at the ~164px the TV renders at; drop it if
the model is ever shown larger.

### 2. Geometry → meshopt

Use the standalone `meshopt` command, not `optimize` — `optimize` always runs
its texture stage and will hit the sharp bug above regardless of flags.

```bash
npx @gltf-transform/cli@4 meshopt <webp-output>.glb public/models/retro-tv.glb --level medium
```

Adds `EXT_meshopt_compression` and `KHR_mesh_quantization`, both supported
natively by three. The decoder is wired up in
`src/components/time-machine/RetroTVModel.tsx` via `loader.setMeshoptDecoder`;
its WASM is inlined (~8 KB), so there is no extra network request.

## If you re-export the model

`RetroTVModel.tsx` fits the model at runtime from its bounding box, so a change
in scale, origin, or the Sketchfab/FBX matrix chain needs no code change. Two
constants there *are* orientation-specific and were measured from this
particular export:

- `MODEL_ROTATION` — this asset is authored facing **+X**, so it is rotated
  −90° about Y to face the camera.
- `SCREEN` — the overlay plane's placement, derived by finding the triangles
  that sample the screen region of the baseColor atlas and taking their
  world-space bounds. The resulting 1.37 aspect is the 4:3 sanity check.

Load any page with `?tvdebug=1` to draw the overlay plane as a magenta
wireframe with the bounding box and axes, and to log the fitted dimensions.
