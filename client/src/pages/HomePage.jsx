"use client";

import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { Pin, Globe, Lock } from 'lucide-react';
import {
  Clock,
  MoreHorizontal,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import NoteGrid from "../components/card/NoteGrid";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { isDark } = useTheme();
  const [greeting, setGreeting] = useState("Hello ");
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleNoteClick = (id) => {
    
    navigate(`./note/${id}`);
  };

  useEffect(() => {
    handleGreetingChange();
  }, []);

  if (!user) {
    toast.error("You must be logged in first");
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className={`${isDark ? "bg-zinc-900" : "bg-white"
        } w-full min-h-screen transition-colors p-2`}
    >
      {/* Header */}
      <header className="flex justify-end items-center">
        <div className="flex items-center gap-2">
          <span
            className={`${isDark ? "text-zinc-400" : "text-zinc-500"
              } px-2 cursor-default mt-1`}
          >
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <button className={`mr-2 rounded-full `}>
            <Clock
              className={`w-5 h-5 ${isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
            />
          </button>
          <button
            className={`p-2 rounded-lg ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
              }`}
          >
            <MoreHorizontal
              className={`w-5 h-5 ${isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
            />
          </button>
        </div>
      </header>
      {/* Main content */}
      
      <main className="mx-auto p-6">
        <h1
          className={`text-3xl p-4 text-center font-medium ${isDark ? "text-white" : "text-zinc-800"
            }`}
        >
          {greeting}, {user.fullname} 
          <span className={`${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            . Welcome back!
          </span>
        </h1>

        <NoteGrid 
        title="Recently visited"
        onNoteClick={handleNoteClick}
        useMockData={true} // Set to false to use real API
      />
      </main> 
    </div>
  );
}

export default HomePage;
