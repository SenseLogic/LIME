import { setRequestLanguageCode } from "../application.js";
import ProductsPage from "../components/ProductsPage.jsx";

export default function Products( props )
{
    setRequestLanguageCode( props );

    return <ProductsPage />;
}

