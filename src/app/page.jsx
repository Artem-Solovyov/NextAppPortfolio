import Button from '@/components/Button/Button'
import Image from 'next/image'
import Hero from 'public/hero.png'

export default function Home() {
  return (
    <section className='hero'>
      <div className="hero__item">
        <h1 className="hero__title">
          The Future of AI in the next few years
        </h1>
        <div className="hero__text">
          <p>
            Turning your Idea into Reality. We bring together the teams from the global tech industry.
          </p>
        </div>
        <Button url="/portfolio" text="See Our Works"/>
      </div>
      <div className="hero__item">
        <Image src={Hero} alt="Hero" className='hero__img'></Image>
      </div>
    </section>
  )
}
