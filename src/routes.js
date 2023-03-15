import AboutUs from "./pages/AboutUs";
import CategoryMaster from "./pages/CategoryMaster/CategoryMaster";
import ChangeLvlPass from "./pages/ChangeLvlPass/ChangeLvlPass";
import ChangePass from "./pages/ChangePass/ChangePass";
import CoupanMaster from "./pages/CoupanMaster/CoupanMaster";
import CourierMaster from "./pages/CourierMaster/CourierMaster";
import EmployeeMaster from "./pages/EmployeeMaster/EmployeeMaster";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import ProductMaster from "./pages/ProductMaster/ProductMaster";
import SchoolMaster from "./pages/SchoolMaster/SchoolMaster";
import UserAllocation from "./pages/UserAllocation/UserAllocation";
import VendorList from "./pages/VendorList/VendorList";
import VendorMaster from "./pages/VendorMaster/VendorMaster";
import VendorViseOrder from "./pages/VendorViseOrder/VendorViseOrder";
import ShoolViseOrder from "./pages/SchoolViseOrder/ShoolViseOrder";
import ViewProductPage from "./pages/VendorList/ViewProductPage";
import PayOutSetting from "./pages/PayOutSetting/PayOutSetting";
export const routes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/category-master",
    element: <CategoryMaster />,
  },
  {
    path: "/school-master",
    element: <SchoolMaster />,
  },
  {
    path: "/vendor-master",
    element: <VendorMaster />,
  },
  {
    path: "/product-verification",
    element: <VendorList />,
  },
  {
    path: "/brand-master",
    element: <ProductMaster />,
  },
  {
    path: "/user-allocation",
    element: <UserAllocation />,
  },
  {
    path: "/change-password",
    element: <ChangePass />,
  },
  {
    path: "/change-level-password",
    element: <ChangeLvlPass />,
  },
  {
    path: "/employee-master",
    element: <EmployeeMaster />,
  },
  {
    path: "/courier-master",
    element: <CourierMaster />,
  },
  {
    path: "/coupon-master",
    element: <CoupanMaster />,
  },
  {
    path: "/vendor-order",
    element: <VendorViseOrder />,
  },
  {
    path: "/school-order",
    element: <ShoolViseOrder />,
  },
  {
    path: "/view-product:id",
    element: <ViewProductPage />,
  },
  {
    path: "/payout-setting",
    element: <PayOutSetting />,
  },
];
