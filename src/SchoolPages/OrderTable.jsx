import React, { Fragment } from "react";
import { Card, Table } from "react-bootstrap";

const OrderTable = ({ data }) => {
  return (
    <Fragment>
      <Card style={{ borderRadius: "0" }}>
        <Card.Body className="d-flex  align-items-center">
          <i className="fa-solid fa-list my-auto"></i>
          <h5 className="my-auto ms-3">Order List</h5>
        </Card.Body>
      </Card>

      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Order No.</th>
            <th>Order From</th>
            <th>Order Date</th>
            <th>Net Amount</th>
            <th>Delivery Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((items, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{items.orderno}</td>
                <td>{items.orderfrom}</td>
                <td>{new Date(items.orderdate).toDateString()}</td>
                <td>{items.netamt}</td>
                <td>{items.deladdress}</td>
                <td>{items.orderstatus}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default OrderTable;
