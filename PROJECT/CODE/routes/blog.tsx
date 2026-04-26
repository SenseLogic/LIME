import { setRequestLanguageCode } from "../application.ts";
import BlogPage from "../components/BlogPage.tsx";

export default function Blog(props) {
  setRequestLanguageCode(props);

  return <BlogPage />;
}
