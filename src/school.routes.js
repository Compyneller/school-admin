import { lazy } from "react";

const Home = lazy(() => import("./SchoolPages/Home/Home"));
const ViewOrder = lazy(() => import("./SchoolPages/ViewOrder"));
const ViewProfile = lazy(() => import("./SchoolPages/ViewProfile/ViewProfile"));
const PendingOrderDetail = lazy(() =>
  import("./vendor-pages/VendorHome/PendingOrderDetail")
);

export const schoolRoutes = [
  {
    path: "/school-home",
    element: <Home />,
  },
  {
    path: "/order-detail:id",
    element: <PendingOrderDetail />,
  },
  {
    path: "/school-view-profile",
    element: <ViewProfile />,
  },
  {
    path: "/school-view-orders",
    element: <ViewOrder />,
  },
];
