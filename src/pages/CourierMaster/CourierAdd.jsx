import React, { useState } from "react";
import axios from "axios";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import Toastify from "toastify-js";
import { useContext } from "react";
import { ToggleState } from "../../context/Toggle";
const CourierAdd = (props) => {
  const { fetchAllMaster } = useContext(ToggleState);
  const [allInputs, setAllInputs] = useState({
    pamt: "",
    camt: "",
    distance: "",
    relation: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAllInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("pamt", allInputs.pamt);
      body.append("camt", allInputs.camt);
      body.append("distance", allInputs.distance);
      body.append("relation", allInputs.relation);
      const data = await axios.post(
        "https://dstservices.in/api/courier_add.php",
        body
      );
      if (data?.data?.brandadd?.response_desc === "Data Saved Successfully") {
        fetchAllMaster("https://dstservices.in/api/courier_list.php");
        props.onHide();
        Toastify({
          text: data?.data?.brandadd?.response_desc,

          duration: 5000,
          position: "center",
        }).showToast();
      } else {
        props.onHide();

        Toastify({
          text: data?.data?.brandadd?.response_desc,

          duration: 5000,
          position: "center",
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: error,

        duration: 5000,
        position: "center",
      }).showToast();
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Courier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Packaging Amount</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="tel"
                    name="pamt"
                    placeholder="Enter Packaging Amount"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Courier Amount</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="tel"
                    name="camt"
                    placeholder="Enter Courier Amount"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Distance</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="tel"
                    name="distance"
                    placeholder="Enter Distance"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Relation</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="tel"
                    name="relation"
                    placeholder="Enter Relation"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" className="mt-3" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourierAdd;
