import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

const PendingOrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [docketNumber, setDocketNumber] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = new FormData();
        body.append("api", "sajdh23jd823m023uierur32");
        body.append("orderno", id.replace(":", ""));
        const { data } = await axios.post(
          "https://dstservices.in/api/corderhlist.php",
          body
        );
        setData(data?.osuml);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      fetchData();
    };
  }, [id]);
  const submitDocket = async () => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("orderno", id.replace(":", ""));
    body.append("docket", docketNumber);
    const { data } = await axios.post(
      "https://dstservices.in/api/docketupdate.php",
      body
    );
    Toastify({
      text: data?.response_desc,
      position: "center",
      duration: 3000,
    }).showToast();
    console.log(data);
  };
  return (
    <Container className="py-5">
      <Button variant="danger" onClick={() => navigate(-1)}>
        Back
      </Button>

      <br />
      <br />
      {localStorage.getItem("vendor-orders") ? (
        <Row className="g-3">
          <Col xs={9} sm={8} md={7} lg={5}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder="Enter Docket Number"
                onChange={(e) => setDocketNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <Button onClick={submitDocket}>Submit</Button>
          </Col>
        </Row>
      ) : null}

      {data.length === 0 ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row className="g-3">
          {data?.map((items, index) => (
            <Col xs={12} sm={6} md={4} lg={4} key={index}>
              <Card
                className="shadow"
                style={{ background: "#DCEDC8", borderColor: "#9CCC65" }}>
                <Card.Header as="h5">{items.pname}</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Stock keeping unit</Form.Label>
                    <Form.Control defaultValue={items.sku} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control defaultValue={items.qty} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Selling Rate</Form.Label>
                    <Form.Control defaultValue={items.srate} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Total</Form.Label>
                    <Form.Control defaultValue={items.ptotal} disabled />
                  </Form.Group>
                  {items.psize === null ? null : (
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Size</Form.Label>
                      <Form.Control defaultValue={items.psize} disabled />
                    </Form.Group>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PendingOrderDetail;
