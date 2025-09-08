import {
    setLanguageSeparator,
    getLocalizedText,
    setLanguageCode,
    getLanguageCode,
    setDefaultLanguageCode,
    getDefaultLanguageCode,
    getBrowserLanguageCode
} from 'senselogic-lingo';
import { parseDefText } from 'senselogic-def';

let applicationData = null;

setLanguageSeparator( '\n¨' );
setDefaultLanguageCode( 'en' );

export function getApplicationData()
{
    if ( applicationData === null )
    {
        try
        {
            let textDecoder = new TextDecoder( 'utf-8' );
            let applicationDataFile = Deno.readFileSync( './application_data.def' );
            let applicationDataText = textDecoder.decode( applicationDataFile );
            applicationData = parseDefText( applicationDataText );
        }
        catch ( error )
        {
            console.error( 'Error loading application data:', error );
            throw error;
        }
    }

    return applicationData;
}

export function getLocalizedTextBySlug( slug )
{
    let applicationData = getApplicationData();
    let textData = applicationData.textBySlugMap[ slug ];

    if ( typeof textData === 'string' )
    {
        return getLocalizedText( textData );
    }
    else
    {
        return slug;
    }
}

export function getAvailableLanguages()
{
    let applicationData = getApplicationData();

    return Object.entries( applicationData.languageByCodeMap ).map(
        ( [ languageCode, languageData ] ) =>
        (
            {
                code: languageCode,
                name: languageData.name,
                iconPath: languageData.iconPath
            }
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
    let acceptLanguage = request.headers?.get( 'Accept-Language' );
    
    if ( acceptLanguage )
    {
        return getBrowserLanguageCode( acceptLanguage, getLanguageCodeArray(), getDefaultLanguageCode() );
    }

    return getDefaultLanguageCode();
}

export function getPathLanguageCode( pathname )
{
    let pathPartArray = pathname.replace( /^\//, '' ).split( '/' );
    
    if ( pathPartArray.length > 0 && pathPartArray[ 0 ] !== '' )
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
        return '/' + path.replace( /^\//, '' ).split( '/' ).slice( 1 ).join( '/' );
    }
    else
    {
        return path;
    }
}

export function getRequestLanguageCode( request )
{
    let pathname = new URL( request.url ).pathname;
    let languageCode = getPathLanguageCode( pathname );
    
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
        
        if ( !pathWithoutLanguage.startsWith( '/' ) )
        {
            pathWithoutLanguage = '/' + pathWithoutLanguage;
        }

        if ( pathWithoutLanguage === '/' )
        {
            return `/${ languageCode }`;
        }
        else
        {
            return `/${ languageCode }${ pathWithoutLanguage }`;
        }
    }
}

