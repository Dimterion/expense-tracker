import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer-footer">
      <a
        href="https://dimterion.bio.link/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-a"
      >
        {new Date().getFullYear()} &copy;Dimterion
      </a>
      <Link href="/about" className="footer-a">
        About
      </Link>
    </footer>
  );
};

export default Footer;
