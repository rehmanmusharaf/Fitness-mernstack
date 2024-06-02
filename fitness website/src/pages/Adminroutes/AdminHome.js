import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { Card, Col } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import "./AdminHome.css";
// import AdminForm from "./AdminForm.js";
import UserList from "./UserList";
import Index from "./Form/Index";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AdminHome = () => {
  let index = 0;
  let [dietplans, setDietplans] = useState([]);
  let [activeuser, setActiveusers] = useState([]);
  let [nonactiveuser, setNonActiveusers] = useState([]);
  let [userscount, setUserscount] = useState({
    activeusers: 0,
    nonactiveusers: 0,
  });
  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getallusers?page=${index}`,
        { withCredentials: true }
      );
      if (data.success) {
        let activeusers = data.activeUsers;
        let inactiveusers = data.inactiveUsers;
        setActiveusers([...activeusers]);
        setNonActiveusers([...inactiveusers]);
        setUserscount({
          activeusers: data.totalActiveUsers,
          nonactiveusers: data.totalInactiveUsers,
        });
        index++;
      } else {
        console.log("No Users Exist!");
      }
    } catch (error) {
      console.log("Error fetching users:", error);
      // throw error; // Re-throw the error for further handling
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const deleteDietPlan = async (name) => {
    try {
      // Send a DELETE request to the API endpoint with the name of the diet plan
      // console.log(name);
      const response = await axios.delete(
        `${process.env.REACT_APP_server}/api/deletediet/${name}`,
        { withCredentials: true }
      );
      // Check if the request was successful
      if (response.data.success) {
        toast.success("Diet Plan Deleted Successfully");
        getDietPlans();
        // console.log("Diet Plan Deleted Successfully");
        // Optionally, you can perform any additional actions after successful deletion
      } else {
        toast.error("Something went Wrong!");
        console.log(response.data);
        // console.error("Failed to delete diet plan:", response.data.message);
        // Handle the case where the deletion was not successful
      }
    } catch (error) {
      toast.error("Something went Wrong!");
      console.log(error);
    }
  };
  async function getDietPlans() {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/api/dietplans`,
        { withCredentials: true }
      );
      if (data.success) {
        let array = data.dietplans;
        setDietplans([...array]);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDietPlans();
  }, []);
  return (
    <>
      <div className=" d-flex justify-content-around flex-wrap ">
        <Col md="5">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Number Of user Registered</Card.Title>
              <p className="card-category"></p>
            </Card.Header>
            <Card.Body>
              <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                <ChartistGraph
                  data={{
                    labels: [
                      `${
                        userscount.activeusers + userscount.nonactiveusers
                      } Registered User`,
                    ],
                    series: [100],
                  }}
                  type="Pie"
                />
              </div>
              {/* <div className="legend">
              <i className="fas fa-circle text-info"></i>
              Completed <i className="fas fa-circle text-danger"></i>
              Not Completed
              {/* <i className="fas fa-circle text-warning"></i>
                      Unsubscribe */}
              {/* </div> */}
              <hr></hr>
              <div className="stats">
                <i className="far fa-clock"></i>
                Today Performance
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md="5">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Active Users</Card.Title>
              {/* <p className="card-category">Target 100%</p> */}
            </Card.Header>
            <Card.Body>
              <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                <ChartistGraph
                  data={{
                    labels: [
                      (userscount.activeusers /
                        (userscount.activeusers + userscount.nonactiveusers)) *
                        100 +
                        "%",
                      (userscount.nonactiveusers /
                        (userscount.activeusers + userscount.nonactiveusers)) *
                        100 +
                        "%",
                    ],
                    series: [
                      (userscount.activeusers / userscount.activeusers +
                        userscount.nonactiveusers) *
                        100,
                      (userscount.nonactiveusers / userscount.activeusers +
                        userscount.nonactiveusers) *
                        100,
                    ],
                  }}
                  type="Pie"
                />
              </div>
              <div className="legend">
                <i className="fas fa-circle text-info"></i>
                Active <i className="fas fa-circle text-danger"></i>
                Not Active
                {/* <i className="fas fa-circle text-warning"></i>
                      Unsubscribe */}
              </div>
              <hr></hr>
              <div className="stats">
                <i className="far fa-clock"></i>
                Today Performance
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
      <div>
        <Index />
        <h3 className="text-center">Registered Diet Plans</h3>
        {dietplans?.length > 0
          ? dietplans.map((value, index) => {
              return (
                <Link
                  class="candidate-list-box card mt-4"
                  to={`/dietplan/${value.name}`}
                >
                  <div class="p-4 card-body">
                    <div class="align-items-center row">
                      <div class="col-auto">
                        <div class="candidate-list-images">
                          {/* <a href="#">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                      class="avatar-md img-thumbnail rounded-circle"
                    />
                  </a> */}
                        </div>
                      </div>
                      <div class="col-lg-10">
                        <div class="candidate-list-content mt-3 mt-lg-0">
                          <h5 class="fs-19 mb-0">
                            <a class="primary-link" href="#">
                              {value.name}
                            </a>
                          </h5>
                          <p class="text-muted mb-2">
                            {value.dietplan.morning.name}
                          </p>
                          <ul class="list-inline mb-0 text-muted">
                            <li class="list-inline-item">
                              <i class="mdi mdi-map-marker"></i>
                              {value.dietplan.morning.description
                                .split(" ")
                                .slice(0, 40)
                                .join(" ")}
                            </li>
                            {/* <li class="list-inline-item">
                      <i class="mdi mdi-wallet"></i> $650 / hours
                    </li> */}
                          </ul>
                        </div>
                      </div>
                      {/* <div class="col-lg-3">
                        <div class="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                          <span class="badge bg-soft-secondary fs-14 mt-1">
                            Leader
                          </span>
                          <span class="badge bg-soft-secondary fs-14 mt-1">
                            Manager
                          </span>
                          <span class="badge bg-soft-secondary fs-14 mt-1">
                            Developer
                          </span>
                        </div>
                      </div> */}
                    </div>
                    <div class="favorite-icon">
                      <button className="btn btn-danger border-1">
                        <MdDelete
                          className=" fs-3 "
                          onClick={() => deleteDietPlan(value.name)}
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })
          : ""}
        <h3 className="text-center">Registered Users</h3>
        <div className=" d-flex flex-wrap">
          {userscount.activeusers > 0 ? (
            <div
              className=" border-1"
              style={{
                minWidth: "50%",
                maxWidth: "100%",
                minHeight: "40vh",
                height: "auto",
                borderRight: "1px solid",
              }}
            >
              <h4 className="text-center">
                Active Users- {userscount.activeusers}
              </h4>
              <UserList activate={true} Users={activeuser} />
            </div>
          ) : (
            ""
          )}
          {userscount.nonactiveusers > 0 ? (
            <div
              className=""
              style={{
                minWidth: "50%",
                maxWidth: "100%",
                minHeight: "40vh",
                height: "auto",
                borderLeft: "1px solid",
              }}
            >
              <h4 className="text-center">
                Non Active Users- {userscount.nonactiveusers}
              </h4>
              <UserList activate={false} Users={nonactiveuser} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
