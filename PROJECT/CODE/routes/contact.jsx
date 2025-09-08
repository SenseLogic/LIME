import { setRequestLanguageCode } from "../application.js";
import ContactPage from "../components/ContactPage.jsx";

export default function Contact( { request } )
{
    setRequestLanguageCode( request );
    
    return <ContactPage />;
}

