import { setRequestLanguageCode } from "../../application.js";
import TestimonialsPage from "../../components/TestimonialsPage.jsx";

export default function Testimonials( props )
{
    setRequestLanguageCode( props, props.params.languageCode );
    
    return <TestimonialsPage />;
}