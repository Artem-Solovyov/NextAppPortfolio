
import Link from 'next/link'

const Portfolio = () => {
  return (
     <section className="portfolio">
      <h1 className="portfolio__title">Choose a gallery</h1>
      <div className="portfolio__items">
        <Link href="/portfolio/illustrations" className="portfolio__item">
        <span className="portfolio__subtitle">Illustrations</span>
        </Link>
        <Link href="/portfolio/websites" className="portfolio__item">
        <span className="portfolio__subtitle">Websites</span>
        </Link>
        <Link href="/portfolio/application" className="portfolio__item">
        <span className="portfolio__subtitle">Application</span>
        </Link>
    </div>
</section>
  )
}

export default Portfolio