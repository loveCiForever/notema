// src/pages/HomePage.jsx
"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { Pin, Globe, Lock } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import NoteGrid from "../components/card/NoteGrid";
import NewNote from "../components/button/NewNote";
import NoteOptionsDropdown from "../components/ui/NoteOptionsDropdown";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSidebar } from "../contexts/SidebarContext";

const HomePage = () => {
  const BASE_URL = import.meta.env.VITE_REMOTE_SERVER_URL;
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("Hello");
  const [showDropdown, setShowDropdown] = useState(false);
  const { isMobile, setIsOpen } = useSidebar();

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


  const handleNewNote = async () => {
    try {
      const payload = {
        title: '',
        content: [],
        author: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const res = await axios.post(
        `${BASE_URL}/note/new_note`, payload
      );

      if (res.data.success) {
        const newNoteID = res.data.id;
        navigate(`/home/note/${newNoteID}`);
      }
      else {
        toast.error("Failed to create note");
      }
    } catch (error) {
      toast.error("Error creating note");
    }
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className={`${isDark ? "bg-zinc-900" : "bg-white"
        } w-full min-h-screen transition-colors p-2`}
    >
      {/* Header */}
      <header className={`flex items-center relative ${isMobile ? "justify-between" : "justify-end"}`}>
        <div className={`${isMobile ? "block" : "hidden"}`}>
          <button
            className={`${isDark ? "text-zinc-400" : "text-zinc-500"} px-2 mt-1`}
            onClick={() => setIsOpen(o => !o)}
          >
            <AlignJustify />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`${isDark ? "text-zinc-400" : "text-zinc-500"} px-2 cursor-default mt-1`}
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
          className={`text-3xl p-4 text-center font-medium ${isDark ? "text-white" : "text-zinc-800"
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
          useMockData={false}
          userId={user.id}
        />

        <div className="fixed right-4 bottom-4">
          <NewNote onClick={handleNewNote} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
