import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  Container,
  Table,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { containerVariance } from "../../Data/variants";
import AddButton from "../../components/AddButton/AddButton";
import DeleteVedorProduct from "./DeleteVedorProduct";
import UploadImage from "./UploadImage";
import AddVendorProduct from "./AddVendorProduct";
import EditVendorProduct from "./EditVendorProduct";
import { useContext } from "react";
import { ToggleState } from "../../context/Toggle";
import AddMultipleImage from "./AddMultipleImage";

const VendorProductMaster = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [radio, setRadio] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [detail, setDetail] = useState([]);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const { fetchVendorMaster, vendorMaster } = useContext(ToggleState);
  useEffect(() => {
    fetchVendorMaster("https://dstservices.in/api/vendor_productlist.php");
  }, []);

  return (
    <motion.div
      className="w-100"
      variants={containerVariance}
      initial="ini"
      animate="ani"
      exit="exi">
      <Container className="py-5">
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <h1>Product Master</h1>
            <div
              className="d-flex align-items-center"
              style={{ gap: "0.5rem" }}>
              <UploadImage
                setShowUploadFileModal={setShowUploadFileModal}
                items={radio}
              />
              <AddButton setShowAddModal={setShowAddModal} />
              <DeleteVedorProduct radio={radio} />
            </div>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body className="d-flex  align-items-center">
            <i className="fa-solid fa-list my-auto"></i>
            <h5 className="my-auto ms-3">Product List</h5>
          </Card.Body>
        </Card>
        <Table responsive bordered hover className="text-center">
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Brand</th>
              <th>MRP Name</th>
              <th>Rate</th>
              <th>Verified Status</th>
              <th>Status</th>
              <th>Image</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendorMaster?.data?.vprodlist?.map((items, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Form.Check
                      inline
                      name="group1"
                      type="radio"
                      id={`${items.vid}`}
                      onChange={() => setRadio(items)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{items.pname}</td>
                  <td>{items.pdesc}</td>
                  <td>{items.brand}</td>
                  <td>{items.mrp}</td>

                  <td>{items.rate}</td>
                  <td
                    className={
                      items.sts === "YES" ? "text-success" : "text-danger"
                    }>
                    {items.sts}
                  </td>
                  <td
                    className={
                      items.p_sts === "OPEN" ? "text-success" : "text-danger"
                    }>
                    {items.p_sts}
                  </td>
                  <td>
                    <img
                      src={`${items.mimg}?${Date.now()}`}
                      height={50}
                      width={50}
                      style={{ objectFit: "cover" }}
                      alt=""
                    />
                  </td>

                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top`}>Edit Product</Tooltip>
                      }>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setDetail(items);
                          setShowEditModal(true);
                        }}>
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <AddVendorProduct
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
      <EditVendorProduct
        data={detail}
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
      />
      <AddMultipleImage
        show={showUploadFileModal}
        data={radio}
        onHide={() => setShowUploadFileModal(false)}
      />
    </motion.div>
  );
};

export default VendorProductMaster;
