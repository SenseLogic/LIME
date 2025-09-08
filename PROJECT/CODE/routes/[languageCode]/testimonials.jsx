import { setRequestLanguageCode } from "../../application.js";
import TestimonialsPage from "../../components/TestimonialsPage.jsx";

export default function Testimonials( { params, request } )
{
    setRequestLanguageCode( request, params.languageCode );
    
    return (
        <div>
            <TestimonialsPage />
        </div>
        );
}