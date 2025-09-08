import { setRequestLanguageCode } from "../application.js";
import HomePage from "../components/HomePage.jsx";

export default function Home( { request } )
{
    setRequestLanguageCode( request );
    
    return (
        <div>
            <HomePage />
        </div>
    );
}

