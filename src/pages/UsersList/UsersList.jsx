import React, { useEffect, useState } from "react";
import GenericList from "../../Components/GenericList/GenericList";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

export default function UsersList() {
  const [currentViewMode, setCurrentViewMode] = useState("table");
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [searchResultUser, setSearchResultUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState("-1");

  const getAllUser = async () => {
    try {
      const getUserDataRes = await fetch(
        "https://admin-panel-b0e69-default-rtdb.firebaseio.com/users.json"
      );
      const userData = await getUserDataRes.json();
      setIsLoading(false);
      if (userData && Object.keys(userData).length > 0) {
        const usersArray = Object.entries(userData).map(([id, userData]) => ({
          id,
          ...userData,
        }))
        .reverse()
        setAllUserInfo(usersArray);
        setSearchResultUser(usersArray);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllUser();
  }, []);

  const deleteUserHandler = async (userID) => {
    try {
      const fetchDeleteUser = await fetch(
        `https://admin-panel-b0e69-default-rtdb.firebaseio.com/users/${userID}.json`,
        {
          method: "DELETE",
        }
      );
      await fetchDeleteUser.json();

      const updatedUsers = allUserInfo.filter((user) => user.id !== userID);
      setAllUserInfo(updatedUsers);
      setSearchResultUser(updatedUsers);

      if (updatedUsers.length === 0) {
        setAllUserInfo([]);
        setSearchResultUser([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortUsers = (users, sortType) => {
    if (!users.length) return users;
  
    const sortedUsers = [...users];
  
    switch (sortType) {
      case "nameAsc":
        return sortedUsers.sort((a, b) => 
          (a.fullName || "").localeCompare(b.fullName || "")
        );
  
      case "verified":
        return sortedUsers.filter(user => user.status === "Verified");
  
      case "pending":
        return sortedUsers.filter(user => user.status === "Pending");
  
      case "rejected":
        return sortedUsers.filter(user => user.status === "Rejected");
  
        case "dateDesc":
          return sortedUsers.sort((a, b) => {
            const parseDate = (dateString) => {
              const [year, month, day] = dateString.split('/').map(Number);
              return new Date(year, month - 1, day);
            };
        
            const dateA = parseDate(a.createdDate || "1970/01/01");
            const dateB = parseDate(b.createdDate || "1970/01/01");
        
            return dateA- dateB ; // مرتب‌سازی نزولی
          })
  
      default:
        return sortedUsers;
    }
  };
  

  const handleSortChange = (selectedValue) => {
    setSortType(selectedValue);
    
   
    if (selectedValue === "-1") {
      setSearchResultUser(allUserInfo);
      return;
    }
  
    const filteredUsers = sortUsers(allUserInfo, selectedValue);
    setSearchResultUser(filteredUsers);
  };
  

  const searchUserHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let filteredUsers;
    
    if (searchTerm === "") {

      if (sortType !== "-1") {
        filteredUsers = sortUsers(allUserInfo, sortType);
      } else {
        filteredUsers = [...allUserInfo];
      }
    } else {
   
      const searchBase = sortType !== "-1" ? searchResultUser : allUserInfo;
      filteredUsers = searchBase.filter(
        (user) =>
          (user.fullName && user.fullName.toLowerCase().includes(searchTerm)) ||
          (user.userName && user.userName.toLowerCase().includes(searchTerm)) ||
          (user.email && user.email.toLowerCase().includes(searchTerm))
      );
    }
  
    setSearchResultUser(filteredUsers);
  };

  const sortOptions = [
    { value: "-1", label: "Select Sort" },
    { value: "nameAsc", label: "Sort by Name (A-Z)" },
    { value: "verified", label: "Sort by Verified" },
    { value: "pending", label: "Sort by Pending" },
    { value: "rejected", label: "Sort by Rejected" },
    { value: "dateDesc", label: "Sort by Oldest" },
  ];

  const userColumns = [
    {
      header: "ID",
      field: "id",
    },
    {
      header: "Image",
      render: (item) => (
        <img
          src={`https://robohash.org/${item.id || Math.random()}?set=set3&size=80x80`}
          className="w-12 h-12 rounded-full mx-auto"
          alt={`User ${item.id || "unknown"}`}
        />
      ),
    },
    {
      header: "Name",
      field: "fullName",
    },
    {
      header: "Username",
      field: "userName",
    },
    {
      header: "Email",
      field: "email",
    },
    {
      header: "Phone",
      field: "phone",
    },
    {
      header: "Status",
      render: (item) => (
        <button
          className={`py-2 w-[98px] rounded-3xl ${
            item.status === "Verified"
              ? "text-greenTxt bg-greenBG"
              : item.status === "Pending"
              ? "text-orange-400 bg-orange-100"
              : "text-red-600 bg-red-100"
          }`}
        >
          {item.status}
        </button>
      ),
    },
    {
      header: "Actions",
      render: (item) => (
        <div className="space-x-2">
          <Link
            to={`/users/EditUser/${item.id}`}
            className="py-2 px-4 rounded-3xl text-blue-600 bg-blue-100"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteUserHandler(item.id)}
            className="py-2 px-4 rounded-3xl text-red-600 bg-red-100"
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  return (
    <GenericList
      data={searchResultUser || []}
      columns={userColumns}
      styles={{ title: "User List" }}
      viewMode={currentViewMode}
      onViewModeChange={setCurrentViewMode}
      onSearch={searchUserHandler}
      isLoading={isLoading}
      path={"/users/add-new-user"}
      sortOptions={sortOptions}
      onSort={handleSortChange} 
    />
  );
}
