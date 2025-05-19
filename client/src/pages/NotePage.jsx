"use client";
import { useTheme } from "../contexts/ThemeContext";
import { Outlet, useParams } from "react-router-dom";
import "../Style/style.css";
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
import { Globe, ChevronUp } from "lucide-react";
import PasswordModal from "../components/ui/PasswordModal";
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
import { debounce } from "lodash";

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
  const [unlocked, setUnlocked] = useState(false);
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
  const handleToggleTrash = async (noteId, isCurrentlyTrashed) => {
    try {
      if (isCurrentlyTrashed) {
        // Restore
        await axios.put(`${BASE_URL}/note/restore_from_trash/${noteId}`);
      } else {
        // Move to trash
        await axios.put(`${BASE_URL}/note/move_to_trash/${noteId}`);
      }

      setNote((prev) => ({ ...prev, isTrashed: isCurrentlyTrashed ? 0 : 1 }));
    } catch (err) {
      console.error("Failed to toggle trash state:", err);
    }
  };

  const handleToggleVisibility = async (noteId, makePublic) => {
    const newVisibility = makePublic ? "public" : "private";

    try {
      await axios.put(`${BASE_URL}/note/set_visibility/${noteId}`, {
        visibility: newVisibility,
      });

      setNote((prev) => ({
        ...prev,
        visibility: newVisibility,
      }));
    } catch (err) {
      console.error("Failed to update visibility:", err);
    }
  };
  //   const handleMoveToTrash = async (noteId) => {
  //     try {
  //       await axios.put(`${BASE_URL}/note/move_to_trash/${noteId}`);
  //       setNote((prev) => ({ ...prev, isDeleted: true }));
  //     } catch (err) {
  //       console.error("Failed to move note to trash:", err);
  //     }
  //   };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/note/get_single/${id}`);
        const data = res.data.data;

        setNoteId(res.data.data.id);

        console.log(res.data);

        const { title, content, author, created_at, updated_at } = data;
        const initialData =
          content && content.blocks ? content : { blocks: [] };

        setNote({
          id: data.id,
          title,
          content: data.content,
          author,
          createdAt: created_at,
          updatedAt: updated_at,
          isFavourite: data.isFavourite,
          isPinned: data.isPinned,
          isTrashed: data.isTrashed,
          visibility: data.visibility,
        });

        const savedPassword = localStorage.getItem(`note_pass_${id}`);
        if (!savedPassword) {
          setUnlocked(true);
        } else {
          const entry = prompt("Enter password to open this note:");
          if (entry === savedPassword) {
            setUnlocked(true);
          } else {
            alert("Wrong password!");
          }
        }
      } catch (err) {
        console.error("Failed to fetch note:", err);
        const savedPassword = localStorage.getItem(`note_pass_${id}`);
        if (!savedPassword) {
          setUnlocked(true);
        } else {
          const entry = prompt("Enter password to open this note:");
          if (entry === savedPassword) {
            setUnlocked(true);
          } else {
            alert("Wrong password!");
          }
        }
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

  useEffect(() => {
    if (unlocked) {
      let blocks = [];
      if (Array.isArray(note.content)) {
        blocks = note.content;
      } else if (note.content && Array.isArray(note.content.blocks)) {
        blocks = note.content.blocks;
      }
      initEditor({
        blocks,
        time: Date.now(),
        version: "2.25.0",
      });
    }
  }, [unlocked, note.content]);

  const initEditor = (
    initialData = { blocks: [], time: Date.now(), version: "2.25.0" }
  ) => {
    // Destroy previous instance if exists
    if (ejInstance.current) {
      ejInstance.current.destroy();
      ejInstance.current = null;
    }
    const editor = new EditorJS({
      holder: document.getElementById("editorjs") || "editorjs",
      autofocus: true,
      placeholder: "Start writing your note...",
      data: initialData,
      tools: { header: Header, list: List, embed: Embed },
      onReady: async () => {
        ejInstance.current = editor;
        const saved = await editor.save();
        const lastIndex = saved.blocks.length - 1;
        if (lastIndex >= 0) {
          editor.caret.setToBlock(lastIndex, "end");
        } else {
          editor.caret.focus(true);
        }
      },
      onChange: debounce(async () => {
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
      }, 1000), // Đợi 1 giây sau khi ngừng gõ
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

  if (!unlocked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className={`${isDark ? "text-white" : "text-black"}`}>
          This note is locked. Please enter the password.
        </p>
      </div>
    );
  }

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
            className={`text-lg font-medium w-[400px] line-clamp-1 ${
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
            {note.visibility == "private" ? (
              <div className="flex flex-row gap-2 items-center justify-center">
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
            ) : (
              <div className="flex flex-row gap-2 items-center justify-center">
                {" "}
                <Globe
                  className={`w-4 h-4 ${
                    isDark ? "text-zinc-500" : "text-zinc-400"
                  }`}
                />
                <span
                  className={`${
                    isDark ? "text-zinc-500" : "text-zinc-400"
                  } text-sm`}
                >
                  Public
                </span>
                <ChevronUp
                  className={`w-4 h-4 ${
                    isDark ? "text-zinc-500" : "text-zinc-400"
                  }`}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`p-2 rounded-full cursor-pointer ${
              isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            }`}
            onClick={() => handlePin(noteId)}
          >
            {note.isPinned == 1 ? (
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
                  }}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleTrash={handleToggleTrash}
                  onTogglePublic={handleToggleVisibility}
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
            className={`items-start flex w-[full] min-h-[300px] rounded-md mb-6 bg-red-0 space-y-0 ${
              isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default NotePage;
