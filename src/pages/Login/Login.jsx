import React, { useContext, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import wave from "../../assets/wave.svg";
import "./Login.scss";
import axios from "axios";
import { ToggleState } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const authState = useContext(ToggleState);
  const [msg, setMsg] = useState({
    state: false,
    des: "",
  });
  const navigate = useNavigate();
  //   const { auth, setAuth } = authState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      if (data?.uid === "admin") {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/home";
        // navigate("/dashboard");
      }
    } catch (error) {
      navigate("/");
    }
  };
  return (
    <div className="login-container">
      <Container className="d-flex justify-content-center align-items-center">
        <h1
          className="text-center mx-auto text-light login-heading"
          style={{
            fontWeight: "bold",
            position: "absolute",
            top: "5rem",
          }}>
          Login
        </h1>
        <Card className="shadow login-card" style={{ border: "none" }}>
          {msg.state && (
            <Alert variant="success" className="text-center">
              {msg.des}
            </Alert>
          )}
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>User</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
