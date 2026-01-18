// -- IMPORTS

import { logError } from "senselogic-opus";
import { createServerClient } from "@supabase/ssr";

// -- STATEMENTS

class SupabaseService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.client = null;
        this.databaseUrl = Deno.env.get( "LIME_PROJECT_SUPABASE_DATABASE_URL" );
        this.databaseKey = Deno.env.get( "LIME_PROJECT_SUPABASE_DATABASE_KEY" );
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

    getClient(
        request,
        reply
        )
    {
        if ( this.client === null )
        {
            this.client =
                createServerClient(
                    this.databaseUrl,
                    this.databaseKey,
                    {
                        cookies:
                        {
                            get:
                                ( key ) =>
                                {
                                    if ( request
                                            && request.cookies )
                                    {
                                        return decodeURIComponent( request.cookies[ key ] ?? "" )
                                    }
                                    else
                                    {
                                        return "";
                                    }
                                },
                            set:
                                ( key, value, options ) =>
                                {
                                    if ( reply )
                                    {
                                        reply.cookie(
                                            key,
                                            encodeURIComponent( value ),
                                            {
                                                ...options,
                                                sameSite: "Lax",
                                                httpOnly: true
                                            }
                                            );
                                    }
                                },
                            remove:
                                ( key, options ) =>
                                {
                                    if ( reply )
                                    {
                                        reply.cookie(
                                            key,
                                            "",
                                            {
                                                ...options,
                                                httpOnly: true
                                            }
                                            );
                                    }
                                }
                        }
                    }
                    );
        }

        return this.client;
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
        reply = null
        )
    {
        let { user, error } =
            await this.getClient( request, reply ).auth.signUp(
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
        reply = null
        )
    {
        let { user, error } =
            await this.getClient( request, reply ).auth.signIn(
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

    async signOutUser(
        request = null,
        reply = null
        )
    {
        let { error } =
            await this.getClient( request, reply ).auth.signOut();

        if ( error !== null )
        {
            logError( error );
        }
    }
}

// -- VARIABLES

export let supabaseService
    = new SupabaseService();
