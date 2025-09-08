import { setRequestLanguageCode } from "../application.js";
import AboutPage from "../components/AboutPage.jsx";

export default function About( { request } )
{
    setRequestLanguageCode( request );
    
    return <AboutPage />;
}

