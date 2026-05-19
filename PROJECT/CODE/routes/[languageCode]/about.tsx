// -- IMPORTS

import { setRequestLanguageCode } from "../../application.ts";
import AboutPage from "../../components/AboutPage.tsx";

// -- FUNCTIONS

export default function About(
    props
    )
{
    setRequestLanguageCode( props, props.params.languageCode );

    return (
        <AboutPage />
        );
}
