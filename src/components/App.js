import Dashboard from "./Dashboard";
import Login from "./Login";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import CreateUser from "./CreateUser";
import Nav from "./Nav";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />

            <>
              <Nav />
              <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "90vh" }}
              >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute
                    path="/update-profile"
                    component={UpdateProfile}
                  />
                  <PrivateRoute path="/create-user" component={CreateUser} />
                </div>
              </Container>
            </>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
