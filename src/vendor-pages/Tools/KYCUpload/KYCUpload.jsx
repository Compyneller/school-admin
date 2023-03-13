import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

const KYCUpload = () => {
  const [kycData, setKycData] = useState([]);
  const [aadharImage, setAadharImage] = useState("");
  const [panImage, setPanImage] = useState("");
  const [gstImage, setGstImage] = useState("");
  const [passImage, setPassImage] = useState("");
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
  const handleAadharFile = (e, setImage) => {
    if (e.target.files[0].size > 2097152) {
      window.alert("Image must be under 2 M.B");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        console.log(reader.result);
        var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setImage(strImage);
      };
    }
  };
  console.log(aadharImage);
  return (
    <Container className="py-5">
      <h1>Vendor KYC</h1>
      <br />
      <Card style={{ height: "100%" }}>
        <Card.Body>
          <Row className="g-3">
            {kycData?.vkyc?.map((items, index) => {
              return (
                <>
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Aadhar No.
                      </InputGroup.Text>
                      <Form.Control
                        disabled
                        defaultValue={items.aadharno}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Pan No.
                      </InputGroup.Text>
                      <Form.Control
                        disabled
                        defaultValue={items.panno}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        GST No.
                      </InputGroup.Text>
                      <Form.Control
                        disabled
                        defaultValue={items.gstno}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Account No.
                      </InputGroup.Text>
                      <Form.Control
                        disabled
                        defaultValue={items.acno}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ height: "100%" }}>
                      <Card.Header as="b">Aadhar Image</Card.Header>
                      <Card.Body>
                        <img
                          src={
                            aadharImage
                              ? `data:image/jpeg;base64,${aadharImage}`
                              : items.aadharimg
                          }
                          className="w-100"
                          height={200}
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                      </Card.Body>
                      <Card.Footer>
                        <input
                          className="custom-file-input"
                          type="file"
                          data-parent={
                            aadharImage === "" ? "Edit Image" : "Upload Image"
                          }
                          onChange={(e) =>
                            aadharImage === ""
                              ? handleAadharFile(e, setAadharImage)
                              : "Upload Image"
                          }
                        />
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ height: "100%" }}>
                      <Card.Header as="b">Pan Image</Card.Header>
                      <Card.Body>
                        <img
                          src={
                            panImage
                              ? `data:image/jpeg;base64,${panImage}`
                              : items.panimg
                          }
                          className="w-100"
                          alt=""
                          height={200}
                          style={{ objectFit: "cover" }}
                        />
                      </Card.Body>
                      <Card.Footer>
                        <input
                          className="custom-file-input"
                          type="file"
                          data-parent={
                            panImage === "" ? "Edit Image" : "Upload Image"
                          }
                          onChange={(e) =>
                            panImage === ""
                              ? handleAadharFile(e, setPanImage)
                              : "Upload Image"
                          }
                        />
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ height: "100%" }}>
                      <Card.Header as="b">GST Image</Card.Header>
                      <Card.Body>
                        <img
                          src={
                            gstImage
                              ? `data:image/jpeg;base64,${gstImage}`
                              : items.gstimg
                          }
                          className="w-100"
                          height={200}
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                      </Card.Body>
                      <Card.Footer>
                        <input
                          className="custom-file-input"
                          type="file"
                          data-parent={
                            gstImage === "" ? "Edit Image" : "Upload Image"
                          }
                          onChange={(e) =>
                            gstImage === ""
                              ? handleAadharFile(e, setGstImage)
                              : "Upload Image"
                          }
                        />
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ height: "100%" }}>
                      <Card.Header as="b">Passbook Image</Card.Header>
                      <Card.Body>
                        <img
                          src={
                            passImage
                              ? `data:image/jpeg;base64,${passImage}`
                              : items.passbookimg
                          }
                          className="w-100"
                          height={200}
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                      </Card.Body>
                      <Card.Footer>
                        <input
                          className="custom-file-input"
                          type="file"
                          data-parent={
                            passImage === "" ? "Edit Image" : "Upload Image"
                          }
                          onChange={(e) =>
                            passImage === ""
                              ? handleAadharFile(e, setPassImage)
                              : "Upload Image"
                          }
                        />
                      </Card.Footer>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default KYCUpload;
