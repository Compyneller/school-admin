import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { ToggleState } from "../../context/Toggle";
import ProductMasterTable from "./ProductMasterTable";
import AddBrandModal from "./AddBrandModal";
import DeleteBrandModal from "./DeleteBrandModal";
import UpdateBrandModal from "./UpdateBrandModal";
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
const ProductMaster = () => {
  const { fetchAllMaster, allMaster } = useContext(ToggleState);
  const [modalShow, setModalShow] = useState(false);
  const [radio, setRadio] = useState("");
  const [updateBrand, setUpdateBrand] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/brand_list.php");
  }, []);
  return (
    <motion.div
      className="w-100"
      variants={containerVariance}
      initial="ini"
      animate="ani"
      exit="exi">
      <Container className="py-5">
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <h1>Brand Master</h1>
            <div
              className="d-flex align-items-center"
              style={{ gap: "0.5rem" }}>
              <Button variant="primary" onClick={() => setModalShow(true)}>
                <i className="fa-solid fa-plus"></i>
              </Button>
              <DeleteBrandModal radio={radio} />
            </div>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ borderRadius: "0" }}>
          <Card.Body className="d-flex  align-items-center">
            <i className="fa-solid fa-list my-auto"></i>
            <h5 className="my-auto ms-3">Brand List</h5>
          </Card.Body>
        </Card>
        <ProductMasterTable
          radio={radio}
          setRadio={setRadio}
          detail={detail}
          setDetail={setDetail}
          data={allMaster}
          show={updateBrand}
          setUpdateBrand={setUpdateBrand}
        />
      </Container>
      <AddBrandModal show={modalShow} onHide={() => setModalShow(false)} />
      <UpdateBrandModal
        show={updateBrand}
        detail={detail}
        onHide={() => setUpdateBrand(false)}
      />
    </motion.div>
  );
};

export default ProductMaster;
