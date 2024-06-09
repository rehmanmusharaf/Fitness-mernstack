import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Changepasswordpage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(null);
  const history = useHistory();

  let count = 0;
  const [redirect, setRedirect] = useState(false);

  function usercheck() {
    if (activation_token && count === 0) {
      try {
        count = 1;
        axios
          .put(
            `${process.env.REACT_APP_server}/api/passwordchange`,
            { activation_token },
            { withCredentials: true }
          )
          .then((resp) => {
            console.log(resp);
            if (resp.data.success) {
              toast.success("Your Password Change Successfully");
              setError(true);
              setTimeout(() => {
                history.push("/");
              }, 1000);
            }
          })
          .catch((error) => {
            toast.error("Your Token Expire Try Again");
            setError(false);
            console.log("There is an Error", error);
          });
      } catch (error) {
        toast.error("Something Went Wrong!");
        setError(false);
      }
    }
  }

  useEffect(() => {
    if (activation_token) {
      usercheck();
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        // Redirecting to home page
        history.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, history]);

  return (
    <>
      {error !== null && (
        <div>
          {error ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "90vh" }}
            >
              <div className="text-center">
                <h1 className="mb-4">Your Account is Successfully Updated</h1>
                <p>Redirecting you to home page...</p>
              </div>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "90vh" }}
            >
              <div className="text-center">
                <h1 className="mb-4">Token Expired</h1>
                <p>Please Update Password Again</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Changepasswordpage;
