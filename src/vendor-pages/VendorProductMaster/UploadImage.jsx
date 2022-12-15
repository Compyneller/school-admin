import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
const UploadImage = ({ setShowUploadFileModal, items }) => {
  const handleShow = () => {
    if (items.length === 0) {
      window.alert("Please select product");
    } else {
      setShowUploadFileModal(true);
    }
  };
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`tooltip-top`}>Upload Product Image</Tooltip>}>
      <Button variant="outline-primary" onClick={handleShow}>
        <FaUpload />
      </Button>
    </OverlayTrigger>
  );
};

export default UploadImage;
