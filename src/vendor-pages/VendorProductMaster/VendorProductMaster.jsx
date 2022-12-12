import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Container, Table, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { ToggleState } from "../../context/Toggle";
import { containerVariance } from "../../Data/variants";
import axios from "axios";

const VendorProductMaster = () => {
  const [allMaster, setAllMaster] = useState([]);
  useEffect(() => {
    const fetchAllMaster = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vmob", "6745897970");
      const data = await axios.post(
        "https://dstservices.in/api/vendor_productlist.php",
        body
      );
      setAllMaster(data);
    };
    fetchAllMaster();
  }, []);

  console.log(allMaster);
  return (
    <motion.div
      className="w-100"
      variants={containerVariance}
      initial="ini"
      animate="ani"
      exit="exi">
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h1>Product Master</h1>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body className="d-flex  align-items-center">
            <i className="fa-solid fa-list my-auto"></i>
            <h5 className="my-auto ms-3">Product List</h5>
          </Card.Body>
        </Card>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Brand</th>
              <th>MRP Name</th>
              <th>Rate</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allMaster?.data?.vprodlist?.map((items, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Form.Check
                      inline
                      name="group1"
                      type="radio"
                      id={`${items.vid}`}
                      //   onChange={() => setRadio(items)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{items.pname}</td>
                  <td>{items.pdesc}</td>
                  <td>{items.brand}</td>
                  <td>{items.mrp}</td>

                  <td>{items.rate}</td>
                  <td>{items.sts}</td>

                  <td>
                    <Button variant="outline-primary">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </Button>
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

export default VendorProductMaster;
