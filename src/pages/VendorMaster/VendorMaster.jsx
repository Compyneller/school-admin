import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Form, Table, Button } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import AddVendor from "./AddVendor";
import EditVendorModal from "./EditVendorModal";

const VendorMaster = () => {
  const [radio, setRadio] = useState({});
  const [detail, setDetail] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const master = useContext(ToggleState);
  const { fetchAllMaster, allMaster } = master;
  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/vendor_list.php");
  }, []);
  console.log(radio.vid);
  console.log(radio.vname);
  const handleDelete = async () => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("vid", radio.vid);
    body.append("vname", radio.vname);
    body.append("firm_name", radio.firm_name);
    const { data } = await axios.post(
      "https://dstservices.in/api/vendor_del.php",
      body
    );
    console.log(data);
    if (data?.vendor_del?.response_desc === "Data Removed Successfully") {
      fetchAllMaster("https://dstservices.in/api/vendor_list.php");
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Body className="d-flex justify-content-between align-items-center">
          <h1>Vendor Master</h1>
          <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
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
          <h5 className="my-auto ms-3">Vendor List</h5>
        </Card.Body>
      </Card>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Vendor Name</th>
            <th>Vendor Mobile</th>
            <th>Firm Name</th>
            <th>GST Type</th>
            <th>GST No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allMaster?.data?.vendorlist?.map((items, index) => {
            return (
              <tr key={index}>
                <td>
                  <Form.Check
                    inline
                    name="group1"
                    type="radio"
                    id={`${items.vid}`}
                    onChange={() => setRadio(items)}
                  />
                </td>
                <td>{items.vid}</td>
                <td>{items.vname}</td>
                <td>{items.vmob}</td>
                <td>{items.firm_name}</td>
                <td>{items.gsttype}</td>
                <td>{items.gstno}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setDetail({
                        vid: `${items.vid}`,
                        vname: `${items.vname}`,
                        vmob: `${items.vmob}`,
                        firm_name: `${items.firm_name}`,
                        gsttype: `${items.gsttype}`,
                        gstno: `${items.gstno}`,
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
      <AddVendor show={modalShow} onHide={() => setModalShow(false)} />
      <EditVendorModal
        data={detail}
        show={editModal}
        onHide={() => setEditModal(false)}
      />
    </Container>
  );
};

export default VendorMaster;
