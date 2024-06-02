import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import Loader from "../../pages/Loader";
import { useAuth } from "../../components/Context/Auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { toast } from "react-toastify";

const UserProtectedRoute = ({ component: Component, ...rest }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  //   const [auth] = useAuth();
  const history = useHistory();

  useEffect(() => {
    const usercheck = async () => {
      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_server}/getuser`,
          { withCredentials: true }
        );
        if (resp.data.success) {
          setOk(true);
        } else {
          history.push("/login");
          // toast.error("Please Login to Continue");
        }
      } catch (error) {
        console.log(error);
        // window.location.reload();
        // window.location.href = "/";
        // setTimeout(() => {
        // }, 2000);
        // toast.error("Something Went Wrong");
      } finally {
        setLoading(false);
      }
    };
    usercheck();
  }, [history]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default UserProtectedRoute;
