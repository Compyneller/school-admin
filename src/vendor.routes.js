import AboutUs from "./pages/AboutUs";
import CategoryMaster from "./pages/CategoryMaster/CategoryMaster";
import ChangeLvlPass from "./pages/ChangeLvlPass/ChangeLvlPass";
import ChangePass from "./pages/ChangePass/ChangePass";
import EmployeeMaster from "./pages/EmployeeMaster/EmployeeMaster";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import ProductMaster from "./pages/ProductMaster/ProductMaster";
import SchoolMaster from "./pages/SchoolMaster/SchoolMaster";
import UserAllocation from "./pages/UserAllocation/UserAllocation";
import VendorList from "./pages/VendorList/VendorList";
import VendorMaster from "./pages/VendorMaster/VendorMaster";
import Profile from "./vendor-pages/Profile/Profile";
import VendorProductMaster from "./vendor-pages/VendorProductMaster/VendorProductMaster";

export const vendorRoutes = [
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/vendor-profile",
    element: <Profile />,
  },
  {
    path: "/vendor-product-master",
    element: <VendorProductMaster />,
  },
];
