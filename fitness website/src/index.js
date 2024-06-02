import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminLayout from "./layouts/Admin.js";
import Auth from "./components/Context/Auth.js";
import DietPlans from "./components/Context/Dietplans.js";
ReactDOM.render(
  <>
    <DietPlans>
      <Auth>
        <App />
      </Auth>
    </DietPlans>
  </>,
  document.getElementById("root")
);
