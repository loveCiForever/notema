// src/pages/HomePage.jsx
"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { Pin, Globe, Lock } from "lucide-react";
import { Clock, MoreHorizontal } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import NoteGrid from "../components/card/NoteGrid";
import NewNote from "../components/button/NewNote";
import NoteOptionsDropdown from "../components/ui/NoteOptionsDropdown";
import { useNavigate, Navigate } from "react-router-dom";

const HomePage = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("Hello");
  const [showDropdown, setShowDropdown] = useState(false);

  const dummyNote = {
    id: "home",
    content: { blocks: [] },
    lastEdited: Date.now(),
    isLocked: false,
  };

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className={`${
        isDark ? "bg-zinc-900" : "bg-white"
      } w-full min-h-screen transition-colors p-2`}
    >
      {/* Header */}
      <header className="flex justify-end items-center relative">
        <div className="flex items-center gap-2">
          <span
            className={`${
              isDark ? "text-zinc-400" : "text-zinc-500"
            } px-2 cursor-default mt-1`}
          >
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          
        </div>
      </header>
      {/* Main content */}

      <main className="mx-auto p-6">
        <h1
          className={`text-3xl p-4 text-center font-medium ${
            isDark ? "text-white" : "text-zinc-800"
          }`}
        >
          {greeting}, {user.fullname}
          <span className={`${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            . Welcome back!
          </span>
        </h1>

        <NoteGrid
          title="All Notes"
          onNoteClick={id => navigate(`./note/${id}`)}
          useMockData={true}
        />

        <div className="fixed right-4 bottom-4">
          <NewNote onClick={() => navigate("/home")} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
