import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToggleState } from "../../context/Toggle";
const CatModal = (props) => {
  const fetchCatList = useContext(ToggleState);
  const { fetchCategoryMaster } = fetchCatList;
  const [cat, setCat] = useState("");
  const [pCat, setPCat] = useState("");
  const [pcatList, setPcatList] = useState([]);
  const [sortNo, setSortNo] = useState(0);
  const [logo, setLogo] = useState("");
  useEffect(() => {
    const fetchPcat = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      const { data } = await axios.post(
        "https://dstservices.in/api/pcategorylist.php",
        body
      );
      setPcatList(data?.parentcatlist);
    };
    fetchPcat();
  }, []);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("cat", cat);
    body.append("pcat", pCat);
    body.append("sortno", sortNo);
    const { data } = await axios.post(
      "https://dstservices.in/api/categoryadd.php",
      body
    );
    if (data?.catadd?.response_desc === "Saved Successfully") {
      // ============================file upload ===========================================================

      const file = new FormData();
      file.append("imagefor", "CAT");
      file.append("imageid", data?.catadd?.catid);
      file.append("image", logo);
      await axios.post("https://dstservices.in/api/filesup.php", file);

      //  ============file uplaod end ================
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      props.onHide();
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
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Parent Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={pCat}
              onChange={(e) => setPCat(e.target.value)}>
              <option value="main">Main</option>
              {pcatList?.map((items, index) => {
                return (
                  <option value={items.pcatid} key={index}>
                    {items.category}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Sort No.</Form.Label>
            <Form.Control
              type="number"
              placeholder={sortNo}
              value={sortNo}
              onChange={(e) => setSortNo(e.target.value)}
            />
          </Form.Group>

          <Row className="g-3">
            <Col xs={9} sm={9} md={9} lg={9}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose Image</Form.Label>
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
                    : `data:image/jpeg;base64,${logo}`
                }
                alt=""
                height={50}
                style={{ objectFit: "cover" }}
                className="w-100 my-auto"
              />
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CatModal;
