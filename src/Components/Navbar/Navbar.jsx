import React, { useContext } from "react";
import { RiNotificationLine, RiMoonFill, RiSearchLine } from "react-icons/ri";

import { ThemeContext } from "../../Context/ThemeContext";
import { SunDimIcon } from "lucide-react";
import { LuSunDim } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";

export default function Navbar() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const profile = "/image/prof.jpg";

  return (
    <div className="flex items-center justify-between w-full mb-10 h-11">
      <div className="flex items-center gap-2">
        <img
          src={profile}
          alt="admin profile"
          className="object-cover w-12 h-12 bg-center rounded-full "
        />
        <div>
          <p className="font-bold">Soheil Feizi</p>
          <p className="text-sm opacity-25">Web Developer</p>
        </div>
      </div>

      <div className="flex h-12 items-center gap-5 right ">
        <div className={`${isDark?'bg-cardDark h-full border-borderDark':'bg-white'} flex items-center gap-2 px-3 py-2  rounded-md shadow-sm search`}>
          <RiSearchLine />
          <input
            type="text "
            className={`border-0 outline-none ${isDark?'bg-cardDark border-borderDark':'bg-white'}`}
            placeholder="search"
          />
        </div>
        <button
        className={`h-full px-3 ${isDark?'border-borderDark bg-cardDark':'border'} rounded-lg border`}
        onClick={()=> setIsDark(!isDark)}>
         {isDark?(
          <LuSunDim style={{fontSize:'1.5rem'}}/>
         ):
         ( <FaRegMoon style={{fontSize:'1.5rem'}}/>)
         }
        </button>
      </div>
    </div>
  );
}