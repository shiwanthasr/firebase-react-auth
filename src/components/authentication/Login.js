import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Row, Col, Image } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import firebase from "firebase";




export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const firestore = firebase.firestore();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      let response = await login(emailRef.current.value, passwordRef.current.value);
      if(response){

        firestore
        .collection("users")
        .doc(response.user.uid) // change to the current user id
        .get()
        .then((user) => {
          if (user.exists) {
            localStorage.setItem("role", user.data()['role']);
            localStorage.setItem("email", user.data()['email']);
            localStorage.setItem("name", user.data()['name']);
            localStorage.setItem("nic", user.data()['nic']);
          }
        }).then((e)=>{
          history.push("/");
        });

      }
    } catch {
      setError("Failed to sign in!");
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
          <Card bg="dark" text="white">
            <Card.Body>
            <h2 className="text-center mb-4 font-weight-bold">DRUNK DETECTOR</h2>
            <Row>
            <Col className="text-center">
              <Image
                src="/app-logo.png"
                alt="profile-image"
                height={200}
                width={200}
                thumbnail
                fluid
              />
            </Col>
          </Row>
              <h2 className="text-center mb-4 mt-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Login
                </Button>
              </Form>
              <div className="w-100 text-center mt-4">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          {/* <div className="w-100 text-center mt-4">
                Need an Account? <Link to="/signup">Signup</Link>
            </div> */}
    </CenteredContainer>
  );
}
