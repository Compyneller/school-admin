import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";

const KYCModal = (props) => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vid", props.data.vid);
      const { data } = await axios.post(
        "https://dstservices.in/api/vendor_getkyc.php",
        body
      );
      data?.vkyc?.map((items) => {
        setFetchedData(items);
      });
    };
    fetchData();
  }, [props.data.vid]);
  const handleKYC = async (sts) => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("vid", props.data.vid);
    body.append("kycsts", sts);
    const { data } = await axios.post(
      "https://dstservices.in/api/vendor_verifykyc.php",
      body
    );
    if (data?.vendor_kycsts?.response_desc === "Data Saved Successfully") {
      props.onHide();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      window.alert(data?.vendor_kycsts?.response_desc);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className={`text-${
            props.data.kycsts === "NOT VERIFIED" ? "danger" : "success"
          }`}>
          {props.data.kycsts}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          <Col xs={12} sm={12} md={6} lg={6}>
            <Card>
              <Card.Header as="h5">
                Aadhar No. {fetchedData.aadharno}
              </Card.Header>
              <Card.Body>
                <img
                  src={
                    fetchedData.aadharimg === null
                      ? "https://img.icons8.com/fluency/256/no-image.png"
                      : fetchedData.aadharimg
                  }
                  height={200}
                  style={{ objectFit: "contain" }}
                  alt=""
                  className="w-100"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Card>
              <Card.Header as="h5">Pan No. {fetchedData.panno}</Card.Header>
              <Card.Body>
                <img
                  src={
                    fetchedData.panimg === null
                      ? "https://img.icons8.com/fluency/256/no-image.png"
                      : fetchedData.panimg
                  }
                  height={200}
                  style={{ objectFit: "contain" }}
                  alt=""
                  className="w-100"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Card>
              <Card.Header as="h5">GST No. {fetchedData.gstno}</Card.Header>
              <Card.Body>
                <img
                  src={
                    fetchedData.gstimg === null
                      ? "https://img.icons8.com/fluency/256/no-image.png"
                      : fetchedData.gstimg
                  }
                  height={200}
                  style={{ objectFit: "contain" }}
                  alt=""
                  className="w-100"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Card>
              <Card.Header as="h5">Account No. {fetchedData.acno}</Card.Header>
              <Card.Body>
                <img
                  src={
                    fetchedData.passbookimg === null
                      ? "https://img.icons8.com/fluency/256/no-image.png"
                      : fetchedData.passbookimg
                  }
                  height={200}
                  style={{ objectFit: "contain" }}
                  alt=""
                  className="w-100"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="g-3 w-100">
          <Col xs={6} lg={6}>
            <Button
              className="w-100"
              variant="success"
              onClick={() => handleKYC("VERIFY")}>
              Verify
            </Button>
          </Col>
          <Col xs={6} lg={6}>
            <Button
              className="w-100"
              variant="outline-danger"
              onClick={() => handleKYC("CANCEL")}>
              Reject
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default KYCModal;
