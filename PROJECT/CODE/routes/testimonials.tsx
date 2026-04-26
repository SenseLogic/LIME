import { setRequestLanguageCode } from "../application.ts";
import TestimonialsPage from "../components/TestimonialsPage.tsx";

export default function Testimonials(props) {
  setRequestLanguageCode(props);

  return <TestimonialsPage />;
}
