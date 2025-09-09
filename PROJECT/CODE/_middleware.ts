import { FreshContext } from "$fresh/server.ts";
import {
    setRequestLanguageCode,
    getRequestLanguageCode,
    getPathLanguageCode,
    getPathWithoutLanguage,
    isValidLanguageCode
} from "./application.js";

export async function handler( req: Request, ctx: FreshContext )
{
    let url = new URL( req.url );
    let pathname = url.pathname;

    let languageCode = setRequestLanguageCode( req );
    let pathLanguageCode = getPathLanguageCode( pathname );

    if ( pathLanguageCode )
    {
        return ctx.next();
    }
    else
    {
        let pathWithoutLanguage = getPathWithoutLanguage( pathname );
        let redirectUrl = `/${languageCode}${pathWithoutLanguage === "/" ? "" : pathWithoutLanguage}`;

        return new Response( 
            null,
            {
                status: 302,
                headers:
                {
                    Location: redirectUrl
                }
            }
            );
    }
}
