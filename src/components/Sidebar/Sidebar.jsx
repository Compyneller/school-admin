import { useEffect, useState } from "react";
import { SideBarData, vendorMenu } from "../../Data/Data";
import "./SideBar.scss";
import { IoExit } from "react-icons/io5";
import SidebarItems from "./SidebarItems";
const Sidebar = () => {
  const [condSideMenu, setCondSideMenu] = useState([]);
  useEffect(() => {
    return JSON.parse(localStorage.getItem("user"))?.uid === "admin"
      ? setCondSideMenu(SideBarData)
      : setCondSideMenu(vendorMenu);
  }, []);

  return (
    <div className="d-flex px-3 flex-column align-items-center">
      <br />
      {condSideMenu.map((items, index) => {
        return <SidebarItems items={items} key={index} />;
      })}

      <div
        className=" w-100 ps-2 mt-2 d-flex align-items-center"
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
        style={{ cursor: "pointer" }}>
        <IoExit />
        <p className="my-auto ms-2">Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
