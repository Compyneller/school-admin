import React, { useState } from "react";
import { IoCaretDownOutline, IoCaretUp } from "react-icons/io5";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ToggleState } from "../../context/Toggle";
const SidebarItems = ({ items }) => {
  const [open, setOpen] = useState(false);
  const toggleState = useContext(ToggleState);
  const { toggleSidebar, setToggleSidebar } = toggleState;
  const handleNonSubMenuClick = () => {
    return window.innerWidth <= 950 ? setToggleSidebar(!toggleSidebar) : null;
  };
  if (items.subMenu) {
    const handleLinks = () => {
      return window.innerWidth <= 950 ? setToggleSidebar(!toggleSidebar) : null;
    };

    return (
      <>
        <div
          className="sidebar-items my-1"
          onClick={() => {
            setOpen(!open);
            navigator.vibrate(100);
          }}>
          <div className="sidebar-label-name d-flex align-items-center">
            {items.icon}

            <p className="my-auto ms-2">{items.name}</p>
          </div>
          {!open ? <IoCaretDownOutline /> : <IoCaretUp />}
        </div>
        {open ? (
          <ul className="w-100" style={{ transition: "250ms ease-in-out" }}>
            {items.subMenu.map((items, index) => {
              return (
                <li className="my-2" key={index} onClick={() => handleLinks()}>
                  <Link
                    onClick={() => navigator.vibrate(100)}
                    style={{ textDecoration: "none", color: "#ffff" }}
                    to={items.subLink}>
                    {items.subName}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </>
    );
  } else {
    return (
      <Link
        onClick={handleNonSubMenuClick}
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
