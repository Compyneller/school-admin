import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ApproveModal from "./ApproveModal";

const StatusBtn = ({ items }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant={items.sts === "YES" ? "outline-primary" : "outline-danger"}
        onClick={() => setModalShow(true)}>
        {items.sts}
      </Button>
      <ApproveModal
        items={items}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default StatusBtn;
