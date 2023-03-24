import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
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
import Toastify from "toastify-js";

const KYCUpload = () => {
  const [kycData, setKycData] = useState([]);
  const [images, setImages] = useState([]);
  const [aadharImage, setAadharImage] = useState("");
  const [panImage, setPanImage] = useState("");
  const [gstImage, setGstImage] = useState("");
  const [passImage, setPassImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  useEffect(() => {
    const fetchKYCData = async () => {
      setLoading(true);
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vid", JSON.parse(localStorage.getItem("user"))?.uid);
      const { data } = await axios.post(
        "https://dstservices.in/api/vendor_getkyc.php",
        body
      );
      setKycData(data);
      setLoading(false);
    };
    fetchKYCData();
  }, []);
  const handleAadharFile = (e, name) => {
    if (e.target.files[0].size > 2097152) {
      window.alert("Image must be under 2 M.B");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setImages((prev) => {
          return [
            ...prev,
            {
              name,
              image: strImage,
            },
          ];
        });
      };
    }
  };
  useEffect(() => {
    images?.map((items) => {
      setForm(items);
      if (items.name === "AADHAR") {
        setAadharImage(items.image);
      } else if (items.name === "PAN") {
        setPanImage(items.image);
      } else if (items.name === "GST") {
        setGstImage(items.image);
      } else if (items.name === "PASSBOOK") {
        setPassImage(items.image);
      }
    });
  }, [images]);
  const uploadImages = (num) => {
    const uploadImage = async (num) => {
      if (num >= images.length) {
        return;
      } else {
        const body = new FormData();
        body.append("api", "sajdh23jd823m023uierur32");
        body.append("imagefor", images[num].name);
        body.append("imageid", JSON.parse(localStorage.getItem("user"))?.uid);
        body.append("image", images[num].image);
        const { data } = await axios.post(
          "https://dstservices.in/api/filesup.php",
          body
        );
        Toastify({
          text: `${images[num].name} upload Successfully`,
          position: "center",
          duration: 3000,
        }).showToast();
        uploadImage(num + 1);
      }
    };
    uploadImage(num);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container className="py-5">
          {kycData?.vprodlist === null ? (
            <h3 className="text-danger">{kycData?.response_desc}</h3>
          ) : (
            <Fragment>
              <h1>Vendor KYC</h1>
              <br />
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Row className="g-3">
                    {kycData?.vkyc?.map((items, index) => {
                      return (
                        <Fragment key={index}>
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
                                      : `${items.aadharimg}?${Date.now}`
                                  }
                                  className="w-100"
                                  height={200}
                                  alt=""
                                  style={{ objectFit: "contain" }}
                                />
                              </Card.Body>
                              <Card.Footer>
                                <input
                                  className="custom-file-input"
                                  type="file"
                                  data-parent="Choose Image"
                                  onChange={(e) =>
                                    handleAadharFile(e, "AADHAR")
                                  }
                                />
                              </Card.Footer>
                            </Card>
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={3}>
                            <Card style={{ height: "100%" }}>
                              <Card.Header as="b">PAN Image</Card.Header>
                              <Card.Body>
                                <img
                                  src={
                                    panImage
                                      ? `data:image/jpeg;base64,${panImage}`
                                      : `${items.panimg}?${Date.now}`
                                  }
                                  className="w-100 object-fit-contain"
                                  height={200}
                                  alt=""
                                  style={{ objectFit: "contain" }}
                                />
                              </Card.Body>
                              <Card.Footer>
                                <input
                                  className="custom-file-input"
                                  type="file"
                                  data-parent="Choose Image"
                                  onChange={(e) => handleAadharFile(e, "PAN")}
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
                                      : `${items.gstimg}?${Date.now}`
                                  }
                                  className="w-100 object-fit-contain"
                                  height={200}
                                  alt=""
                                  style={{ objectFit: "contain" }}
                                />
                              </Card.Body>
                              <Card.Footer>
                                <input
                                  className="custom-file-input"
                                  type="file"
                                  data-parent="Choose Image"
                                  onChange={(e) => handleAadharFile(e, "GST")}
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
                                      : `${items.passbookimg}?${Date.now}`
                                  }
                                  className="w-100 object-fit-contain"
                                  height={200}
                                  alt=""
                                  style={{ objectFit: "contain" }}
                                />
                              </Card.Body>
                              <Card.Footer>
                                <input
                                  className="custom-file-input"
                                  type="file"
                                  data-parent="Choose Image"
                                  onChange={(e) =>
                                    handleAadharFile(e, "PASSBOOK")
                                  }
                                />
                              </Card.Footer>
                            </Card>
                          </Col>
                        </Fragment>
                      );
                    })}
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Button
                    disabled={images.length === 0 ? true : false}
                    onClick={(e) => uploadImages(0)}>
                    Upload Image
                  </Button>
                </Card.Footer>
              </Card>
            </Fragment>
          )}
        </Container>
      )}
    </Fragment>
  );
};

export default KYCUpload;
