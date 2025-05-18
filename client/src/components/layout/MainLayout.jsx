"use client";

import { SidebarProvider, useSidebar } from "../../contexts/SidebarContext";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { FontProvider } from "../../contexts/FontContext";
function MainLayout() {
  const { isOpen, width, isMobile } = useSidebar();
  const { theme, isDark } = useTheme();
  const sidebarWidth = isMobile ? 0 : isOpen ? width : 60;
  const { user } = useAuth();
  // console.log(sidebarWidth);
  if (!user) {
    toast.error("You must be logged in first");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-zinc-900" : "bg-zinc-50"}`}>
      <div className="flex">
        <Sidebar />
        <main
          className={`flex flex-col flex-1 ${
            !isOpen
              ? "transition-all duration-300 ease-out"
              : "transition-property: none;"
          }`}
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function MainLayoutPage() {
  const { user } = useAuth();
  return (
    <ThemeProvider>
      <FontProvider>
        <SidebarProvider userId={user.id}>
          <MainLayout />
        </SidebarProvider>
      </FontProvider>
    </ThemeProvider>
  );
}
