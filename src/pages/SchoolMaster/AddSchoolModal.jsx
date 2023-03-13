import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import SuccessfullModal from "../../components/SuccessfullModal/SuccessfullModal";
import { ToggleState } from "../../context/Toggle";

const AddSchoolModal = (props) => {
  const [district, setDistrict] = useState([]);
  const [agreement, setAgreement] = useState("");
  const [aggPrev, setAggPrev] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [logo, setLogo] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [allInputs, setAllInputs] = useState({
    sch_name: "",
    affno: "",
    contact_person: "",
    mob: "",
    alt_mob: "",
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
  const handleAgreement = (e) => {
    if (e.target.files[0].size > 2097152) {
      window.alert("Image must be under 2 M.B");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setAggPrev(reader.result);
        var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setAgreement(strImage);
      };
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("sch_name", allInputs.sch_name);
      body.append("affno", allInputs.affno);
      body.append("contact_person", allInputs.contact_person);
      body.append("mob", allInputs.mob);
      body.append("alt_mob", allInputs.alt_mob);
      body.append("state", allInputs.state);
      body.append("district", allInputs.district);
      body.append("city", allInputs.city);
      body.append("pinno", allInputs.pinno);
      const data = await axios.post(
        "https://dstservices.in/api/sch_add.php",
        body
      );
      if (data?.data?.schadd?.response_desc === "Data Saved Successfully") {
        // ============================file upload ===========================================================

        const file = new FormData();
        file.append("imagefor", "SCHOOL_PER");
        file.append("imageid", data?.data?.schadd?.sch_id);
        file.append("image", logo);
        await axios.post("https://dstservices.in/api/filesup.php", file);
        const fileAgreement = new FormData();
        fileAgreement.append("imagefor", "SCHOOL_AGR");
        fileAgreement.append("imageid", data?.data?.schadd?.sch_id);
        fileAgreement.append("image", agreement);
        await axios.post(
          "https://dstservices.in/api/filesup.php",
          fileAgreement
        );
        //  ============file uplaod end ================

        fetchAllMaster("https://dstservices.in/api/sch_list.php");
        setMsg(data?.data?.schadd?.response_desc);
        setAggPrev("");
        setPrevImage("");
        props.onHide();
        setSuccess(true);
      } else {
        setMsg(data?.data?.schadd?.response_desc);
        props.onHide();
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
            Add School Master
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>School Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="sch_name"
                    placeholder="Enter School Name"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Affiliation Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="affno"
                    placeholder="Enter Affiliated Number"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact_person"
                    placeholder="Enter Contact Person"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="mob"
                    placeholder="Enter Contact Number"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Alternate Contact Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="alt_mob"
                    placeholder="Enter Alternate Contact Number"
                    onChange={(e) => handleChange(e)}
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
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    type="number"
                    name="pinno"
                    placeholder="Enter Pin Code"
                    onChange={(e) => handleChange(e)}
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
                          ? "https://img.icons8.com/fluency/512/image.png"
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
              <Col xs={6} sm={6} md={6} lg={6}>
                <Row className="g-3">
                  <Col xs={9} sm={9} md={9} lg={9}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Choose Agreement</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAgreement(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={3} sm={3} md={3} lg={3} className="d-flex">
                    <img
                      src={
                        agreement === ""
                          ? "https://img.icons8.com/fluency/512/image.png"
                          : aggPrev
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

export default AddSchoolModal;
