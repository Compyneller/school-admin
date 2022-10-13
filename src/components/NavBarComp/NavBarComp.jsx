import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";

const NavBarComp = () => {
  const toggleState = useContext(ToggleState);
  const { toggleSidebar, setToggleSidebar } = toggleState;
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
        <Navbar.Brand className="d-flex align-items-center" href="#home">
          <img
            src="https://img.icons8.com/ios-glyphs/344/menu.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            style={{ filter: "invert(1)" }}
            onClick={() => setToggleSidebar(!toggleSidebar)}
          />
          <h3
            className="text-light ms-3 my-auto"
            style={{ fontWeight: "bold" }}>
            Admin
          </h3>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBarComp;
