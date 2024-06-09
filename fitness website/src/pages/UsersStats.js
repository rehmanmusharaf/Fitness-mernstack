import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { useAuth } from "../components/Context/Auth";
const UsersStats = () => {
  let [auth, setAuth] = useAuth();
  const { userId } = useParams();
  const [performanceData, setPerformanceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [plantype, setPlantype] = useState("");
  const [gainupto, setGainupto] = useState("");
  const [paymentproofurl, setPaymentproofurl] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const fetchPerformanceData = async (page = 1) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_server}/admin/user-performance?page=${page}&id=${userId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log("data", response.data);
        const { userperformance, totalPages } = response.data;
        console.log("total pages", totalPages);
        setPerformanceData(userperformance);
        setTotalPages(totalPages);
        setPlantype(response.data.plantype);
        setGainupto(response.data.gainupto);
        setPaymentproofurl(response?.data?.url);
        setDescription(response?.data?.description);
        setName(response?.data?.name);
      } else {
      }
    } catch (error) {
      toast.error("Network Errro");
      console.error("Error fetching performance data:", error);
    }
  };
  function handlenext() {
    console.log("Handle Next Run!");
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    let nextpageis = Math.min(currentPage + 1, totalPages);
    console.log("Next Page is: ", nextpageis);
  }

  // function handlenext() {}

  useEffect(() => {
    fetchPerformanceData(currentPage);
  }, [currentPage]);

  return (
    <div style={{ marginTop: "100px" }}>
      <h3>user Detail</h3>
      {name != "" ? (
        <>
          <p className=" mb-1">
            <span className="">Name: </span> {name}
          </p>
          <p className=" mb-1">
            <span className="">Description: </span>
            {description}
          </p>
          <p className=" mb-1">
            <span className="">Plan Type: </span>
            {plantype}
          </p>
        </>
      ) : (
        ""
      )}

      <h3 className="text-center">
        Last {performanceData?.length} Days Progress
      </h3>
      <div className="last-7days-performance">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Step Covered</th>
              <th scope="col">
                {plantype === "loose-weight"
                  ? "Calories Burned"
                  : plantype === "gain-weight"
                  ? "Calories Gained"
                  : gainupto === 0
                  ? "Calories Burned"
                  : "Calories Gained"}
              </th>
              <th scope="col">Active Exercise</th>
            </tr>
          </thead>
          <tbody>
            {performanceData?.length > 0 &&
              performanceData.map((value, index) => (
                <tr key={index}>
                  <th scope="row">
                    {new Date(value.date).toISOString().split("T")[0]}
                  </th>
                  <td>{value.progress.stepcovered}</td>
                  <td>{value.progress.caloriesburned}</td>
                  <td>{value.progress.activeexercise} hour</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlenext()}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {/* {paymentproofurl == undefined ? (
        <h1>Payment Proof NotFound</h1>
      ) : (
        <h1>Payment Proof Found</h1>
      )} */}
      <h3>Payment Proof</h3>
      {paymentproofurl == "" ||
      paymentproofurl == null ||
      paymentproofurl == undefined ? (
        <h4 className=" text-decoration-underline">No Payment Proof Found</h4>
      ) : (
        <div className="text-center mb-1">
          <img
            src={`${paymentproofurl}`}
            className="rounded card"
            alt="..."
            style={{ height: "auto", width: "250px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UsersStats;
