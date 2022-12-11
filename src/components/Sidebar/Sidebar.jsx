import { useEffect, useState } from "react";
import { SideBarData, vendorMenu } from "../../Data/Data";
import "./SideBar.scss";
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
    </div>
  );
};

export default Sidebar;
