import { SideBarData } from "../../Data/Data";
import "./SideBar.scss";
import SidebarItems from "./SidebarItems";
const Sidebar = () => {
  return (
    <div className="d-flex px-3 flex-column align-items-center">
      <br />
      {SideBarData.map((items, index) => {
        return <SidebarItems items={items} key={index} />;
      })}
    </div>
  );
};

export default Sidebar;
