import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { gallery } from "../data";
import "./Gallery.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Gallery({ data }) {
  const [current, setCurrent] = useState(0);
  const length = data.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }
  useEffect(() => {
    const interval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [current, length]);

  let text = useRef(null);

  useEffect(() => {
    gsap.to(text, {
      delay: 0.4,
      duration: 1,
      y: "0",
      opacity: 1,
      ease: "ease-in",
      scrollTrigger: {
        trigger: text,
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "restart complete ",
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
    });
  }, []);

  // setInterval(() => {
  //   nextSlide();
  // }, 5000);
  return (
    <div className="gallery--container">
      <div className="gallery--header">
        <h2>Gallery</h2>
        <div className="underline"></div>
        <div
          className="anim"
          ref={(el) => {
            text = el;
          }}
        >
          <p>Take a tour around our facility...</p>
          <p>
            By looking through our gallery, you can see what you'll find at{" "}
            <strong>Fitzen Gym</strong>. There's lots of equipment to check out
            and plenty of friendly faces too!
          </p>
        </div>
        <p></p>
      </div>
      <section className="slider">
        <i className="fas fa-chevron-left left-arrow" onClick={prevSlide}></i>
        <i className="fas fa-chevron-right right-arrow" onClick={nextSlide}></i>

        {gallery.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img src={slide.image} alt="Fitzen Gym" className="image" />
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
