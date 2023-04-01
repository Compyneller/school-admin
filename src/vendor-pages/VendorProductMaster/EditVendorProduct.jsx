import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Toastify from "toastify-js";
import { ToggleState } from "../../context/Toggle";
const EditVendorProduct = (props) => {
  const { fetchVendorMaster } = useContext(ToggleState);
  const [logo, setLogo] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [affnodata, setAffnoData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [allInputs, setAllInputs] = useState({
    pname: "",
    sku: "",
    brand: "",
    manufac: "",
    mrp: "",
    rate: "",
    affno: "",
    tax: "",
    mtag: "",
    edate: "",
    psts: "",
  });
  useEffect(() => {
    const fetchAffnoData = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      const data = await axios.post(
        "https://dstservices.in/api/sch_slist.php",
        body
      );
      setAffnoData(data);
    };
    fetchAffnoData();
    const fetchBrandData = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      const data = await axios.post(
        "https://dstservices.in/api/brand_slist.php",
        body
      );
      setBrandData(data);
    };
    fetchBrandData();
    return () => {
      fetchAffnoData();
      fetchBrandData();
    };
  }, []);

  // ================================file upload function ==============================================================
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

  // ==================================file upload funtion end =============================================================

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
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("pid", props.data.pid);
    body.append("pname", allInputs.pname || props.data.pname);
    body.append("vmob", JSON.parse(localStorage.getItem("user")).mob);
    body.append("sku", allInputs.sku || props.data.sku);
    body.append("brand", allInputs.brand || props.data.brand);
    body.append("manufac", allInputs.manufac || props.data.manufac);
    body.append("mrp", allInputs.mrp || props.data.mrp);
    body.append("rate", allInputs.rate || props.data.rate);
    body.append("affno", allInputs.affno || props.data.affno);
    body.append("tax", allInputs.tax || props.data.tax);
    body.append("mtag", allInputs.mtag || props.data.mtag);
    body.append("edate", allInputs.edate || props.data.edate);
    body.append("psts", allInputs.psts);
    const { data } = await axios.post(
      "https://dstservices.in/api/vendor_productedit.php",
      body
    );
    if (data?.vendor_edit?.response_desc === "Data Updated Successfully") {
      // =============file uplaoding ===================

      const file = new FormData();
      file.append("imagefor", "PRODUCT");
      file.append("imageid", props.data.pid);
      file.append("image", logo);
      await axios.post("https://dstservices.in/api/filesup.php", file);

      // ===============file uploading end ==================

      Toastify({
        text: data?.vendor_edit?.response_desc,
        position: "center",
        duration: 5000,
      }).showToast();
      fetchVendorMaster("https://dstservices.in/api/vendor_productlist.php");

      props.onHide();
    } else {
      Toastify({
        text: data?.vendor_edit?.response_desc,
        position: "center",
        duration: 5000,
      }).showToast();
      props.onHide();
    }
  };
  console.log(props.data);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="pname"
                    value={allInputs.pname}
                    placeholder={props.data.pname}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>Vendor Mobile</Form.Label>
                  <Form.Control
                    type="tel"
                    disabled
                    placeholder={JSON.parse(localStorage.getItem("user")).mob}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    name="sku"
                    placeholder={props.data.sku}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  defaultValue={props.data.brand}
                  name="brand"
                  onChange={handleChange}>
                  <option>Select Brand</option>
                  {brandData?.data?.brand_slist.map((items, index) => {
                    return (
                      <option value={items.bid} key={index}>
                        {items.bname}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control
                    type="text"
                    name="manufac"
                    placeholder={props.data.manufac}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>M.R.P</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mrp"
                    placeholder={props.data.mrp}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>Rate</Form.Label>
                  <Form.Control
                    type="tel"
                    name="rate"
                    placeholder={props.data.rate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Label>Aff No.</Form.Label>
                <Form.Select
                  defaultValue={props.data.affno}
                  name="affno"
                  onChange={handleChange}>
                  <option>Select Aff No.</option>
                  {affnodata?.data?.sch_slist.map((items, index) => {
                    return (
                      <option value={items.affno} key={index}>
                        {items.sch_name} {items.affno}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>Tax</Form.Label>
                  <Form.Control
                    type="text"
                    name="tax"
                    placeholder={props.data.tax}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>M Tag</Form.Label>
                  <Form.Control
                    type="text"
                    name="mtag"
                    defaultValue={props.data.metatags}
                    placeholder={props.data.mtag}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="edate"
                    placeholder={props.data.edate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Label>Product Status</Form.Label>
                <Form.Select name="brand" onChange={handleChange}>
                  <option>Select Product Status</option>
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSE">CLOSE</option>
                </Form.Select>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
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
                          ? `${props.data.mimg}?${Date.now()}`
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
    </>
  );
};

export default EditVendorProduct;
