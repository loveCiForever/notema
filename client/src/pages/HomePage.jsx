import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`text-3xl w-full h-screen items-center justify-center flex ${
        theme == "dark" ? "bg-black/90" : "bg-white"
      }`}
    >
    </div>
  );
};

export default HomePage;
