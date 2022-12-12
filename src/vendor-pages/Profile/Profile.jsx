import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { containerVariance } from "../../Data/variants";
import "./Profile.scss";
import { motion } from "framer-motion";
const Profile = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vmob", "6745897970");
      const data = await axios.post(
        "https://dstservices.in/api/vendor_view.php",
        body
      );
      setData(data);
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <motion.div
      className="w-100"
      variants={containerVariance}
      initial="ini"
      animate="ani"
      exit="exi">
      <Container className="py-5">
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div className="profile-image-name">
              <img src={data?.data?.vendorprof[0]?.fimg} alt="" />
              <h1>{data?.data?.vendorprof[0]?.vname}</h1>
            </div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="top">Edit Profile</Tooltip>}>
              <Button variant="primary" onClick={() => setUpdate(!update)}>
                <i className="fa-solid fa-pencil"></i>
              </Button>
            </OverlayTrigger>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body>
            <Form>
              <Row className="g-3">
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.vname}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Father Name</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.father_name}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      placeholder={data?.data?.vendorprof[0]?.vmob}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Firm Contact</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      placeholder={data?.data?.vendorprof[0]?.fmob}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.state}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.district}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.city}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Pin No.</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.pinno}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.fadd}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Aadhar No.</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.aadharno}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Pan No.</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.panno}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Firm Name</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.firm_name}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Firm Type</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.ftype}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>GST Reg. Type</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.gst_reg_type}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>GST No.</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.gstno}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>GST Type</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={update ? false : true}
                      placeholder={data?.data?.vendorprof[0]?.gsttype}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {update ? (
                <Button variant="primary" className="mt-3" type="submit">
                  Submit
                </Button>
              ) : null}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </motion.div>
  );
};

export default Profile;
