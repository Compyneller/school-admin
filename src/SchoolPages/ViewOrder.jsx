import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import ToastifyComp from "../components/ToastifyComp";
import OrderTable from "./OrderTable";

const ViewOrder = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("schid", JSON.parse(localStorage.getItem("user"))?.uid);
      body.append("fdate", fromDate.split("-").reverse().join("-"));
      body.append("tdate", toDate.split("-").reverse().join("-"));
      const { data } = await axios.post(
        "https://dstservices.in/api/schorderdwhistory.php",
        body
      );

      setLoading(false);
      setData(data?.osummary);
    } catch (error) {
      setLoading(false);
      ToastifyComp(error);
    }
  };
  console.table(data);
  return (
    <Container className="py-5">
      <Card>
        <Card.Header as="h3">View Order</Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col xs={6} sm={6} lg={3}>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">From</InputGroup.Text>
                <Form.Control
                  type="date"
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={6} sm={6} lg={3}>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
                <Form.Control
                  type="date"
                  onChange={(e) => setToDate(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={6} sm={6} lg={1}>
              <Button className="w-100" onClick={fetchData}>
                Submit
              </Button>
            </Col>
            <Col xs={6} sm={6} lg={1}>
              <Button
                variant="danger"
                className="w-100"
                onClick={() => window.location.reload()}>
                Reset
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <br />

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <OrderTable data={data} />
      )}
    </Container>
  );
};

export default ViewOrder;
