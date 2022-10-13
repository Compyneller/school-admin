import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { routes } from "../routes";
import "./Layout.scss";
import { AnimatePresence, motion } from "framer-motion";
import { ToggleState } from "../context/Toggle";
const Layout = () => {
  const sidebarToggle = useContext(ToggleState);
  const { toggleSidebar } = sidebarToggle;
  const [width, setWidth] = useState("");
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);

  return (
    <div className="layout-container ">
      <motion.div
        animate={{
          width: `${toggleSidebar ? "0px" : width < 950 ? "90%" : "15%"}`,
        }}
        transition={{
          type: "spring",
          bounce: 0.6,
          duration: 3,
        }}
        className="sidebar-container">
        <Sidebar />
      </motion.div>
      <motion.div
        animate={{ width: `${toggleSidebar ? "100%" : "85%"}` }}
        transition={{
          type: "spring",
          bounce: 0.6,
          duration: 3,
        }}
        className="home-container">
        <AnimatePresence>
          <Routes>
            {routes.map((items, index) => {
              return (
                <Route path={items.path} element={items.element} key={index} />
              );
            })}
          </Routes>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Layout;
