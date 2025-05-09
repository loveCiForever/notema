import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./SideBar/Sidebar";
import Headers from "./Header";

import { SidebarProvider } from "../../contexts/SidebarContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useSidebar } from "../../contexts/SidebarContext";
import { ThemeProvider } from "../../contexts/ThemeContext";

const MainContent = () => {
  const { isOpen, width, isMobile } = useSidebar();
  const sidebarWidth = isMobile ? 0 : isOpen ? width : 60;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1" style={{ marginLeft: `${sidebarWidth}px` }}>
        {/* <Outlet /> */}
      </main>
    </div>
  );
};

const MainLayout = () => {
  const { theme } = useTheme();

  return (
      <SidebarProvider>
        <div className={`min-h-screen ${theme == "dark" ? "bg-black" : "bg-white"}`}>
          <MainContent />
        </div>
      </SidebarProvider>
  );
};

export default MainLayout;

