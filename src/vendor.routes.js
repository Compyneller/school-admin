import Home from "./pages/Home";

import Profile from "./vendor-pages/Profile/Profile";
import KYCUpload from "./vendor-pages/Tools/KYCUpload/KYCUpload";
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
  {
    path: "/vendor-kyc-upload",
    element: <KYCUpload />,
  },
];
