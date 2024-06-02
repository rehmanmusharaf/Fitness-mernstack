import React from 'react';
import FAQuestions from "../components/FAQuestions"
import {memberships,gym,gVibes} from "../data"
import "./FAQs.css"
export default function FAQs() {

  return (
    <>
       <div className="faq--header"><h1>FAQs</h1></div>
       <nav className="faq--navbar">
       <ul>
          <li><a href="../FAQs#member">Membership</a></li>
          <li><a href="../FAQs#gym">Gym</a></li>
          <li><a href="../FAQs#goodvibes">Good Vibes</a></li>
       </ul>
       </nav>
       <main className="cont-aal">
       <div className="main--data" id="member">
          <div className='container--faq'>
                <h3>Membership</h3>
                <section className='info'>
              
                    {memberships.map((question) => {
                      return (
                        <FAQuestions key={question.id} title={question.title} info={question.info}{...question}/>
                      );
                    })}
                  
                </section>
                
          </div>
          
      </div>
      <div className="main--data" id="gym">
          <div className='container--faq '>
                <h3>Gym</h3>
                <section className='info'>
              
                    {gym.map((question) => {
                      return (
                        <FAQuestions key={question.id} title={question.title} info={question.info}{...question}/>
                      );
                    })}
                  
                </section>
                
          </div>
          
      </div>
      <div className="main--data" id="goodvibes">
          <div className='container--faq '>
                <h3>Good Vibes</h3>
                <section className='info'>
              
                    {gVibes.map((question) => {
                      return (
                        <FAQuestions key={question.id} title={question.title} info={question.info}{...question}/>
                      );
                    })}
                  
                </section>
                
          </div>
          
      </div>
      </main>
    </>
  );
}