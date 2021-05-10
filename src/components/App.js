import Signup from "./authentication/Signup";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import CreateUser from "./authentication/CreateUser";
import CreatePoliceUser from "./authentication/CreatePoliceUser";
import CreateInsuranceUser from "./authentication/CreateInsuranceUser";
import Dashboard from "./main/Dashboard";
import Navbar from "./parts/Navbar";
import ManageUsers from "./authentication/manageUsers";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Auth */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />

          <>
            <Navbar />
            {/* Main */}
            <PrivateRoute exact path="/" component={Dashboard} />

            {/* Profile */}
            <PrivateRoute path="/user" component={Profile} />
            <PrivateRoute path="/mange/users" component={ManageUsers} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/create-user" component={CreateUser} />
            <PrivateRoute path="/create-police-user" component={CreatePoliceUser} />
            <PrivateRoute path="/create-insurance-user" component={CreateInsuranceUser} />
          </>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
