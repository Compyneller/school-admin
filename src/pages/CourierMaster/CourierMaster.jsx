import React, { useState } from "react";
import { containerVariance } from "../../Data/variants";
import { motion } from "framer-motion";
import { Card, Container, Button } from "react-bootstrap";
import CourierTable from "./CourierTable";
import CourierAdd from "./CourierAdd";
import CourierDelete from "./CourierDelete";
const CourierMaster = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [radio, setRadio] = useState({});
  console.log(radio);
  return (
    <motion.div
      variants={containerVariance}
      initial="ini"
      animate="ani"
      className="w-100 "
      exit="exi">
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
    </motion.div>
  );
};

export default CourierMaster;
