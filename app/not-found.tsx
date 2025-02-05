import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <main className="notFoundPage-main">
      <p className="notFoundPage-paragraph">404</p>
      <h2 className="notFoundPage-h2">Page not found</h2>
      <p className="notFoundPage-paragraph">
        Please check the link and try again.
      </p>
      <Link href="/" className="notFoundPage-link">
        <FaArrowLeft />
        Home page
      </Link>
    </main>
  );
};

export default NotFound;
