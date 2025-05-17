"use client";

import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Clock, FileText, CheckCircle, ListTodo, Calendar, Paperclip, AtSign, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from "react";

function HomePage() {
  const { isDark } = useTheme();
  const [greeting, setGreeting] = useState("Hello ");

  const handleGreetingChange = () => {
    const time = new Date().getHours();
    if (time < 12) {
      setGreeting("Good morning");
    } else if (time < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  };

  useEffect(() => {
    handleGreetingChange();
  }, []);
  
  return (
    <div className={`${isDark ? 'bg-zinc-900' : 'bg-white'} w-full min-h-screen transition-colors`}>
      {/* Header */}
      <header className="flex justify-end items-center">
        <div className="flex items-center gap-2">
          <span className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} px-2 cursor-default`}>
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <button className={`p-2 rounded-full ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}>
            <Clock className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
          </button>
          <button className={`p-2 rounded-full ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}>
            <MoreHorizontal className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
          </button>
        </div>
      </header>

      <main className="mx-auto p-6">
        <h1 className={`text-3xl text-center font-medium ${isDark ? 'text-white' : 'text-zinc-800'}`}>
          {greeting}, John Doe !{" "}
          <span className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Welcome back!</span>
        </h1>

        {/* Recently Visited */}
        <div className="mb-8">
          <div className={`flex items-center gap-2 mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            <Clock className="w-4 h-4" />
            <h2 className="font-medium">Recently visited</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className={`${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border hover:bg-zinc-50'} rounded-lg p-4 cursor-pointer`}>
              <div className="h-10 mb-4 flex items-center">
                <FileText className={`w-6 h-6 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
              </div>
              <p className={`${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>New page</p>
            </div>
            <div className={`${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border hover:bg-zinc-50'} rounded-lg p-4 cursor-pointer`}>
              <div className="h-10 mb-4 flex items-center">
                <FileText className={`w-6 h-6 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
              </div>
              <p className={`${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>New page</p>
            </div>
            <div className={`${isDark ? 'border-zinc-700 bg-green-900/20' : 'border bg-green-50'} rounded-lg p-4 hover:${isDark ? 'bg-zinc-800' : 'bg-zinc-50'} cursor-pointer`}>
              <div className="h-10 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className={`${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Tasks Tracker</p>
            </div>
            <div className={`${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border hover:bg-zinc-50'} rounded-lg p-4 cursor-pointer`}>
              <div className="h-10 mb-4 flex items-center">
                <FileText className={`w-6 h-6 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
              </div>
              <p className={`${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>addd</p>
            </div>
            <div className={`${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border hover:bg-zinc-50'} rounded-lg p-4 cursor-pointer`}>
              <div className="h-10 mb-4 flex items-center">
                <ListTodo className={`w-6 h-6 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
              </div>
              <p className={`${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Project Planning</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

// This wrapper ensures both contexts are provided
export default HomePage;