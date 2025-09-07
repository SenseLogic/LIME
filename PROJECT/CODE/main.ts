/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import '$std/dotenv/load.ts';

import { start } from '$fresh/server.ts';
import manifest from './fresh.gen.ts';
import config from './fresh.config.js';
import { getApplicationData } from './application.js';

const applicationData = getApplicationData();
if ( !applicationData )
{
    throw new Error( "Application data not loaded before server start" );
}

await start( manifest, config );
