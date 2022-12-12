import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { routes } from "../routes";
import "./Layout.scss";
import { AnimatePresence, motion } from "framer-motion";
import { ToggleState } from "../context/Toggle";
import NavBarComp from "../components/NavBarComp/NavBarComp";
import { vendorRoutes } from "../vendor.routes";
const Layout = () => {
  const location = useLocation();
  const sidebarToggle = useContext(ToggleState);
  const { toggleSidebar } = sidebarToggle;
  const [condRoutes, setCondRoutes] = useState([]);
  const navigate = useNavigate();
  const [width, setWidth] = useState("");
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);
  useEffect(() => {
    return JSON.parse(localStorage.getItem("user"))?.ugroup === "ADMINISTRATOR"
      ? setCondRoutes(routes)
      : setCondRoutes(vendorRoutes);
  }, []);
  useEffect(() => {
    return JSON.parse(localStorage.getItem("user"))?.ugroup === "ADMINISTRATOR"
      ? setScroll(false)
      : setScroll(true);
  }, []);

  if (localStorage.getItem("user")) {
    return (
      <>
        <NavBarComp />
        <div className="layout-container ">
          <motion.div
            animate={{
              width: `${toggleSidebar ? "0px" : width < 950 ? "90%" : "15%"}`,
            }}
            transition={{
              type: "tween",
              // bounce: 0.6,
              duration: 0.5,
            }}
            className="sidebar-container">
            <Sidebar />
          </motion.div>
          <motion.div
            animate={{ width: `${toggleSidebar ? "100%" : "85%"}` }}
            transition={{
              type: "tween",
              // bounce: 0.6,
              duration: 0.5,
            }}
            className="home-container">
            {scroll && (
              <marquee behavior="" direction="" className="pt-5">
                <h5 className="text-danger">KYC NOT VERIFIED</h5>
              </marquee>
            )}
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </motion.div>
        </div>
      </>
    );
  } else {
    navigate("/");
  }
};

export default Layout;
