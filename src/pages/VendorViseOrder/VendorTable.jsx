import React from "react";
import { Card, Table } from "react-bootstrap";

const VendorTable = ({ data }) => {
  return (
    <>
      <Card>
        <Card.Body className="d-flex  align-items-center">
          <i className="fa-solid fa-list my-auto"></i>
          <h5 className="my-auto ms-3">Order List</h5>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Delivery Address</th>
                <th>Net Amount</th>
                <th>Order Date</th>
                <th>Order No.</th>
                <th>Order From</th>
                <th>Order Status</th>
                <th>Order Time</th>
                <th>Vendor Code</th>
              </tr>
            </thead>
            <tbody>
              {data?.osummary?.map((items, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{items.deladdress}</td>
                  <td>{items.netamt}</td>
                  <td>{items.orderdate}</td>
                  <td>{items.orderno}</td>
                  <td>{items.orderfrom}</td>
                  <td>{items.orderstatus}</td>
                  <td>{items.ordertime}</td>
                  <td>{items.vendorcode}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default VendorTable;
