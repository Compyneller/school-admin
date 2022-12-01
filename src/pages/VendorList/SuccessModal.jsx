import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <h3 className="text-center">
          {props.data?.data?.product_verification?.response_desc}
        </h3>
        <Button
          className="mx-auto"
          onClick={() => {
            props.onHide();
            window.location.reload();
          }}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
