import React, { Fragment } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import VendorHomeCard from "../components/VendorHomeCard/VendorHomeCard";

const OrderTable = ({ data }) => {
  return (
    <Fragment>
      <Card style={{ borderRadius: "0" }}>
        <Card.Body className="d-flex  align-items-center">
          <i className="fa-solid fa-list my-auto"></i>
          <h5 className="my-auto ms-3">Order List</h5>
        </Card.Body>
      </Card>
      <Row className="g-3">
        {data?.map((items, index) => {
          return (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <VendorHomeCard items={items} location="home" />
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default OrderTable;
