import React, { lazy, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import CouponTable from "./CouponTable";
const AddCoupon = lazy(() => import("./AddCoupon"));
const CouponDelete = lazy(() => import("./CouponDelete"));
const CoupanMaster = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [radio, setRadio] = useState({});
  return (
    <>
      <Container className="py-5">
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <h1>Coupon Master</h1>
            <div
              className="d-flex align-items-center"
              style={{ gap: "0.5rem" }}>
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                <i className="fa-solid fa-plus"></i>
              </Button>
              <CouponDelete radio={radio} />
            </div>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ borderRadius: "0" }}>
          <Card.Body className="d-flex  align-items-center">
            <i className="fa-solid fa-list my-auto"></i>
            <h5 className="my-auto ms-3">Coupon List</h5>
          </Card.Body>
        </Card>
        <CouponTable setRadio={setRadio} />
      </Container>
      <AddCoupon show={showAddModal} onHide={() => setShowAddModal(false)} />
    </>
  );
};

export default CoupanMaster;
