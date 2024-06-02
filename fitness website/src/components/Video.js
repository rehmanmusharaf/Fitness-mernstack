// import React from "react";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Video.css";
import ReactPlayer from "react-player";
gsap.registerPlugin(ScrollTrigger);

export default function Video({ url }) {
  let vid = useRef(null);

  useEffect(() => {
    gsap.from(vid, {
      duration: 1.2,
      y: "0",
      x: "0",
      scale: 0.5,
      opacity: 0,
      ease: "ease-in",
      scrollTrigger: {
        trigger: vid,
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "restart complete ",
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="player--container">
          <div
            className="player-wrapper"
            ref={(el) => {
              vid = el;
            }}
          >
            <ReactPlayer
              className="react-player"
              url={url}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
