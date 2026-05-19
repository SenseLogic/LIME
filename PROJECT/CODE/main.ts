/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

// -- IMPORTS

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { getApplicationData } from "./application.ts";

// -- STATEMENTS

let applicationData = getApplicationData();

if ( applicationData )
{
    await start( manifest, config );
}
else
{
    throw new Error( "Application data not loaded before server start" );
}
