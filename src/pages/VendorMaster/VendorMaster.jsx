import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Form, Table, Button } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import AddVendor from "./AddVendor";
import EditVendorModal from "./EditVendorModal";
import { motion } from "framer-motion";
import AddButton from "../../components/AddButton/AddButton";
import KYCModal from "./KYCModal";
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
const VendorMaster = () => {
  const [radio, setRadio] = useState({});
  const [detail, setDetail] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [kycModal, setKycModal] = useState(false);
  const [kycData, setKycData] = useState("");
  const master = useContext(ToggleState);
  const { fetchAllMaster, allMaster } = master;
  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/vendor_weblist.php");
  }, []);
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

    if (data?.vendor_del?.response_desc === "Data Removed Successfully") {
      fetchAllMaster("https://dstservices.in/api/vendor_list.php");
    }
  };

  const changeStatus = async (id, sts) => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("vid", id);
    body.append("bsts", sts === "OPEN" ? "CLOSE" : "OPEN");
    const { data } = await axios.post(
      "https://dstservices.in/api/vendor_blockupdate.php",
      body
    );
    if (data?.vendor_blocksts?.response_desc === "Data Saved Successfully") {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      window.alert(data?.vendor_blocksts?.response_desc);
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
            <h1>Vendor Master</h1>
            <div
              className="d-flex align-items-center"
              style={{ gap: "0.5rem" }}>
              <AddButton setShowAddModal={setShowAddModal} />
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
              <th>Father Name</th>
              <th>GST Type</th>
              <th>GST / Certificate No.</th>
              <th>KYC</th>
              <th>Status</th>
              <th>Image</th>
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
                  <td>{items.father_name}</td>
                  <td>
                    {items.gst_reg_type === "Unregistered"
                      ? "Nill"
                      : items.gsttype}
                  </td>
                  <td>{items.gstno}</td>
                  <td
                    className={`text-${
                      items.kycsts === "VERIFIED"
                        ? "success"
                        : items.kycsts === "NOT VERIFIED"
                        ? "warning"
                        : "danger"
                    } `}
                    onClick={() => {
                      setKycModal(true);
                      setKycData(items);
                    }}
                    style={{ cursor: "pointer" }}>
                    {items.kycsts}
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => changeStatus(items.vid, items.blocksts)}
                    className={`text-${
                      items.blocksts === "OPEN" ? "success" : "danger"
                    } `}>
                    {items.blocksts}
                  </td>
                  <td>
                    <img
                      src={`${items.fimg}?${Date.now()}`}
                      height={50}
                      width={50}
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                  </td>
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
                          ftype: `${items.ftype}`,
                          gstno: `${items.gstno}`,
                          state: `${items.state}`,
                          city: `${items.city}`,
                          district: `${items.district}`,
                          fadd: `${items.fadd}`,
                          father_name: `${items.father_name}`,
                          fmob: `${items.fmob}`,
                          state: `${items.state}`,
                          pinno: `${items.pinno}`,
                          panno: `${items.panno}`,
                          fimg: `${items.fimg}`,
                          aadharno: `${items.aadharno}`,
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
        <AddVendor show={showAddModal} onHide={() => setShowAddModal(false)} />
        <EditVendorModal
          data={detail}
          show={editModal}
          onHide={() => setEditModal(false)}
        />
        <KYCModal
          data={kycData}
          show={kycModal}
          onHide={() => setKycModal(false)}
        />
      </Container>
    </motion.div>
  );
};

export default VendorMaster;
