import Order from "./vendor-pages/Order/Order";
import Profile from "./vendor-pages/Profile/Profile";
import Reports from "./vendor-pages/Reports/Reports";
import KYCUpload from "./vendor-pages/Tools/KYCUpload/KYCUpload";
import PendingOrderDetail from "./vendor-pages/VendorHome/PendingOrderDetail";
import VendorHome from "./vendor-pages/VendorHome/VendorHome";
import VendorProductMaster from "./vendor-pages/VendorProductMaster/VendorProductMaster";

export const vendorRoutes = [
  {
    path: "/home",
    element: <VendorHome />,
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
  {
    path: "/order-detail:id",
    element: <PendingOrderDetail />,
  },
  {
    path: "/vendor-orders",
    element: <Order />,
  },
  {
    path: "/vendor-reports",
    element: <Reports />,
  },
];
