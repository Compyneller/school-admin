import {
  FaHome,
  FaTools,
  FaBook,
  FaFingerprint,
  FaShoppingCart,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { HiDocumentReport } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
export const SideBarData = [
  {
    name: "Home",
    link: "/home",
    icon: <FaHome />,
  },
  {
    name: "Tools",
    icon: <FaTools />,
    subMenu: [
      {
        subName: "Change Password",
        subLink: "/change-password",
      },
      {
        subName: "Change Level Password",
        subLink: "/change-level-password",
      },
      {
        subName: "User Allocation",
        subLink: "/user-allocation",
      },
      {
        subName: "User Priviledges",
        subLink: "/user-priviledge",
      },
      {
        subName: "Payout Setting",
        subLink: "/payout-setting",
      },
    ],
  },
  {
    name: "Master",
    icon: <FaBook />,
    subMenu: [
      {
        subName: "School Master",
        subLink: "/school-master",
      },
      {
        subName: "Vendor Master",
        subLink: "/vendor-master",
      },
      {
        subName: "Company Master",
        subLink: "/company-master",
      },
      {
        subName: "Category Master",
        subLink: "/category-master",
      },
      {
        subName: "Brand Master",
        subLink: "/brand-master",
      },
      {
        subName: "Employee Master",
        subLink: "/employee-master",
      },
      {
        subName: "Courier Master",
        subLink: "/courier-master",
      },
      {
        subName: "Coupon Master",
        subLink: "/coupon-master",
      },
    ],
  },
  {
    name: "Verification",
    icon: <FaFingerprint />,
    subMenu: [
      {
        subName: "Product Verification",
        subLink: "/product-verification",
      },
      {
        subName: "Vendor Verification",
        subLink: "/vendor-verification",
      },
      {
        subName: "School Verification",
        subLink: "/school-verification",
      },
    ],
  },
  {
    name: "Orders",
    icon: <FaShoppingCart />,
    subMenu: [
      {
        subName: "Vendor Vise Order",
        subLink: "/vendor-order",
      },
      {
        subName: "School Vise Order",
        subLink: "/school-order",
      },
    ],
  },
  {
    name: "Report",
    icon: <HiDocumentReport />,
    subMenu: [
      {
        subName: "Sale Report",
        subLink: "/sale-report",
      },
      {
        subName: "Vendor Progress Received",
        subLink: "/vendor-progress-received",
      },
      {
        subName: "Customer List",
        subLink: "/customer-list",
      },
      {
        subName: "Company Products List",
        subLink: "/company-products-list",
      },
      {
        subName: "Vendor Products List",
        subLink: "/vendor-products-list",
      },
    ],
  },
];
export const vendorMenu = [
  {
    icon: <FaHome />,
    name: "Home",
    link: "/home",
  },
  {
    icon: <BsFillPersonLinesFill />,
    name: "Profile",
    link: "/vendor-profile",
  },
  {
    icon: <FaTools />,
    name: "Tools",
    link: "/vendor-tools",
    subMenu: [
      {
        subName: "Change Password",
        subLink: "/change-vendor-password",
      },
      {
        subName: "KYC Upload",
        subLink: "/vendor-kyc-upload",
      },
    ],
  },

  {
    icon: <RiAdminFill />,
    name: "Master",
    link: "/vendor-master",
    subMenu: [
      {
        subName: "Product Master",
        subLink: "vendor-product-master",
      },
    ],
  },

  {
    icon: <FaShoppingCart />,
    name: "Orders",
    link: "/vendor-orders",
  },
  {
    icon: <HiDocumentReport />,
    name: "Reports",
    link: "/vendor-reports",
  },
];
