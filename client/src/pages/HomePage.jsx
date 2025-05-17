"use client";

import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Clock, MoreHorizontal, Pin, Globe , Lock} from 'lucide-react';
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Note 1 - Regular note */}
            <div className={`
      ${isDark ? 'bg-yellow-800/20 shadow-zinc-900/50' : 'bg-yellow-100 shadow-zinc-300/50'} 
      rounded-lg p-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-200
      relative overflow-hidden shadow-lg rotate-1
    `}>
              <div className="absolute -top-1 -right-1 rotate-12">
                <Pin className="w-8 h-8 text-red-500 opacity-70" />
              </div>
              <div className="mb-2 flex justify-between items-start">
                <h3 className={`font-medium text-lg ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Meeting Notes</h3>
                <div className="flex gap-1 mt-1">
                  <Globe className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <div className={`${isDark ? 'text-zinc-300' : 'text-zinc-700'} text-sm`}>
                <p className="relative">
                  Today we discussed the project timeline and...
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-yellow-100 opacity-0"></span>
                </p>
              </div>
            </div>

            {/* Note 2 - Locked note */}
            <div className={`
      ${isDark ? 'bg-blue-800/20 shadow-zinc-900/50' : 'bg-blue-100 shadow-zinc-300/50'} 
      rounded-lg p-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-200
      relative overflow-hidden shadow-lg -rotate-1 blur-[1px]
    `}>
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4 text-zinc-500" />
              </div>
              <div className="mb-2">
                <h3 className={`font-medium text-lg ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Private Tasks</h3>
              </div>
              <div className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} text-sm opacity-70`}>
                <p className="relative">
                  1. Call John 2. Review proposal 3...
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-100 opacity-60"></span>
                </p>
              </div>
            </div>

            {/* Note 3 - Pinned note */}
            <div className={`
      ${isDark ? 'bg-green-800/20 shadow-zinc-900/50' : 'bg-green-100 shadow-zinc-300/50'} 
      rounded-lg p-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-200
      relative overflow-hidden shadow-lg rotate-2
    `}>
              <div className="absolute -top-1 -right-1 rotate-12">
                <Pin className="w-8 h-8 text-red-500 opacity-70" />
              </div>
              <div className="mb-2">
                <h3 className={`font-medium text-lg ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Project Ideas</h3>
              </div>
              <div className={`${isDark ? 'text-zinc-300' : 'text-zinc-700'} text-sm`}>
                <p className="relative">
                  Create a mobile app for tracking daily...
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-100 opacity-0"></span>
                </p>
              </div>
            </div>

            {/* Note 4 - Global note */}
            <div className={`
      ${isDark ? 'bg-pink-800/20 shadow-zinc-900/50' : 'bg-pink-100 shadow-zinc-300/50'} 
      rounded-lg p-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-200
      relative overflow-hidden shadow-lg -rotate-1
    `}>
              <div className="mb-2 flex justify-between items-start">
                <h3 className={`font-medium text-lg ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Team Updates</h3>
                <div className="flex gap-1">
                  <Globe className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <div className={`${isDark ? 'text-zinc-300' : 'text-zinc-700'} text-sm`}>
                <p className="relative">
                  New team members will be joining next...
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-pink-100 opacity-0"></span>
                </p>
              </div>
            </div>

            {/* Note 5 - Locked and Pinned note */}
            <div className={`
      ${isDark ? 'bg-purple-800/20 shadow-zinc-900/50' : 'bg-purple-100 shadow-zinc-300/50'} 
      rounded-lg p-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-200
      relative overflow-hidden shadow-lg rotate-1 blur-[1px]
    `}>
              <div className="absolute -top-1 -right-1 rotate-12">
                <Pin className="w-8 h-8 text-red-500 opacity-70" />
              </div>
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4 text-zinc-500" />
              </div>
              <div className="mb-2">
                <h3 className={`font-medium text-lg ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Secret Project</h3>
              </div>
              <div className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'} text-sm opacity-70`}>
                <p className="relative">
                  The launch date is set for next...
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-purple-100 opacity-60"></span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

// This wrapper ensures both contexts are provided
export default HomePage;