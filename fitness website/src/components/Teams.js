import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Teams.css";

gsap.registerPlugin(ScrollTrigger);

export default function Teams() {
  let img1 = useRef(null);
  let img2 = useRef(null);
  let img3 = useRef(null);
  let img4 = useRef(null);

  useEffect(() => {
    gsap.to(img1, {
      duration: 1,
      x: "0",
      opacity: 1,
      ease: "ease-in",
      scrollTrigger: {
        trigger: img1,
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "restart complete ",
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
    });
    gsap.to(img2, {
      duration: 1,
      x: "0",
      opacity: 1,
      ease: "ease-in",
      scrollTrigger: {
        trigger: img2,
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "restart complete ",
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
    });
    // gsap.to(img3, {
    //   duration: 1,
    //   x: "0",
    //   opacity: 1,
    //   ease: "ease-in",
    //   scrollTrigger: {
    //     trigger: img3,
    //     start: "top 90%",
    //     end: "bottom 60%",
    //     toggleActions: "restart complete ",
    //     //options: play, pause, resume, reset, restart, complete, reverse,none
    //   },
    // });
    // gsap.to(img4, {
    //   duration: 1,
    //   x: "0",
    //   opacity: 1,
    //   ease: "ease-in",
    //   scrollTrigger: {
    //     trigger: img4,
    //     start: "top 90%",
    //     end: "bottom 60%",
    //     toggleActions: "restart complete ",
    //     //options: play, pause, resume, reset, restart, complete, reverse,none
    //   },
    // });
  }, []);

  return (
    <div className="team">
      <div className="team--wrapper">
        <div className="team--text">
          <h2>Private Coaching</h2>
          <h1>Meet Our Trainers </h1>
          <p>
            All our personal trainers have over 20 years of experience combined.
          </p>
        </div>
        <div className="team--text">
          <h2>Free Trial</h2>
          <h1>Get 7 Days Trial</h1>
          <p>
            You can work with each trainer for up to 7 days for free in order to
            see if they are a good fit for your goals.
          </p>
        </div>

        <div
          className="team--card"
          ref={(el) => {
            img1 = el;
          }}
        >
          <p>Usman Samir</p>
          <img
            src="https://res.cloudinary.com/dgaw5qfuo/image/upload/v1716320201/WhatsApp_Image_2024-05-22_at_12.33.46_AM_1_z4whtw.jpg"
            alt="Trainer Sara"
            className="team--image"
          />
        </div>
        <div
          className="team--card"
          ref={(el) => {
            img2 = el;
          }}
        >
          <p>Carlos</p>
          <img
            src="https://media.licdn.com/dms/image/C4D03AQE-RhkKZq1YOA/profile-displayphoto-shrink_800_800/0/1649928744051?e=2147483647&v=beta&t=smw4G3f4SJC88a7y68087gFaBktAbQt-aNHCeQwiCFg"
            alt="Trainer Carlos"
            className="team--image"
          />
        </div>
        {/* <div
          className="team--card"
          ref={(el) => {
            img3 = el;
          }}
        >
          <p>Linda</p>
          <img
            src="https://as2.ftcdn.net/v2/jpg/00/73/58/61/1000_F_73586121_oDl3lXnZYwf2gXuPw2e5WqtyhRx7vWBa.jpg"
            alt="Trainer Linda"
            className="team--image"
          />
        </div> */}
        {/* <div
          className="team--card"
          ref={(el) => {
            img4 = el;
          }}
        >
          <p>Eduard</p>
          <img
            src="https://as2.ftcdn.net/v2/jpg/00/73/58/61/1000_F_73586121_oDl3lXnZYwf2gXuPw2e5WqtyhRx7vWBa.jpg"
            alt="Trainer Eduard"
            className="team--image"
          />
        </div> */}
      </div>
    </div>
  );
}
