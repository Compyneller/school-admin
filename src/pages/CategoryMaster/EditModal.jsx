import axios from "axios";
import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ToggleState } from "../../context/Toggle";
const EditModal = (props) => {
  const body = new FormData();
  const [cat, setCat] = useState("");
  const [sortno, setSortno] = useState("");
  const fetchCatList = useContext(ToggleState);
  const { fetchCategoryMaster } = fetchCatList;
  body.append("api", "sajdh23jd823m023uierur32");
  body.append("cat", cat);
  body.append("catid", props.data.catid);
  body.append("pcatid", props.data.pcatid);
  body.append("sortno", sortno);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await axios.post(
      "https://dstservices.in/api/categoryedit.php",
      body
    );
    console.log(data?.data?.catadd?.response_desc);
    if (data?.data?.catadd?.response_desc === "Updated Successfully") {
      fetchCategoryMaster();
      setCat("");
      setSortno("");
      props.onHide();
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.data.cat}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.data.cat}
              onChange={(e) => setCat(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Sort No</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.data.sortno}
              onChange={(e) => setSortno(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
