import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { ToggleState } from "../../context/Toggle";
const NavBarComp = () => {
  const toggleState = useContext(ToggleState);
  const [scroll, setScroll] = useState(false);

  const { toggleSidebar, setToggleSidebar } = toggleState;
  useEffect(() => {
    return JSON.parse(localStorage.getItem("user"))?.ugroup === "ADMINISTRATOR"
      ? setScroll(false)
      : setScroll(true);
  }, []);
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
        <Navbar.Brand className="d-flex align-items-center ">
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
            style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {JSON.parse(localStorage.getItem("user")).uid}
          </h3>
        </Navbar.Brand>
        {scroll && <h5 className="text-warning">KYC NOT VERIFIED</h5>}
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
