import axios from "axios";
import React from "react";
import { useContext } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Toastify from "toastify-js";
import { ToggleState } from "../../context/Toggle";

const DeleteVedorProduct = ({ radio }) => {
  const { fetchVendorMaster } = useContext(ToggleState);
  const handleDelete = async () => {
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("pid", radio.pid);
      body.append("pname", radio.pname);
      const data = await axios.post(
        "https://dstservices.in/api/vendor_productdel.php",
        body
      );
      if (
        data?.data?.product_del?.response_desc === "Data Removed Successfully"
      ) {
        Toastify({
          text: data?.data?.product_del?.response_desc,

          duration: 3000,
        }).showToast();
        fetchVendorMaster("https://dstservices.in/api/vendor_productlist.php");
      } else {
        Toastify({
          text: data?.data?.product_del?.response_desc,

          duration: 3000,
        }).showToast();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`tooltip-top`}>Delete Product</Tooltip>}>
      <Button variant="danger" onClick={() => handleDelete()}>
        <i className="fa-solid fa-trash-can"></i>
      </Button>
    </OverlayTrigger>
  );
};

export default DeleteVedorProduct;
