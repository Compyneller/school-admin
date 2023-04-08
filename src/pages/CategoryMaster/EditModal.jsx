import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
const EditModal = (props) => {
  const [cat, setCat] = useState("");
  const [sortno, setSortno] = useState("");
  const [logo, setLogo] = useState("");

  const handleFile = (e) => {
    if (e.target.files[0].size > 2097152) {
      window.alert("Image must be under 2 M.B");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setLogo(strImage);
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("cat", cat || props.data.cat);
    body.append("catid", props.data.catid);
    body.append("pcatid", props.data.pcatid);
    body.append("sortno", sortno || props.data.sortno);
    const data = await axios.post(
      "https://dstservices.in/api/categoryedit.php",
      body
    );
    console.log(data);
    if (data?.data?.catadd?.response_desc === "Updated Successfully") {
      // ============================file upload ===========================================================

      const file = new FormData();
      file.append("imagefor", "CAT");
      file.append("imageid", props.data.catid);

      file.append("image", logo);
      await axios.post("https://dstservices.in/api/filesup.php", file);

      //  ============file uplaod end ================
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
          <Row className="g-3">
            <Col xs={9} sm={9} md={9} lg={9}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e)}
                />
              </Form.Group>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3} className="d-flex">
              <img
                src={
                  logo === ""
                    ? props.data.image
                    : `data:image/jpeg;base64,${logo}`
                }
                alt=""
                height={50}
                style={{ objectFit: "cover" }}
                className="w-100 my-auto"
              />
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
