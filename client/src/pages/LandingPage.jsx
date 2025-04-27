import NavBar from "../components/layout/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import ScreenSizePanel from "../components/ui/ScreenSizePanel.jsx";
const LandingPage = () => {
  return (
    <div className="w-full h-screen">
      <NavBar />
    </div>
  );
};

export default LandingPage;
