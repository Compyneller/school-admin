import axios from "axios";
import React, { useContext, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";

const UpdateBrandModal = (props) => {
  const { fetchAllMaster } = useContext(ToggleState);
  const [brand, setBrand] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("bid", props.detail.bid);
      body.append("bname", brand);
      await axios.post("https://dstservices.in/api/brand_edit.php", body);

      props.onHide();
      fetchAllMaster("https://dstservices.in/api/brand_list.php");
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

export default UpdateBrandModal;
