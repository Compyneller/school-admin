import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import SuccessfullModal from "../../components/SuccessfullModal/SuccessfullModal";
import { ToggleState } from "../../context/Toggle";

const EditEmpModal = (props) => {
  const [district, setDistrict] = useState([]);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { fetchAllMaster, fetchState, state } = useContext(ToggleState);
  const [logo, setLogo] = useState("");
  const [prevImage, setPrevImage] = useState("");
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

  const [allInputs, setAllInputs] = useState({
    ename: "",
    fname: "",
    dob: "",
    eadd: "",
    mob: "",
    altmob: "",
    aadhar: "",
    panno: "",
    desig: "",
    state: "",
    district: "",
  });
  const handleInputChange = (e) => {
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
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("eid", props.data.eid);
    body.append("ename", allInputs.ename || props.data.ename);
    body.append("fname", allInputs.fname || props.data.fname);
    body.append("dob", allInputs.dob || props.data.dob);
    body.append("eadd", allInputs.eadd || props.data.eadd);
    body.append("mob", allInputs.mob || props.data.mob);
    body.append("altmob", allInputs.altmob || props.data.altmob);
    body.append("aadhar", allInputs.aadhar || props.data.aadhar);
    body.append("panno", allInputs.panno || props.data.panno);
    body.append("desig", allInputs.desig || props.data.designation);
    body.append("state", allInputs.state || props.data.state);
    body.append("district", allInputs.district || props.data.district);
    const data = await axios.post(
      "https://dstservices.in/api/emp_edit.php",
      body
    );

    if (data?.data?.emp_edit?.response_desc === "Data Updated Successfully") {
      // =============file uplaod ===================

      const file = new FormData();
      file.append("imagefor", "EMPLOYEE");
      file.append("imageid", props.data.eid);
      file.append("image", logo);
      await axios.post("https://dstservices.in/api/filesup.php", file);

      // ===============file upload end ==================
      setMsg(data?.data?.emp_edit?.response_desc);
      fetchAllMaster("https://dstservices.in/api/emp_list.php");
      props.onHide();
      setSuccess(true);
    } else {
      setError(true);
      setMsg(data?.data?.emp_edit?.response_desc);
      setSuccess(true);
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
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={12} sm={12} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ename"
                    onChange={handleInputChange}
                    defaultValue={props.data.ename}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    onChange={handleInputChange}
                    defaultValue={props.data.fname}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Employee Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="eadd"
                    onChange={handleInputChange}
                    defaultValue={props.data.eadd}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Label>State</Form.Label>
                <Form.Select
                  name="state"
                  required
                  onChange={(e) => {
                    handleInputChange(e);
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
                <Form.Select
                  name="district"
                  required
                  onChange={(e) => handleInputChange(e)}>
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
              <Col xs={12} sm={12} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    name="mob"
                    maxLength={10}
                    onChange={handleInputChange}
                    defaultValue={props.data.mob}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Alternate Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    name="altmob"
                    maxLength={10}
                    onChange={handleInputChange}
                    defaultValue={props.data.altmob}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={12} lg={6}>
                <Row className="g-3">
                  <Col xs={10} sm={10} lg={10}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Pic</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFile(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col
                    xs={2}
                    sm={2}
                    lg={2}
                    className="d-flex align-items-center">
                    <img
                      src={
                        logo === ""
                          ? `${props.data.eimg}?${Date.now()}`
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
              <Col xs={12} sm={12} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Aadhar Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="aadhar"
                    maxLength={12}
                    onChange={handleInputChange}
                    defaultValue={props.data.aadhar}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Pan Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="panno"
                    maxLength={10}
                    onChange={handleInputChange}
                    defaultValue={props.data.panno}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="desig"
                    onChange={handleInputChange}
                    defaultValue={props.data.designation}
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
      <SuccessfullModal
        message={msg}
        show={success}
        onHide={() => setSuccess(false)}
      />
    </>
  );
};

export default EditEmpModal;
