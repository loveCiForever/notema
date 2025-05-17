"use client";
import { useTheme } from "../contexts/ThemeContext";
import { Outlet, useParams } from "react-router-dom";
import {
  ChevronDown,
  Lock,
  MessageSquare,
  Star,
  MoreHorizontal,
  Smile,
  ImageIcon,
  MessageCircle,
} from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import useEditor from "../hooks/useEditor";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import SimpleImage from "@editorjs/simple-image";

export const noteStruct = {
  title: "",
  banner: "",
  content: [],
  author: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const NotePage = () => {
  const { isDark } = useTheme();

  const ejInstance = useRef(null);
  const [note, setNote] = useState({ ...noteStruct });

  useEffect(() => {
    if (!ejInstance.current) initEditor();
    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      placeholder: "Start writing your note...",
      tools: { header: Header, list: List, embed: Embed },
      onReady: () => (ejInstance.current = editor),
      onChange: async () => {
        const saved = await ejInstance.current.save();
        const now = new Date().toISOString();
        const updatedNote = { ...note, content: saved.blocks, updatedAt: now };
        setNote(updatedNote);
        await autoSave(updatedNote);
      },
    });
  };

  const handleTitleChange = async (e) => {
    const title = e.target.value;
    const now = new Date().toISOString();
    const updatedNote = { ...note, title, updatedAt: now };
    setNote(updatedNote);
    await autoSave(updatedNote);
  };

  const autoSave = async (currentNote) => {
    try {
      //   await axios.post('/api/notes', currentNote);
      console.log(currentNote);
    } catch (err) {
      console.error("Auto-save error:", err);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-zinc-900" : "bg-white"
      } flex flex-col`}
    >
      {/* Header */}
      <header
        className={`flex justify-between items-center px-6 py-2 ${
          isDark ? "border-b border-zinc-800" : ""
        }`}
      >
        <div className="flex items-center gap-0">
          <h1
            className={`text-lg font-medium w-1/2 line-clamp-1 ${
              isDark ? "text-white" : "text-zinc-800"
            }`}
          >
            {note.title}
          </h1>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded ${
              isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            } cursor-pointer`}
          >
            <Lock
              className={`w-4 h-4 ${
                isDark ? "text-zinc-500" : "text-zinc-400"
              }`}
            />
            <span
              className={`${
                isDark ? "text-zinc-500" : "text-zinc-400"
              } text-sm`}
            >
              Private
            </span>
            <ChevronDown
              className={`w-4 h-4 ${
                isDark ? "text-zinc-500" : "text-zinc-400"
              }`}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1 rounded ${
              isDark ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100"
            } font-medium`}
          >
            Share
          </button>
          <button
            className={`p-2 rounded ${
              isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            }`}
          >
            <MessageSquare
              className={`w-5 h-5 ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            />
          </button>
          <button
            className={`p-2 rounded ${
              isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            }`}
          >
            <Star
              className={`w-5 h-5 ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            />
          </button>
          <button
            className={`p-2 rounded ${
              isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            }`}
          >
            <MoreHorizontal
              className={`w-5 h-5 ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            />
          </button>
        </div>
      </header>
      {/* SỬA Ở CHÕ NÀY CÁC FILE noteService, collabService(websocket), useEditor, EditorTools */}
      {/* <div className={`editor-wrapper ${isDark ? 'bg-zinc-900 text-zinc-100' : ''}`}>
                {content && <EditorComponent data={content} onChange={onChange} />}
            </div>
            <div className={`save-status ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{status}</div> */}
      <div className="w-full bg-white p-6  pl-10">
        <div className="mx-20">
          <input
            type="text"
            name="title"
            id="title"
            value={note.title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="outline-none text-xl mb-2 w-full"
          />

          <div
            id="editorjs"
            className="flex rounded-md p-4 mb-6 items-center justify-start pl-10 bg-red-0"
          />
        </div>
      </div>
    </div>
  );
};

export default NotePage;
