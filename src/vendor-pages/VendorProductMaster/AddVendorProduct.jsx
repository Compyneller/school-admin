import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Toastify from "toastify-js";
import ToastifyComp from "../../components/ToastifyComp";
import { ToggleState } from "../../context/Toggle";
const AddVendorProduct = (props) => {
  // =============================================all state =====================================================
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
  });
  // =============================================all state end =====================================================

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

  // ===================================== handle all inputs function ================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // ===================================== handle all inputs function end ================================

  // ===============================================submit form funtion =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("pname", allInputs.pname);
      body.append("vmob", JSON.parse(localStorage.getItem("user")).mob);
      body.append("sku", allInputs.sku);
      body.append("brand", allInputs.brand);
      body.append("manufac", allInputs.manufac);
      body.append("mrp", allInputs.mrp);
      body.append("rate", allInputs.rate);
      body.append("affno", allInputs.affno);
      body.append("tax", allInputs.tax);
      body.append("mtag", allInputs.mtag);
      body.append("edate", allInputs.edate);
      const { data } = await axios.post(
        "https://dstservices.in/api/vendor_productadd.php",
        body
      );
      console.log(data);

      if (data?.productadd?.response_desc === "Data Saved Successfully") {
        // =============file uplaoding ===================
        const file = new FormData();
        file.append("imagefor", "PRODUCT");
        file.append("imageid", data?.productadd?.pid);
        file.append("image", logo);
        await axios.post("https://dstservices.in/api/filesup.php", file);

        // ===============file uploading end ==================

        Toastify({
          text: data?.productadd?.response_desc,
          position: "center",
          duration: 5000,
        }).showToast();
        fetchVendorMaster("https://dstservices.in/api/vendor_productlist.php");

        props.onHide();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        Toastify({
          text: data?.productadd?.response_desc,
          position: "center",
          duration: 5000,
        }).showToast();
        props.onHide();
      }
    } catch (error) {
      ToastifyComp(error?.message);
    }
  };

  // ================================================submit form function end ===============================================
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
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
                    required
                    placeholder="Enter Product Name"
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
                    required
                    name="sku"
                    placeholder="Enter SKU"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Label>Brand</Form.Label>
                <Form.Select name="brand" onChange={handleChange}>
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
                    placeholder="Enter Manufacturer"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>M.R.P</Form.Label>
                  <Form.Control
                    type="tel"
                    required
                    name="mrp"
                    placeholder="Enter MRP"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group>
                  <Form.Label>Rate</Form.Label>
                  <Form.Control
                    type="tel"
                    required
                    name="rate"
                    placeholder="Enter Rate"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Label>Aff No.</Form.Label>
                <Form.Select name="affno" onChange={handleChange}>
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
                    placeholder="Enter Tax"
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
                    placeholder="Enter M Tag"
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
                    placeholder="Enter M Tag"
                    onChange={handleChange}
                  />
                </Form.Group>
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

export default AddVendorProduct;
