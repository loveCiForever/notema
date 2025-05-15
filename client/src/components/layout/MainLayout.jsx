"use client";

import { SidebarProvider, useSidebar } from "../../contexts/SidebarContext";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const { isOpen, width, isMobile } = useSidebar();
  const { theme, isDark } = useTheme();
  const sidebarWidth = isMobile ? 0 : isOpen ? width : 60;
  
  return (
    <div className={`min-h-screen ${isDark ? "bg-zinc-900" : "bg-zinc-50"}`}>
      <div className="flex">
        <Sidebar />
        <main
          className={`flex flex-col flex-1 ${!isOpen ? "transition-all duration-300 ease-out" : "transition-property: none;"}`}
          style={{ marginLeft: `${sidebarWidth}px`}}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
} 

// This wrapper ensures both contexts are provided
export default function HomePage() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <MainLayout />
      </SidebarProvider>
    </ThemeProvider>
  );
}
