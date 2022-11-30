import AboutUs from "./pages/AboutUs";
import CategoryMaster from "./pages/CategoryMaster/CategoryMaster";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import SchoolMaster from "./pages/SchoolMaster/SchoolMaster";
import VendorMaster from "./pages/VendorMaster/VendorMaster";

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
];
