import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import VendorTable from "./VendorTable";
const VendorViseOrder = () => {
  const [vendorList, setVendorList] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [filterInputs, setFilterInputs] = useState({
    vid: "",
    sts: "",
    fdate: new Date().toISOString().slice(0, 10),
    tdate: new Date().toISOString().slice(0, 10),
  });
  const handleInputs = (e) => {
    setFilterInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    const fetchVendor = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vid", filterInputs.vid || "ALL");
      body.append("sts", filterInputs.sts || "ALL");
      body.append("fdate", filterInputs.fdate.split("-").reverse().join("-"));
      body.append("tdate", filterInputs.tdate.split("-").reverse().join("-"));
      const { data } = await axios.post(
        "https://dstservices.in/api/adm_vorderhistory.php",
        body
      );
      setVendorData(data);
    };
    fetchVendor();

    const fetchVendorList = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      const { data } = await axios.post(
        "https://dstservices.in/api/ven_slist.php",
        body
      );
      setVendorList(data);
    };
    fetchVendorList();
  }, [
    filterInputs.vid,
    filterInputs.fdate,
    filterInputs.sts,
    filterInputs.tdate,
  ]);
  return (
    <>
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h1>Vendor Wise Order</h1>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header className="fw-bold">Filters</Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Select name="vid" onChange={handleInputs}>
                  <option value="ALL">ALL</option>
                  {vendorList?.ven_slist?.map((items, index) => (
                    <option value={items.vid} key={index}>
                      {items.vname}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">From</InputGroup.Text>
                  <Form.Control
                    defaultValue={filterInputs.fdate}
                    onChange={handleInputs}
                    placeholder="dd-mm-yyyy"
                    name="fdate"
                    type="date"
                  />
                </InputGroup>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
                  <Form.Control
                    onChange={handleInputs}
                    name="tdate"
                    type="date"
                    defaultValue={filterInputs.tdate}
                  />
                </InputGroup>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Select onChange={handleInputs} name="sts">
                  <option value="ALL">Select Status</option>
                  <option value="pending">PENDING</option>
                  <option value="ready">READY</option>
                  <option value="shipped">SHIPPED</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br />
        <VendorTable data={vendorData} />
      </Container>
    </>
  );
};

export default VendorViseOrder;
