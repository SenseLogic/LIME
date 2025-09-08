import { setRequestLanguageCode } from "../../application.js";
import ContactPage from "../../components/ContactPage.jsx";

export default function Contact( { params, request } )
{
    setRequestLanguageCode( request, params.languageCode );
    
    return (
        <div>
            <ContactPage />
        </div>
        );
}