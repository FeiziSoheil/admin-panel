// ProductPreviewCard.jsx
import React, { useContext } from 'react';
import { FaTag } from "react-icons/fa";
import { BiBarcode } from "react-icons/bi";
import { MdCategory, MdOutlineDescription, MdAttachMoney } from "react-icons/md";
import { TbNumbers } from "react-icons/tb";

import { ThemeContext } from '../../Context/ThemeContext';


export const ProductPreviewCard = ({
  productImage,
  productName,
  productCode,
  category,
  price,
  quantity,
  description,
  renderDescription
}) => {

const {isDark} = useContext(ThemeContext)
const product_placeholder = "/image/product-placeholder.jpg";

  return (
    <div className={`${isDark?'border-[#2A2A3C] ':''} col-span-1  border  h-max p-5 rounded-2xl`}>
      <div className="text-center mb-4">
        <h3 className="font-bold text-xl font-poppins">Product Preview</h3>
      </div>
      <div className="w-full max-h-48 mb-4 rounded-xl overflow-hidden">
        <img
          src={productImage || product_placeholder}
          className="h-full w-full object-cover rounded-xl image-top"
          alt="Product"
        />
      </div>

      <div className="content space-y-2">
        <span className="flex items-center gap-2">
          <FaTag className="text-gray-400" />
          <p className="font-inter font-semibold">Name: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{productName || "-"}</p>
        </span>
        <span className="flex items-center gap-2">
          <BiBarcode className="text-gray-400" />
          <p className="font-inter font-semibold">Code: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{productCode || "-"}</p>
        </span>
        <span className="flex items-center gap-2">
          <MdCategory className="text-gray-400" />
          <p className="font-inter font-semibold">Category: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{category || "-"}</p>
        </span>
        <span className="flex items-center gap-2">
          <MdAttachMoney className="text-gray-400" />
          <p className="font-inter font-semibold">Price: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{price ? `$${price}` : "-"}</p>
        </span>
        <span className="flex items-center gap-2">
          <TbNumbers className="text-gray-400" />
          <p className="font-inter font-semibold">Quantity: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{quantity || "-"}</p>
        </span>
        <span className="flex items-start gap-2">
          <MdOutlineDescription className="text-gray-400 mt-1" />
          <p className="font-inter font-semibold">Description: </p>
          {renderDescription()}
        </span>
      </div>
    </div>
  );
};

// UserPreviewCard.jsx
export const UserPreviewCard = ({
  backgroundImage,
  profileImage,
  fullName,
  userName,
  phone,
  email,
  job,
  status,
  renderAddress
}) => {
  const userBg = "/image/bg.jpg";
  const userAvatar = "/image/avatar.gif";

  const {isDark} = useContext(ThemeContext)

  return (
    <div className={`${isDark?'border-borderDark bg-cardDark':''} col-span-1 border h-max p-5 rounded-2xl`}>
      <div className="banner w-full h-36 relative">
        <img
          src={backgroundImage || userBg}
          className="h-full w-full object-cover rounded-xl"
          alt="Background"
        />
        <img
          src={profileImage || userAvatar}
          className={`w-24 h-24 object-cover absolute left-0 right-0 mx-auto top-20 border-8  rounded-full ${isDark?'border-cardDark':'border-white'}`}
          alt="User Profile"
        />
      </div>

      <div className="content mt-10 space-y-1">
        <span className="flex items-center gap-2">
          <p className="font-inter font-semibold">Full Name: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{fullName || '--'}</p>
        </span>
        <span className="flex items-center gap-2">
          <p className="font-inter font-semibold">Username: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{userName || '--'}</p>
        </span>
        <span className="flex items-center gap-2">
          <p className="font-inter font-semibold">Phone: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{phone || '--'}</p>
        </span>
        <span className="flex items-center gap-2">
          <p className="font-inter font-semibold">Email: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{email || '--'}</p>
        </span>
        <span className="flex items-center gap-2">
          <p className="font-inter font-semibold">Job: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{job || '--'}</p>
        </span>
        <span className="flex items-center gap-2">
          <p className="font-inter font-semibold">Status: </p>
          <p className={`font-inter ${isDark?'text-[#A6ACCD]':''}`}>{status || '-'}</p>
        </span>
        <span className="flex items-start gap-2">
          <p className="font-inter font-semibold">Address : </p>
          {renderAddress()}
        </span>
      </div>
    </div>
  );
};