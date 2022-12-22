import React, { useEffect } from "react";
import { useContext } from "react";
import { Form, Table } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
const CouponTable = ({ setRadio }) => {
  const { fetchAllMaster, allMaster } = useContext(ToggleState);
  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/coupan_list.php");
  }, []);
  return (
    <>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Coupon Name</th>
            <th>Coupon Percent</th>
            <th>Max Value</th>
            <th>Coupon For</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allMaster?.data?.coupanslist?.map((items, index) => {
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
                <td>{items.coupanname}</td>
                <td>{items.coupanper}</td>
                <td>{items.coupanmaxval}</td>
                <td>{items.coupanfor}</td>
                <td>{items.startate}</td>
                <td>{items.enddate}</td>
                <td>{items.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <EditEmpModal
        data={detail}
        show={editModal}
        onHide={() => setEditModal(false)}
      /> */}
    </>
  );
};

export default CouponTable;
