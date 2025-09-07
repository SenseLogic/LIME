import { defineConfig } from "$fresh/server.ts";

export default defineConfig( {
    build: {
        target: "es2022",
        sourcemap: true
    },
    plugins: []
} );

