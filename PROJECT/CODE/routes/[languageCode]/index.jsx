import { setRequestLanguageCode } from "../../application.js";
import HomePage from "../../components/HomePage.jsx";

export default function Home( props )
{
    setRequestLanguageCode( props, props.params.languageCode );
    
    return (
        <div>
            <HomePage />
        </div>
        );
}