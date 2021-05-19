import React, { useState } from "react";
import { Card, Alert, Row, Col, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function Profile() {

  const [error, setError] = useState("");

  return (

    <CenteredContainer>
      <Card bg="dark" text="white">
        <Card.Body>
          <Row>
            <Col className="text-center">
              <Image
                src={`/img/${localStorage.getItem("role")}.png`}
                alt="profile-image"
                height={200}
                width={200}
                thumbnail
                fluid
              />
            </Col>
          </Row>
          {localStorage && (
            <h2 className="text-center mb-2 mt-2">Welcome, {localStorage.getItem("name")}</h2>
          )}
          {localStorage && (
            <h4 className="text-center mb-4">[ {localStorage.getItem("role")} ]</h4>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          <ListGroup>
            <ListGroup.Item variant="primary">
              <strong>Email : </strong> {localStorage.getItem("email")}
            </ListGroup.Item>
            <ListGroup.Item variant="primary">
              <strong>Name : </strong> {localStorage.getItem("name")}
            </ListGroup.Item>
          </ListGroup>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-4">
            Update Profile
          </Link>
          {localStorage.getItem("role") === "admin" && (
            <Link to="/create-user" className="btn btn-success w-100 mt-4">
              Create User
            </Link>
          )}
          {localStorage.getItem("role") === "police_admin" && (
            <Link
              to="/create-police-user"
              className="btn btn-warning w-100 mt-4"
            >
              Create Police User
            </Link>
          )}
          {localStorage.getItem("role") === "insurance_admin" && (
            <Link
              to="/create-insurance-user"
              className="btn btn-info w-100 mt-4"
            >
              Create Insurance User
            </Link>
          )}
        </Card.Body>
        {/* <Card.Footer className="text-muted">
          <Link
            onClick={handleLogout}
            className="btn btn-danger w-100 text-center mt-2"
          >
            Logout
          </Link>
        </Card.Footer> */}
      </Card>
    </CenteredContainer>
  );
}
