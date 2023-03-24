import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import VendorHomeCard from "../../components/VendorHomeCard/VendorHomeCard";

const Order = () => {
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
          "https://dstservices.in/api/vorderhistory.php",
          body
        );

        setData(data?.osummary);
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
          <h3>Orders</h3>
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
              <VendorHomeCard items={items} location="vendor-orders" />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Order;
