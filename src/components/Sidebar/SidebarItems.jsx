import React, { useState } from "react";
import { IoLogOut, IoCaretDownOutline, IoCaretUp } from "react-icons/io5";
import "./SideBar.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const SidebarItems = ({ items }) => {
  const [open, setOpen] = useState(false);
  const style = {
    fontSize: "30px",
  };

  if (items.subMenu) {
    return (
      <>
        <div className="sidebar-items my-1" onClick={() => setOpen(!open)}>
          <div className="sidebar-label-name d-flex align-items-center">
            {items.icon}

            <p className="my-auto ms-2">{items.name}</p>
          </div>
          {!open ? <IoCaretDownOutline /> : <IoCaretUp />}
        </div>
        {open ? (
          <motion.ul
            className="w-100"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "fit-content", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
            }}>
            {items.subMenu.map((items, index) => {
              return (
                <li className="my-2" key={index}>
                  <Link
                    style={{ textDecoration: "none", color: "#ffff" }}
                    to={items.subLink}>
                    {items.subName}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </>
    );
  } else {
    return (
      <Link
        to={items.link}
        className="sidebar-items"
        style={{ textDecoration: "none", color: "#ffff" }}>
        <div className="sidebar-label-name d-flex align-items-center">
          {items.icon}
          <p className="my-auto ms-2">{items.name}</p>
        </div>
      </Link>
    );
  }
};

export default SidebarItems;
