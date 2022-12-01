import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";

const AddBrandModal = (props) => {
  const { fetchAllMaster } = useContext(ToggleState);
  const [brand, setBrand] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("bname", brand);
      const data = await axios.post(
        "https://dstservices.in/api/brand_add.php",
        body
      );
      if (data?.data?.brandadd?.response_desc === "Data Saved Successfully") {
        props.onHide();
        fetchAllMaster("https://dstservices.in/api/brand_list.php");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand Name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBrandModal;
