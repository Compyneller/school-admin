import React, { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
const NavBarComp = () => {
  const toggleState = useContext(ToggleState);
  const { toggleSidebar, setToggleSidebar } = toggleState;
  const navigate = useNavigate();
  return (
    <Navbar
      bg="dark"
      style={{
        height: "50px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: "100",
      }}>
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src="https://img.icons8.com/ios-glyphs/344/menu.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            style={{ filter: "invert(1)", cursor: "pointer" }}
            onClick={() => setToggleSidebar(!toggleSidebar)}
          />
          <h3
            className="text-light ms-3 my-auto"
            style={{ fontWeight: "bold" }}>
            Admin
          </h3>
        </Navbar.Brand>
        <Button
          variant="outline-danger"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}>
          logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavBarComp;
