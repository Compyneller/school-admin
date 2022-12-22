import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import EditEmpModal from "./EditEmpModal";

const EmployeMasterTable = ({ setRadio }) => {
  const [editModal, setEditModal] = useState(false);
  const [detail, setDetail] = useState({});
  const { fetchAllMaster, allMaster } = useContext(ToggleState);
  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/emp_list.php");
  }, []);
  return (
    <>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Employee Name</th>
            <th>Mobile No.</th>
            <th>Image</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allMaster?.data?.emplist?.map((items, index) => {
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
                <td>{index + 1}</td>
                <td>{items.ename}</td>
                <td>{items.mob}</td>
                <td>
                  <img
                    src={`${items.eimg}?${Date.now()}`}
                    height={50}
                    width={50}
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </td>
                <td>{items.designation}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setDetail({
                        eid: `${items.eid}`,
                        ename: `${items.ename}`,
                        mob: `${items.mob}`,
                        altmob: `${items.altmob}`,
                        state: `${items.state}`,
                        district: `${items.district}`,
                        eadd: `${items.eadd}`,
                        fname: `${items.fname}`,
                        state: `${items.state}`,
                        pinno: `${items.pinno}`,
                        panno: `${items.panno}`,
                        eimg: `${items.eimg}`,
                        aadhar: `${items.aadhar}`,
                        designation: `${items.designation}`,
                        dob: `${items.dob}`,
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
      <EditEmpModal
        data={detail}
        show={editModal}
        onHide={() => setEditModal(false)}
      />
    </>
  );
};

export default EmployeMasterTable;
