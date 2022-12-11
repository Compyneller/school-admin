import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { BsFillCameraFill } from "react-icons/bs";
import "./Profile.scss";
const Profile = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      body.append("vmob", "6745897970");
      const data = await axios.post(
        "https://dstservices.in/api/vendor_view.php",
        body
      );
      setData(data);
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <>
      <Container className="py-5">
        <div className="profile-container">
          <h1>Vendor Profile</h1>
          <img src={data?.data?.vendorprof[0]?.fimg} alt="" />
          <Button>
            <BsFillCameraFill style={{ fontSize: "35px" }} />
          </Button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Card>
          <Card.Body></Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
