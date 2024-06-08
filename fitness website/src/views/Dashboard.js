import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { FaWalking } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { IoBody } from "react-icons/io5";
import { GiAchievement } from "react-icons/gi";
import Form2 from "./Form.js";
import axios from "axios";
import { useAuth } from "../components/Context/Auth.js";
import DietPlans, { useDietPlans } from "../components/Context/Dietplans.js";
import { MdDelete } from "react-icons/md";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

function Dashboard() {
  let { auth } = useAuth();
  let [dietPlans] = useDietPlans();
  let [array, setArray] = useState([1, 2, 3, 4]);
  let [click, setClick] = useState(false);
  let [progress, setProgress] = useState();
  const [stepcovered, setStepCovered] = useState(0);
  const [caloriesburned, setCaloriesBurned] = useState(0);
  const [activeexercise, setActiveExercise] = useState(0);
  const [achievement, setAchievement] = useState(0);
  const [exercise, setExercise] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);
  const getProgress = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/api/getprogress`,
        { withCredentials: true }
      );
      if (data.success) {
        // let p = data.progress;
        // setProgress(data.progress);
        setStepCovered(data?.progress?.stepcovered);
        setCaloriesBurned(data?.progress?.caloriesburned);
        setActiveExercise(data?.progress?.activeexercise);
        setAchievement(data?.progress?.achievement);
        console.log("progress is:", data.progress);
      } else {
        toast.error("Something went wrong PLeasee reload");
      }
    } catch (error) {
      console.log("Error fetching progress:", error);
      toast.error("Server Side Problem !");
      // throw error; // Re-throw the error for further handling
    }
  };
  let [name, setName] = useState("");
  let [count, setCount] = useState(0);

  async function handlClick(name1, num) {
    setClick(true);
    setName(name1);
    setCount(num);
  }
  async function handleupdation(e) {
    try {
      e.preventDefault();
      // console.log(count, name);
      if (count < 0 || name == "") {
        toast.error("Please Write the Valid Input");
        return;
      }
      // setClick(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_server}/api/updateprogress`,
        {
          stats: {
            date: new Date(),
            progress: { [name]: count },
          },
        },
        { withCredentials: true }
      );
      if (data.success) {
        // let p = data.progress;
        if (name == "stepcovered") {
          setStepCovered(count);
        } else if (name == "caloriesburned") {
          setCaloriesBurned(count);
        } else if (name == "activeexercise") {
          setActiveExercise(count);
        } else if (name == "achievement") {
          setAchievement(count);
        }
        // setProgress((prev) => {
        //   return { ...progress, name: count };
        // });
        // console.log(data);
        toast.success("Performance Updated Successfully");
        setClick(false);
      } else {
        toast.error("Something went wrong PLeasee reload");
      }
    } catch (error) {
      console.log("Error fetching progress:", error);
      toast.error("Server Side Problem !");
      // throw error; // Re-throw the error for further handling
    }
  }
  async function getExerciseData(plan) {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getexercise`,
        { withCredentials: true }
      ); // Replace "http://your-api-url/exercise" with your actual API endpoint
      if (data.success) {
        setExercise(data.exercises);
        // console.log("exercise data is:", data.exercises);
      } else {
        console.log("data is:", data);
      }
      // const exerciseData = response.data;
      // return exerciseData;
    } catch (error) {
      console.log("Error fetching exercise data:", error);
      // throw error;
    }
  }
  async function getlastdaysprogress() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_server}/api/user-performance`,
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log("lastdays progress is:", response.data);
        setPerformanceData(response.data.userperformance);
      } else {
        // setError('Failed to fetch performance data');
      }
    } catch (err) {
      console.log(err);
      toast.error("Network Problem please Reload");
      // setError(err.message);
    }
  }
  useEffect(() => {
    // if (auth?.user) {
    // console.log("Condition run");
    // console.log("useEffect Run!");
    getProgress();
    getExerciseData();
    getlastdaysprogress();
    console.log("", dietPlans);
    // A}
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      {/* <i className="nc-icon nc-chart text-warning"></i> */}
                      <FaWalking />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category p-0 text-center">
                        Steps Covered
                      </p>
                      <Card.Title as="h4">{stepcovered}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div
                  className="stats btn"
                  style={{ cursor: "pointer" }}
                  // onClick={() => setClick(true)}
                  onClick={() => handlClick("stepcovered", stepcovered)}
                >
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      {/* <i className="nc-icon nc-light-3 text-success"></i> */}
                      <FaRunning />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category p-0 text-center">
                        {exercise?.plantype == "loose-weight"
                          ? "Calories Burned"
                          : exercise?.plantype == "gain-weight"
                          ? "Calories Gain"
                          : auth?.user?.gainupto == 0
                          ? "Calories Burned"
                          : "Calories Gain"}
                      </p>
                      <Card.Title as="h4">{caloriesburned}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div
                  className="stats btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlClick("caloriesburned", caloriesburned)}
                >
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      {/* <i className="nc-icon nc-vector text-danger"></i> */}
                      <IoBody />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category text-center p-0">
                        Active Exercisse
                      </p>
                      <Card.Title as="h4">{activeexercise} hour</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div
                  className="stats btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlClick("activeexercise", activeexercise)}
                >
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      {/* <i className="nc-icon nc-favourite-28 text-primary"></i> */}
                      <GiAchievement />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category p-0 text-center ">
                        Achievements
                      </p>
                      <Card.Title as="h4">{achievement}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div
                  className="stats btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlClick("achievement", achievement)}
                >
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <h2>Daily Performance Measure</h2>
        <Row>
          {/* <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col> */}
          {/* {array.map((value, index) => { */}
          {/* // return ( */}
          {/* graph 1 */}
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Steps Covered Statistics</Card.Title>
                <p className="card-category">Target 100%</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [
                        Math.round(
                          (stepcovered / exercise?.stepcovered) * 100
                        ) + "%",
                        Math.round(
                          100 - (stepcovered / exercise?.stepcovered) * 100
                        ) + "%",
                      ],
                      series: [
                        Math.round((stepcovered / exercise?.stepcovered) * 100),
                        Math.round(
                          100 - (stepcovered / exercise?.stepcovered) * 100
                        ) < 0
                          ? ""
                          : Math.round(
                              100 - (stepcovered / exercise?.stepcovered) * 100
                            ),
                      ],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Completed <i className="fas fa-circle text-danger"></i>
                  Not Completed
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
          {/* graph 2 */}
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Healthy Calories Burned</Card.Title>
                <p className="card-category">Target 100%</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [
                        Math.round(
                          (caloriesburned / exercise?.caloriesburned) * 100
                        ) + "%",
                        Math.round(
                          100 -
                            (caloriesburned / exercise?.caloriesburned) * 100
                        ) + "%",
                      ],
                      series: [
                        Math.round(
                          (caloriesburned / exercise?.caloriesburned) * 100
                        ),
                        Math.round(
                          100 -
                            (caloriesburned / exercise?.caloriesburned) * 100
                        ) < 0
                          ? ""
                          : Math.round(
                              100 -
                                (caloriesburned / exercise?.caloriesburned) *
                                  100
                            ),
                      ],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Completed <i className="fas fa-circle text-danger"></i>
                  Not Completed
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
          {/* graph 3 */}
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Healthy Active Exercise</Card.Title>
                <p className="card-category">Target 100%</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [
                        Math.round(
                          (activeexercise / exercise?.activeexercise) * 100
                        ) + "%",
                        Math.round(
                          100 -
                            (activeexercise / exercise?.activeexercise) * 100
                        ) + "%",
                      ],
                      series: [
                        Math.round(
                          (activeexercise / exercise?.activeexercise) * 100
                        ),
                        Math.round(
                          100 -
                            (activeexercise / exercise?.activeexercise) * 100
                        ) < 0
                          ? ""
                          : Math.round(
                              100 -
                                (activeexercise / exercise?.activeexercise) *
                                  100
                            ),
                      ],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Completed <i className="fas fa-circle text-danger"></i>
                  Not Completed
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
          {/* //   ); */}
          {/* // })} */}
        </Row>

        {/* list start */}
        <h3 className="text-center">Registered Diet Plans</h3>
        {dietPlans?.length > 0 && exercise != null
          ? dietPlans.map((value, index) => {
              return value?.name == exercise?.plantype ? (
                <Link
                  className="candidate-list-box card mt-4"
                  to={`/dietplan/${value.name}`}
                >
                  <div className="p-4 card-body">
                    <div className="align-items-center row">
                      <div className="col-auto">
                        <div className="candidate-list-images">
                          {/* <a href="#">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                      className="avatar-md img-thumbnail rounded-circle"
                    />
                  </a> */}
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="candidate-list-content mt-3 mt-lg-0">
                          <h5 className="fs-19 mb-0">
                            <a
                              className="primary-link fs-3"
                              style={{ fontWeight: "bold" }}
                              href="#"
                            >
                              {value.name}
                            </a>
                          </h5>
                          <p className="text-muted m-0 mb-2 fs-4 p-0">
                            {value.dietplan.morning.name}
                          </p>
                          <ul className="list-inline mb-0 text-muted">
                            <li className="list-inline-item">
                              <i className="mdi mdi-map-marker"></i>
                              {value.dietplan.morning.description
                                .split(" ")
                                .slice(0, 40)
                                .join(" ")}
                            </li>
                            {/* <li className="list-inline-item">
                      <i className="mdi mdi-wallet"></i> $650 / hours
                    </li> */}
                          </ul>
                        </div>
                      </div>
                      {/* <div className="col-lg-3">
                        <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                          <span className="badge bg-soft-secondary fs-14 mt-1">
                            Leader
                          </span>
                          <span className="badge bg-soft-secondary fs-14 mt-1">
                            Manager
                          </span>
                          <span className="badge bg-soft-secondary fs-14 mt-1">
                            Developer
                          </span>
                        </div>
                      </div> */}
                    </div>
                    <div className="favorite-icon">
                      {/* <button className="btn btn-danger border-1">
                        <MdDelete
                          className=" fs-3 "
                          onClick={() => deleteDietPlan(value.name)}
                        />
                      </button> */}
                    </div>
                  </div>
                </Link>
              ) : (
                ""
                // <div>No Diet Plan Found</div>
              );
            })
          : ""}
        {/* end list */}

        <h3 className="text-center">Last 7 Days Progress</h3>
        <div className="last-7days-performance">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">StepCovered</th>
                <th scope="col">
                  {exercise?.plantype == "loose-weight"
                    ? "Calories Burned"
                    : exercise?.plantype == "gain-weight"
                    ? "Calories Gain"
                    : auth?.user?.gainupto == 0
                    ? "Calories Burned"
                    : "Calories Gain"}
                </th>
                <th scope="col">Active Exercise</th>
              </tr>
            </thead>
            <tbody>
              {performanceData?.length > 0 &&
                performanceData.map((value, index) => {
                  return (
                    <tr>
                      <th scope="row">
                        {new Date(value.date).toISOString().split("T")[0]}
                      </th>
                      <td>{value.progress.stepcovered}</td>
                      <td>{value.progress.caloriesburned}</td>
                      <td>{value.progress.activeexercise} hour</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">2024 Performance</Card.Title>
                {/* <p className="card-category">All products including Taxes</p> */}
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                        [
                          412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636,
                          695,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Task Completed <i className="fas fa-circle text-danger"></i>
                  Task Pending
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            {/* <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488980961">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-537440761">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-577232198">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-773861645">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Create 4 Invisible User Experiences you Never Knew
                          About
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-422471719">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-829164576">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Read "Following makes Medium better"</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-160575228">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-922981635">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                disabled
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Unfollow 5 enemies from twitter</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-938342127">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-119603706">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card> */}
          </Col>
        </Row>
        {click ? (
          <Form2
            setClick={setClick}
            name={name}
            setCount={setCount}
            handleupdation={handleupdation}
          />
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

export default Dashboard;
