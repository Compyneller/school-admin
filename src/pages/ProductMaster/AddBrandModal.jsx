import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import SuccessfullModal from "../../components/SuccessfullModal/SuccessfullModal";
import { ToggleState } from "../../context/Toggle";

const AddBrandModal = (props) => {
  const { fetchAllMaster } = useContext(ToggleState);
  const [brand, setBrand] = useState("");
  const [logo, setLogo] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("bname", brand);
      const data = await axios.post(
        "https://dstservices.in/api/brand_add.php",
        body
      );
      if (data?.data?.brandadd?.response_desc === "Data Saved Successfully") {
        setMsg(data?.data?.brandadd?.response_desc);
        const file = new FormData();
        file.append("imagefor", "BRAND");
        file.append("imageid", data?.data?.brandadd?.bid);
        file.append("image", logo);
        const fileData = await axios.post(
          "https://dstservices.in/api/filesup.php",
          file
        );

        if (fileData?.data?.msg === "Successful") {
          props.onHide();
          setSuccess(true);
          setBrand("");
          setLogo("");
          fetchAllMaster("https://dstservices.in/api/brand_list.php");
        } else {
          window.alert("Something Wrong");
        }
      } else {
        setMsg(data?.data?.brandadd?.response_desc);
        props.onHide();
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
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>
            <Row className="g-3">
              <Col xs={8} sm={8} md={8} lg={8}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Choose Brand Logo</Form.Label>
                  <Form.Control
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleFile(e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} className="d-flex">
                <img
                  src={
                    logo === ""
                      ? "https://img.icons8.com/fluency/512/image.png"
                      : prevImage
                  }
                  alt=""
                  height={70}
                  style={{ objectFit: "cover" }}
                  className="w-100 my-auto"
                />
              </Col>
            </Row>
            <Button type="submit">Submit</Button>
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

export default AddBrandModal;
