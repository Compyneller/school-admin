import { lazy } from "react";

const Order = lazy(() => import("./vendor-pages/Order/Order"));
const Profile = lazy(() => import("./vendor-pages/Profile/Profile"));
const Reports = lazy(() => import("./vendor-pages/Reports/Reports"));
const KYCUpload = lazy(() =>
  import("./vendor-pages/Tools/KYCUpload/KYCUpload")
);
const PendingOrderDetail = lazy(() =>
  import("./vendor-pages/VendorHome/PendingOrderDetail")
);
const VendorHome = lazy(() => import("./vendor-pages/VendorHome/VendorHome"));
const VendorProductMaster = lazy(() =>
  import("./vendor-pages/VendorProductMaster/VendorProductMaster")
);

export const vendorRoutes = [
  {
    path: "/vendor-home",
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
