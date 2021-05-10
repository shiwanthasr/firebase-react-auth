import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase";

const NavbarComponent = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const { currentUser, logout } = useAuth();
  var user = firebase.auth().currentUser;
  const firestore = firebase.firestore();

  useEffect(() => {
    if(user!=null)
    firestore
      .collection("users")
      .doc(user.uid) // change to the current user id
      .get()
      .then((user) => {
        if (user.exists) {
          // now you can do something with user
          //console.log(user.data())
          setUserData(user.data());
        }
      });
  }, [firestore, user != null ? user.uid : null]);

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
        <Nav.Link as={Link} to="mange/users">
          Manage Users
        </Nav.Link>
      </Nav>

      {/* <Nav className="ml-auto">
        {userData && (
          <p className="text-center mb-2 mt-2 text-danger">
            Welcome, {userData.name}{" "}
            <span className="text-success">[ {userData.role} ]</span>
          </p>
        )}
      </Nav> */}
      <Form inline className="ml-auto">
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
