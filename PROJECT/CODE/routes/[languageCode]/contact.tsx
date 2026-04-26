import { setRequestLanguageCode } from "../../application.ts";
import ContactPage from "../../components/ContactPage.tsx";

export default function Contact(props) {
  setRequestLanguageCode(props, props.params.languageCode);

  return <ContactPage />;
}
