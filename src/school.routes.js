import Home from "./SchoolPages/Home/Home";
import ViewOrder from "./SchoolPages/ViewOrder";
import ViewProfile from "./SchoolPages/ViewProfile/ViewProfile";
import PendingOrderDetail from "./vendor-pages/VendorHome/PendingOrderDetail";

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
