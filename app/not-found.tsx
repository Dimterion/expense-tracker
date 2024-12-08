import Link from "next/link";

const NotFound = () => {
  return (
    <main>
      <p>404</p>
      <h2>Page not found</h2>
      <p>Please check the link and try again.</p>
      <Link href="/">Home page</Link>
    </main>
  );
};

export default NotFound;
