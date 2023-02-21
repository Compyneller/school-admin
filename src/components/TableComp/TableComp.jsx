import React from "react";
import { Form, Table } from "react-bootstrap";

const TableComp = ({ tableHeading, tableData, setRadio }) => {
  console.log(tableData);
  return (
    <Table striped responsive bordered hover>
      <thead>
        <tr>
          {tableData?.map((items, index) => {
            console.log(items);
            return (
              <>
                <th>
                  <Form.Check
                    inline
                    name="group1"
                    type="radio"
                    id={`${items.vid}`}
                    onChange={() => setRadio(items)}
                  />
                </th>
                <td>{index + 1}</td>
                {Object.keys(items).map((subItems, idx) => {
                  return <td>{subItems}</td>;
                })}
              </>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData?.map((items, index) => {
          console.log(items);
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
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableComp;
