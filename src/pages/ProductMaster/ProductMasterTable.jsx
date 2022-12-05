import React from "react";
import { Table, Form, Button } from "react-bootstrap";

const ProductMasterTable = ({ data, setRadio, setUpdateBrand, setDetail }) => {
  console.log(data);
  return (
    <Table responsive bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>#</th>
          <th>Brand Name</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.data?.brandlist?.map((items, index) => {
          return (
            <tr key={index}>
              <td>
                <Form.Check
                  inline
                  name="group1"
                  type="radio"
                  id={`${items.bid}`}
                  value={items.bid}
                  onChange={(e) => setRadio(e.target.value)}
                />
              </td>
              <td>{items.bid}</td>
              <td>{items?.bname}</td>
              <td>
                <img src={items.bimg} height={50} alt="" />
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setDetail({
                      bid: `${items.bid}`,
                      bname: `${items.bname}`,
                      img: `${items.bimg}`,
                    });
                    setUpdateBrand(true);
                  }}>
                  <i className="fa-regular fa-pen-to-square"></i>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ProductMasterTable;
