import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
      <footer className="footer">
          <div className="footer__copy">2023 MyApp. All rights reserved</div>
      <div className="footer__social">
        
            <Link href="#"><Image src='/tg.svg' width={15} height={15} className="footer__icon" alt="Telegram"/></Link>
            <Link href="#"><Image src='/git.svg' width={15} height={15} className="footer__icon" alt="GitHub"/></Link>
            <Link href="#"><Image src='/twitter.svg' width={15} height={15} className="footer__icon" alt="Twitter"/></Link>
            <Link href="#"><Image src='/inst.svg' width={15} height={15} className="footer__icon" alt="Instagram"/></Link>
          </div>
    </footer>
  )
}

export default Footer