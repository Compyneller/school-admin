import VendorHomeCard from "../../components/VendorHomeCard/VendorHomeCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    localStorage.setItem("vendor-home", true);
    const fetchData = async () => {
      setLoading(true);
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("schid", JSON.parse(localStorage.getItem("user"))?.uid);
      const { data } = await axios.post(
        "https://dstservices.in/api/schorderhistory.php",
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
              <VendorHomeCard items={items} location="school" />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
