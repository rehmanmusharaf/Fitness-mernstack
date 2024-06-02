import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
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
    email: "",
    password: "",
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registeruser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_server}/api/login`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Login Successfully!");
        setLoading(false);
        // history.push("/");
        window.location.href = "/";

        // console.log(response.data);
      } else {
        toast.error("Invalid Credentials");
        setLoading(false);
        // console.log(response.data);
      }
      // Handle success response
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      setLoading(false);
      //   console.error("There was an error registering the user!", error);
      // Handle error response
    }
  };

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.inner}>
          <form style={styles.form} className="" onSubmit={registeruser}>
            <h3 style={styles.h3}>Login Form</h3>

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

            {loading ? (
              <button style={styles.button} className=" mb-2 ">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </button>
            ) : (
              <button style={styles.button} className=" mb-2 ">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
