import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import axios from "axios";

const Dashboard = () => {
  const { userData } = useData();

  const handleLogout = async () => {
    const response = await axios.get("/logout");

    if (response.data.message === "Logged out successfully") {
      localStorage.removeItem("islogin");
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-[100vh] bg-primary text-white flex flex-col justify-center items-center gap-8 p-10">
      {userData.username && (
        <>
          <h1 className="text-[4rem] sm:text-9xl font-extrabold">
            {userData.name}
          </h1>
          <p className="text-lg sm:text-3xl font-medium opacity-75 text-center">
            {`${userData.email} (${userData.username})`}
          </p>
          <div className="w-full flex justify-center items-center gap-10 mt-10">
            <button
              className="bg-[#404b5a] text-white text-lg font-semibold py-3 w-40 sm:w-52 rounded-lg"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
