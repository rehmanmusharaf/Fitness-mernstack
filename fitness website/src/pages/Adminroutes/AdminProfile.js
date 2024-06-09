import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/Context/Auth";
import img2 from "../../assets/img/photo-1431578500526-4d9613015464.jpeg";
// import img2 from "../assets/";
import { FaUser } from "react-icons/fa";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Loader from "../../pages/Loader";
import { toast } from "react-toastify";
import axios from "axios";
function User() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [dob, setDob] = useState();
  const [currentWeight, setCurrentWeight] = useState(null);
  const [description, setDescription] = useState(null);
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [gainUpto, setGainUpto] = useState(null);
  const [looseupto, setLooseupto] = useState(null);
  const [height, setHeight] = useState(null);
  const [phone, setPhone] = useState(null);
  const [planType, setPlanType] = useState(null);
  let [age, setAge] = useState(null);
  const updateUserProfile = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_server}/updateprofile`,
        {
          full_name: fullName,
          currentweight: currentWeight,
          email: email,
          phone: phone,
          dob: dob,
          description: description,
          gainupto: gainUpto,
          looseupto: looseupto,
          height: height,
        },
        { withCredentials: true }
      );
      if (data.success) {
        console.log("data is", data);
        toast.success("Profile Updated Successfully");
        setAuth({ user: data.user });
      } else {
        console.log("data is", data);
        toast.error("Something Went Wrrong!");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
      setLoading(false);
    }
  };
  function calculateAge(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Check if the birthdate has not occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    setAge(age);
    // return age;
  }
  const handleDobChange = (event) => {
    console.log("dob change run");
    let datee = new Date(event.target.value);
    setDob(datee);
    console.log(event.target.value);
  };
  useEffect(() => {
    // console.log("Auth is: ", auth);

    if (auth?.user) {
      console.log("auth", auth);
      setCurrentWeight(auth?.user?.currentweight);
      setDescription(auth?.user?.description);
      setEmail(auth?.user?.email);
      setFullName(auth?.user?.full_name);
      setGainUpto(auth?.user?.gainupto);
      setLooseupto(auth?.user?.looseupto);
      setHeight(auth?.user?.height);
      setPhone(auth?.user?.phone);
      setPlanType(auth?.user?.plantype);

      let d = new Date(auth.user.dob);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      d = [year, month, day].join("-");
      setDob(d);
      calculateAge(auth.user.dob);
      console.log("date is:", d);
    }
  }, [auth?.user]);
  return (
    <>
      {auth?.user ? (
        <Container fluid>
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Edit Profile</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>Email</label>
                          <Form.Control
                            defaultValue={email}
                            disabled
                            value={email}
                            placeholder="Email"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label>Name</label>
                          <Form.Control
                            defaultValue={fullName}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Username"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">Phone</label>
                          <Form.Control
                            defaultValue={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={phone}
                            value={phone}
                            type="number"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>PLane</label>
                          <Form.Control
                            defaultValue={planType}
                            value={planType}
                            placeholder="Company"
                            type="text"
                            disabled={true}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Current Weight</label>
                          <Form.Control
                            defaultValue={currentWeight + "kg"}
                            placeholder="Weight"
                            onChange={(e) => setCurrentWeight(e.target.value)}
                            value={currentWeight}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="4">
                        {auth?.user?.plantype == "gain-weight" ? (
                          <Form.Group>
                            <label>Gain Upto</label>
                            <Form.Control
                              defaultValue={gainUpto}
                              onChange={(e) => setGainUpto(e.target.value)}
                              placeholder="64kg"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        ) : auth?.user?.plantype == "loose-weight" ? (
                          <Form.Group>
                            <label>Reduce Upto</label>
                            <Form.Control
                              defaultValue={looseupto}
                              onChange={(e) => setLooseupto(e.target.value)}
                              placeholder="64kg"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        ) : (
                          ""
                        )}
                        {/* <Form.Group>
                        <label>
                          {auth?.user?.plantype == "gain-weight"
                            ? "Gain Upto"
                            : "Reduce Upto"}
                        </label>
                        <Form.Control
                          defaultValue={
                            auth?.user?.plantype == "gain-weight"
                              ? auth?.user?.gainupto
                              : auth?.user?.loseupto
                          }
                          placeholder="64kg"
                          type="text"
                        ></Form.Control>
                      </Form.Group> */}
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label>Date Of Birth</label>
                          <Form.Control
                            defaultValue={dob}
                            placeholder={dob}
                            type="date"
                            onChange={(e) => handleDobChange(e)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Description</label>
                          <Form.Control
                            cols="80"
                            defaultValue={description}
                            placeholder={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            as="textarea"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    {loading ? (
                      <Button
                        className="btn-fill pull-right"
                        // type="submit"
                        variant="info"
                      >
                        <div class="spinner-border text-center" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </Button>
                    ) : (
                      <Button
                        className="btn-fill pull-right"
                        // type="submit"
                        variant="info"
                        onClick={(e) => updateUserProfile(e)}
                      >
                        Update Profile
                      </Button>
                    )}
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="card-image">
                  <img alt="..." src={img2}></img>
                </div>
                <Card.Body>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <FaUser className="avatar border-gray bg-white text-black " />
                      {/* <img
                      alt="..."
                      className="avatar border-gray"
                      src={face3}
                    ></img> */}
                      <h5 className="title">{auth?.user?.full_name}</h5>
                    </a>
                    <p className="description">{auth?.user?.description}</p>
                    <p className="description">age : {age}</p>
                  </div>
                  {/* <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p> */}
                </Card.Body>
                <hr></hr>
                <div className="button-container mr-auto ml-auto">
                  <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </Button>
                  <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-twitter"></i>
                  </Button>
                  <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-google-plus-square"></i>
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default User;
