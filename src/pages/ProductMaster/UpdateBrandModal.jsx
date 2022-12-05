import axios from "axios";
import React, { useContext, useState } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import SuccessfullModal from "../../components/SuccessfullModal/SuccessfullModal";
import { ToggleState } from "../../context/Toggle";

const UpdateBrandModal = (props) => {
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
    console.log(props.detail.bid);
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("bid", props.detail.bid);
      body.append("bname", brand);
      const data = await axios.post(
        "https://dstservices.in/api/brand_edit.php",
        body
      );
      console.log(data);
      if (
        data?.data?.brand_edit?.response_desc === "Data Updated Successfully"
      ) {
        setMsg(data?.data?.brand_edit?.response_desc);
        const file = new FormData();
        file.append("imagefor", "BRAND");
        file.append("imageid", props.detail.bid);
        file.append("image", logo);
        const fileData = await axios.post(
          "https://dstservices.in/api/filesup.php",
          file
        );

        if (fileData?.data?.msg === "Successful") {
          props.onHide();
          setSuccess(true);
          setBrand("");
          fetchAllMaster("https://dstservices.in/api/brand_list.php");
        } else {
          window.alert("Something Wrong");
        }
        props.onHide();
        fetchAllMaster("https://dstservices.in/api/brand_list.php");
      } else {
        setMsg(data?.data?.brand_edit?.response_desc);
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
          <Modal.Title>Edit Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={props.detail.bname}
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
                      ? `${props.detail.img}?${Date.now()}`
                      : prevImage
                  }
                  alt=""
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

export default UpdateBrandModal;
