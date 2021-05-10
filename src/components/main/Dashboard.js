import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <Container fluid>
        <Row />
        <Row>
          <Col className="text-center">
            <Image
              src="/dashboard-img.png"
              alt="dashboard-image"
              width='1000'
              height='800'
              fluid
              rounded 
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
