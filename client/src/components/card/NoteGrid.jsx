import React, { useState, useEffect } from "react";
import { Clock, LayoutGrid, List, Loader } from 'lucide-react';
import NoteCard from "./NoteCard";
import { useTheme } from "../../contexts/ThemeContext";
// import { noteService } from "../../services/noteService";
import { getColorById } from "../../utils/colorUtils";
import mockNotes from "../data/data";
import Loading from "../loading/Loading";
const NoteGrid = ({
    title = "Your Notes",
    onNoteClick,
    useMockData = false
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
                await new Promise(resolve => setTimeout(resolve, 2000));
                if (useMockData) {
                    // Sử dụng dữ liệu mẫu
                    setNotes(mockNotes);
                } else {
                    // Lấy dữ liệu từ API
                    const response = await noteApi.getNotes();
                    setNotes(response.data || []);
                }
                setTimeout(() => {
                    setNotes(mockNotes);
                    setLoading(false);
                }, 200);
                setError(null);
            } catch (err) {
                console.error("Error fetching notes:", err);
                setError("Failed to load notes. Please try again later.");

                // Fallback to mock data if API fails
                if (!useMockData) {
                    setNotes(mockNotes);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [useMockData]);

    const toggleViewMode = () => {
        setViewMode(viewMode === "grid" ? "list" : "grid");
        localStorage.setItem("viewMode", viewMode === "grid" ? "list" : "grid");
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center mt-20 min-h-[200px]">
            <Loading className="w-8 h-8 mb-4" />
            <div className={`text-center text-base mt-4 ${isDark ? "text-white" : "text-black"}`} >
                Hamster is finding your notes...
            </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center gap-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        <Clock className="w-4 h-4" />
                        <h2 className="font-medium">{title}</h2>
                    </div>
                </div>
                <div className={`text-center py-10 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    <Clock className="w-4 h-4" />
                    <h2 className="font-medium">{title}</h2>
                </div>

                <button
                    onClick={toggleViewMode}
                    className={`p-2 rounded-md cursor-pointer ${isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}
                    title={viewMode === "grid" ? "Switch to list view" : "Switch to grid view"}
                >
                    {viewMode === "grid" ? (
                        <List className="w-4 h-4" />
                    ) : (
                        <LayoutGrid className="w-4 h-4" />
                    )}
                </button>
            </div>

            {notes.length === 0 ? (
                <div className={`text-center py-10 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Oops! No notes found. Create your first note!
                </div>
            ) : (
                <div className={
                    viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        : "flex flex-col space-y-3"
                }>
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