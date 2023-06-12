import React, { lazy, useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, Container } from "react-bootstrap";
import CouponTable from "./CouponTable";
import { containerVariance } from "../../Data/variants";
const AddCoupon = lazy(() => import("./AddCoupon"));
const CouponDelete = lazy(() => import("./CouponDelete"));
const CoupanMaster = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [radio, setRadio] = useState({});
  return (
    <motion.div
      variants={containerVariance}
      initial="ini"
      animate="ani"
      className="w-100 "
      exit="exi">
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
    </motion.div>
  );
};

export default CoupanMaster;
