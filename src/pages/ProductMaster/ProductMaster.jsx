import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { ToggleState } from "../../context/Toggle";
import ProductMasterTable from "./ProductMasterTable";
import AddBrandModal from "./AddBrandModal";
import DeleteBrandModal from "./DeleteBrandModal";
import UpdateBrandModal from "./UpdateBrandModal";
import NoRecordFound from "../../components/NoRecordFound";
import SpinnerComp from "../../components/SpinnerComp";

const ProductMaster = () => {
  const { fetchAllMaster, allMaster, loading } = useContext(ToggleState);
  const [modalShow, setModalShow] = useState(false);
  const [radio, setRadio] = useState("");
  const [updateBrand, setUpdateBrand] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    fetchAllMaster("https://dstservices.in/api/brand_list.php");
  }, []);
  return (
    <>
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
        {loading ? (
          <SpinnerComp />
        ) : allMaster?.data?.brandlist?.length > 0 ? (
          <ProductMasterTable
            radio={radio}
            setRadio={setRadio}
            detail={detail}
            setDetail={setDetail}
            data={allMaster}
            show={updateBrand}
            setUpdateBrand={setUpdateBrand}
          />
        ) : (
          <NoRecordFound />
        )}
      </Container>
      <AddBrandModal show={modalShow} onHide={() => setModalShow(false)} />
      <UpdateBrandModal
        show={updateBrand}
        detail={detail}
        onHide={() => setUpdateBrand(false)}
      />
    </>
  );
};

export default ProductMaster;
