import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Form, Table } from "react-bootstrap";
import { motion } from "framer-motion";
import StatusBtn from "./StatusBtn";
import { ToggleState } from "../../context/Toggle";
const containerVariance = {
  ini: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
  ani: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
  exi: {
    x: "-85%",
    opacity: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};
const VendorList = () => {
  const [vendorId, setVendorId] = useState("ALL");
  const [products, setProducts] = useState([]);
  const AllVendorList = useContext(ToggleState);
  const { fetchAllMaster, allMaster } = AllVendorList;
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
    <motion.div
      className="w-100"
      variants={containerVariance}
      initial="ini"
      animate="ani"
      exit="exi">
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
              <th>Status</th>
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
                  <td>{items.pid}</td>
                  <td>{items.pname}</td>
                  <td>{items.pdesc}</td>
                  <td>{items.brand}</td>
                  <td>{items.mrp}</td>
                  <td>{items.rate}</td>
                  <td>
                    <StatusBtn items={items} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </motion.div>
  );
};

export default VendorList;
