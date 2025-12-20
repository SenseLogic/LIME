import HeaderMenu from "../components/HeaderMenu.jsx";
import { getRequestLanguageCode } from "../application.js";

export default function App( { Component, url } )
{
    let languageCode = getRequestLanguageCode( { url } );

    return (
        <html lang={ languageCode }>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Lime Project - Premium Footwear</title>
                <link rel="stylesheet" href="/styles/main.css" />
            </head>
            <body>
                <HeaderMenu languageCode={ languageCode } />
                <Component />
            </body>
        </html>
    );
}
