import React, { useState } from "react";
import { containerVariance } from "../../Data/variants";
import { motion } from "framer-motion";
import { Card, Container, Button } from "react-bootstrap";
import EmployeMasterTable from "./EmployeMasterTable";
import AddButton from "../../components/AddButton/AddButton";
import AddEmployee from "./AddEmployee";
import DeleteEmpMaster from "./DeleteEmpMaster";
const EmployeeMaster = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [radio, setRadio] = useState({});

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
            <h1>Employee Master</h1>
            <div
              className="d-flex align-items-center"
              style={{ gap: "0.5rem" }}>
              <AddButton setShowAddModal={setShowAddModal} />
              <DeleteEmpMaster radio={radio} />
            </div>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ borderRadius: "0" }}>
          <Card.Body className="d-flex  align-items-center">
            <i className="fa-solid fa-list my-auto"></i>
            <h5 className="my-auto ms-3">Employee List</h5>
          </Card.Body>
        </Card>
        <EmployeMasterTable setRadio={setRadio} />
      </Container>
      <AddEmployee show={showAddModal} onHide={() => setShowAddModal(false)} />
    </motion.div>
  );
};

export default EmployeeMaster;
