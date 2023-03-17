import axios from "axios";
import Toastify from "toastify-js";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
const ViewProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [sideImages, setSideImages] = useState([]);
  const [chooseMainImage, setChooseMainImage] = useState("");
  const [chooseImage, setChooseImage] = useState([]);
  const [uploadSts, setUploadSts] = useState(false);
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
  const handleFile = (e, name) => {
    if (e.target.files[0].size > 2097152) {
      window.alert("Image must be under 2 M.B");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setChooseImage((prev) => {
          return [
            ...prev,
            {
              name: `PROD${name}`,
              image: strImage,
            },
          ];
        });
      };
    }
  };
  const handleMainFile = (e) => {
    if (e.target.files[0].size > 2097152) {
      window.alert("Image must be under 2 M.B");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setChooseMainImage(strImage);
      };
    }
  };

  const uploadImage = async () => {
    if (chooseMainImage !== "") {
      setUploadSts(true);
      const file = new FormData();
      file.append("imageid", id.replace(":", ""));
      file.append("imagefor", "PRODUCT");
      file.append("image", chooseMainImage);

      const data = await axios.post(
        "https://dstservices.in/api/filesup.php",
        file
      );
      Toastify({
        text: data?.data?.msg,

        duration: 3000,
      }).showToast();
      setUploadSts(false);
      const uploadFourImage = async (num) => {
        if (num >= chooseImage.length) {
          setUploadSts(false);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return;
        }
        const file = new FormData();
        file.append("imageid", id.replace(":", ""));
        file.append("imagefor", chooseImage[num].name);
        file.append("image", chooseImage[num].image);
        setUploadSts(true);
        const data = await axios.post(
          "https://dstservices.in/api/filesup.php",
          file
        );
        Toastify({
          text: data?.data?.msg,

          duration: 3000,
        }).showToast();
        uploadFourImage(num + 1);
      };
      uploadFourImage(0);
    } else {
      const uploadFourImage = async (num) => {
        if (num >= chooseImage.length) {
          setUploadSts(false);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return;
        }
        const file = new FormData();
        file.append("imageid", id.replace(":", ""));
        file.append("imagefor", chooseImage[num].name);
        file.append("image", chooseImage[num].image);
        setUploadSts(true);
        const data = await axios.post(
          "https://dstservices.in/api/filesup.php",
          file
        );
        Toastify({
          text: data?.data?.msg,

          duration: 3000,
        }).showToast();
        uploadFourImage(num + 1);
      };
      uploadFourImage(0);
    }
  };

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
                    loading="lazy"
                    src={
                      mainImage
                        ? `${mainImage}?${Date.now()}`
                        : `${productData.mimg}?${Date.now()}`
                    }
                    alt=""
                    className="w-100 product-verification-main-image object-fit-contain"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={12} lg={3}>
              <Row className="g-3">
                <Col xs={6} sm={4} md={3} lg={12}>
                  <Card
                    className="onHover-edit-image"
                    onClick={() => setMainImage(productData.mimg)}
                    style={{ cursor: "pointer" }}>
                    <label htmlFor="" className="choose-image-label">
                      <img
                        src="https://img.icons8.com/ios/256/edit-row.png"
                        height={30}
                        width={30}
                        className="object-fit-contain"
                        alt=""
                      />
                    </label>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id={`tooltip-right`}>Edit Image</Tooltip>
                      }>
                      <input
                        className="choose-image"
                        accept="image/*"
                        type="file"
                        onChange={(e) => handleMainFile(e)}
                      />
                    </OverlayTrigger>
                    <Card.Body>
                      <img
                        loading="lazy"
                        src={
                          chooseMainImage === ""
                            ? `${productData.mimg}?${Date.now()}`
                            : `data:image/jpeg;base64,${chooseMainImage}`
                        }
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
                        className="onHover-edit-image"
                        onClick={() => setMainImage(items.pimg)}
                        style={{ cursor: "pointer" }}>
                        <label htmlFor="" className="choose-image-label">
                          <img
                            src="https://img.icons8.com/ios/256/edit-row.png"
                            height={30}
                            width={30}
                            className="object-fit-contain"
                            alt=""
                          />
                        </label>
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id={`tooltip-right`}>Edit Image</Tooltip>
                          }>
                          <input
                            className="choose-image"
                            accept="image/*"
                            type="file"
                            onChange={(e) => handleFile(e, index + 1)}
                          />
                        </OverlayTrigger>
                        <Card.Body>
                          <img
                            loading="lazy"
                            src={
                              chooseImage[index]?.image !== undefined
                                ? `data:image/jpeg;base64,${chooseImage[index]?.image}`
                                : `${items.pimg}?${Date.now()}`
                            }
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
      <br />
      <Button onClick={() => uploadImage()}>
        {uploadSts ? "Uploading..." : "Upload Image"}
      </Button>
    </Container>
  );
};

export default ViewProductPage;
