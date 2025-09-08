import { setRequestLanguageCode } from "../../application.js";
import AboutPage from "../../components/AboutPage.jsx";

export default function About( props )
{
    setRequestLanguageCode( props, props.params.languageCode );
    
    return (
        <div>
            <AboutPage />
        </div>
        );
}