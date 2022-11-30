import React from "react";
import { Button, Card, Container, Table } from "react-bootstrap";

const MasterComp = ({ masterHeading, listName }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container>
      <Card>
        <Card.Body className="d-flex justify-content-between align-items-center">
          <h1>{masterHeading}</h1>
          <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              <i className="fa-solid fa-plus"></i>
            </Button>
            <Button variant="danger">
              <i className="fa-solid fa-trash-can"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
      <br />
      <Card style={{ borderRadius: "0" }}>
        <Card.Body className="d-flex  align-items-center">
          <i className="fa-solid fa-list my-auto"></i>
          <h5 className="my-auto ms-3">{listName}</h5>
        </Card.Body>
      </Card>
      <Table responsive bordered hover>
        <thead>
          <tr>
            {tableHeading.map((items, index) => {
              return <th key={index}>{items}</th>;
            })}
          </tr>
        </thead>
      </Table>
    </Container>
  );
};

export default MasterComp;
