import React, { lazy, useEffect, useState } from "react";
import {
  Card,
  Container,
  Table,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useContext } from "react";
import { ToggleState } from "../../context/Toggle";
const AddButton = lazy(() => import("../../components/AddButton/AddButton"));
const DeleteVedorProduct = lazy(() => import("./DeleteVedorProduct"));
const UploadImage = lazy(() => import("./UploadImage"));
const AddVendorProduct = lazy(() => import("./AddVendorProduct"));
const EditVendorProduct = lazy(() => import("./EditVendorProduct"));
const AddMultipleImage = lazy(() => import("./AddMultipleImage"));
const NoRecordFound = lazy(() => import("../../components/NoRecordFound"));

const VendorProductMaster = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [radio, setRadio] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [detail, setDetail] = useState([]);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const { fetchVendorMaster, vendorMaster } = useContext(ToggleState);
  useEffect(() => {
    fetchVendorMaster("https://dstservices.in/api/vendor_productlist.php");
  }, [fetchVendorMaster]);
  return (
    <>
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
        {vendorMaster?.data?.vprodlist?.length > 0 ? (
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
        ) : (
          <NoRecordFound />
        )}
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
    </>
  );
};

export default VendorProductMaster;
