import React, { useState } from "react";
import axios from "axios";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import Toastify from "toastify-js";
import { useContext } from "react";
import { ToggleState } from "../../context/Toggle";
const AddCoupon = (props) => {
  const { fetchAllMaster } = useContext(ToggleState);
  const [allInputs, setAllInputs] = useState({
    cname: "",
    cper: "",
    cmaxval: "",
    cfor: "",
    sdate: "",
    edate: "",
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
      body.append("cname", allInputs.cname);
      body.append("cper", allInputs.cper);
      body.append("cmaxval", allInputs.cmaxval);
      body.append("cfor", allInputs.cfor);
      body.append("sdate", allInputs.sdate);
      body.append("edate", allInputs.edate);
      const data = await axios.post(
        "https://dstservices.in/api/coupan_add.php",
        body
      );
      console.log(data);
      if (data?.data?.brandadd?.response_desc === "Data Saved Successfully") {
        fetchAllMaster("https://dstservices.in/api/coupan_list.php");
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
            Add Coupon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Coupon Name</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="number"
                    name="cname"
                    placeholder="Enter Name"
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="number"
                    name="cper"
                    placeholder="Enter Percentage"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Max Value</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="number"
                    name="cmaxval"
                    placeholder="Max Value"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Coupon For</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="number"
                    name="cfor"
                    placeholder="Coupon For"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="date"
                    name="sdate"
                    placeholder="Start Date"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="date"
                    name="edate"
                    placeholder="End Date"
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

export default AddCoupon;
