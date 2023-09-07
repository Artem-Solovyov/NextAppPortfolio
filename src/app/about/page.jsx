import Button from "@/components/Button/Button";
import Image from "next/image";

const About = () => {
  return (
    <div className="about">
      <div className="about__image">
        <Image src="/websites.jpg" fill={true} alt="about us" className="about__img" />
        <div className="about__img-container">
          <h2 className="about__img-text">A bit about myself and this website.</h2>
        </div>
      </div>

      <div className="about__content">
        <div className="about__item">
          <h1 className="about__title">Who am I?</h1>
          <p className="about__text">
            My name is Artem, and I have been involved in web development for two years, including one year of intensive
            practice. I have created numerous single-page websites, including those related to cryptocurrencies. Ive
            built websites using both pure React and in combination with Next.js. Additionally, I have experience with
            websites on the WordPress CRM system.
            <br />
            <br />I have developed a variety of functional websites, as well as aesthetically pleasing designs that are
            well-crafted. You can explore some of my work on my portfolio website. Thank you for your time, and have a
            great day!
          </p>
          <Button url="https://portfolio-artem-soloviov.netlify.app" text="Portfolio" />
        </div>

        <div className="about__item">
          <h2 className="about__title">What did I use?</h2>
          <p className="about__text">
            This website is built with Next.js 13.4 in combination with React 18.2. MongoDB serves as the database. API
            endpoints were created using Next.js. I employed SWR for API communication, as I find this library
            appealing. NextAuth was chosen and implemented for authentication. The site is styled using SASS following
            the BEM methodology.
            <br />
            <br /> - Next.js
            <br /> - React.js
            <br /> - NextAuth
            <br /> - Mongoose
            <br /> - SWR
            <br /> - SCSS
          </p>
          <Button url="/dashboard" text="Create post" />
        </div>
      </div>
    </div>
  );
};

export default About;
