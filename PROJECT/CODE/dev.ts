#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.js";

import "$std/dotenv/load.ts";

// Enable better error reporting
if (typeof Deno !== "undefined") {
  // Enable source maps for better error reporting
  Deno.env.set("DENO_UNSTABLE_SOURCEMAP", "true");
}

await dev(import.meta.url, "./main.ts", config);
