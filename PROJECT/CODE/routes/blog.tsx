// -- IMPORTS

import { setRequestLanguageCode } from "../application.ts";
import BlogPage from "../components/BlogPage.tsx";

// -- FUNCTIONS

export default function Blog(
    props
    )
{
    setRequestLanguageCode( props );

    return (
        <BlogPage />
        );
}
