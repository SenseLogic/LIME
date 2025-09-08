import { setRequestLanguageCode } from "../application.js";
import ProductsPage from "../components/ProductsPage.jsx";

export default function Products( { request } )
{
    setRequestLanguageCode( request );

    return <ProductsPage />;
}

