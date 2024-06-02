import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MultiStep from "react-multistep";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";
import { StepFour } from "./step-four";
import "./prog-track.css";
import "./styles.css";

const index = () => {
  let [name, setName] = useState("");
  let [morningdiet, setMorningdiet] = useState("");
  let [afternoondiet, setAfternoondiet] = useState("");
  let [eveningdiet, setEveningdiet] = useState("");
  const obj = {
    name: name,
    dietplan: {
      morning: {
        name: "Morning Diet",
        description: morningdiet,
      },
      afternoon: {
        name: "Afternoon Diet",
        description: afternoondiet,
      },
      evening: {
        name: "Evening Diet",
        description: eveningdiet,
      },
    },
  };

  const steps = [
    {
      name: "Name A",
      component: (
        <StepOne
          setName={setName}
          name={name}
          morningdiet={morningdiet}
          setMorningdiet={setMorningdiet}
        />
      ),
    },
    {
      name: "Email",
      component: (
        <StepTwo
          afternoondiet={afternoondiet}
          setAfternoondiet={setAfternoondiet}
        />
      ),
    },
    {
      name: "Password",
      component: (
        <StepThree eveningdiet={eveningdiet} setEveningdiet={setEveningdiet} />
      ),
    },
    { name: "Agreement", component: <StepFour obj={obj} /> },
  ];
  const handleSubmit = () => {
    const formData = {
      name,
      email,
      password,
      agreement,
    };
    console.log("Form Data:", formData);
    // Add your form submission logic here
  };
  useEffect(() => {
    console.log(name);
  }, []);
  return (
    <div className=" container bg-transparent ">
      <div className="App container bg-transparent ">
        <h1>Register Your Diet Plan</h1>
        <MultiStep steps={steps} style={{ justifyContent: "center" }} />
      </div>
    </div>
  );
};

export default index;

// function App() {
//   return (
//     <div className="App">
//       <h1>React multi step</h1>
//       <MultiStep steps={steps} />
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
