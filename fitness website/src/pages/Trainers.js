import React, { useEffect, useRef } from "react";
import { TweenMax, gsap } from "gsap";
import { Button } from "../components/Button";
import "./Trainers.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Trainers() {
  let cor = useRef(null);
  useEffect(() => {
    gsap.to(cor, {
      delay: 0.4,
      duration: 1,
      x: "0",
      y: "0",
      opacity: 1,
      ease: "ease-in",
      scrollTrigger: {
        trigger: cor,
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "restart complete",
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
    });
  }, []);
  let corri = useRef(null);
  useEffect(() => {
    gsap.to(corri, {
      delay: 0.4,
      duration: 1,
      x: "0",
      y: "0",
      opacity: 1,
      stagger: 0.4,
      ease: "ease-in",
      scrollTrigger: {
        trigger: corri,
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "restart complete ",
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
    });
  }, []);

  let newv = useRef([]);
  useEffect(() => {
    TweenMax.to(newv.current, {
      delay: 0.4,
      duration: 1,
      y: "0",
      opacity: 1,
      stagger: 0.0,
      ease: "ease-in",
      scrollTrigger: {
        trigger: ".why--container--wrapper",
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "restart complete ",
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
    });
  }, []);

  return (
    <>
      <div className="faq--header">
        <h1>Trainers</h1>
      </div>
      {/*<h1 className="hi">Trainers</h1>*/}
      <div className="fet--contain">
        <div className="title">
          <h2>Why Fitnation Personal Trainers?</h2>
          <div className="underline"></div>
          <div className="">
            <p>
              Our trainers will develop a personalized training program that
              fits your body, lifestyle and budget. They are certified experts
              in exercise physiology, anatomy, training program development,
              fitness assessments and applications. They excel at applying this
              knowledge to help you achieve your goal and go further in life.
            </p>
          </div>
        </div>
      </div>
      <div className="welcome">
        <img
          src="https://aajatexas.org/wp-content/uploads/2019/05/470333845-56a2b67c5f9b58b7d0cdadd3.jpg"
          alt="Fitnation gym"
          ref={(el) => {
            cor = el;
          }}
        />
        <div
          className="welcome--headline"
          ref={(el) => {
            corri = el;
          }}
        >
          <h3>Welcome to Personal Training by Fitnation</h3>
          <p>
            Fitnation Personal Trainers are highly qualified and take pride in
            treating every member as an individual. We understand that different
            training methods suit different people so no matter what your level
            of fitness or experience, a Personal Trainer can tailor a program,
            show you best training practices and how to use gym equipment,
            inspiring and motivating you along the way.{" "}
          </p>
          <p>
            We have trainers who specialize in all areas of fitness including
            weight loss, injury rehabilitation, sports training, core and
            strength training. Working with a Personal Trainer is no doubt the
            fastest and safest way to get the results you want.
          </p>
          <p>
            <strong>
              <em>For best results, choose Personal Training by Fitnation.</em>
            </strong>
          </p>
        </div>
      </div>
      <div className="why">
        <h3>Why Personal Trainer</h3>
        <div className="underline"></div>
        <div className="why--container">
          <div
            className="why--container--wrapper"
            ref={(el) => {
              newv.current[0] = el;
            }}
          >
            <img
              className="side-images"
              src="https://images.unsplash.com/photo-1536922246289-88c42f957773?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=904&q=80"
              alt="Fitnation gym"
            />
            <div className="welcome--headline">
              <h3>Our goal? Achieving yours</h3>
              <p>
                With Personal Training, you get individual attention from an
                expert who will draw up a training plan customized to get you
                results. You will have an expert by your side all the way who is
                certified and equipped with the best tools and knowledge to help
                you get accelerated results.
              </p>
              <p>
                At Fitnation, you learn from some of the best and most
                passionate trainers around; you get an education that can
                empower you to lead a healthy and fit lifestyle.
              </p>
            </div>
          </div>
          <div
            className="why--container--wrapper"
            ref={(el) => {
              newv.current[1] = el;
            }}
          >
            <img
              className="side-images"
              src="https://t4.ftcdn.net/jpg/03/33/91/97/360_F_333919715_R1mDUWPgwB2CRvSCNnvnmtn64gPY40ZL.jpg"
              alt="choose personal trainer by Fitnation"
            />
            <div className="welcome--headline">
              <h3>Benefits</h3>
              <p>
                Results made personal! Get the results you want with
                professional, passionate and highly qualified experts who take
                your goals and aspirations personally.
              </p>
              <p>
                Our trainers are all graduates of the Fitness First Asia
                Personal Training Foundation Programme where their know-how is
                reviewed, updated and assessed.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="challenge">
        <div className="challenge--container">
          <div className="challenge--headline">
            <h3>Challenges</h3>
            <p>
              Challenge yourself and your friends and make sure you to share
              your workout with us
            </p>
          </div>
          <div className="middle">
            <Button buttonStyle="btn--primary" buttonSize="btn--large">
              View Challenges{" "}
            </Button>{" "}
          </div>
        </div>
      </div>

      <div className="refer">
        <div className="title">
          <h2>Our Personal Trainers</h2>
          <div className="underline"></div>
          <div className="refer--headline">
            <p>
              All our Personal Trainers are internationally accredited with male
              and female trainers from different nationalities to suit your
              preference.
            </p>
          </div>
        </div>
        <span className="memb--but">
          {/* <Button buttonStyle="btn--primary" buttonSize="btn--large">
            {/* View Personal Trainers{" "} */}
          {/* </Button>{" "} */}
        </span>
      </div>
    </>
  );
}
