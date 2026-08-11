/**
 * Route base for the archived v2 portfolio.
 *
 * v2 was built assuming it owned the site root, so every internal link was an
 * absolute "/tech-stack" style path. Now that it lives under an archive prefix
 * those would escape the archive and land on v3. Links go through `v2Path()`
 * instead, so the whole version can be re-based by editing one string.
 *
 * `/resume` is deliberately NOT rebased — it is a version-neutral print
 * document driven by `src/data/resume.ts`, shared by every version.
 */
export const V2_BASE = "/archived/v2";

export const v2Path = (suffix = "") => `${V2_BASE}${suffix}`;
