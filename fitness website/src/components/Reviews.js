import React, { useState, useEffect } from "react";
import "./Reviews.css";
import { reviews } from "../data";
import { Button } from "./Button.js";

export default function Reviews() {
  const [people, setPeople] = useState(reviews);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className=" reviews--container">
      <div className="review-title">
        <h2> Highlighted Reviews </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={person.id}>
              <img src={person.img} alt={person.name} className="person-img" />
              <h4>{person.name}</h4>
              <p className="title_p">{person.title}</p>
              <p className="text">{person.quote}</p>
              <div className="icon">
                <i className="fas fa-quote-right" />
              </div>
            </article>
          );
        })}
        <span className="prev">
          <Button
            buttonStyle="btn--secondary"
            buttonSize="btn_small"
            onClick={() => setIndex(index - 1)}
          >
            <i className="fas fa-chevron-left"></i>{" "}
          </Button>
        </span>
        <span className="next">
          <Button
            buttonStyle="btn--secondary"
            buttonSize="btn_small"
            onClick={() => setIndex(index + 1)}
          >
            <i className="fas fa-chevron-right"></i>
          </Button>
        </span>
      </div>
    </section>
  );
}
