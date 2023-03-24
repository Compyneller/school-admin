import React, { useEffect } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const VendorHomeCard = ({ items, location }) => {
  useEffect(() => {
    if (location === "vendor-orders") {
      localStorage.setItem("vendor-order", true);
    } else {
      localStorage.removeItem("vendor-order");
    }
  }, [location]);
  return (
    <Link
      to={`/order-detail:${items.orderno}`}
      style={{ textDecoration: "none" }}
      onClick={() => navigator.vibrate(100)}>
      <Card
        className="shadow"
        style={{ background: "#DCEDC8", borderColor: "#9CCC65" }}>
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Order From</InputGroup.Text>
            <Form.Control
              defaultValue={items.orderno}
              disabled
              className="bg-light"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Mobile No.</InputGroup.Text>
            <Form.Control
              defaultValue={items.orderfrom}
              disabled
              className="bg-light"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Order Date</InputGroup.Text>
            <Form.Control
              defaultValue={new Date(items.orderdate).toDateString()}
              disabled
              className="bg-light"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Amount</InputGroup.Text>
            <Form.Control
              defaultValue={items.netamt}
              disabled
              className="bg-light"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Delivery <br /> Address
            </InputGroup.Text>
            <Form.Control
              defaultValue={items.deladdress}
              disabled
              className="bg-light"
              as="textarea"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Order Status</InputGroup.Text>
            <Form.Control
              defaultValue={items.orderstatus}
              disabled
              className="bg-light"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default VendorHomeCard;
