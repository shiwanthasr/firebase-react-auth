import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

function CreatePoliceUser() {
  const emailRef = useRef();
  const nameRef = useRef();
  const roleRef = useRef();
  const policeBranchRef = useRef();
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
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        roleRef.current.value,
        nameRef.current.value,
        nicRef.current.value,
        policeBranchRef.current.value
      );

      return setMessage("User Created Successfully!");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card bg="dark" text="white">
        <Card.Body>
          <h2 className="text-center mb-4">Create User - Police</h2>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          {message && (
            <Alert variant="success" onClose={() => setMessage("")} dismissible>
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit} id="user-creation-form">
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
              <Form.Control as="select" ref={roleRef}>
                <option value="police">Police</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Select Police Branch</Form.Label>
              <Form.Control as="select" ref={policeBranchRef}>
                <option value="colombo">Colombo</option>
                <option value="kandy">Kandy</option>
                <option value="galle">Galle</option>
                <option value="badulla">Badulla</option>
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
        <Card.Footer>
          <Link to="/user" className="btn btn-danger w-100 text-center mt-2">
            Cancel
          </Link>
        </Card.Footer>
      </Card>
    </CenteredContainer>
  );
}

export default CreatePoliceUser;
