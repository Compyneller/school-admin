import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const VendorHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vid", JSON.parse(localStorage.getItem("user"))?.uid);
      const { data } = await axios.post(
        "https://dstservices.in/api/vcorderhistory.php",
        body
      );
      setData(data?.osummary);
      setLoading(false);
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [JSON.parse(localStorage.getItem("user"))?.uid]);
  console.log(JSON.parse(localStorage.getItem("user"))?.uid);

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h3>Pending Order</h3>
        </Card.Body>
      </Card>
      <br />
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : data.length === 0 ? (
        <h1 className="text-center">No Pending Order</h1>
      ) : (
        <Row className="g-3">
          {data?.map((items, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <Link
                to={`/order-detail:${items.orderno}`}
                style={{ textDecoration: "none" }}>
                <Card>
                  <Card.Body>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Order From
                      </InputGroup.Text>
                      <Form.Control
                        defaultValue={items.orderno}
                        disabled
                        className="bg-light"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Mobile No.
                      </InputGroup.Text>
                      <Form.Control
                        defaultValue={items.orderfrom}
                        disabled
                        className="bg-light"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Order Date
                      </InputGroup.Text>
                      <Form.Control
                        defaultValue={new Date(items.orderdate).toDateString()}
                        disabled
                        className="bg-light"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Amount
                      </InputGroup.Text>
                      <Form.Control
                        defaultValue={items.netamt}
                        disabled
                        className="bg-light"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Delivery <br /> Address
                      </InputGroup.Text>
                      <Form.Control
                        defaultValue={items.deladdress}
                        disabled
                        className="bg-light"
                        as="textarea"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Order Status
                      </InputGroup.Text>
                      <Form.Control
                        defaultValue={items.orderstatus}
                        disabled
                        className="bg-light"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default VendorHome;
