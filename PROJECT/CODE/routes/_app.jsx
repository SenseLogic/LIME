import HeaderMenu from "../components/HeaderMenu.jsx";

export default function App( { Component } )
{
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>LimeShoes - Premium Footwear</title>
                <link rel="stylesheet" href="/styles/main.css" />
            </head>
            <body>
                <HeaderMenu />
                <Component />
            </body>
        </html>
    );
}

