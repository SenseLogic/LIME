// -- IMPORTS

import { getCookies, setCookie } from "std/http/cookie.ts";
import { logError } from "senselogic-opus";
import { createServerClient } from "@supabase/ssr";

// -- STATEMENTS

class SupabaseService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.anonymousClient = null;
        this.databaseKey = Deno.env.get( "LIME_PROJECT_SUPABASE_DATABASE_KEY" );
        this.databaseUrl = Deno.env.get( "LIME_PROJECT_SUPABASE_DATABASE_URL" );
        this.storageName = Deno.env.get( "LIME_PROJECT_SUPABASE_STORAGE_NAME" );
        this.storageUrl = Deno.env.get( "LIME_PROJECT_SUPABASE_STORAGE_URL" );
    }

    // -- INQUIRIES

    getFileUrl(
        filePath
        )
    {
        return this.storageUrl + "/" + filePath;
    }

    // -- OPERATIONS

    getAnonymousClient(
        )
    {
        if ( this.anonymousClient === null )
        {
            this.anonymousClient = createServerClient( this.databaseUrl, this.databaseKey );
        }

        return this.anonymousClient;
    }

    // ~~

    getAuthenticatedClient(
        request,
        responseHeaders
        )
    {
        return (
            createServerClient(
            this.databaseUrl,
            this.databaseKey,
            {
                cookies:
                {
                    getAll:
                        async () =>
                        {
                            if ( request && request.headers )
                            {
                                let cookies = getCookies( request.headers );

                                return (
                                    Object.entries( cookies ).map(
                                        ( [ name, value ] ) => ( { name, value } )
                                        ) ?? []
                                    );
                            }
                            else
                            {
                                return [];
                            }
                        },
                    setAll:
                        async ( cookiesToSet ) =>
                        {
                            if ( responseHeaders )
                            {
                                for ( const { name, value, options = {} } of cookiesToSet )
                                {
                                    setCookie(
                                        responseHeaders,
                                        {
                                            name,
                                            value,
                                            path: options.path ?? "/",
                                            domain: options.domain,
                                            secure: options.secure ?? false,
                                            httpOnly: options.httpOnly ?? true,
                                            sameSite: options.sameSite ?? "Lax",
                                            maxAge: options.maxAge,
                                            expires: options.expires
                                        }
                                    );
                                }
                            }
                        }
                }
            }
            )
        );
    }

    // ~~

    getClient(
        request = null,
        responseHeaders = null
        )
    {
        if ( !request && !responseHeaders )
        {
            return this.getAnonymousClient();
        }
        else
        {
            return this.getAuthenticatedClient( request, responseHeaders );
        }
    }

    // ~~

    async uploadFile(
        localFile,
        storageFilePath,
        storageFileIsOverwritten = false
        )
    {
        let { data, error } =
            await this.getClient( null, null )
                .storage
                .from( this.storageName )
                .upload(
                      storageFilePath,
                      localFile,
                      {
                          cacheControl: "3600",
                          upsert: storageFileIsOverwritten
                      }
                      );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async copyFile(
        localFile,
        storageFilePath,
        storageFileIsOverwritten = false
        )
    {
        let fileData;
        
        if ( typeof localFile === "string" )
        {
            fileData = await Deno.readFile( localFile );
        }
        else
        {
            fileData = localFile;
        }

        return await this.uploadFile( fileData, storageFilePath, storageFileIsOverwritten );
    }

    // ~~

    async removeFile(
        storageFilePath
        )
    {
        let { data, error } =
            await this.getClient( null, null )
                .storage
                .from( this.storageName )
                .remove( [ storageFilePath ] );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async signUpUser(
        email,
        password,
        request = null,
        responseHeaders = null
        )
    {
        let { user, error } =
            await this.getClient( request, responseHeaders ).auth.signUp(
                  {
                      email,
                      password
                  }
                  );

        if ( error !== null )
        {
            logError( error );
        }

        return user;
    }

    // ~~

    async signInUser(
        email,
        password,
        request = null,
        responseHeaders = null
        )
    {
        let { data, error } =
            await this.getClient( request, responseHeaders ).auth.signInWithPassword(
                  {
                      email,
                      password
                  }
                  );

        if ( error !== null )
        {
            logError( error );
        }

        return data?.user ?? null;
    }

    // ~~

    async signOutUser(
        request = null,
        responseHeaders = null
        )
    {
        let { error } =
            await this.getClient( request, responseHeaders ).auth.signOut();

        if ( error !== null )
        {
            logError( error );
        }
    }
}

// -- VARIABLES

export let supabaseService
    = new SupabaseService();
