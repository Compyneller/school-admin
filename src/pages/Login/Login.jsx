import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftCardCarousel from "./LeftCardCarousel";
const Login = () => {
  const [msg, setMsg] = useState({
    state: false,
    des: "",
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = new FormData();
      body.append("uname", email);
      body.append("pass", password);

      const { data } = await axios.post(
        "https://dstservices.in/api/adlogin.php",
        body
      );
      setMsg({
        state: true,
        des: data.response_desc,
      });
      setTimeout(() => {
        setMsg({
          state: false,
          des: "",
        });
      }, 5000);
      if (data?.response_desc === "Password Successfull") {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/home");
      }
    } catch (error) {
      navigate("/");
    }
  };
  return (
    <div className="login-container">
      {/* <div className="left-circle circle"></div>
      <div className="right-circle circle"></div>
      <div className="bottom-circle circle"></div> */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}>
        <Row className="g-0 w-100">
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={7}
            className="left-card"
            style={{ zIndex: "100" }}>
            <LeftCardCarousel />
          </Col>
          <Col xs={12} sm={12} md={6} lg={5} className="d-flex">
            <Card
              className="shadow login-card w-100 "
              style={{ border: "none", minHeight: "100%" }}>
              {msg.state && (
                <Alert variant="success" className="text-center">
                  {msg.des}
                </Alert>
              )}
              <Card.Body className="d-flex align-items-center">
                <Container>
                  <h1
                    className="text-center mx-auto  "
                    style={{ fontWeight: "bold" }}>
                    Login
                  </h1>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        User
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="User"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      className="w-100 mb-3"
                      variant="primary"
                      type="submit">
                      Login
                    </Button>
                    <Form.Group className="" controlId="formBasicPassword">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Forgot Password
                      </Form.Label>
                    </Form.Group>
                  </Form>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
