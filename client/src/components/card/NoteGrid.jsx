import React, { useState, useEffect } from "react";
import { Clock, LayoutGrid, List, Loader, Notebook } from "lucide-react";
import NoteCard from "./NoteCard";
import { useTheme } from "../../contexts/ThemeContext";
import { getColorById } from "../../utils/colorUtils";
import mockNotes from "../data/data";
import Loading from "../loading/Loading";
import { noteApi } from "../../services/noteApi";

const NoteGrid = ({
  title = "Your Notes",
  onNoteClick,
  useMockData = false,
  userId,
  refreshTrigger, // Thêm props để cập nhật
}) => {
  const { isDark } = useTheme();
  const [viewMode, setViewMode] = useState(localStorage.getItem("viewMode") || "grid");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        let fetchedNotes;
        if (useMockData) {
          fetchedNotes = mockNotes;
        } else {
          const response = await noteApi.getNotes(userId);
          fetchedNotes = response.data ?? [];
        }
        // Sắp xếp ghi chú
        const sortedNotes = fetchedNotes.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return new Date(b.lastEdited) - new Date(a.lastEdited);
        });
        setNotes(sortedNotes);
        setError(null);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please try again later.");
        if (!useMockData) {
          setNotes(mockNotes);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [useMockData, userId, refreshTrigger]);

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
    localStorage.setItem("viewMode", viewMode === "grid" ? "list" : "grid");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 min-h-[200px]">
        <Loading className="w-8 h-8 mb-4" />
        <div className={`text-center text-base mt-4 ${isDark ? "text-white" : "text-black"}`}>
          Hamster is finding your notes...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-2 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            <Clock className="w-4 h-4" />
            <h2 className="font-medium">{title}</h2>
          </div>
        </div>
        <div className={`text-center py-10 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
          <Notebook className="w-4 h-4" />
          <h2 className="font-medium">{title}</h2>
        </div>
        <button
          onClick={toggleViewMode}
          className={`p-2 rounded-md cursor-pointer ${
            isDark ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-600"
          }`}
          title={viewMode === "grid" ? "Switch to list view" : "Switch to grid view"}
        >
          {viewMode === "grid" ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
        </button>
      </div>

      {notes.length === 0 ? (
        <div className={`text-center py-10 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
          Oops! No notes found. Create your first note!
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col space-y-3"
          }
        >
          {notes.map((note, index) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              color={getColorById(note.id)}
              isPinned={note.isPinned}
              isLocked={note.isLocked}
              isFavourite={note.isFavourite}
              visibility={note.visibility}
              rotation={viewMode === "grid" ? [-2, -1, 0, 1, 2][index % 5] : 0}
              onClick={() => onNoteClick && onNoteClick(note.id, note)}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteGrid;