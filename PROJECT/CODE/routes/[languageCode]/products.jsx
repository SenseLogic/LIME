import { setRequestLanguageCode } from "../../application.js";
import ProductsPage from "../../components/ProductsPage.jsx";

export default function Products( { params, request } )
{
    setRequestLanguageCode( request, params.languageCode );
    
    return (
        <div>
            <ProductsPage />
        </div>
        );
}