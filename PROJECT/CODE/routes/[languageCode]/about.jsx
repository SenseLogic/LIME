import { setRequestLanguageCode } from "../../application.js";
import AboutPage from "../../components/AboutPage.jsx";

export default function About( { params, request } )
{
    setRequestLanguageCode( request, params.languageCode );
    
    return (
        <div>
            <AboutPage />
        </div>
        );
}