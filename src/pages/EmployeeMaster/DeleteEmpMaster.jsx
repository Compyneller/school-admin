import axios from "axios";
import React from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";

const DeleteEmpMaster = ({ radio }) => {
  const { fetchAllMaster } = useContext(ToggleState);
  const handleDelete = async () => {
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("eid", radio.eid);
      body.append("ename", radio.ename);
      await axios.post("https://dstservices.in/api/emp_del.php", body);

      fetchAllMaster("https://dstservices.in/api/emp_list.php");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button variant="danger" onClick={() => handleDelete()}>
      <i className="fa-solid fa-trash-can"></i>
    </Button>
  );
};

export default DeleteEmpMaster;
