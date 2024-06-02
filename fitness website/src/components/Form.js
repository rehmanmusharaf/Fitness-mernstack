import React, {useRef,useEffect} from "react";
import { gsap} from "gsap";
//import {Link} from "react-router-dom"
import {Button} from './Button.js'
import'./Form.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Form() {


 let text=useRef([]);

useEffect(() => {

   gsap.to(text.current, {
     duration:1.5,
      y: '0',
      opacity: 1,
      stagger:0.4,
      ease: 'ease-in',
      scrollTrigger: {
        trigger: ".animate",
        start: 'top 90%',
        end: 'bottom 60%',
        toggleActions: 'restart complete reverse reset',
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
    });
    
  }, []);


  return (
    <div className="form--container">
    <div className="content" >
      <h1 className="animate" ref={el=> {text.current[0]=el}}>Get Access to Member’s Only Perk</h1>
      <p className="animate" ref={el=> {text.current[1]=el}}>Subscribe to get our newsletter and also get 100% off your first personal trainning session!</p>
      <form className="animate" ref={el=> {text.current[2]=el}}>
        <div className="form--wrap">
        <input type="email" className="form-control" name="em" id="email" placeholder="Email address" required pattern="[a-z 0-9 ._%-+]+@[a-z 0-9 .-]+\.[a-z]{2,3}$"/>
        <div className="button--su"><Button buttonStyle="btn--primary" buttonSize="btn--large" type="submit">Join Now</Button></div>
        </div>
      </form>
    </div>
    </div>
    )
    };