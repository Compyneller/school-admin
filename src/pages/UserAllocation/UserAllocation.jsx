import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { FaCopy } from "react-icons/fa";
const UserAllocation = () => {
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState([]);
  const [genPassData, setGenPassData] = useState([]);
  useEffect(() => {
    const fetchUserType = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("ctype", userType);
      const data = await axios.post(
        "https://dstservices.in/api/user_slist.php",
        body
      );
      setUserData(data);
    };
    fetchUserType();
  }, [userType]);
  const generatePassword = async () => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("uname", userName);
    const data = await axios.post(
      "https://dstservices.in/api/gen_pass.php",
      body
    );
    setGenPassData(data);
  };
  const createUser = async () => {
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("uname", userName);
      body.append("pass", genPassData?.data?.response_desc);
      body.append("utype", userType);
      const data = await axios.post(
        "https://dstservices.in/api/user_add.php",
        body
      );

      if (data?.data?.useradd?.response_desc === "Data Saved Successfully") {
        Toastify({
          text: data?.data?.useradd?.response_desc,

          duration: 3000,
        }).showToast();
        setUserName("");
        setUserType("");
        window.location.reload();
      } else {
        Toastify({
          text: data?.data?.useradd?.response_desc,

          duration: 3000,
        }).showToast();
        setUserName("");
        setUserType("");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      Toastify({
        text: error,

        duration: 3000,
      }).showToast();
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h1>User Allocation</h1>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Row className="g-3">
            <Col xs={12} md={6} lg={6}>
              {" "}
              <Form.Label>User Type</Form.Label>
              <Form.Select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}>
                <option>Select User Type</option>
                <option value="SELF">SELF</option>
                <option value="SCHOOL">SCHOOL</option>
                <option value="VENDOR">VENDOR</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Form.Label>User Name</Form.Label>
              <Form.Select
                value={userName}
                onChange={(e) => setUserName(e.target.value)}>
                <option>Select User Name</option>
                {userData?.data?.user_slist?.map((items, index) => {
                  return (
                    <option value={items.vid || items.sch_id} key={index}>
                      {items.vid || items.sch_id}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  value={genPassData?.data?.response_desc}
                  placeholder="Father Name"
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  value={genPassData?.data?.response_desc}
                  placeholder="Father Name"
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={2} lg={2}>
              <Form.Label>Generate Password </Form.Label>
              <Button
                variant="info"
                className="w-100"
                onClick={() => generatePassword()}>
                Generate Password
              </Button>
            </Col>
            <Col xs={12} sm={6} md={2} lg={2}>
              <Form.Label>Copy Password </Form.Label>
              <Button
                variant="outline-warning"
                className="w-100"
                onClick={() => {
                  navigator.clipboard.writeText(
                    genPassData?.data?.response_desc
                  );
                  Toastify({
                    text: "Password Copied",

                    duration: 3000,
                  }).showToast();
                }}>
                <FaCopy /> Copy Password
              </Button>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Form.Label>Copy Password </Form.Label>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => createUser()}>
                Create User
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserAllocation;
