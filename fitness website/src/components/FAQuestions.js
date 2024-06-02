import React, { useState }  from "react";
import "./FAQuestions.css"
import { Button } from './Button';



export default function FAQuestions({ title, info }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="container--question">
      <div className='question'>
        <header>
          <h4>{title}</h4>
         {/*<span className="butt"><button className='btn' onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <i className="fas fa-angle-up"></i>: <i className="fas fa-angle-down"></i>}
          </button></span>*/}
           <span className="butt"><Button buttonStyle="btn--secondary" className="btn" buttonSize="btn_small" onClick={() => setShowInfo(!showInfo)}>{showInfo ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</Button> </span>
        </header>
        {showInfo && <p>{info}</p>}
      </div>
    </div>
  );
}