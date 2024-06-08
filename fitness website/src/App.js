import React from "react";
import "./style.css";
import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Trainers from "./pages/Trainers";
import Features from "./pages/Features";
import Plans from "./pages/Plans";
import FAQs from "./pages/FAQs";
import Footer from "./components/Footer";
import Registrationpage from "./pages/Userroutes/Registrationpage";
import Admin from "./layouts/Admin";
import AdminPage from "./pages/Adminroutes/AdminPage";
import UserProtectedRoute from "./components/Routes/UserProtectedRoute.jsx";
import AdminProtectedRoute from "./components/Routes/AdminProtectedRoute.jsx";
import Activationpage from "./components/pages/ActivationPage.jsx";
import Login from "./pages/Login.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dietpage from "./pages/Dietpage.jsx";
import UsersStats from "./pages/UsersStats.js";
import Testing from "./components/Testing.js";
export default function App() {
  return (
    <div>
      <Router>
        <ScrollTop />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Plans" exact component={Plans} />
          <Route path="/Features" exact component={Features} />
          <Route path="/FAQs" exact component={FAQs} />
          <Route path="/Trainers" exact component={Trainers} />
          <Route path="/userregistration" exact component={Registrationpage} />
          <Route path="/login" exact component={Login} />
          <Route path="/dietplan/:plantype" exact component={Dietpage} />
          <Route path="/testing" exact component={Testing} />
          <Route
            path="/activation/:activation_token"
            exact
            component={Activationpage}
          />
          {/* <Route
            path="/admindashboard"
            exact
            element={
              <UserProtectedRoute>
                <AdminPage />
              </UserProtectedRoute>
            }
          /> */}
          <AdminProtectedRoute path="/admindashboard" component={AdminPage} />
          <AdminProtectedRoute
            path="/userstats/:userId"
            component={UsersStats}
          />
          <UserProtectedRoute path="/user/dashboard" exact component={Admin} />
          <UserProtectedRoute path="/user/user" exact component={Admin} />
          <UserProtectedRoute
            path="/user/notifications"
            exact
            component={Admin}
          />
          {/* <Switch>
            <Route path="/user" render={(props) => <Admin {...props} />} />
            <Redirect from="/" to="/user/dashboard" />
          </Switch> */}
        </Switch>
        <Footer />
        <ToastContainer />
      </Router>
    </div>
  );
}

/**
 <Router>
        <Navbar/>
        
        <Switch>
            <Route path="/" exact component= {Home} />
            <Route path="/Plans" exact component= {Plans} />
            <Route path="/Features" exact component= {Features} />
            <Route path="/Trainers" exact component= {Trainers} />
            <Route path="/FAQs" exact component= {FAQs} />
        </Switch>

      </Router> 
 
 */
