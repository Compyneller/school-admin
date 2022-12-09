import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import Toastify from "toastify-js";
const containerVariance = {
  ini: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
  ani: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
  exi: {
    x: "-85%",
    opacity: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};
const ChangeLvlPass = () => {
  const [userName, setUserName] = useState([]);
  const [user, setUser] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  useEffect(() => {
    const fetchUserName = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("uid", JSON.parse(localStorage.getItem("user")).uid);
      const data = await axios.post(
        "https://dstservices.in/api/aduser_slist.php",
        body
      );
      setUserName(data);
    };
    fetchUserName();
  }, []);
  useEffect(() => {
    const fetchUserPassword = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("uid", user);
      const data = await axios.post(
        "https://dstservices.in/api/get_userpass.php",
        body
      );

      setOldPass(data?.data?.oldpass[0]?.pass);
    };
    fetchUserPassword();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("uname", user);
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
    <motion.div
      variants={containerVariance}
      initial="ini"
      animate="ani"
      className="w-100 "
      exit="exi">
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h1>Change Level Password</h1>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Select
                  value={user}
                  onChange={(e) => setUser(e.target.value)}>
                  <option>Select User</option>
                  {userName?.data?.userlist?.map((items, index) => {
                    return (
                      <option value={items.userid} key={index}>
                        {items.userid}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Old Password"
                  value={oldPass}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Change Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </motion.div>
  );
};

export default ChangeLvlPass;
