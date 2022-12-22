import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import UploadFile from "../../components/UploadFile/UploadFile";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

const AddMultipleImage = (props) => {
  const mapArray = [1, 2, 3, 4];
  const [allImage, setAllImage] = useState([]);
  useEffect(() => {
    const fetchAllImages = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("pid", props.data.pid);
      const imageData = await axios.post(
        "https://dstservices.in/api/vendor_getprod_photo.php",
        body
      );
      setAllImage(imageData);
    };
    fetchAllImages();
  }, [props.data.pid]);
  console.log(allImage?.data?.dprodlist);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          {allImage?.data?.dprodlist == undefined
            ? mapArray.map((items, index) => {
                return (
                  <Col xs={12} sm={12} md={6} lg={6} key={index}>
                    <UploadFile items={items} index={index} data={props.data} />
                  </Col>
                );
              })
            : allImage?.data?.dprodlist.map((items, index) => {
                return (
                  <Col xs={12} sm={12} md={6} lg={6} key={index}>
                    <UploadFile items={items} index={index} data={props.data} />
                  </Col>
                );
              })}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddMultipleImage;
