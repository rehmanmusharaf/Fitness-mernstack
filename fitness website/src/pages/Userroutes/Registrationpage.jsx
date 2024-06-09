import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Poppup from "../../components/Poppup";
// Inline styles converted from provided CSS
const styles = {
  wrapper: {
    minHeight: "70vh",
    display: "flex",
    background: "white",
    backgroundSize: "cover",
    marginTop: "85px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  },
  inner: {
    minWidth: "850px",
    margin: "auto",
    display: "flex",
  },
  form: {
    width: "100%",
    // backgroundImage:
    //   "url('https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=1456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    paddingTop: "63px",
    paddingLeft: "20px",
    paddingRight: "20px",
    margin: "0px auto",
    backgroundSize: "cover",
  },
  formWrapper: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  formPrice: {
    marginBottom: "19px",
  },
  formSelect: {
    marginBottom: "10px",
  },
  formHolder: {
    position: "relative",
  },
  formControl: {
    width: "67.08%",
    height: "25px",
    width: "80%",
    display: "block",
    fontSize: "13px",
    border: "none",
    borderBottom: "1px solid #6967a1",
    background: "none",
    color: "#fff",
    padding: "0",
    outline: "none",
  },
  selectFormControl: {
    width: "30px",
    border: "none",
    fontSize: "15px",
    cursor: "pointer",
    transform: "translateY(-1px)",
  },
  button: {
    height: "42px",
    width: "191px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    fontSize: "15px",
    color: "#fff",
    marginTop: "24px",
    transition: "all 0.5s ease",
    backgroundImage: `linear-gradient(to right, #cb6e7a 0%, #be6779 12%, #ae5e77 23%, #42236b 78%, #321a69 88%, #251368 100%)`,
  },
  imageHolder: {
    width: "50%",
    maxHeight: "550px",
  },
  h3: {
    fontSize: "44px",
    textAlign: "center",
    marginBottom: "38px",
    color: "white",
    fontFamily: '"Jacquard 12", system-ui',
    // systemUi,
  },
  inputcontainer: {},
  inputlabel: {
    width: "20%",
  },
  inputtag: {
    width: "80%",
  },
};

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    plantype: "",
    currentweight: "",
    height: "",
    dob: "",
    description: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };
    // reader.readAsDataURL(e.target.files[0]);
  };
  const [looseweight, setLooseweight] = useState(0);
  const [gainweight, setGainweight] = useState(0);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      gainupto: gainweight,
      looseupto: looseweight,
      file: avatar,
    }));
    console.log(looseweight, " ", gainweight);
  };

  const planchangehandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "looseweight") {
      setLooseweight(value);
      setGainweight(0);
    } else if (name === "gainweight") {
      setGainweight(value);
      setLooseweight(0);
    }
  };

  const registeruser = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.age < 0 ||
        formData.currentweight < 0 ||
        formData.dob > new Date() ||
        formData.phone < 0 ||
        formData.height < 0 ||
        gainweight < 0 ||
        looseweight < 0
      ) {
        toast.error("PLease Enter Valid Details!");
        return;
      }
      setLoading(true);
      setFormData((prev) => {
        return { ...prev, file: avatar };
      });
      // formData = { ...formData, /file: avatar };
      const response = await axios.post(
        `${process.env.REACT_APP_server}/api/create-user`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        toast.success("Check Your Email to Verify!");
        setLoading(false);
        console.log(response.data);
      } else {
        toast.error(response.data.message);
        setLoading(false);
        console.log(response.data);
      }
      // Handle success response
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
      console.error("There was an error registering the user!", error);
      // Handle error response
    }
  };

  return (
    <>
      <div style={styles.wrapper}>
        {/* <h1>Overlay Content</h1> */}
        {/* <button onClick={onClose}>Close</button> */}

        <div style={styles.inner}>
          <form
            style={styles.form}
            className=" position-relative"
            onSubmit={registeruser}
          >
            <div className="overlay position-absolute"></div>
            <div className=" position-relative" style={{ zIndex: "1001" }}>
              <h3 style={styles.h3}>Registration Form</h3>
              <div style={styles.formWrapper}>
                <label className="inputlabel" style={styles.inputlabel}>
                  Name
                </label>
                <input
                  className="inputtag"
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  style={styles.formControl}
                />
              </div>
              <div style={styles.formWrapper}>
                <label className="inputlabel" style={styles.inputlabel}>
                  Email
                </label>
                <input
                  className="inputtag"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={styles.formControl}
                />
              </div>
              <div style={styles.formWrapper}>
                <label className="inputlabel" style={styles.inputlabel}>
                  Phone
                </label>
                <input
                  className="inputtag"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={styles.formControl}
                />
              </div>
              <div style={styles.formWrapper}>
                <label className="inputlabel" style={styles.inputlabel}>
                  Password
                </label>
                <input
                  className="inputtag"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  style={styles.formControl}
                />
              </div>
              <label htmlFor="" className=" text-white ">
                Choose Plan
              </label>
              <div className="d-flex flex-wrap justify-content-around ">
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="plantype"
                    id="loseWeight"
                    value="lose-weight"
                    onClick={() => setPlan(1)}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    className="form-check-label text-white"
                    htmlFor="loseWeight"
                  >
                    Lose Weight -$18
                  </label>
                </div>
                <div className="form-check ms-1 ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="plantype"
                    id="gainWeight"
                    value="gain-weight"
                    onClick={() => setPlan(2)}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    className="form-check-label text-white"
                    htmlFor="gainWeight"
                  >
                    Gain Weight -$25
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="plantype"
                    id="both"
                    value="fitness"
                    onClick={() => setPlan(3)}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-check-label text-white" htmlFor="both">
                    proper Body Fitness -$48
                  </label>
                </div>
              </div>
              <div style={styles.formWrapper}>
                <label className="inputlabel" style={styles.inputlabel}>
                  Weight in kg
                </label>
                <input
                  className="inputtag"
                  type="number"
                  name="currentweight"
                  value={formData.currentweight}
                  onChange={handleInputChange}
                  required
                  style={styles.formControl}
                />
              </div>

              <div style={styles.formWrapper}>
                <label className="inputlabel" style={styles.inputlabel}>
                  Height in Feet
                </label>
                <input
                  className="inputtag"
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                  style={styles.formControl}
                />
              </div>
              {plan === 3 ? (
                <>
                  <h4 className=" text-white ">
                    Please Type in one of the Input of reduce or gain weight!
                  </h4>
                  <div style={styles.formWrapper}>
                    <label className="inputlabel" style={styles.inputlabel}>
                      Reduce up to
                    </label>
                    <input
                      className="inputtag"
                      type="number"
                      style={styles.formControl}
                      value={looseweight}
                      name="looseweight"
                      onChange={planchangehandler}
                      required
                    />
                  </div>
                  <div style={styles.formWrapper}>
                    <label className="inputlabel" style={styles.inputlabel}>
                      Gain up to
                    </label>
                    <input
                      className="inputtag"
                      type="number"
                      style={styles.formControl}
                      value={gainweight}
                      name="gainweight"
                      onChange={planchangehandler}
                      required
                    />
                  </div>
                </>
              ) : plan === 1 ? (
                <div style={styles.formWrapper}>
                  <label className="inputlabel" style={styles.inputlabel}>
                    Reduce up to
                  </label>
                  <input
                    className="inputtag"
                    type="number"
                    style={styles.formControl}
                    name="looseweight"
                    value={looseweight}
                    onChange={planchangehandler}
                    required
                  />
                </div>
              ) : plan === 2 ? (
                <div style={styles.formWrapper}>
                  <label className="inputlabel" style={styles.inputlabel}>
                    Gain up to
                  </label>
                  <input
                    className="inputtag"
                    type="number"
                    style={styles.formControl}
                    value={gainweight}
                    name="gainweight"
                    onChange={planchangehandler}
                    required
                  />
                </div>
              ) : null}

              <div style={styles.formWrapper}>
                <label className="inputlabel" style={styles.inputlabel}>
                  DOB:
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="inputtag text-white "
                  style={styles.formControl}
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  class="bi bi-calendar-date"
                  viewBox="0 0 16 16"
                  style={{
                    position: "relative",
                    left: "-3%",
                    top: "-15px",
                    zIndex: "-1",
                  }}
                >
                  <path d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
              </div>
              <div style={styles.formWrapper}>
                <label className="inputlabel" style={styles.inputlabel}>
                  Description
                </label>
                <textarea
                  style={{ ...styles.formControl, height: "69px" }}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              {/* <div style={styles.formWrapper}> */}
              <span>Acount Detail : </span>
              <p className="text-white mb-0">
                <b>Hbl</b> <br />
                Acount Title: Umer Nazir
              </p>
              <p className=" text-white mb-0"> Acount Number: 50517992131103</p>
              <br />
              <label
                className="inputlabel w-100 text-white"
                style={styles.inputlabel}
              >
                Please Upload Picture Of Your Payment Transaction
              </label>
              <input
                style={{ ...styles.formControl, height: "69px" }}
                name="description"
                type="file"
                className=" border-0 mb-0"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInputChange}
                required
              />
              {/* </div> */}

              {loading ? (
                <button style={styles.button} className=" mb-2 ">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </button>
              ) : (
                <button style={styles.button} className=" mb-2 ">
                  Submit
                </button>
              )}
            </div>
          </form>
          <div style={styles.imageHolder} className=" d-none ">
            <img
              src="https://png.pngtree.com/thumb_back/fh260/background/20240119/pngtree-man-exercise-with-dumbbell-gym-bodybuilder-fitness-related-design-image_15612541.jpg"
              alt="Registration Form"
              className=" h-100 w-100 "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
