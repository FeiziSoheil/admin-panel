import {
  RiStore2Line,
  RiMessage3Line,
  RiBox3Line,
  RiTicketLine,
} from "react-icons/ri";
import { HiOutlineUsers, HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import { CategoryOutlined } from "@mui/icons-material";
import { BiCategory } from "react-icons/bi";
import { House, Store, Users } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

export default function SideBar({ open, setOpen }) {
  const { isDark } = useContext(ThemeContext);

  const [menus, setMenus] = useState({
    list1: [
      { name: "Dashboard", link: "/", icon: House },
      { name: "Products", link: "/products", icon: Store },
      { name: "Users", link: "/users", icon: Users },
      { name: "Offers", link: "/offers", icon: RiTicketLine },
      { name: "category", link: "/comments", icon: BiCategory },
      { name: "Orders", link: "/orders", icon: RiBox3Line },
    ],
    list2: [
      { name: "Orders", link: "/settings1", icon: RiBox3Line },
      { name: "Offers", link: "/settings2", icon: RiTicketLine },
      { name: "Analytics", link: "/settings3", icon: HiOutlineChartBar },
    ],
    list3: [
      { name: "Help", link: "/settings4", icon: IoMdHelpCircleOutline },
      { name: "Logout", link: "/settings5", icon: HiOutlineLogout },
    ],
  });

  return (
    <div
      className={`${
        isDark ? "bg-[#1E1E2E] text-white border-[#2A2A3C]" : "bg-white"
      } border-r min-h-screen ease-in-out duration-500 px-4 fixed z-40  ${
        open ? "w-64" : "w-[86px]"
      }`}
    >
      {/* header */}
      <div
        className={`${
          !open ? "p-3" : ""
        } relative mb-3 p-3  flex items-center border-b sideBar__header`}
      >
        <div
          className={`duration-1000 py-2  ${
            !open && "opacity-0 translate-x-2 overflow-hidden  "
          }`}
        >
          <p className={`${!open ? "hidden" : ""} font-medium font-poppins`}>
            Parak Group
          </p>
          <p className="text-sm opacity-25 font-inter font-normal">
            TC Company
          </p>
        </div>
        <IoIosArrowDroprightCircle
          className={`absolute right-0 cursor-pointer ${
            !open && "right-0 left-0 mx-auto rotate-180 duration-500 w-6 h-6"
          }`}
          onClick={() => setOpen(!open)}
        />
      </div>
      {/* body */}
      <div className="w-full">
        <div className="flex flex-col items-start">
          <h2 className="mb-2 font-bold opacity-45">Main</h2>
          <div className="w-full">
            {menus.list1.map((menu, i) => (
              <NavLink
                to={menu.link}
                key={i}
                className={({ isActive }) => `
                         group flex items-center text-lg gap-3.5 font-medium px-4 p-2 hover:bg-[#dbeafe] rounded-md
                         ${
                           isDark
                             ? `hover:bg-cardDark ${
                                 isActive ? "bg-cardDark" : ""
                               }`
                             : `hover:bg-[#dbeafe] ${
                                 isActive ? "bg-[#dbeafe]" : ""
                               }`
                         }
                       `}
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open &&
                    "opacity-0 translate-x-28  invisible overflow-hidden"
                  }`}
                >
                  {menu.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-50 bg-white  font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-20 group-hover:duration-300 group-hover:w-fit z-50`}
                >
                  {menu.name}
                </h2>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start mt-2">
          <h2 className="mb-2 font-bold opacity-45">Main</h2>
          <div className="w-full">
            {menus.list2.map((menu, i) => (
              <NavLink
              to={menu.link}
              key={i}
              className={({ isActive }) => `
                group flex items-center text-lg gap-3.5 font-medium px-4 p-2 rounded-md
                ${isDark 
                  ? `hover:bg-cardDark ${isActive ? 'bg-cardDark' : ''}`
                  : `hover:bg-[#dbeafe] ${isActive ? 'bg-[#dbeafe]' : ''}`
                }
              `}
            >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 9}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open &&
                    "opacity-0 translate-x-28 invisible overflow-hidden"
                  }`}
                >
                  {menu.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-50 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-20 group-hover:duration-300 group-hover:w-fit z-50`}
                >
                  {menu.name}
                </h2>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      {/* footer  */}
      <div className="flex flex-col items-start mt-[30px]">
        <h2 className="mb-2 text-xs font-extrabold opacity-45">ACCOUNT</h2>
        <div className="w-full">
          {menus.list3.map((menu, i) => (
            <NavLink
            to={menu.link}
            key={i}
            className={({ isActive }) => `
              group flex items-center text-lg gap-3.5 font-medium px-4 p-2 rounded-md
              ${isDark 
                ? `hover:bg-cardDark ${isActive ? 'bg-cardDark' : ''}`
                : `hover:bg-[#dbeafe] ${isActive ? 'bg-[#dbeafe]' : ''}`
              }
            `}
          >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 12}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 invisible overflow-hidden"
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-50 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-20 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
