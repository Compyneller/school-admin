import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";

const AddBrandModal = (props) => {
  const { fetchAllMaster } = useContext(ToggleState);
  const [brand, setBrand] = useState("");
  const [logo, setLogo] = useState("");

  const handleFile = (e) => {
    if (e.target.files[0].size > 2097152) {
      window.alert("Image must be under 2 M.B");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
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
        const file = new FormData();
        file.append("imagefor", "BRAND");
        file.append("imageid", data?.data?.brandadd?.bid);
        file.append("image", logo);
        const fileData = await axios.post(
          "https://dstservices.in/api/filesup.php",
          file
        );
        console.log(fileData?.data?.msg);
        if (fileData?.data?.msg === "Successful") {
          props.onHide();
          fetchAllMaster("https://dstservices.in/api/brand_list.php");
        } else {
          window.alert("Something Wrong");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton></Modal.Header>
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
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choose Brand Logo</Form.Label>
            <Form.Control
              accept="image/*"
              type="file"
              onChange={(e) => handleFile(e)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBrandModal;
