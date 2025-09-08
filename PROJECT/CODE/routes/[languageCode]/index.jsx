import { setRequestLanguageCode } from "../../application.js";
import HomePage from "../../components/HomePage.jsx";

export default function Home( { params, request } )
{
    setRequestLanguageCode( request, params.languageCode );
    
    return (
        <div>
            <HomePage />
        </div>
        );
}