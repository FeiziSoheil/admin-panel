import React, { useContext, useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import { FaCheck, FaMobileAlt, FaRegUser } from "react-icons/fa";
import {
  MdAlternateEmail,
  MdOutlineEmail,
  MdOutlineWorkOutline,
  MdOutlinePassword,
} from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import Button from "../../Components/Button/Button ";
import { GrStatusInfo } from "react-icons/gr";
import { useParams } from "react-router-dom";
import AutoBreadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import { UserPreviewCard } from "../../Components/PreviewCard/PreviewCard";
import { ThemeContext } from "../../Context/ThemeContext";
import SkeletonComp from "../../Components/SkeletonComp/SkeletonComp";

export default function EditUser() {
  const { userID } = useParams();
  const { isDark } = useContext(ThemeContext);

  const bgImage = "/image/bg.jpg";
  const avatar = "/image/avatar.gif";

  const [userData, setUserData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    job: "",
    address: "",
    status: "Pending",
  });
  const [isFullAddressVisible, setIsFullAddressVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const options = [
    { value: "Pending", label: "Pending" },
    { value: "Verified", label: "Verified" },
    { value: "Rejected", label: "Rejected" },
  ];

  useEffect(() => {
    fetchUserData();
  }, [userID]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://admin-panel-b0e69-default-rtdb.firebaseio.com/users/${userID}.json`
      );
      const data = await response.json();
      if (data) {
        setUserData(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateInputs = () => {
    if (!userData.fullName || !userData.email) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      alert("Invalid email address.");
      return false;
    }
    return true;
  };

  const updateUserHandler = async () => {
    if (!validateInputs()) return;

    try {
      const response = await fetch(
        `https://admin-panel-b0e69-default-rtdb.firebaseio.com/users/${userID}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const result = await response.json();

      if (result) {
        alert("User information updated successfully.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user information");
    }
  };

  const renderAddress = () => {
    // اگر آدرس کوتاه باشد
    if (userData.address.length <= 30) {
      return (
        <p
          className={`font-inter break-words ${isDark ? "text-[#A6ACCD]" : ""}`}
        >
          {userData.address}
        </p>
      );
    }

    if (!isFullAddressVisible) {
      return (
        <div className="flex flex-col">
          <p className={`font-inter ${isDark ? "text-[#A6ACCD]" : ""}`}>
            {`${userData.address.substring(0, 30)}...`}
          </p>
          <button
            className={`text-sm mt-1 self-start underline
              ${
                isDark
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-500 hover:text-blue-700"
              }`}
            onClick={() => setIsFullAddressVisible(true)}
          >
            See More
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <p
          className={`font-inter whitespace-pre-line break-words max-w-60 
          ${isDark ? "text-[#A6ACCD]" : "text-gray-700"}`}
        >
          {userData.address}
        </p>
        <button
          className={`text-sm mt-1 self-start underline
            ${
              isDark
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-500 hover:text-blue-700"
            }`}
          onClick={() => setIsFullAddressVisible(false)}
        >
          See Less
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
            <SkeletonComp/>
      
    );
  }

  return (
    <div className="w-full min-h-screen">
      <AutoBreadcrumbs />
      <h2 className="font-bold text-3xl font-poppins">Edit User</h2>
      <div className="grid grid-cols-4 gap-5 mt-12">
        <div className="col-span-3 grid grid-cols-2 gap-x-3 gap-y-8 h-max">
          <Input
            type="text"
            label="Full Name"
            name="fullName"
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            value={userData.fullName}
            className={"col-span-1"}
            maxLen={25}
            icon={<FaRegUser className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="text"
            label="Username"
            name="userName"
            onChange={(e) => handleInputChange("userName", e.target.value)}
            value={userData.userName}
            maxLen={20}
            icon={<MdAlternateEmail className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="email"
            label="Email"
            name="email"
            maxLen={35}
            onChange={(e) => handleInputChange("email", e.target.value)}
            value={userData.email}
            icon={<MdOutlineEmail className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="text"
            label="Phone"
            name="phone"
            maxLen={12}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            value={userData.phone}
            icon={<FaMobileAlt className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="text"
            label="Job"
            name="job"
            maxLen={35}
            onChange={(e) => handleInputChange("job", e.target.value)}
            value={userData.job}
            icon={<MdOutlineWorkOutline className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="select"
            label="Status"
            value={userData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            options={options}
            icon={<GrStatusInfo className="w-6 h-6 text-gray-400" />}
          />

          <Input
            onChange={(e) => handleInputChange("address", e.target.value)}
            type={"textarea"}
            label={"Address"}
            value={userData.address}
            className={""}
          />

          <div className="flex col-span-2 justify-start">
            <Button
              onClick={updateUserHandler}
              className="w-full sm:w-auto"
              icon={<FaCheck />}
            >
              Update
            </Button>
          </div>
        </div>

        {/* <div className="col-span-1 border h-max p-5 rounded-2xl">
          <div className="banner w-full h-36 relative">
            <img
              src={bgImage}
              className="h-full w-full object-cover rounded-xl"
              alt=""
            />
            <img
              src={avatar}
              className="w-24 h-24 object-cover absolute left-0 right-0 mx-auto top-20 border-8 border-white rounded-full"
              alt="User Profile"
            />
          </div>

          <div className="content mt-10 space-y-1">
            <span className="flex items-center">
              <p className="font-inter font-semibold">Full Name : </p>
              <p className="font-inter">{userData.fullName}</p>
            </span>
            <span className="flex items-center">
              <p className="font-inter font-semibold">Username : </p>
              <p className="font-inter">{userData.userName}</p>
            </span>
            <span className="flex items-center">
              <p className="font-inter font-semibold">Phone : </p>
              <p className="font-inter">{userData.phone}</p>
            </span>
            <span className="flex items-center">
              <p className="font-inter font-semibold">Email : </p>
              <p className="font-inter">{userData.email}</p>
            </span>
            <span className="flex items-center">
              <p className="font-inter font-semibold">Job : </p>
              <p className="font-inter">{userData.job}</p>
            </span>
            <span className="flex items-center">
              <p className="font-inter font-semibold">Status : </p>
              <p className="font-inter capitalize">{userData.status}</p>
            </span>
            <span className="flex items-start">
              <p className="font-inter font-semibold">Address : </p>
              {renderAddress()}
            </span>
          </div>
        </div> */}

        <UserPreviewCard
          phone={userData.phone}
          userName={userData.userName}
          fullName={userData.fullName}
          email={userData.email}
          job={userData.job}
          backgroundImage={bgImage}
          profileImage={avatar}
          renderAddress={renderAddress}
          status={userData.status}
        />
      </div>
    </div>
  );
}
