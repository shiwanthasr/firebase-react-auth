import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const NavbarComponent = () => {

  const history = useHistory();
  const { logout } = useAuth();

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
      <Navbar.Brand as={Link} to="/">
        <img
          alt=""
          src="/app-logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        DRUNK DETECTOR
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
      </Nav>

      <Form inline className="ml-auto" >
        <Button variant="danger" onClick={handleLogout}>
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
