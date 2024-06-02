import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import Loader from "../../pages/Loader";
import { useAuth } from "../../components/Context/Auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// import { toast } from "react-toastify";

const AdminProtectedRoute = ({ component: Component, ...rest }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  // const [auth] = useAuth();

  useEffect(() => {
    const usercheck = async () => {
      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_server}/getuser`,
          { withCredentials: true }
        );
        // console.log("response for admin is:", resp);
        if (resp.data.success && resp.data.user.role === "admin") {
          setOk(true);
        } else {
          setOk(false);
          history.push("/login");
        }
      } catch (error) {
        console.log("error is:", error);
        history.push("/login");

        // window.location.reload();
        // window.location.href = "/";
        // toast.error("Something Went Wrong");
      } finally {
        setLoading(false);
      }
    };
    usercheck();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? <Component {...props} /> : <Redirect to="/admin-login" />
      }
    />
  );
};

export default AdminProtectedRoute;
