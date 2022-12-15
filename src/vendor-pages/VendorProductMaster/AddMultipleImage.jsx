import Modal from "react-bootstrap/Modal";
import React from "react";
import UploadFile from "../../components/UploadFile/UploadFile";
import { Col, Row } from "react-bootstrap";

const AddMultipleImage = (props) => {
  const mapArray = [1, 2, 3, 4];
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          {mapArray.map((items, index) => {
            return (
              <Col xs={12} sm={12} md={6} lg={6} key={index}>
                <UploadFile items={items} data={props.data} />
              </Col>
            );
          })}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddMultipleImage;
