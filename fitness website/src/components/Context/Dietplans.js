import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
let DietPlansContext = createContext();

const DietPlans = ({ children }) => {
  let [dietPlans, setDietPlans] = useState([]);
  async function getDietPlans() {
    console.log("Context Hook Function RUn!");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/api/dietplans`,
        { withCredentials: true }
      );
      if (data.success) {
        // console.log("user detail is :", data);
        setDietPlans((prev) => {
          let dietplans = data.dietplans;
          return [...dietplans];
        });
        console.log("dietplans data get successfully!", data);
      } else {
        // console.log(data);
      }
    } catch (error) {
      console.log("Diet Plans error", error);
    }
  }
  useEffect(() => {
    getDietPlans();
  }, []);
  return (
    <DietPlansContext.Provider value={[dietPlans, setDietPlans]}>
      {children}
    </DietPlansContext.Provider>
  );
};

export default DietPlans;
let useDietPlans = () => useContext(DietPlansContext);

export { useDietPlans };
