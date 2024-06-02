import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
const UsersStats = () => {
  const { userId } = useParams();
  const [performanceData, setPerformanceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [plantype, setPlantype] = useState("");
  const [gainupto, setGainupto] = useState("");
  const fetchPerformanceData = async (page = 1) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_server}/admin/user-performance?page=${page}&id=${userId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log("data", response.data);
        const { userperformance, totalPages } = response.data;
        setPerformanceData(userperformance);
        setTotalPages(totalPages);
        setPlantype(response.data.plantype);
        setGainupto(response.data.gainupto);
      } else {
      }
    } catch (error) {
      toast.error("Network Errro");
      console.error("Error fetching performance data:", error);
    }
  };

  useEffect(() => {
    fetchPerformanceData(currentPage);
  }, [currentPage]);

  return (
    <div>
      <h3 className="text-center" style={{ marginTop: "100px" }}>
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersStats;
