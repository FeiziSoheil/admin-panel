import React, { useContext, useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import { FaCheck, FaMobileAlt, FaRegUser } from "react-icons/fa";
import {
  MdAlternateEmail,
  MdOutlineEmail,
  MdOutlinePassword,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import Button from "../../Components/Button/Button ";
import { StarOutlineSharp } from "@mui/icons-material";
import { SiStatuspal } from "react-icons/si";
import { GrStatusInfo } from "react-icons/gr";
import AotuBreadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";

import { toast } from "react-toastify";
import { ThemeContext } from "../../Context/ThemeContext";
import { UserPreviewCard } from "../../Components/PreviewCard/PreviewCard";

export default function AddNewUsers() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [prictur, setPrictur] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullAddressVisible, setIsFullAddressVisible] = useState(false);
  const { isDark } = useContext(ThemeContext);
  const userBg ="./image/bg.jpg";
  const userAvatar = "./image/avatar.gif";

  const getDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const currentDate = `${year}/${month}/${day}`;
    return currentDate;
  };

  const getAllUserInfo = async () => {
    try {
      const allUserDataRes = await fetch(
        "https://admin-panel-b0e69-default-rtdb.firebaseio.com/users.json"
      );
      const userData = await allUserDataRes.json();
      if (userData && Object.keys(userData).length > 0) {
        const userArray = Object.entries(userData).map(([id, userData]) => ({
          id,
          userData,
        }));
        setAllUserInfo(userArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const options = [
    { value: "Pending", label: "Pending" },
    { value: "Verified", label: "Verified" },
    { value: "Rejected", label: "Rejected" },
  ];

  const validateInputs = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all required fields.");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email address.");
      return false;
    }
    return true;
  };

  const isUserDuplicate = () => {
    return allUserInfo.some(
      (user) =>
        user.userData.email === email ||
        user.userData.userName === userName ||
        user.userData.phone === phone
    );
  };

  const addNewUserHandler = async () => {
    if (!validateInputs()) return;

    await getAllUserInfo();

    if (isUserDuplicate()) {
      toast.error(
        "A user with the same email, username, or phone already exists."
      );
      return;
    }

    const newUserData = {
      fullName,
      userName,
      email,
      phone,
      job,
      prictur,
      address,
      password,
      confirmPassword,
      status,
      createdDate: getDate(),
    };
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://admin-panel-b0e69-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserData),
        }
      );
      const result = await response.json();

      if (result) {
        setFullName("");
        setUserName("");
        setEmail("");
        setPhone("");
        setJob("");
        setPrictur("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");
        setStatus("pending");

        // Refresh the users list after adding new user
        await getAllUserInfo();
        toast.success("User added successfully");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user. Please try again.");
      setIsLoading(false);
    }
  };

 

const renderAddress = () => {
  if (address.length <= 30) {
    return (
      <p className={`font-inter break-words ${isDark ? 'text-[#A6ACCD]' : ''}`}>
        {address || '--'}
      </p>
    );
  }


  if (!isFullAddressVisible) {
    return (
      <div className="flex flex-col">
        <p className={`font-inter ${isDark ? 'text-[#A6ACCD]' : ''}`}>
          {`${address.substring(0, 30)}...`}
        </p>
        <button
          className={`text-sm mt-1 self-start underline
            ${isDark 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-blue-500 hover:text-blue-700'
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
      <p className={`font-inter whitespace-pre-line break-words max-w-60 
        ${isDark ? 'text-[#A6ACCD]' : ''}`}
      >
        {address}
      </p>
      <button
        className={`text-sm mt-1 self-start underline
          ${isDark 
            ? 'text-blue-400 hover:text-blue-300' 
            : 'text-blue-500 hover:text-blue-700'
          }`}
        onClick={() => setIsFullAddressVisible(false)}
      >
        See Less
      </button>
    </div>
  );
};

  return (
    <div className="w-full min-h-screen">
      <AotuBreadcrumbs />
      <h2 className="font-bold text-3xl font-poppins">Add New Users</h2>
      <div className="grid grid-cols-4 gap-5 mt-14">
        <div className="col-span-3 grid grid-cols-2 gap-x-3 gap-y-8 h-max">
          <Input
            type="text"
            label="Full name"
            name="username"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className={"col-span-1"}
            maxLen={25}
            icon={<FaRegUser className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="text"
            label="username"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            maxLen={20}
            icon={<MdAlternateEmail className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="email"
            label="Email"
            name="username"
            maxLen={35}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            icon={<MdOutlineEmail className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="text"
            label="Phone"
            name="username"
            maxLen={12}
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            icon={<FaMobileAlt className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="text"
            label="Job"
            name="job"
            maxLen={35}
            onChange={(e) => setJob(e.target.value)}
            value={job}
            icon={<MdOutlineWorkOutline className="w-6 h-6 text-gray-400" />}
          />
          {/* New Status Select Field */}
          <Input
            type="select"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={options}
            icon={<GrStatusInfo className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            icon={<MdOutlinePassword className="w-6 h-6 text-gray-400" />}
          />
          <Input
            type="password"
            label="Confirm password"
            name="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            icon={<MdOutlinePassword className="w-6 h-6 text-gray-400" />}
          />

          <Input
            onChange={(e) => setAddress(e.target.value)}
            type={"textarea"}
            label={"Address"}
            value={address}
            className={""}
          />

          <div className="col-span-2">
            <h3 className="font-bold text-xl font-poppins">Privacy Policy</h3>
            <p className="font-inter mt-2">
              Your privacy is important to us. We only collect necessary
              information to add a user.
            </p>
          </div>
          <div className="flex col-span-2 justify-start">
            <Button
              onClick={() => addNewUserHandler()}
              className="w-full sm:w-auto"
              disabled={isLoading ? true : false}
              icon={<FaCheck />}
            >
              Submit
            </Button>
          </div>
        </div>

        <UserPreviewCard
          renderAddress={renderAddress}
          backgroundImage={userBg}
          profileImage={userAvatar}
          fullName={fullName}
          userName={userName}
          phone={phone}
          email={email}
          job={job}
          status={status}
        />
      </div>
    </div>
  );
}
