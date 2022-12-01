import axios from "axios";
import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import SuccessModal from "./SuccessModal";

const ApproveModal = (props) => {
  const vendorList = useContext(ToggleState);
  const [modalShow, setModalShow] = useState(false);
  const [stsData, setStsData] = useState([]);
  const { fetchAllMaster } = vendorList;
  const handleClick = async (id, ists) => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("pid", id);
    body.append("psts", ists);
    try {
      const data = await axios.post(
        "https://dstservices.in/api/verify_prod.php",
        body
      );
      setStsData(data);
      if (
        data?.data?.product_verification?.response_desc ===
          "Product Verified" ||
        "Product Blocked"
      ) {
        props.onHide();
        setModalShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <p className="text-center">
            {props.items.sts === "YES"
              ? "Do You Want To verify the Product"
              : "Do You Want To Reject The Product"}
          </p>
          <Button
            className="mx-auto"
            onClick={() => handleClick(props?.items?.pid, props?.items?.sts)}>
            Continue
          </Button>
        </Modal.Body>
      </Modal>
      <SuccessModal
        data={stsData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default ApproveModal;
