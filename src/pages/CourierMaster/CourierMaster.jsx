import React, { lazy, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import CourierTable from "./CourierTable";
import CourierDelete from "./CourierDelete";
const CourierAdd = lazy(() => import("./CourierAdd"));
const CourierMaster = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [radio, setRadio] = useState({});
  console.log(radio);
  return (
    <>
      <Container className="py-5">
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <h1>Courier Master</h1>
            <div
              className="d-flex align-items-center"
              style={{ gap: "0.5rem" }}>
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                <i className="fa-solid fa-plus"></i>
              </Button>
              <CourierDelete radio={radio} />
            </div>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ borderRadius: "0" }}>
          <Card.Body className="d-flex  align-items-center">
            <i className="fa-solid fa-list my-auto"></i>
            <h5 className="my-auto ms-3">Courier List</h5>
          </Card.Body>
        </Card>
        <CourierTable setRadio={setRadio} />
      </Container>
      <CourierAdd show={showAddModal} onHide={() => setShowAddModal(false)} />
    </>
  );
};

export default CourierMaster;
