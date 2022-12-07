import React from "react";
import { Button } from "react-bootstrap";

const AddButton = ({ setShowAddModal }) => {
  return (
    <Button variant="primary" onClick={() => setShowAddModal(true)}>
      <i className="fa-solid fa-plus"></i>
    </Button>
  );
};

export default AddButton;
