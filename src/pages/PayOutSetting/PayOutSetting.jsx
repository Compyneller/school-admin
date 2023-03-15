import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form } from "react-bootstrap";

const PayOutSetting = () => {
  const [type, setType] = useState("");
  const handleSubmit = async () => {
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("ptype", type);
      const { data } = await axios.post(
        "https://dstservices.in/api/payout_setting.php",
        body
      );
      if (data?.payout?.response_desc === "Data Saved Successfully") {
        window.alert(data?.payout?.response_desc);
        setType("");
      } else {
        window.alert(data?.payout?.response_desc);
      }
    } catch (error) {
      window.alert(error);
    }
  };
  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h3>Payout Setting</h3>
          <br />
          <Form.Label as="h5" className="mb-2">
            Types of Payout
          </Form.Label>
          <Col xs={12} sm={12} md={6} lg={4}>
            <div className="d-flex">
              <Form.Select
                size="md"
                className="w-100"
                onChange={(e) => setType(e.target.value)}>
                <option>Select</option>
                <option value="INCLUDING">Including</option>
                <option value="EXCLUDING">Excluding</option>
              </Form.Select>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </Col>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PayOutSetting;
