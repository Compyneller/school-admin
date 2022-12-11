import {
  FaHome,
  FaTools,
  FaBook,
  FaFingerprint,
  FaShoppingCart,
  FaUpload,
} from "react-icons/fa";
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineControlCamera } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
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
        subName: "Place Order",
        subLink: "/place-order",
      },
      {
        subName: "Vendor Orders Received",
        subLink: "/vendor-orders-received",
      },
      {
        subName: "Vendor Orders Placed",
        subLink: "/vendor-orders-placed",
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
  {
    name: "Logout",
    icon: <IoLogOut />,
  },
];
export const vendorMenu = [
  {
    icon: <FaHome />,
    name: "Home",
    link: "/home",
  },
  {
    icon: <FaTools />,
    name: "Tools",
    link: "/vendor-tools",
  },
  {
    icon: <RiLockPasswordFill />,
    name: "Tools",
    link: "/vendor-tools",
  },
  {
    icon: <FaUpload />,
    name: "KYC Upload",
    link: "/vendor-kyc-upload",
  },
  {
    icon: <RiAdminFill />,
    name: "Master",
    link: "/vendor-master",
  },
  {
    icon: <MdOutlineControlCamera />,
    name: "Product Master",
    link: "/vendor-product-master",
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
