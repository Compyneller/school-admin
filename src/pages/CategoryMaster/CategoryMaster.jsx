import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Form, Spinner, Table } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import CatModal from "./CatModal";
import EditModal from "./EditModal";
import { motion } from "framer-motion";
const containerVariance = {
  ini: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
  ani: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
  exi: {
    x: "-85%",
    opacity: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};
const CategoryMaster = () => {
  const [modalShow, setModalShow] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [radio, setRadio] = useState("");
  const [detail, setDetail] = useState({
    cat: "",
    catid: "",
    pcatid: "",
    sortno: "",
  });
  const catMaster = useContext(ToggleState);
  const { fetchAllMaster, allMaster, loading } = catMaster;
  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/categorylist.php");
  }, []);
  const handleDelete = async () => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("cat", radio);
    const { data } = await axios.post(
      "https://dstservices.in/api/categorydel.php",
      body
    );
    if (data?.catdel?.response_desc === "Removed Successfully") {
      fetchAllMaster("https://dstservices.in/api/categorylist.php");
    }
  };

  return (
    <motion.div
      className="w-100"
      variants={containerVariance}
      initial="ini"
      animate="ani"
      exit="exi">
      <Container className="py-5">
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <h1>Category Master</h1>
            <div
              className="d-flex align-items-center"
              style={{ gap: "0.5rem" }}>
              <Button variant="primary" onClick={() => setModalShow(true)}>
                <i className="fa-solid fa-plus"></i>
              </Button>
              <Button variant="danger" onClick={() => handleDelete()}>
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ borderRadius: "0" }}>
          <Card.Body className="d-flex  align-items-center">
            <i className="fa-solid fa-list my-auto"></i>
            <h5 className="my-auto ms-3">Category List</h5>
          </Card.Body>
        </Card>

        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : allMaster?.data?.catlist?.length > 0 ? (
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th>Category Name</th>
                <th>Sort Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allMaster?.data?.catlist?.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Form.Check
                        inline
                        name="group1"
                        type="radio"
                        id={`${items.category}`}
                        value={items.category}
                        onChange={(e) => setRadio(e.target.value)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{items.category}</td>
                    <td>{items.sortno}</td>
                    <td>
                      <img
                        src={items.cat_img}
                        width={50}
                        height={50}
                        style={{ objectFit: "contain" }}
                        alt=""
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setDetail({
                            cat: `${items.category}`,
                            catid: `${items.catid}`,
                            pcatid: `${items.pcatid}`,
                            sortno: `${items.sortno}`,
                            image: `${items.cat_img}`,
                          });
                          setEditModal(true);
                        }}>
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h3 className="text-danger mt-4 text-center">No Record Found</h3>
        )}
        <CatModal show={modalShow} onHide={() => setModalShow(false)} />

        <EditModal
          data={detail}
          show={editModal}
          onHide={() => setEditModal(false)}
        />
      </Container>
    </motion.div>
  );
};

export default CategoryMaster;
