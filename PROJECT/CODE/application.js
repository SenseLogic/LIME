import {
    setLanguageSeparator,
    getLocalizedText
} from 'senselogic-lingo';
import { parseDefText } from 'senselogic-def';

let applicationData = null;

setLanguageSeparator( '\n¨' );

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

