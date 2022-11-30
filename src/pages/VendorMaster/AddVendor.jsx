import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";

const AddVendor = (props) => {
  const [district, setDistrict] = useState([]);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [allInputs, setAllInputs] = useState({
    vname: "",
    fname: "",
    vmob: "",
    firm_name: "",
    fmob: "",
    fadd: "",
    ftype: "",
    panno: "",
    gsttype: "",
    gstno: "",
    state: "",
    district: "",
    city: "",
    pinno: "",
  });
  const stateContext = useContext(ToggleState);
  const { fetchAllMaster, fetchState, state } = stateContext;
  useEffect(() => {
    fetchState();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    const fetchDistrict = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");

      body.append("state", allInputs.state);
      const data = await axios.post(
        "https://dstservices.in/api/distmaster.php",
        body
      );
      setDistrict(data);
    };
    fetchDistrict();
  }, [allInputs.state]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vname", allInputs.vname);
      body.append("fname", allInputs.fname);
      body.append("vmob", allInputs.vmob);
      body.append("firm_name", allInputs.firm_name);
      body.append("fmob", allInputs.fmob);
      body.append("fadd", allInputs.fadd);
      body.append("ftype", allInputs.ftype);
      body.append("panno", allInputs.panno);
      body.append("gsttype", allInputs.gsttype);
      body.append("gstno", allInputs.gstno);
      body.append("state", allInputs.state);
      body.append("district", allInputs.district);
      body.append("city", allInputs.city);
      body.append("pinno", allInputs.pinno);
      const data = await axios.post(
        "https://dstservices.in/api/vendor_add.php",
        body
      );
      if (data?.data?.vendoradd?.response_desc === "Data Saved Successfully") {
        fetchAllMaster("https://dstservices.in/api/vendor_list.php");
        props.onHide();
      } else {
        setError(true);
        setMsg(data?.data?.vendoradd?.response_desc);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {error ? <Alert variant="danger">{msg}</Alert> : "Add Vendor"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Vendor Name</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="vname"
                  placeholder="Vendor Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Firm Name</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="fname"
                  placeholder="Firm Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Vendor Mobile</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="vmob"
                  placeholder="Vendor Mobile"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Firm Name</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="firm_name"
                  placeholder="Firm Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Firm Mobile</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="fmob"
                  placeholder="Firm Mobile"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Firm Address</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="fadd"
                  placeholder="Firm Address"
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Label>Firm Type</Form.Label>
              <Form.Select name="ftype" onChange={(e) => handleChange(e)}>
                <option>Select Firm Type</option>
                <option value="Partnership">Partnership</option>
                <option value="Proprietorship">Proprietorship</option>
              </Form.Select>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Pan No.</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="tel"
                  name="panno"
                  placeholder="Enter Pan Number"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Label>GST Type</Form.Label>
              <Form.Select name="gsttype" onChange={(e) => handleChange(e)}>
                <option>Select GST Type</option>
                <option value="Including">Including</option>
                <option value="Excluding">Excluding</option>
              </Form.Select>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>GST No.</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="tel"
                  name="gstno"
                  placeholder="Enter GST Number"
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Label>State</Form.Label>
              <Form.Select
                name="state"
                onChange={(e) => {
                  handleChange(e);
                }}>
                <option>Select State</option>
                {state?.data?.statelist?.map((items, index) => {
                  return (
                    <option key={index} value={items.state}>
                      {items.state}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Label>District</Form.Label>
              <Form.Select name="district" onChange={(e) => handleChange(e)}>
                <option>Select District</option>
                {district?.data?.distlist?.map((items, index) => {
                  return (
                    <option key={index} value={items.dist}>
                      {items.dist}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>City</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Pin Code</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  type="tel"
                  name="pinno"
                  placeholder="Enter Pin Code"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" className="mt-3" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddVendor;
