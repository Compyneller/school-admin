import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";

const ViewImage = (props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    const fetchImageList = async (id) => {
      console.log(props.data.pid);
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("pid", 1);
      const { data } = await axios.post(
        "https://dstservices.in/api/vendor_getprod_photo.php",
        body
      );
      setImageList(data);
    };
    fetchImageList();
  }, [props.data.pid]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          <Col xs={12} sm={12} lg={9}>
            <Card style={{ height: "100%" }}>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <img
                  src={selectedImage ? selectedImage : props.data.pimg}
                  height={400}
                  style={{ objectFit: "contain", aspectRatio: 3 / 2 }}
                  alt=""
                  className="w-100"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={3}>
            <Row className="g-3">
              {imageList?.dprodlist?.map((items, index) => (
                <Col xs={6} sm={3} lg={12} key={index}>
                  <Card
                    className="w-100"
                    onClick={() => setSelectedImage(items.pimg)}>
                    <Card.Body className="d-flex justify-content-center align-items-center">
                      <img
                        src={items.pimg}
                        height={100}
                        style={{ objectFit: "contain", aspectRatio: 3 / 2 }}
                        className="w-100"
                        alt=""
                      />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ViewImage;
