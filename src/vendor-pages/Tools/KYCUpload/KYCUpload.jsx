import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ImageKycComp from "./ImageKycComp";

const KYCUpload = () => {
  const [kycData, setKycData] = useState([]);
  useEffect(() => {
    const fetchKYCData = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vid", 3);
      const { data } = await axios.post(
        "https://dstservices.in/api/vendor_getkyc.php",
        body
      );
      setKycData(data);
    };
    fetchKYCData();
  }, []);
  console.log(kycData);
  return (
    <Container className="py-5">
      <h1>Vendor KYC</h1>
      <br />
      <Card>
        <Card.Body>
          <Row className="g-3">
            {kycData?.vkyc?.map((items, index) =>
              Object.values(items).map((itm, index) => (
                <Col xs={12} sm={6} md={4} lg={3}>
                  {itm.includes("https://dstservices.in/") ? (
                    <ImageKycComp data={itm} />
                  ) : (
                    itm
                  )}
                </Col>
              ))
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default KYCUpload;
