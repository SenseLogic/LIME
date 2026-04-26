import { setRequestLanguageCode } from "../application.ts";
import AboutPage from "../components/AboutPage.tsx";

export default function About(props) {
  setRequestLanguageCode(props);

  return <AboutPage />;
}
