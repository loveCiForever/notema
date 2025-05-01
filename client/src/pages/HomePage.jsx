import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";
import Header from "../components/layout/Header";

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full h-screen items-center justify-start flex ${
        theme == "dark" ? "bg-black/90" : "bg-white"
      }`}
    >
      {/* sidebar */}
      <div className="sidebar fixed w-60 h-full bg-red-200 text-center">
        <div className="user-panel h-30 bg-green-200"></div>
        <div className="tools flex flex-col justify-start h-80 bg-yellow-500 text-start">
          <h1>Search</h1>
          <h1>Notification</h1>
          <h1>Public</h1>
          <h1>Private</h1>
          <h1>Switch to Dark/Light theme</h1>
          <h1>Trash</h1>
        </div>
      </div>

      {/* body */}
      <div className="body flex-grow-1 bg-green-200 ml-60">
        <div className="w-full h-50 bg-blue-300 border-2"></div>
        <div className="w-full h-50 bg-blue-300 border-2"></div>
        <div className="w-full h-50 bg-blue-300 border-2"></div>
        <div className="w-full h-50 bg-blue-300 border-2"></div>
        <div className="w-full h-50 bg-blue-300 border-2"></div>
        <div className="w-full h-50 bg-blue-300 border-2"></div>
      </div>
    </div>
  );
};

export default HomePage;
