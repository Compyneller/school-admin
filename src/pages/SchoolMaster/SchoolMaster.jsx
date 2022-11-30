import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Table, Form } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import AddSchoolModal from "./AddSchoolModal";

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
  const { fetchAllMaster, allMaster } = school;
  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/sch_list.php");
  }, []);
  return (
    <Container className="py-5">
      <Card>
        <Card.Body className="d-flex justify-content-between align-items-center">
          <h1>School Master</h1>
          <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              <i className="fa-solid fa-plus"></i>
            </Button>
            <Button variant="danger">
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
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>School Name</th>
            <th>Contact Person</th>
            <th>Mobile</th>
            <th>School Image</th>
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
                    onChange={(e) => setRadio(e.target.value)}
                  />
                </td>
                <td>{items.sch_id}</td>
                <td>{items.sch_name}</td>
                <td>{items.contact_person}</td>
                <td>{items.mob}</td>
                <td>
                  <img src={items.sch_img} width={100} alt={items.sch_img} />
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
      <AddSchoolModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
};

export default SchoolMaster;
