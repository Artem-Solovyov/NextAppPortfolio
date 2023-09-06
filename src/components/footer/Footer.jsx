import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__social">
        <Link target="_blanc" href="https://t.me/tema_slvv" className="footer__link">
          Telegram
        </Link>
        <Link href="https://github.com/Artem-Solovyov" target="_blanc" className="footer__link">
          GitHub
        </Link>
      </div>
      <div className="footer__copy">
        All Rights Reserved. 2023
        <br /> Design & developed by{" "}
        <Link target="_blanc" href="https://portfolio-artem-soloviov.netlify.app" className="footer__portfolio">
          Artem Soloviov
        </Link>
        .
      </div>
      <div className="footer__social footer__right">
        <Link href="https://twitter.com/ArtemSoloway" target="_blanc" className="footer__link">
          Twitter
        </Link>
        <Link href="mailto:solovevartem892@gmail.com" target="_blanc" className="footer__link">
          Mail
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
