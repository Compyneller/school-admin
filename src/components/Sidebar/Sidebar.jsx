import React, { useContext, useState } from "react";
import { ToggleState } from "../../context/Toggle";
import { motion } from "framer-motion";
import { SideBarData } from "../../Data/Data";
import "./SideBar.scss";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const toggleState = useContext(ToggleState);
  const { toggleSidebar } = toggleState;
  const [toggleDropDown, setToggleDropDown] = useState(false);
  return (
    <div className="d-flex px-3 flex-column align-items-center">
      <br />
      <br />

      {SideBarData.map((items, index) => {
        return (
          <>
            <NavLink
              to={items.link}
              key={index}
              className="sideBar-link"
              onClick={() => setToggleDropDown(!toggleDropDown)}>
              <motion.img
                src={items.icon}
                className="me-3"
                initial={{ scale: 0 }}
                animate={{
                  width: `${toggleSidebar ? "0px" : "30px"}`,
                  scale: 1,
                }}
                exit={{ width: "0px" }}
                transition={{ type: "spring", bounce: 0.5, duration: 3 }}
                alt=""
              />
              {!toggleSidebar && (
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 3 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="my-auto">
                  {items.name}
                </motion.p>
              )}
            </NavLink>
            {items?.subMenu?.map((subItems, index) => {
              return (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    bounce: 0.5,
                    duration: 3,
                  }}
                  key={index}>
                  {toggleDropDown && (
                    <motion.ul
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        bounce: 0.5,
                        duration: 3,
                      }}>
                      <NavLink to={subItems.subLink}>
                        <li>{subItems.subName}</li>
                      </NavLink>
                    </motion.ul>
                  )}
                </motion.div>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default Sidebar;
