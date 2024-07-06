const Footer = () => {
  return (
    <footer className="footer-footer">
      <a
        href="https://github.com/Dimterion/expense-tracker"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-a"
      >
        {new Date().getFullYear()} &copy;Dimterion
      </a>
    </footer>
  );
};

export default Footer;
