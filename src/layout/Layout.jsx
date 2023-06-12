import React, { Suspense, useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { routes } from "../routes";
import "./Layout.scss";
import { ToggleState } from "../context/Toggle";
import NavBarComp from "../components/NavBarComp/NavBarComp";
import { vendorRoutes } from "../vendor.routes";
import { schoolRoutes } from "../school.routes";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
const Layout = () => {
  const location = useLocation();
  const sidebarToggle = useContext(ToggleState);
  const { toggleSidebar } = sidebarToggle;
  const [condRoutes, setCondRoutes] = useState([]);
  const navigate = useNavigate();
  const [width, setWidth] = useState("");
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);
  useEffect(() => {
    return JSON.parse(localStorage.getItem("user"))?.ugroup === "ADMINISTRATOR"
      ? setCondRoutes(routes)
      : JSON.parse(localStorage.getItem("user"))?.ugroup === "VENDOR"
      ? setCondRoutes(vendorRoutes)
      : JSON.parse(localStorage.getItem("user"))?.ugroup === "SCHOOL"
      ? setCondRoutes(schoolRoutes)
      : null;
  }, []);

  if (localStorage.getItem("user")) {
    return (
      <>
        <NavBarComp />
        <div className="layout-container ">
          <div
            style={{
              width: `${toggleSidebar ? "0px" : width < 950 ? "90%" : "15%"}`,
              transition: "250ms ease-in-out",
            }}
            className="sidebar-container">
            <Sidebar />
          </div>
          <div
            style={{
              width: `${toggleSidebar ? "100%" : "85%"}`,
              transition: "250ms ease-in-out",
            }}
            className="home-container">
            <Suspense fallback={<LoadingPage />}>
              <Routes location={location} key={location.key}>
                {condRoutes.map((items, index) => {
                  return (
                    <Route
                      path={items.path}
                      element={items.element}
                      key={index}
                    />
                  );
                })}
              </Routes>
            </Suspense>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/");
  }
};

export default Layout;
