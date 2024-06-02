import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDietPlans } from "../components/Context/Dietplans";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample dynamic data
const dietPlan = {
  morning: {
    heading: "Morning Diet",
    description:
      "Oatmeal with fruits and a glass of milk. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, modi alias. Veniam eligendi enim, eos accusamus aliquid architecto consequuntur dignissimos ducimus reprehenderit ullam possimus, repellat, laboriosam ipsa provident vero nostrum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, modi alias. Veniam eligendi enim, eos accusamus aliquid architecto consequuntur dignissimos ducimus reprehenderit ullam possimus, repellat, laboriosam ipsa provident vero nostrum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, modi alias. Veniam eligendi enim, eos accusamus aliquid architecto consequuntur dignissimos ducimus reprehenderit ullam possimus, repellat, laboriosam ipsa provident vero nostrum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, modi alias. Veniam eligendi enim, eos accusamus aliquid architecto consequuntur dignissimos ducimus reprehenderit ullam possimus, repellat, laboriosam ipsa provident vero nostrum?",
  },
  afternoon: {
    heading: "Afternoon Diet",
    description: "Grilled chicken with steamed vegetables.",
  },
  evening: {
    heading: "Evening Diet",
    description: "Salad with quinoa and a smoothie.",
  },
};

const DietPlan = () => {
  const [dietPlans] = useDietPlans();
  const { plantype } = useParams();
  const history = useHistory();
  // const [filteredPlans, setFileredPlans] = useState([]);
  // function filterdietplan(params) {
  //   setFileredPlans([...filteredPlan]);
  // }

  useEffect(() => {
    // filterdietplan();
    // console.log("filter diet plan", filteredPlans);
    // Clean up the timer if the component is unmounted
    // return () => clearTimeout(timer);
  }, [dietPlans]);
  let filteredPlan = dietPlans.filter((value) => value.name === plantype);
  console.log(filteredPlan);
  return (
    <>
      {dietPlans.length > 0 ? (
        filteredPlan.length > 0 ? (
          <div className="container bg-white" style={{ marginTop: "80px" }}>
            <div className="row mb-4">
              <div className="col">
                <div className="card shadow-sm border-0 rounded-3">
                  <div className="card-body">
                    <h2 className="card-title mb-3">
                      {filteredPlan[0]?.dietplan?.morning?.name}
                    </h2>
                    <p className="card-text">
                      {filteredPlan[0]?.dietplan?.morning?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row mb-4">
              <div className="col">
                <div className="card shadow-sm border-0 rounded-3">
                  <div className="card-body">
                    <h2 className="card-title mb-3">
                      {filteredPlan[0]?.dietplan?.afternoon?.name}
                    </h2>
                    <p className="card-text">
                      {filteredPlan[0]?.dietplan?.afternoon?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row mb-4">
              <div className="col">
                <div className="card shadow-sm border-0 rounded-3">
                  <div className="card-body">
                    <h2 className="card-title mb-3">
                      {filteredPlan[0]?.dietplan?.evening?.name}
                    </h2>
                    <p className="card-text">
                      {filteredPlan[0]?.dietplan?.evening?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <p>No matching diet plan found.</p>
          </div>
        )
      ) : (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default DietPlan;
