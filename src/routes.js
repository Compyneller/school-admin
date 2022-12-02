import AboutUs from "./pages/AboutUs";
import CategoryMaster from "./pages/CategoryMaster/CategoryMaster";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import ProductMaster from "./pages/ProductMaster/ProductMaster";
import SchoolMaster from "./pages/SchoolMaster/SchoolMaster";
import VendorList from "./pages/VendorList/VendorList";
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
  {
    path: "/product-verification",
    element: <VendorList />,
  },
  {
    path: "/brand-master",
    element: <ProductMaster />,
  },
];
