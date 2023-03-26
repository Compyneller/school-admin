import { FaHome, FaTools, FaFingerprint, FaShoppingCart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import {
  BsFillPersonLinesFill,
  BsJournalBookmark,
  BsViewList,
} from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { VscTools } from "react-icons/vsc";
import { GoReport } from "react-icons/go";
export const SideBarData = [
  {
    name: "Home",
    link: "/home",
    icon: <BiHomeAlt />,
  },
  {
    name: "Tools",
    icon: <VscTools />,
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
    icon: <BsJournalBookmark />,
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
    icon: <AiOutlineShoppingCart />,
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
    icon: <GoReport />,
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
    link: "/vendor-home",
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
export const schoolMenu = [
  {
    icon: <BiHomeAlt />,
    name: "Home",
    link: "/school-home",
  },
  {
    icon: <BsViewList />,
    name: "View Profile",
    link: "/school-view-profile",
  },
  {
    icon: <MdPassword />,
    name: "Change Password",
    link: "/vendor-orders",
  },
  {
    icon: <AiOutlineShoppingCart />,
    name: "View Orders",
    link: "/school-view-orders",
  },
];
