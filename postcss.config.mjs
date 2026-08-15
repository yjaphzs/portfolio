/**
 * Tailwind v4 ran through @tailwindcss/vite before the Next.js migration.
 * Next drives CSS through PostCSS, so the same engine is loaded this way
 * instead. The stylesheet itself is unchanged.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
