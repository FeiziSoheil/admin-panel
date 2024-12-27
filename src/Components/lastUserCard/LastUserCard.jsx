import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { ThemeContext } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";

export default function LastUserCard() {
  const { isDark } = useContext(ThemeContext);
  const [latestUsers, setLatestUsers] = useState([]);

  const getUserDataHandler = async () => {
    const userResp = await fetch(
      "https://admin-panel-b0e69-default-rtdb.firebaseio.com/users.json"
    );
    const userData = await userResp.json();
    if (userData) {
      const userArray = Object.entries(userData).map(([id, userData]) => ({
        id,
        ...userData,
      }));
      const slisedUsers = userArray.reverse().slice(0, 4);
      console.log(slisedUsers);
      setLatestUsers(slisedUsers);
    }
  };

  useEffect(() => {
    getUserDataHandler();
  }, []);

  const verifyHandler = async (e, userID) => {
    const userToUpdate = latestUsers.find((user) => user.id === userID);

    if (userToUpdate) {
      const updatedUser = { ...userToUpdate, status: "Verified" };

      await fetch(
        `https://admin-panel-b0e69-default-rtdb.firebaseio.com/users/${userID}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      // Optionally update the UI state
      setLatestUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userID ? { ...user, status: "Verified" } : user
        )
      );
    }
  };

  const rejectHandler = async (userID)=>{
    const userUpdated = latestUsers.find(user=>user.id===userID)
    
    if(userUpdated){
      const updateUser = {...updateUser,status:'Rejected'}

      await fetch(
        `https://admin-panel-b0e69-default-rtdb.firebaseio.com/users/${userID}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUser),
        }
      );

      setLatestUsers((prevUser)=>
        prevUser.map((user)=>
          user.id===userID ? {...user,status:'Rejected'}:user
        )
      )

    }
  }

  return (
    <div
      className={`${
        isDark ? "bg-[#252436] border-[#2A2A3C]" : "bg-white"
      } border rounded-2xl p-8 w-1/3`}
    >
      <h2 className="font-poppins font-bold text-3xl">New Users</h2>
      <p className="font-inter text-Subtitle ">Latest users regested</p>
      <ul className="flex flex-col mt-8 space-y-5">
        {latestUsers.map((user) => (
          <li className="flex justify-between flex-wrap gap-y-3">
            <div className="flex items-center space-x-2">
              <img
                src={`https://robohash.org/${Math.random()}?set=set3&size=80x80`}
                className="w-14 h-14 rounded-full"
                alt="User 1"
              />
              <div>
                <p className="font-poppins font-medium">{user.fullName}</p>
                <p className="font-inter text-sm text-Subtitle">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {user.status === "Verified" ? (
                <span className="text-greenTxt bg-greenBG py-2 px-3  rounded-3xl  font-inter ">
                  Verified
                </span>
              ) :
              user.status === "Rejected" ? (
                <span className="text-redTxt bg-redBg py-2 px-3 rounded-3xl font-inter font-medium">
                  Rejected
                </span>
              ): 
              (
                <>
                  <button
                    onClick={(e) => verifyHandler(e, user.id)}
                    className="bg-greenBG text-greenTxt py-2 px-3 font-inter rounded-3xl"
                  >
                    Verify
                  </button>
                  <button
                  onClick={()=>rejectHandler(user.id)}
                  className="bg-redBg text-redTxt py-2 px-3 font-inter rounded-3xl">
                    Reject
                  </button>
                </>
              )}
              <Link
                to={`/users/EditUser/${user.id}`}
                className="bg-blue-200 text-blue-600 py-2 px-3 font-inter rounded-3xl"
              >
                See
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link to={'/users'} className="flex items-center justify-end mt-6 gap-1 cursor-pointer">
        <p className="font-inter font-medium text-blue-600">View All</p>
        <FaArrowRight className="text-blue-600 font-bold" />
      </Link>
    </div>
  );
}
