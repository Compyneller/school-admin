import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
import "./Profile.scss";
import { ToggleState } from "../../context/Toggle";
const Profile = () => {
  const [allInputs, setAllInputs] = useState({
    vname: "",
    father_name: "",
    email: "",
    fmob: "",
    fadd: "",
    state: "",
    district: "",
    city: "",
    pinno: "",
    gst_reg_type: "",
    bankname: "",
    acname: "",
    acno: "",
    ifsc: "",
  });
  const handleInputs = (e) => {
    setAllInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const { state, fetchState, district, fetchDistrict } =
    useContext(ToggleState);
  useEffect(() => {
    fetchState();
    const fetchData = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vmob", JSON.parse(localStorage.getItem("user"))?.mob);
      const data = await axios.post(
        "https://dstservices.in/api/vendor_view.php",
        body
      );

      setData(data);
    };
    fetchData();

    fetchDistrict(allInputs.state);
  }, [allInputs.state]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("vid", data?.data?.vendorprof[0]?.vid);
      body.append("vname", allInputs.vname || data?.data?.vendorprof[0]?.vname);
      body.append(
        "father_name",
        allInputs.father_name || data?.data?.vendorprof[0]?.father_name
      );
      body.append("email", allInputs.email || data?.data?.vendorprof[0]?.email);
      body.append("fmob", allInputs.fmob || data?.data?.vendorprof[0]?.fmob);
      body.append("fadd", allInputs.fadd || data?.data?.vendorprof[0]?.fadd);
      body.append("state", allInputs.state || data?.data?.vendorprof[0]?.state);
      body.append(
        "district",
        allInputs.district || data?.data?.vendorprof[0]?.district
      );
      body.append("city", allInputs.city || data?.data?.vendorprof[0]?.city);
      body.append("pinno", allInputs.pinno || data?.data?.vendorprof[0]?.pinno);
      body.append(
        "gst_reg_type",
        allInputs.gst_reg_type || data?.data?.vendorprof[0]?.gst_reg_type
      );
      body.append(
        "bankname",
        allInputs.bankname || data?.data?.vendorprof[0]?.bankname
      );
      body.append(
        "acname",
        allInputs.acname || data?.data?.vendorprof[0]?.acname
      );
      body.append("acno", allInputs.acno || data?.data?.vendorprof[0]?.acno);
      body.append("ifsc", allInputs.ifsc || data?.data?.vendorprof[0]?.ifsc);
      const res = await axios.post(
        "https://dstservices.in/api/vendor_selfedit.php",
        body
      );
      console.log(res);
    } catch (error) {}
  };

  return (
    <>
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
            <Form onSubmit={handleSave}>
              <Row className="g-3">
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="vname"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      defaultValue={data?.data?.vendorprof[0]?.vname}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Father Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="father_name"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      placeholder={data?.data?.vendorprof[0]?.father_name}
                      defaultValue={data?.data?.vendorprof[0]?.father_name}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      placeholder={data?.data?.vendorprof[0]?.vmob}
                      defaultValue={data?.data?.vendorprof[0]?.vmob}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      defaultValue={data?.data?.vendorprof[0]?.email}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Firm Name</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      defaultValue={data?.data?.vendorprof[0]?.firm_name}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Firm Image</Form.Label>
                    <a href={data?.data?.vendorprof[0]?.fimg} target="_blank">
                      <Button className="w-100"> View Image</Button>
                    </a>
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Firm Contact</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      placeholder={data?.data?.vendorprof[0]?.fmob}
                      defaultValue={data?.data?.vendorprof[0]?.fmob}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Firm Address</Form.Label>
                    <Form.Control
                      name="fadd"
                      type="text"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      defaultValue={data?.data?.vendorprof[0]?.fadd}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      name="state"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}>
                      <option>Select State</option>
                      {state?.data?.statelist?.map((items, index) => {
                        return (
                          <option
                            selected={data?.data?.vendorprof[0]?.state}
                            value={items.state}
                            key={index}>
                            {items.state}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>District</Form.Label>
                    <Form.Select
                      name="district"
                      disabled={update ? false : true}>
                      onChange={(e) => handleInputs(e)}
                      <option>Select District</option>
                      {district?.data?.distlist?.map((items, index) => {
                        return (
                          <option
                            selected={data?.data?.vendorprof[0]?.district}
                            value={items.dist}
                            key={index}>
                            {items.dist}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      defaultValue={data?.data?.vendorprof[0]?.city}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Pin No.</Form.Label>
                    <Form.Control
                      type="text"
                      name="pinno"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      placeholder={data?.data?.vendorprof[0]?.pinno}
                      defaultValue={data?.data?.vendorprof[0]?.pinno}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Firm Type</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      defaultValue={data?.data?.vendorprof[0]?.ftype}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>GST Reg. Type</Form.Label>
                    <Form.Select
                      name="gst_reg_type"
                      defaultValue={data?.data?.vendorprof[0]?.gst_reg_type}
                      disabled={update ? false : true}>
                      onChange={(e) => handleInputs(e)}
                      <option>Select GST Reg Type</option>
                      <option
                        selected={data?.data?.vendorprof[0]?.gst_reg_type}
                        value="Regular GST">
                        Regular GST
                      </option>
                      <option
                        selected={data?.data?.vendorprof[0]?.gst_reg_type}
                        value="Composite GST">
                        Composite GST
                      </option>
                      <option
                        selected={data?.data?.vendorprof[0]?.gst_reg_type}
                        value="Unregistered">
                        Unregistered
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={3}>
                  <Form.Group>
                    <Form.Label>GST No.</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      defaultValue={data?.data?.vendorprof[0]?.gstno}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={3}>
                  <Form.Group>
                    <Form.Label>GST Type</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      defaultValue={data?.data?.vendorprof[0]?.gsttype}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Aadhar No.</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      defaultValue={data?.data?.vendorprof[0]?.aadharno}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Pan No.</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      defaultValue={data?.data?.vendorprof[0]?.panno}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Commission Per</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      defaultValue={data?.data?.vendorprof[0]?.commission_per}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} className="mt-4">
                  <h5
                    className="fw-bold"
                    style={{ textDecoration: "underline" }}>
                    Bank Details
                  </h5>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="bankname"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      defaultValue={data?.data?.vendorprof[0]?.bankname}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>AC Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="acname"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      defaultValue={data?.data?.vendorprof[0]?.acname}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>AC No.</Form.Label>
                    <Form.Control
                      type="text"
                      name="acno"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      defaultValue={data?.data?.vendorprof[0]?.acno}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>IFSC</Form.Label>
                    <Form.Control
                      type="text"
                      name="ifsc"
                      disabled={update ? false : true}
                      onChange={(e) => handleInputs(e)}
                      defaultValue={data?.data?.vendorprof[0]?.ifsc}
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
    </>
  );
};

export default Profile;
