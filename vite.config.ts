import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/*
 * No SPA fallback plugin here any more.
 *
 * It existed to emit dist/404.html, because GitHub Pages has no server-side
 * routing and answers deep links with a static 404 that never reaches React
 * Router. Firebase Hosting rewrites `**` to /index.html properly, so deep links
 * return 200 instead of 404-with-the-right-body. See firebase.json.
 */

// https://vite.dev/config/
export default defineConfig({
    build: {
        /*
         * Never inline assets as base64.
         *
         * Vite's 4KB default split the seven presence avatars arbitrarily — two
         * landed under the threshold and were baked into the entry chunk as data
         * URIs, the other five emitted as files. Beyond the inconsistency, base64
         * is ~33% larger than the binary and, because it lives in the entry
         * chunk, it is re-downloaded on every deploy. Firebase Hosting serves
         * /assets/** with a one-year immutable cache, so a separate request is
         * fetched once and never again — strictly better here.
         */
        assetsInlineLimit: 0,
    },
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
