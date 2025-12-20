import
{
    defineDualTag,
    defineLineTag,
    defineTag,
    getBrowserLanguageCode,
    getDefaultLanguageCode,
    getLanguageCode,
    getLocalizedText,
    setDefaultLanguageCode,
    setLanguageCode,
    setLanguageSeparator
} from "senselogic-lingo";
import { readDefFile } from "senselogic-def-file";

let applicationData = null;

setLanguageSeparator( "\n¨" );
setDefaultLanguageCode( "en" );

defineLineTag( "! ", '<div class="paragraph title-1">", "</div>" );
defineLineTag( "!! ", "<div class="paragraph title-2">", "</div>" );
defineLineTag( "!!! ", "<div class="paragraph title-3">", "</div>" );
defineLineTag( "!!!! ", "<div class="paragraph title-4">", "</div>" );
defineLineTag( "- ", "<div class="paragraph dash-bullet-1">", "</div>" );
defineLineTag( "  - ", "<div class="paragraph dash-bullet-2">", "</div>" );
defineLineTag( "    - ", "<div class="paragraph dash-bullet-3">", "</div>" );
defineLineTag( "      - ", "<div class="paragraph dash-bullet-4">", "</div>" );
defineLineTag( "* ", "<div class="paragraph round-bullet-1">", "</div>" );
defineLineTag( "  * ", "<div class="paragraph round-bullet-2">", "</div>" );
defineLineTag( "    * ", "<div class="paragraph round-bullet-3">", "</div>" );
defineLineTag( "      * ", "<div class="paragraph round-bullet-4">", "</div>" );
defineLineTag( "° ", "<div class="paragraph hollow-bullet-1">", "</div>" );
defineLineTag( "  ° ", "<div class="paragraph hollow-bullet-2">", "</div>" );
defineLineTag( "    ° ", "<div class="paragraph hollow-bullet-3">", "</div>" );
defineLineTag( "      ° ", "<div class="paragraph hollow-bullet-4">", "</div>" );
defineLineTag( "", "<div class="paragraph">", "</div>" );

defineDualTag( "**", "<b>", "</b>" );
defineDualTag( "%%", "<i>", "</i>" );
defineDualTag( "__", "<u>", "</u>" );
defineDualTag( ",,", "<sub>", "</sub>" );
defineDualTag( "^^", "<sup>", "</sup>" );

defineTag( "~", "&nbsp;" );
defineTag( "¦", "<wbr/>" );
defineTag( "§", "<br/>" );
defineTag( "¶", "<br class="linebreak"/>" );
defineTag( "®", "<sup>®</sup>" );
defineTag( "™", "<sup>™</sup>' );

export function readDataFile( filePath )
{
    let textDecoder = new TextDecoder( "utf-8" );
    let applicationDataFile = Deno.readFileSync( filePath );

    return textDecoder.decode( applicationDataFile );
}

export function getApplicationData()
{
    if ( applicationData === null )
    {
        try
        {
            applicationData = readDefFile( "data/application_data.def", { readTextFileFunction: readDataFile } );
        }
        catch ( error )
        {
            console.error( error );
            throw error;
        }
    }

    return applicationData;
}

export function getLocalizedTextBySlug( slug )
{
    let applicationData = getApplicationData();
    let text = applicationData.textBySlugMap[ slug ];

    if ( typeof text === "string" )
    {
        return getLocalizedText( textData );
    }
    else
    {
        return slug;
    }
}

export function getLanguageArray()
{
    let applicationData = getApplicationData();

    return (
        Object.entries( applicationData.languageByCodeMap ).map(
            ( [ languageCode, languageData ] ) =>
            (
                {
                    code: languageCode,
                    name: languageData.name,
                    iconPath: languageData.iconPath
                }
            )
            )
        );
}

export function getLanguageCodeArray()
{
    let applicationData = getApplicationData();

    return Object.keys( applicationData.languageByCodeMap );
}

export function isValidLanguageCode( languageCode )
{
    let availableLanguages = getLanguageCodeArray();

    return availableLanguages.includes( languageCode );
}

export function getRequestBrowserLanguageCode( request )
{
    let acceptLanguage;

    if ( request && request.headers )
    {
        acceptLanguage = request.headers.get( "Accept-Language" );
    }
    else if ( request && request.headers )
    {
        acceptLanguage = request.headers.get( "Accept-Language" );
    }
    else
    {
        return getDefaultLanguageCode();
    }

    if ( acceptLanguage )
    {
        return getBrowserLanguageCode( acceptLanguage, getLanguageCodeArray(), getDefaultLanguageCode() );
    }

    return getDefaultLanguageCode();
}

export function getPathLanguageCode( pathname )
{
    let pathPartArray = pathname.replace( /^\//, "" ).split( "/" );

    if ( pathPartArray.length > 0 && pathPartArray[ 0 ] !== "" )
    {
        let languageCode = pathPartArray[ 0 ];

        if ( isValidLanguageCode( languageCode ) )
        {
            return languageCode;
        }
    }

    return null;
}

export function getPathWithoutLanguage( path )
{
    let languageCode = getPathLanguageCode( path );

    if ( languageCode )
    {
        return "/" + path.replace( /^\//, "" ).split( "/" ).slice( 1 ).join( "/" );
    }
    else
    {
        return path;
    }
}

export function getRequestLanguageCode( request )
{
    let url;

    if ( request && request.url )
    {
        url = request.url;
    }
    else if ( request && typeof request === "string" )
    {
        url = request;
    }
    else if ( request && request instanceof Request )
    {
        url = request.url;
    }
    else
    {
        return getDefaultLanguageCode();
    }

    let path = new URL( url ).pathname;
    let languageCode = getPathLanguageCode( path );

    if ( !languageCode )
    {
        languageCode = getRequestBrowserLanguageCode( request );
    }

    return languageCode;
}

export function setRequestLanguageCode( request, languageCode )
{
    setLanguageCode( languageCode || getRequestLanguageCode( request ) );
}

export function getLanguageCodePath( path, languageCode )
{
    if ( !isValidLanguageCode( languageCode ) )
    {
        return path;
    }
    else
    {
        let pathWithoutLanguage = getPathWithoutLanguage( path );

        if ( !pathWithoutLanguage.startsWith( "/" ) )
        {
            pathWithoutLanguage = "/" + pathWithoutLanguage;
        }

        if ( pathWithoutLanguage === "/" )
        {
            return `/${ languageCode }`;
        }
        else
        {
            return `/${ languageCode }${ pathWithoutLanguage }`;
        }
    }
}
