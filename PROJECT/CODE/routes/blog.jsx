import { setRequestLanguageCode } from "../application.js";
import BlogPage from "../components/BlogPage.jsx";

export default function Blog( { request } )
{
    setRequestLanguageCode( request );
    
    return <BlogPage />;
}

