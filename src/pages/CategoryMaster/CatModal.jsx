import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
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
      fetchCategoryMaster();
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CatModal;
