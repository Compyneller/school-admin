import axios from "axios";
import React, { lazy, useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import StatusBtn from "./StatusBtn";
import { ToggleState } from "../../context/Toggle";
import { Link } from "react-router-dom";
import SpinnerComp from "../../components/SpinnerComp";
import NoRecordFound from "../../components/NoRecordFound";
const ViewImage = lazy(() => import("./ViewImage"));

const VendorList = () => {
  const [vendorId, setVendorId] = useState("ALL");
  const [data, setData] = useState({});
  const [imageModal, setImageModal] = useState(false);
  const [products, setProducts] = useState([]);
  const AllVendorList = useContext(ToggleState);
  const { fetchAllMaster, allMaster, loading } = AllVendorList;
  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/ven_slist.php");
  }, []);
  useEffect(() => {
    const fetchVendorProducts = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vid", vendorId);
      const { data } = await axios.post(
        "https://dstservices.in/api/productlist_vwise.php",
        body
      );
      setProducts(data);
    };
    fetchVendorProducts();
  }, [vendorId]);
  return (
    <>
      <Container className="py-5">
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <h3>Product Verification</h3>
            <Form.Select
              className="w-25"
              onChange={(e) => setVendorId(e.target.value)}>
              <option value="ALL">Select Vendor</option>
              {allMaster?.data?.ven_slist?.map((items, index) => {
                return (
                  <option value={items.vid} key={index}>
                    {items.vname}
                  </option>
                );
              })}
            </Form.Select>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ borderRadius: "0" }}>
          <Card.Body className="d-flex  align-items-center">
            <i className="fa-solid fa-list my-auto"></i>
            <h5 className="my-auto ms-3">Product List</h5>
          </Card.Body>
        </Card>
        {loading ? (
          <SpinnerComp />
        ) : products?.prodlist?.length > 0 ? (
          <Table responsive bordered hover>
            <thead>
              <tr>
                {/* <th></th> */}
                <th>#</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Brand</th>
                <th>M.R.P</th>
                <th>Rate</th>
                <th>Image</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {products?.prodlist?.map((items, index) => {
                return (
                  <tr key={index}>
                    {/* <td>
                    <Form.Check
                      inline
                      name="group1"
                      type="radio"
                      id={`${items.vid}`}
                      // onChange={() => setRadio(items)}
                    />
                  </td> */}
                    <td>{index + 1}</td>
                    <td>{items.pname}</td>
                    <td>{items.pdesc}</td>
                    <td>{items.brand}</td>
                    <td>{items.mrp}</td>
                    <td>{items.rate}</td>

                    <td
                      onClick={() => {
                        setImageModal(true);
                        setData(items);
                      }}
                      style={{ cursor: "pointer" }}>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Tooltip id="button-tooltip">View Image</Tooltip>
                        }>
                        <img src={items.pimg} height={50} width={50} alt="" />
                      </OverlayTrigger>
                    </td>
                    <td>
                      <StatusBtn items={items} />
                    </td>
                    <td>
                      <Link to={`/view-product:${items.pid}`}>
                        <Button>View</Button>
                      </Link>
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
      <ViewImage
        data={data}
        show={imageModal}
        onHide={() => setImageModal(false)}
      />
    </>
  );
};

export default VendorList;
