import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import Toastify from "toastify-js";
const ChangePass = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("uname", JSON.parse(localStorage.getItem("user")).uid);
      body.append("opass", oldPass);
      body.append("npass", newPass);

      const data = await axios.post(
        "https://dstservices.in/api/admin_changepass.php",
        body
      );

      Toastify({
        text: data?.data?.change_password?.response_desc,

        duration: 3000,
      }).showToast();
      setNewPass("");
      setOldPass("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h1>Change Password</h1>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body>
            <Row className="d-flex align-items-center justify-content-center">
              <Col xs={12} sm={12} md={8} lg={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                      type="email"
                      value={JSON.parse(localStorage.getItem("user")).uid}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Old Password"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                    />
                  </Form.Group>
                  <Row className="g-3">
                    <Col xs={10} sm={10} md={10} lg={10}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type={showPass ? "text" : "password"}
                          placeholder="Enter New Password"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      xs={2}
                      sm={2}
                      md={2}
                      lg={2}
                      className="d-flex align-items-center">
                      <Button
                        className="w-100 mt-3"
                        variant="warning"
                        onClick={() => setShowPass(!showPass)}>
                        <FaEye />
                      </Button>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit">
                    Change Password
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ChangePass;
