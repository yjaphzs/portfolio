import js from '@eslint/js'
import globals from 'globals'
import next from 'eslint-config-next'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['out', '.next', 'next-env.d.ts'] },
  // Brings the @next/next rules plus react / react-hooks — which is why this
  // config does not register react-hooks itself. Doing both is a hard error
  // ("Cannot redefine plugin"), not a warning.
  ...next,
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      // sitemap.ts / robots.ts / next.config.ts run in Node at build time.
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // Several images are deliberately plain <img>: string-URL contracts
      // (CrtGallery, ImageLightbox), react-slick's cloned slides, and v1's
      // intrinsic-ratio portrait. See the migration plan for the reasoning.
      '@next/next/no-img-element': 'off',

      // ── React Compiler readiness — warnings, not errors ──────────────────
      //
      // These four arrived with eslint-config-next and fire on code that
      // predates it. They are worth acting on, but they are not migration
      // regressions and they gate the deploy, so they warn until someone does
      // the refactor deliberately.
      //
      // set-state-in-effect is also a false positive for a pattern this site
      // now *requires*: hooks that read a browser API (matchMedia, WebGL
      // probing, localStorage) must return a constant on the first render and
      // adopt the real value in an effect, or the prerendered HTML and the
      // first client render disagree.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/use-memo': 'warn',
    },
  },
)
