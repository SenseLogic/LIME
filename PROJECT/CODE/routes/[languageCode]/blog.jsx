import { setRequestLanguageCode } from "../../application.js";
import BlogPage from "../../components/BlogPage.jsx";

export default function Blog( { params, request } )
{
    setRequestLanguageCode( request, params.languageCode );
    
    return (
        <div>
            <BlogPage />
        </div>
        );
}