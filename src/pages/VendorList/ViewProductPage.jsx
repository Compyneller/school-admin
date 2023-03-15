import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
const ViewProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [sideImages, setSideImages] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    window.scroll(0, 0);
    const fetchData = async () => {
      try {
        const body = new FormData();
        body.append("api", "sajdh23jd823m023uierur32");
        body.append("pid", id.replace(":", ""));
        const { data } = await axios.post(
          "https://dstservices.in/api/proddetails_web.php",
          body
        );
        setSideImages(data?.pimg1);
        data?.dprodlist?.map((items) => {
          setProductData(items);
        });
      } catch (error) {
        window.alert(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <Container className="py-2">
      <Link to="/product-verification">
        <Button variant="danger">Back</Button>
      </Link>
      <br />
      <br />
      <Row className="g-3">
        <Col xs={12} sm={12} md={6} lg={6}>
          <Row className="g-3">
            <Col xs={12} sm={12} md={12} lg={9}>
              <Card>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <img
                    src={mainImage ? mainImage : productData.mimg}
                    alt=""
                    className="w-100 product-verification-main-image"
                    style={{ objectFit: "contain" }}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={12} lg={3}>
              <Row className="g-3">
                <Col xs={6} sm={4} md={3} lg={12}>
                  <Card
                    onClick={() => setMainImage(productData.mimg)}
                    style={{ cursor: "pointer" }}>
                    <Card.Body>
                      <img
                        src={productData.mimg}
                        alt=""
                        className="w-100 product-verification-sub-image"
                      />
                    </Card.Body>
                  </Card>
                </Col>
                {sideImages?.map((items, index) => {
                  return (
                    <Col xs={6} sm={4} md={3} lg={12} key={index}>
                      <Card
                        onClick={() => setMainImage(items.pimg)}
                        style={{ cursor: "pointer" }}>
                        <Card.Body>
                          <img
                            src={items.pimg}
                            alt=""
                            className="w-100 product-verification-sub-image"
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Container>
            <h1>{productData.pname}</h1>
            <h5>{productData.pdesc}</h5>
            <p>Brand : {productData.brand}</p>
            <p>
              <span className="text-success">M.R.P : {productData.rate}</span>{" "}
              <span className="text-danger text-decoration-line-through mx-3 fst-italic">
                {productData.mrp}
              </span>
              <span className="text-success fst-italic">
                {(
                  ((+productData.mrp - +productData.rate) / productData.mrp) *
                  100
                ).toFixed(2)}
                % Off
              </span>
            </p>
            <p>Status : {productData.sts}</p>
            <p>Product Status : {productData.p_sts}</p>
            <p>Manufacture : {productData.manufac}</p>
            <p>Tax% : {productData.taxpercent}</p>
            <p>Meta Tag : {productData.metatags}</p>
            <p>Category Name : {productData.catname}</p>
            <p>Vendor Mobile No. : {productData.vmob}</p>
            <p>School Name : {productData.sname}</p>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewProductPage;
