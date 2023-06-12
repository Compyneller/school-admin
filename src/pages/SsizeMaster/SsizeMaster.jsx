import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import ToastifyComp from "../../components/ToastifyComp";

const SsizeMaster = () => {
  const [menuData, setMenuData] = useState([]);
  const [value, setValue] = useState("");
  const [size, setSize] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = new FormData();
        body.append("api", "sajdh23jd823m023uierur32");
        const { data } = await axios.post(
          "https://dstservices.in/api/categoryall.php",
          body
        );
        setMenuData(data?.catlistall);
      } catch (error) {
        ToastifyComp(error.message);
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);
  const submitSize = async () => {
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("catid", value);
      body.append("size", size);
      const { data } = await axios.post(
        "https://dstservices.in/api/size_add.php",
        body
      );
      ToastifyComp(data?.sizeadd?.response_desc);
    } catch (error) {
      ToastifyComp(error.message);
    }
  };
  return (
    <>
      <Container className="py-5">
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <h1>Size Master</h1>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Row className="g-3">
              <Col xs={12} sm={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select onChange={(e) => setValue(e.target.value)}>
                    <option>Select Category</option>
                    {menuData?.map((items, index) => (
                      <option value={items.catid} key={index}>
                        {items.category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter size"
                    onChange={(e) => setSize(e.target.value)}
                  />
                </Form.Group>
                <Button onClick={submitSize}>Submit</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SsizeMaster;
