import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { routes } from "../routes";
import "./Layout.scss";
import { AnimatePresence, motion } from "framer-motion";
import { ToggleState } from "../context/Toggle";
import NavBarComp from "../components/NavBarComp/NavBarComp";
const Layout = () => {
  const sidebarToggle = useContext(ToggleState);
  const { toggleSidebar } = sidebarToggle;
  const navigate = useNavigate();
  const [width, setWidth] = useState("");
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);
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
            <AnimatePresence>
              <Routes>
                {routes.map((items, index) => {
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
