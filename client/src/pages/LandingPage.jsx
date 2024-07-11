import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100vh] bg-primary text-white flex flex-col justify-center items-center gap-8 p-10">
      <h1 className="text-[4rem] sm:text-9xl font-extrabold">LogInAuth</h1>
      <p className="text-lg sm:text-3xl font-medium opacity-75 text-center">
        Authentication and Authorization for Modern Applications
      </p>
      <div className="w-full flex justify-center items-center gap-10 mt-10">
        <button className="bg-[#404b5a] text-white text-lg font-semibold py-3 w-40 sm:w-52 rounded-lg" onClick={() => navigate("/login")}>
          Log In
        </button>
        <button className="bg-secondary text-white text-lg font-semibold py-3 w-40 sm:w-52 rounded-lg" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
