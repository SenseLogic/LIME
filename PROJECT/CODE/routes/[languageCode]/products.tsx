import { setRequestLanguageCode } from "../../application.ts";
import ProductsPage from "../../components/ProductsPage.tsx";

export default function Products(props) {
  setRequestLanguageCode(props, props.params.languageCode);

  return <ProductsPage />;
}
