#!/usr/bin/env -S deno run -A --watch=static/,routes/

// -- IMPORTS

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";

// -- STATEMENTS

if ( typeof Deno !== "undefined" )
{
    Deno.env.set( "DENO_UNSTABLE_SOURCEMAP", "true" );
}

await dev( import.meta.url, "./main.ts", config );
