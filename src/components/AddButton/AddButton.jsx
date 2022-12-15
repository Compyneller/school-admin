import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const AddButton = ({ setShowAddModal }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`tooltip-top`}>Add Product</Tooltip>}>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        <i className="fa-solid fa-plus"></i>
      </Button>
    </OverlayTrigger>
  );
};

export default AddButton;
