import { setRequestLanguageCode } from "../../application.js";
import BlogPage from "../../components/BlogPage.jsx";

export default function Blog( props )
{
    setRequestLanguageCode( props, props.params.languageCode );
    
    return <BlogPage />;
}