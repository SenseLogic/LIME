import HeaderMenu from "../components/HeaderMenu.jsx";
import { getRequestLanguageCode } from "../application.js";

export default function App( { Component, url } )
{
    // Get language from the current request
    const languageCode = getRequestLanguageCode({ url });
    
    return (
        <html lang={ languageCode }>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>LimeShoes - Premium Footwear</title>
                <link rel="stylesheet" href="/styles/main.css" />
            </head>
            <body>
                <HeaderMenu currentLanguage={ languageCode } />
                <Component />
            </body>
        </html>
    );
}

