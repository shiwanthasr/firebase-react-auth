import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function Signup() {
  const emailRef = useRef();
  const nameRef = useRef();
  const roleRef = useRef();
  const nicRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, roleRef.current.value, nameRef.current.value, nicRef.current.value);
      //redirect to login
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card bg="dark" text="white">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" ref={nameRef} required />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Role</Form.Label>
              <Form.Control as="select" ref = {roleRef}>
                <option value="admin">Admin</option>
                <option value="police">Police</option>
                <option value="insurance">Insurance</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="nic">
              <Form.Label>NIC</Form.Label>
              <Form.Control type="nic" ref={nicRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </CenteredContainer>
  );
}
