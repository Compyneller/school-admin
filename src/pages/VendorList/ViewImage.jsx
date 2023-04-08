import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";

const ViewImage = (props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [imageList, setImageList] = useState([]);
  const imageRef = useRef();
  useEffect(() => {
    const fetchImageList = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("pid", props.data.pid);
      const { data } = await axios.post(
        "https://dstservices.in/api/vendor_getprod_photo.php",
        body
      );
      setImageList(data);
    };
    fetchImageList();
  }, [props.data.pid]);

  const downloadImage = () => {
    fetch(imageRef?.current?.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };
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
                  ref={imageRef}
                  src={selectedImage ? selectedImage : props.data.pimg}
                  height={400}
                  style={{ objectFit: "contain", aspectRatio: 3 / 2 }}
                  alt=""
                  className="w-100"
                />
              </Card.Body>
              <Card.Footer>
                <Button onClick={downloadImage}>Download Image</Button>
              </Card.Footer>
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
