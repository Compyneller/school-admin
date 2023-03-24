import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ToastifyComp from "../../components/ToastifyComp";

const ViewProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [altMob, setAltMob] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [enableEdit, setEnableEdit] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const body = new FormData();
        body.append("api", "sajdh23jd823m023uierur32");
        body.append("schid", JSON.parse(localStorage.getItem("user"))?.uid);
        const { data } = await axios.post(
          "https://dstservices.in/api/sch_getinfo.php",
          body
        );
        setLoading(false);
        setData(data?.schlist);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [setData]);
  const handleEdit = async () => {
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("schid", JSON.parse(localStorage.getItem("user"))?.uid);
      body.append("contact_person", contactPerson);
      body.append("alt_mob", altMob);
      const { data } = await axios.post(
        "https://dstservices.in/api/sch_selfedit.php",
        body
      );

      ToastifyComp(data?.sch_edit?.response_desc);
    } catch (error) {
      ToastifyComp(error);
    }
  };
  return (
    <Container className="py-5">
      <Card>
        <Card.Body className="d-flex justify-content-between">
          <h3>{data[0]?.sch_name}</h3>
          <Button onClick={() => setEnableEdit(!enableEdit)}>Edit</Button>
        </Card.Body>
      </Card>
      <br />

      <Card>
        <Card.Body>
          <Row className="g-3">
            {data.map((items, index) => {
              return (
                <Fragment key={index}>
                  <Col xs={12} sm={12} md={6} lg={6}>
                    <Card>
                      <Card.Header>Agreement Image</Card.Header>
                      <Card.Body>
                        <img
                          src={items.agr_img}
                          className="w-100"
                          height={200}
                          style={{ objectFit: "contain" }}
                          alt=""
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6}>
                    <Card>
                      <Card.Header>School Image</Card.Header>
                      <Card.Body>
                        <img
                          src={items.sch_img}
                          className="w-100"
                          height={200}
                          style={{ objectFit: "contain" }}
                          alt=""
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={3}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Contact Person</Form.Label>
                      <Form.Control
                        disabled={enableEdit}
                        defaultValue={items.contact_person}
                        onChange={(e) => setContactPerson(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={3}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Mobile No.</Form.Label>
                      <Form.Control disabled defaultValue={items.mob} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={3}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Alternate Mobile No.</Form.Label>
                      <Form.Control
                        disabled={enableEdit}
                        defaultValue={items.alt_mob}
                        onChange={(e) => setAltMob(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={3}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Aff No.</Form.Label>
                      <Form.Control disabled defaultValue={items.affno} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={3}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>State</Form.Label>
                      <Form.Control disabled defaultValue={items.state} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={3}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>District</Form.Label>
                      <Form.Control disabled defaultValue={items.district} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={3}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>City</Form.Label>
                      <Form.Control disabled defaultValue={items.city} />
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={12} md={4} lg={3}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Pinno</Form.Label>
                      <Form.Control disabled defaultValue={items.pinno} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={3}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>School Name</Form.Label>
                      <Form.Control disabled defaultValue={items.sch_name} />
                    </Form.Group>
                  </Col>
                </Fragment>
              );
            })}
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button disabled={enableEdit} onClick={handleEdit}>
            Submit Edit
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ViewProfile;
