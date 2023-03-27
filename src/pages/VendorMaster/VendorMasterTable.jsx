import React from "react";
import { Table, Form, Button } from "react-bootstrap";

const VendorMasterTable = ({
  data,
  setDetail,
  setEditModal,
  setKycData,
  setKycModal,
  setRadio,
  changeStatus,
}) => {
  return (
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
        {data?.map((items, index) => {
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
                {items.gst_reg_type === "Unregistered" ? "Nill" : items.gsttype}
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
                {items?.kycsts}
              </td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => changeStatus(items.vid, items.blocksts)}
                className={`text-${
                  items.blocksts === "OPEN" ? "success" : "danger"
                } `}>
                {items?.blocksts}
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
  );
};

export default VendorMasterTable;
