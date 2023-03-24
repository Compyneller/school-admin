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
import VendorHomeCard from "../../components/VendorHomeCard/VendorHomeCard";

const Reports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    localStorage.removeItem("vendor-home");
    const fetchData = async () => {
      try {
        setLoading(true);
        const body = new FormData();
        body.append("api", "sajdh23jd823m023uierur32");
        body.append("vid", JSON.parse(localStorage.getItem("user"))?.uid);
        const { data } = await axios.post(
          "https://dstservices.in/api/vendor_payment_details.php",
          body
        );
        console.table(data?.paylist);
        setData(data?.paylist);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [JSON.parse(localStorage.getItem("user"))?.uid]);

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h3>Payment History</h3>
        </Card.Body>
      </Card>
      <br />
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : data.length === 0 ? (
        <h1 className="text-center">No Order</h1>
      ) : (
        <Row className="g-3">
          {data?.map((items, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Card.Body>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control defaultValue={items.vname} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Payment Date</Form.Label>
                    <Form.Control
                      defaultValue={new Date(items.pdate).toDateString()}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control defaultValue={items.amt} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Payment Type</Form.Label>
                    <Form.Control defaultValue={items.ptype} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>TDS</Form.Label>
                    <Form.Control defaultValue={items.tdsamt} disabled />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Net Amount</Form.Label>
                    <Form.Control defaultValue={items.netamt} disabled />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Reports;
