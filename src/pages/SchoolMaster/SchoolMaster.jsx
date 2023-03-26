import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Table, Form, Spinner } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import AddSchoolModal from "./AddSchoolModal";
import { motion } from "framer-motion";
import axios from "axios";
import EditSchoolModal from "./EditSchoolModal";
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
const SchoolMaster = () => {
  const [modalShow, setModalShow] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [radio, setRadio] = useState("");
  const [detail, setDetail] = useState({
    cat: "",
    catid: "",
    pcatid: "",
    sortno: "",
  });
  const school = useContext(ToggleState);
  const { fetchAllMaster, allMaster, loading } = school;
  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/sch_list.php");
  }, []);
  const handleDelete = async () => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("sch_id", radio.sch_id);
    body.append("sch_name", radio.sch_name);
    body.append("affno", radio.affno);
    const { data } = await axios.post(
      "https://dstservices.in/api/sch_del.php",
      body
    );
    if (data?.sch_del?.response_desc === "Data Removed Successfully") {
      fetchAllMaster("https://dstservices.in/api/sch_list.php");
    }
  };

  const changeStatus = async (id, sts) => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("sch_id", id);
    body.append("bsts", sts === "OPEN" ? "CLOSE" : "OPEN");
    const { data } = await axios.post(
      "https://dstservices.in/api/sch_blockupdate.php",
      body
    );

    if (data?.sch_blocksts?.response_desc === "Data Saved Successfully") {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      window.alert(data?.sch_blocksts?.response_desc);
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
            <h1>School Master</h1>
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
            <h5 className="my-auto ms-3">School List</h5>
          </Card.Body>
        </Card>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th>School Name</th>
                <th>Contact Person</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>School Image</th>
                <th>Agreement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allMaster?.data?.schlist?.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Form.Check
                        inline
                        name="group1"
                        type="radio"
                        id={`${items.category}`}
                        value={items.category}
                        onChange={() => setRadio(items)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{items.sch_name}</td>
                    <td>{items.contact_person}</td>
                    <td>{items.mob}</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => changeStatus(items.sch_id, items.blocksts)}
                      className={`text-${
                        items.blocksts === "OPEN" ? "success" : "danger"
                      } `}>
                      {items.blocksts}
                    </td>
                    <td>
                      <img
                        src={`${items.sch_img}?${Date.now()}`}
                        width={50}
                        height={50}
                        style={{ objectFit: "contain" }}
                      />
                    </td>
                    <td>
                      <img
                        src={`${items.agr_img}?${Date.now()}`}
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setDetail(items);
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
        )}
        <AddSchoolModal show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
      <EditSchoolModal
        data={detail}
        show={editModal}
        onHide={() => setEditModal(false)}
      />
    </motion.div>
  );
};

export default SchoolMaster;
