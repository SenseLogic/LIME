import { setRequestLanguageCode } from "../../application.ts";
import HomePage from "../../components/HomePage.tsx";

export default function Home(props) {
  setRequestLanguageCode(props, props.params.languageCode);

  return <HomePage />;
}
