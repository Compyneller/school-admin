import React from "react";
import { Card } from "react-bootstrap";

const ImageKycComp = ({ data }) => {
  return (
    <Card>
      <Card.Body>
        <img className="w-100" src={data} alt="" />
      </Card.Body>
    </Card>
  );
};

export default ImageKycComp;
