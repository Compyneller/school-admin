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

export const vendorRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/vendor-about-us",
    element: <AboutUs />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/vendor-category-master",
    element: <CategoryMaster />,
  },
  {
    path: "/vendor-school-master",
    element: <SchoolMaster />,
  },
  {
    path: "/vendor-vendor-master",
    element: <VendorMaster />,
  },
  {
    path: "/vendor-product-verification",
    element: <VendorList />,
  },
  {
    path: "/vendor-brand-master",
    element: <ProductMaster />,
  },
  {
    path: "/vendor-user-allocation",
    element: <UserAllocation />,
  },
  {
    path: "/vendor-change-password",
    element: <ChangePass />,
  },
  {
    path: "/vendor-change-level-password",
    element: <ChangeLvlPass />,
  },
  {
    path: "/vendor-employee-master",
    element: <EmployeeMaster />,
  },
];
