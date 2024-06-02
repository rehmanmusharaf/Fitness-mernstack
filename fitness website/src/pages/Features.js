import React, { useState, useEffect , useRef} from 'react'
import { gsap} from "gsap";
import Gallery from "../components/Gallery"
import {features, gallery} from "../data"
import "./Features.css"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function Features() {
  const [jobs, setJobs] = useState(features);
  const [value, setValue] = useState(0);
  const { company, dates, duties, title } = jobs[value];
  let text=useRef(null);

useEffect(() => {

   gsap.to(text, {
      delay:0.4,
      duration: 1,
      x: '0',
      opacity: 1,
      ease: 'ease-in',
      scrollTrigger: {
        trigger: text,
        start: 'top 90%',
        end: 'bottom 60%',
        toggleActions: 'restart complete ',
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
    });
    
  }, []); 
  return (
    <>
       <div className="faq--header"><h1>Features</h1></div>
       <div className="fet--contain">
          <div className='title'>
                <h2>What we offer</h2>
                <div className='underline'></div>
                <div className="ani" ref={el=> {text=el}}>
                <p className="top">Effective <em>“Old School” </em>equipment, not fancy, popular, or trendy.</p>
                <p>We have everything you need for an amazing body transformation!</p>
                <p>We specialize in providing the equipment and coaching for <span>Strongman</span>, <span>Powerlifting</span>, <span>Olympic Weightlifting</span>, and<span> Arm Sports</span>.</p>
                </div>
                
            </div>
        </div>
        <Gallery data={gallery}/>
        <section className='section'>
          <div className='jobs-center'>
            {/* btn container */}
            <div className='btn-container'>
              {jobs.map((item, index) => {
                return (
                  <button
                    key={item.id}
                    onClick={() => setValue(index)}
                    className={`job-btn ${index === value && 'active-btn'}`}
                  >
                    {item.company}
                  </button>
                )
              })}
           </div>
        {/* job info */}
            <div className='job-info'>
              <h3>{title}</h3>

              
                {duties.map((duty, index) => {
            return (
              <div key={index} className='job-desc'>
              <i className="fas fa-angle-double-right job-icon"></i>
              <p>{duty}</p>
              </div>
            )
          })}
              
            </div>
         </div>
      </section>
    </>
  );
}