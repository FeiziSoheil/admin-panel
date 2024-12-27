import React, { useContext } from 'react'
import { BsCashStack } from 'react-icons/bs'
import { FaArrowRight, FaTrain } from 'react-icons/fa6'
import { IoFastFood } from 'react-icons/io5'
import { SiShopee } from 'react-icons/si'
import { ThemeContext } from '../../Context/ThemeContext'


export default function LastTransAcrionCard() {

  const {isDark} = useContext(ThemeContext)

  return (
    <div className={`${isDark?'bg-[#252436] border-[#2A2A3C]':'bg-white'} flex-1 border rounded-2xl p-8`}>
    <h2 className="font-poppins font-bold text-3xl">
      Your Transaction
    </h2>
    <p className={`font-inter text-Subtitle ml-2`}>
      your 4 latest Transaction
    </p>
    <ul className="flex flex-col mt-8 space-y-5 ">
      <li className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 p-3 rounded-full">
            <FaTrain
              style={{ fontSize: "1.8rem" }}
              className="text-blue-600"
            />
          </span>
          <div>
            <p className="text-lg font-inter font-semibold">
              Train Travel
            </p>
            <p className="font-inter text-Subtitle text-sm">
              22 September 2024
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-red-200  text-red-600 py-1 font-inter px-3 rounded-2xl">
            54 $
          </button>
          <button className="bg-blue-200 text-blue-600 py-1 px-3 font-inter rounded-2xl">
            See
          </button>
        </div>
      </li>

      <li className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="bg-amber-50 p-3 rounded-full">
            <BsCashStack
              style={{ fontSize: "1.8rem" }}
              className="text-amber-400"
            />
          </span>
          <div>
            <p className="text-lg font-inter font-semibold">
              Salary Payment
            </p>
            <p className="font-inter text-Subtitle text-sm">
              22 September 2024
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-greenBG font-inter text-greenTxt py-1 px-3 rounded-2xl">
            54 $
          </button>
          <button className="bg-blue-200 text-blue-600 py-1 px-3 font-inter rounded-2xl">
            See
          </button>
        </div>
      </li>

      <li className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="bg-violet-100 p-3 rounded-full">
            <IoFastFood
              style={{ fontSize: "1.8rem" }}
              className="text-violet-600"
            />
          </span>
          <div>
            <p className="text-lg font-inter font-semibold">
              Food Delivery
            </p>
            <p className="font-inter text-Subtitle text-sm">
              22 September 2024
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-red-200 font-inter text-red-600 py-1 px-3 rounded-2xl">
            54 $
          </button>
          <button className="bg-blue-200 text-blue-600 py-1 px-3 font-inter rounded-2xl">
            See
          </button>
        </div>
      </li>

      <li className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="bg-orange-100 p-3 rounded-full">
            <SiShopee
              style={{ fontSize: "1.8rem" }}
              className="text-orange-600"
            />
          </span>
          <div>
            <p className="text-lg font-inter font-semibold">Shopping</p>
            <p className="font-inter text-Subtitle text-sm">
              22 September 2024
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-greenBG font-inter text-greenTxt py-1 px-3 rounded-2xl">
            54 $
          </button>
          <button className="bg-blue-200 text-blue-600 py-1 px-3 font-inter rounded-2xl">
            See
          </button>
        </div>
      </li>
    </ul>

    <span className="flex items-center justify-end mt-6 gap-1 cursor-pointer">
      <p className="font-inter font-medium text-blue-600">View All</p>
      <FaArrowRight className="text-blue-600 font-bold" />
    </span>
  </div>
  )
}
