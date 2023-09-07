"use client";

import Button from "@/components/Button/Button";
import Lottie from "lottie-react";
import animationData from "/public/01.json";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero__item">
        <h1 className="hero__title">
          Welcome!
          <br /> I am a WebDeveloper.
        </h1>
        <div className="hero__text">
          <p>
            Let me tell you a bit about this website. I developed this site to showcase my frontend development skills
            using the React library and the Next.js framework. Ive tried to fill it not only with functionality but also
            with a pleasant design for a better user experience. Here, you can find an explore numerous posts added by
            various individuals, and even register to contribute to the blog with your own posts and comments. You can
            also delete and edit your posts, remove your comments, and sort the posts. Of course, this is not a
            comprehensive demonstration of my capabilities, but Ivm proud to show it to you as a showcase of my skills.
          </p>
        </div>

        <Button url="/dashboard" text="Create post" />
      </div>
      <div className="hero__item">
        <Lottie animationData={animationData} className="hero__img" loop={true} />
      </div>
    </section>
  );
}
