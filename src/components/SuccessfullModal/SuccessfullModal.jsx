import React from "react";
import { Modal } from "react-bootstrap";
const SuccessfullModal = (props) => {
  setTimeout(() => {
    props.onHide();
  }, 2000);

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body
        style={{
          background: "#69F0AE",
          border: "1px solid #00E676",
        }}>
        <h5
          className="text-center"
          style={{ color: "#1B5E20", fontWeight: "bold" }}>
          {props.message}
        </h5>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessfullModal;
