import { lazy } from "react";
const AboutUs = lazy(() => import("./pages/AboutUs"));
const CategoryMaster = lazy(() =>
  import("./pages/CategoryMaster/CategoryMaster")
);
const ChangeLvlPass = lazy(() => import("./pages/ChangeLvlPass/ChangeLvlPass"));
const ChangePass = lazy(() => import("./pages/ChangePass/ChangePass"));
const CoupanMaster = lazy(() => import("./pages/CoupanMaster/CoupanMaster"));
const CourierMaster = lazy(() => import("./pages/CourierMaster/CourierMaster"));
const EmployeeMaster = lazy(() =>
  import("./pages/EmployeeMaster/EmployeeMaster")
);
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const ProductMaster = lazy(() => import("./pages/ProductMaster/ProductMaster"));
const SchoolMaster = lazy(() => import("./pages/SchoolMaster/SchoolMaster"));
const UserAllocation = lazy(() =>
  import("./pages/UserAllocation/UserAllocation")
);
const VendorList = lazy(() => import("./pages/VendorList/VendorList"));
const VendorMaster = lazy(() => import("./pages/VendorMaster/VendorMaster"));
const VendorViseOrder = lazy(() =>
  import("./pages/VendorViseOrder/VendorViseOrder")
);
const ShoolViseOrder = lazy(() =>
  import("./pages/SchoolViseOrder/ShoolViseOrder")
);
const ViewProductPage = lazy(() =>
  import("./pages/VendorList/ViewProductPage")
);
const PayOutSetting = lazy(() => import("./pages/PayOutSetting/PayOutSetting"));
const ErrorPage = lazy(() => import("./components/ErrorPage"));
const SsizeMaster = lazy(() => import("./pages/SsizeMaster/SsizeMaster"));
export const routes = [
  {
    path: "/*",
    element: <ErrorPage />,
  },
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
  {
    path: "/size-master",
    element: <SsizeMaster />,
  },
];
