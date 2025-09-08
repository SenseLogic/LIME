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
    const url = new URL( req.url );
    const pathname = url.pathname;

    const languageCode = setRequestLanguageCode( req );
    const pathLanguageCode = getPathLanguageCode( pathname );

    if ( pathLanguageCode )
    {
        return ctx.next();
    }
    else
    {
        const pathWithoutLanguage = getPathWithoutLanguage( pathname );
        const redirectUrl = `/${languageCode}${pathWithoutLanguage === '/' ? '' : pathWithoutLanguage}`;

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
