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
  Pin,
  PinOff,
  AlignJustify,
} from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import useEditor from "../hooks/useEditor";
import axios from "axios";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import SimpleImage from "@editorjs/simple-image";
import mockNotes from "../components/data/data";
import NoteOptionsDropdown from "../components/ui/NoteOptionsDropdown";
import { useSidebar } from "../contexts/SidebarContext";

export const noteStruct = {
  title: "",
  banner: "",
  content: [],
  author: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
import { useAuth } from "../contexts/AuthContext";
import { noteApi } from "../services/noteApi";

const NotePage = ({}) => {
  const { isDark } = useTheme();
  const BASE_URL = import.meta.env.VITE_REMOTE_SERVER_URL;
  const { id } = useParams();
  const ejInstance = useRef(null);
  const { user } = useAuth();
  const [note, setNote] = useState({
    ...noteStruct,
    author: user.id ?? "",
  });
  const [noteId, setNoteId] = useState("");
  const { isMobile, setIsOpen } = useSidebar();
  const [showDropdown, setShowDropdown] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("note_font_size");
    return saved ? Number(saved) : 16;
  });
  const handleToggleFavorite = async (noteId, enable) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/note/toggle_favourite/${noteId}`
      );
      setNote((prev) => ({ ...prev, isFavourite: enable }));
      console.log(res);
    } catch (err) {
      console.error("Failed to toggle favourite:", err);
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/note/get_single/${id}`);
        const data = res.data.data;

        setNoteId(res.data.data.id);

        console.log(res);

        const { title, content, author, created_at, updated_at } = data;
        const initialData =
          content && content.blocks ? content : { blocks: [] };

        setNote({
          id: data.id,
          title,
          content: initialData.blocks,
          author,
          createdAt: created_at,
          updatedAt: updated_at,
        });

        initEditor(initialData);
      } catch (err) {
        console.error("Failed to fetch note:", err);
        initEditor(); // fallback to empty editor
      }
    };

    fetchNote();

    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, [id]);

  const initEditor = (
    initialData = { blocks: [], time: Date.now(), version: "2.25.0" }
  ) => {
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      placeholder: "Start writing your note...",
      data: initialData,
      tools: { header: Header, list: List, embed: Embed },
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        if (!ejInstance.current) return;
        try {
          const saved = await ejInstance.current.save();
          const now = new Date().toISOString();
          setNote((prev) => {
            const updated = { ...prev, content: saved.blocks, updatedAt: now };
            autoSave(updated);
            return updated;
          });
        } catch (err) {
          console.error("Save failed:", err);
        }
      },
    });
  };

  const handlePin = async (noteId) => {
    try {
      const res = await axios.put(`${BASE_URL}/note/toggle_pinned/${noteId}`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const now = new Date().toISOString();
    setNote((prev) => {
      const updated = { ...prev, title, updatedAt: now };
      autoSave(updated);

      return updated;
    });
  };

  const autoSave = async (currentNote) => {
    console.log(currentNote);
    try {
      if (currentNote.id) {
        await axios.put(
          `${BASE_URL}/note/update_note/${currentNote.id}`,
          currentNote
        );
      } else {
        const res = await axios.post(`${BASE_URL}/note/new_note`, currentNote);
        const newId = res.data.id;
        setNote((prev) => ({ ...prev, id: newId }));
      }
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
        <div
          className={`${
            isDark ? "text-zinc-400" : "text-zinc-500"
          } px-2 cursor-default mt-1 ${isMobile ? "block" : "hidden"}`}
        >
          <button onClick={() => setIsOpen((o) => !o)}>
            {" "}
            <AlignJustify />{" "}
          </button>
        </div>
        <div className="flex items-center justify-between gap-0">
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
          {/* <button
            className={`px-3 py-1 rounded ${isDark ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-100"
              } font-medium`}
          >
            Share
          </button> */}
          {/* <button
            className={`p-2 rounded ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
              }`}
          >
            <MessageSquare
              className={`w-5 h-5 ${isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
            />
          </button> */}
          <button
            className={`p-2 rounded-full cursor-pointer ${
              isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            }`}
            onClick={() => handlePin(noteId)}
          >
            {note.isPinned ? (
              <PinOff
                className={`w-5 h-5 ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              />
            ) : (
              <Pin
                className={`w-5 h-5 ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              />
            )}
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown((v) => !v);
              }}
              className={`p-2 rounded-full cursor-pointer ${
                isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
              }`}
            >
              <MoreHorizontal
                className={`w-5 h-5 ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              />
            </button>

            {showDropdown && (
              <>
                {/* Overlay to close dropdown when clicking outside */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <NoteOptionsDropdown
                  show={showDropdown}
                  onClose={() => setShowDropdown(false)}
                  note={{
                    ...note,
                    // or any appropriate field
                  }}
                  onToggleFavorite={handleToggleFavorite}
                  fontSize={fontSize}
                  onFontSizeChange={(size) => {
                    setFontSize(size);
                    localStorage.setItem("note_font_size", size);
                  }}
                  onTogglePassword={(id, enabled) => {
                    console.log({ id, enabled });
                  }}
                />
              </>
            )}
          </div>
        </div>
      </header>
      {/* SỬA Ở CHÕ NÀY CÁC FILE noteService, collabService(websocket), useEditor, EditorTools */}
      {/* <div className={`editor-wrapper ${isDark ? 'bg-zinc-900 text-zinc-100' : ''}`}>
                {content && <EditorComponent data={content} onChange={onChange} />}
            </div>
            <div className={`save-status ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{status}</div> */}
      <div
        className={`w-full bg-white p-6 pl-10 ${
          isDark ? "bg-zinc-900 " : "bg-white"
        }`}
      >
        <div
          className={` ${isMobile ? "px-2" : "px-20"} flex flex-col  w-full`}
        >
          <input
            type="text"
            name="title"
            id="title"
            value={note.title}
            style={{ fontSize: `${fontSize + 15}px` }}
            onChange={handleTitleChange}
            placeholder="Title"
            className={`outline-none text-xl mb-2 w-full font-semibold ${
              isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            } border-b-2/ border-zinc-300 focus:border-blue-500 transition-colors duration-200`}
          />

          <div
            id="editorjs"
            style={{ fontSize: `${fontSize}px` }}
            className={`items-start  flex w-[full] min-h-[300px] rounded-md mb-6 bg-red-0 space-y-0 ${
              isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default NotePage;
