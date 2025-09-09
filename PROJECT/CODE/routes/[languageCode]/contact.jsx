import { setRequestLanguageCode } from "../../application.js";
import ContactPage from "../../components/ContactPage.jsx";

export default function Contact( props )
{
    setRequestLanguageCode( props, props.params.languageCode );
    
    return <ContactPage />;
}