import React, { useEffect } from "react";
import { useContext } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import { TbListDetails } from "react-icons/tb";
const CourierTable = ({ setRadio }) => {
  const { fetchAllMaster, allMaster } = useContext(ToggleState);
  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/courier_list.php");
  }, []);
  return (
    <>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Packaging Amount</th>
            <th>Courier Amount</th>
            <th>Distance</th>
            <th>Relation</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {allMaster?.data?.courierlist?.map((items, index) => {
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
                {Object.values(items).map((subItems, idx) => {
                  return <td>{subItems}</td>;
                })}
                {/* <td>{items.distance}</td>
                <td>{items.packagingamt}</td>
                <td>{items.relation}</td> */}

                {/* <td>
                  <Button variant="outline-primary">
                    <TbListDetails />
                  </Button>
                </td> */}
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

export default CourierTable;
