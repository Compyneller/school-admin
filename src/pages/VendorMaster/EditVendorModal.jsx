import axios from "axios";
import React, { lazy, useEffect, useState } from "react";
import { useContext } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
const SuccessfullModal = lazy(() =>
  import("../../components/SuccessfullModal/SuccessfullModal")
);

const EditVendorModal = (props) => {
  const [district, setDistrict] = useState([]);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [logo, setLogo] = useState("");
  const [prevImage, setPrevImage] = useState("");
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
    aadhar: "",
    gstReg: "",
  });
  const stateContext = useContext(ToggleState);
  const { fetchAllMaster, fetchState, state } = stateContext;
  useEffect(() => {
    fetchState();
  }, []);
  const handleFile = (e) => {
    if (e.target.files[0].size > 2097152) {
      window.alert("Image must be under 2 M.B");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setPrevImage(reader.result);
        var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setLogo(strImage);
      };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "number") {
      if (e.target.value.length > e.target.maxLength) {
        e.target.value = e.target.value.slice(0, e.target.maxLength);
        setAllInputs((prev) => {
          return {
            ...prev,
            [name]: e.target.value,
          };
        });
      } else {
        setAllInputs((prev) => {
          return {
            ...prev,
            [name]: e.target.value,
          };
        });
      }
    } else {
      setAllInputs((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };
  useEffect(() => {
    const fetchDistrict = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");

      body.append("state", allInputs.state || props.data.state);
      const data = await axios.post(
        "https://dstservices.in/api/distmaster.php",
        body
      );
      setDistrict(data);
    };
    fetchDistrict();
  }, [allInputs.state, props.data.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vid", props.data.vid);
      body.append("vname", allInputs.vname || props.data.vname);
      body.append("father", allInputs.fname || props.data.father_name);
      body.append("vmob", allInputs.vmob || props.data.vmob);
      body.append("firm_name", allInputs.firm_name || props.data.firm_name);
      body.append("fmob", allInputs.fmob || props.data.fmob);
      body.append("fadd", allInputs.fadd || props.data.fadd);
      body.append("ftype", allInputs.ftype || props.data.ftype);
      body.append("panno", allInputs.panno || props.data.panno);
      body.append("gsttype", allInputs.gsttype || props.data.gsttype);
      body.append("gstno", allInputs.gstno || props.data.gstno);
      body.append("state", allInputs.state || props.data.state);
      body.append("district", allInputs.district || props.data.district);
      body.append("city", allInputs.city || props.data.city);
      body.append("pinno", allInputs.pinno || props.data.pinno);
      body.append("aadhar", allInputs.aadhar || props.data.aadharno);
      body.append("regtype", allInputs.gstReg);
      const data = await axios.post(
        "https://dstservices.in/api/vendor_edit.php",
        body
      );
      if (
        data?.data?.vendor_edit?.response_desc === "Data Updated Successfully"
      ) {
        setMsg(data?.data?.vendor_edit?.response_desc);
        if (logo === "") {
          fetchAllMaster("https://dstservices.in/api/vendor_list.php");
          props.onHide();
          setSuccess(true);
        } else {
          // =============file uplaod ===================

          const file = new FormData();
          file.append("imagefor", "VENDOR");
          file.append("imageid", props.data.vid);
          file.append("image", logo);
          await axios.post("https://dstservices.in/api/filesup.php", file);

          // ===============file upload end ==================
          fetchAllMaster("https://dstservices.in/api/vendor_list.php");
          props.onHide();
        }
        setSuccess(true);
      } else {
        setError(true);
        setMsg(data?.data?.vendor_edit?.response_desc);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {error ? <Alert variant="danger">{msg}</Alert> : "Edit Vendor"}
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
                    defaultValue={props.data.vname}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="fname"
                    defaultValue={props.data.father_name}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Vendor Mobile</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="number"
                    name="vmob"
                    maxLength={10}
                    defaultValue={props.data.vmob}
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
                    defaultValue={props.data.firm_name}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Firm Mobile</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="number"
                    name="fmob"
                    maxLength={10}
                    defaultValue={props.data.fmob}
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
                    defaultValue={props.data.fadd}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Label>Firm Type</Form.Label>
                <Form.Select
                  defaultValue={props.data.ftype}
                  name="ftype"
                  onChange={(e) => handleChange(e)}>
                  <option>Select Firm Type</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Proprietorship">Proprietorship</option>
                </Form.Select>
              </Col>

              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Label>GST Reg.</Form.Label>
                <Form.Select
                  defaultValue={props.data.gstreg}
                  name="gstReg"
                  onChange={(e) => handleChange(e)}>
                  <option>Select GST Reg.</option>
                  <option value="Regular GST">Regular GST</option>
                  <option value="Composite GST">Composite GST</option>
                  <option value="Unregistered">Unregistered</option>
                </Form.Select>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Label>GST Type</Form.Label>
                <Form.Select
                  defaultValue={props.data.gsttype}
                  name="gsttype"
                  onChange={(e) => handleChange(e)}>
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
                    type="text"
                    maxLength={15}
                    name="gstno"
                    defaultValue={props.data.gstno}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Pan No.</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="panno"
                    maxLength={10}
                    defaultValue={props.data.panno}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Aadhar No.</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="number"
                    name="aadhar"
                    maxLength={12}
                    defaultValue={props.data.aadharno}
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
                      <option
                        selected={props.data.state}
                        key={index}
                        value={items.state}>
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
                      <option
                        selected={props.data.district}
                        key={index}
                        value={items.dist}>
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
                    defaultValue={props.data.city}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange(e)}
                    type="number"
                    name="pinno"
                    maxLength={6}
                    defaultValue={props.data.pinno}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Row className="g-3">
                  <Col xs={9} sm={9} md={9} lg={9}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Choose Logo</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFile(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={3} sm={3} md={3} lg={3} className="d-flex">
                    <img
                      src={
                        logo === ""
                          ? `${props.data.fimg}?${Date.now()}`
                          : prevImage
                      }
                      alt=""
                      height={50}
                      style={{ objectFit: "cover" }}
                      className="w-100 my-auto"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Button variant="primary" className="mt-3" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <SuccessfullModal
        message={msg}
        show={success}
        onHide={() => setSuccess(false)}
      />
    </>
  );
};

export default EditVendorModal;
