import { setRequestLanguageCode } from "../application.js";
import TestimonialsPage from "../components/TestimonialsPage.jsx";

export default function Testimonials( { request } )
{
    setRequestLanguageCode( request );

    return <TestimonialsPage />;
}
