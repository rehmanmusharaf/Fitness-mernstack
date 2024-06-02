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
  },
  inner: {
    minWidth: "850px",
    margin: "auto",
    display: "flex",
  },
  form: {
    width: "100%",
    background: "rgb(22 20 62)",
    paddingTop: "63px",
    paddingLeft: "20px",
    paddingRight: "20px",
    margin: "0px auto",
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
    fontSize: "35px",
    textAlign: "center",
    marginBottom: "38px",
    color: "#f78582",
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
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_server}/api/create-user`,
        formData
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
      toast.error(error?.message);
      setLoading(false);
      console.error("There was an error registering the user!", error);
      // Handle error response
    }
  };

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.inner}>
          <form style={styles.form} className="" onSubmit={registeruser}>
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
                  Lose Weight
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
                  Gain Weight
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
                  Lose or Gain weight + proper Body Fitness
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
