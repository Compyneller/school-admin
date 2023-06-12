import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
const ShoolViseOrder = () => {
  const [schoolList, setSchoolList] = useState([]);
  useEffect(() => {
    const fetchSchoolList = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      const { data } = await axios.post(
        "https://dstservices.in/api/sch_slist.php",
        body
      );
      setSchoolList(data);
    };
    fetchSchoolList();
  }, []);
  const handleInputs = () => {};
  return (
    <>
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h1>School Wise Order</h1>
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
                  {schoolList?.sch_slist?.map((items, index) => (
                    <option value={items.affno} key={index}>
                      {items.sch_name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">From</InputGroup.Text>
                  <Form.Control
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
        {/* <VendorTable data={vendorData} /> */}
      </Container>
    </>
  );
};

export default ShoolViseOrder;
