import React, {  } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const NavbarComponent = () => {
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Navbar bg="dark" expand="sm" variant="dark">
      <Navbar.Brand as={Link} to="/" className="font-weight-bold border p-2">
        <img
          alt=""
          src="/app-logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        DRUNK DETECTOR
      </Navbar.Brand>
      <Nav className="font-weight-bold">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/manage-users">
          Manage Users
        </Nav.Link>

        {localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "police_admin" ? (
          <Nav.Link as={Link} to="/police-reports">
            Police Reports
          </Nav.Link>
        ) : (
          ""
        )}

        {localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "insurance_admin" ? (
          <Nav.Link as={Link} to="/insurance-reports">
            Insurance Reports
          </Nav.Link>
        ) : (
          ""
        )}
      </Nav>

      <Nav className="ml-auto">
        <p className="text-center mb-2 mt-2 text-white">
          <Nav.Link as={Link} to="/user">
            Welcome, {localStorage.getItem("name")}{" "}
          </Nav.Link>
          <span className="text-success font-weight-bold">
            [ {localStorage.getItem("role")} ]
          </span>
        </p>
      </Nav>
      <Form inline>
        <Button variant="danger" onClick={handleLogout} className="ml-4">
          <img
            alt=""
            src="/logout.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Logout
        </Button>
      </Form>
    </Navbar>
  );
};

export default NavbarComponent;
