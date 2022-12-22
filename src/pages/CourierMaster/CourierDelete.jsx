import axios from "axios";
import React from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import Toastify from "toastify-js";

const CourierDelete = ({ radio }) => {
  const { fetchAllMaster } = useContext(ToggleState);
  const handleDelete = async () => {
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("distance", radio.distance);
      const data = await axios.post(
        "https://dstservices.in/api/courier_del.php",
        body
      );
      if (
        data?.data?.brand_del?.response_desc === "Data Removed Successfully"
      ) {
        fetchAllMaster("https://dstservices.in/api/courier_list.php");
        Toastify({
          text: data?.data?.brand_del?.response_desc,

          duration: 5000,
          position: "center",
        }).showToast();
      } else {
        Toastify({
          text: data?.data?.brand_del?.response_desc,

          duration: 5000,
          position: "center",
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: error,

        duration: 5000,
        position: "center",
      }).showToast();
    }
  };
  return (
    <Button variant="danger" onClick={handleDelete}>
      <i className="fa-solid fa-trash-can"></i>
    </Button>
  );
};

export default CourierDelete;
