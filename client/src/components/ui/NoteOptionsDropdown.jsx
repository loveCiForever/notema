import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useFont } from "../../contexts/FontContext";
import {
  MoreHorizontal,
  Type,
  Text,
  Lock,
  Eye,
  Info,
  Trash2,
  Star,
  Globe,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const FONT_FAMILIES = [
  "sans-serif",
  "serif",
  "monospace",
  "cursive",
  "fantasy",
];

export default function NoteOptionsDropdown({
  show,
  onClose,
  note,
  onTogglePassword,
  onToggleFavorite,
  onToggleTrash,
  onTogglePublic,
  fontSize,
  onFontSizeChange,
}) {
  const { isDark } = useTheme();
  const { fontFamily, setFontFamily } = useFont();
  const [passwordEnabled, setPasswordEnabled] = useState(
    note.isLocked || false
  );

  console.log(note);
  const wordCount = (() => {
    const text =
      typeof note.content === "string"
        ? note.content
        : (note.content.blocks || []).map((b) => b.data.text).join(" ");
    return text.trim().split(/\s/).filter(Boolean).length;
  })();

  if (!show) return null;
  return (
    <div
      className={`absolute right-0 mt-1 w-64 rounded-md shadow-lg z-50 py-2 text-sm
        ${isDark ? "bg-zinc-800 text-white" : "bg-zinc-100 text-black"}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Font selector */}
      <div className="px-3 py-2 flex items-center gap-2">
        <Type className="w-4 h-4" />
        <select
          className={`flex-1 bg-transparent outline-none `}
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {FONT_FAMILIES.map((f) => (
            <option
              className={` ${isDark ? "bg-zinc-700" : ""}`}
              key={f}
              value={f}
            >
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Font size slider (local) */}
      <div className="px-3 py-2 border-b flex items-center gap-2">
        <Text className="w-4 h-4" />
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-8 text-right">{fontSize}px</span>
      </div>
      {/* Favourite */}
      <button
        className={`w-full text-left px-3 py-2 flex items-center gap-2
          ${isDark ? "hover:bg-white/20" : "hover:bg-zinc-200"}`}
        onClick={() => {
          onToggleFavorite(note.id, !note.isFavourite);
          onClose();
        }}
      >
        <Star className="w-4 h-4" />
        <span>
          {note.isFavourite == 1 ? "Remove Favourite" : "Add to Favourite"}
        </span>
      </button>

      {/* Public / Private */}
      <button
        className={`w-full text-left px-3 py-2 flex items-center gap-2
          ${isDark ? "hover:bg-white/20" : "hover:bg-zinc-200"}`}
        onClick={() => {
          onTogglePublic(note.id, note.visibility !== "public");
          onClose();
        }}
      >
        <Globe className="w-4 h-4" />
        <span>
          {note.visibility === "public" ? "Make Private" : "Make Public"}
        </span>
      </button>

      {/* Toggle password */}
      <button
        className={`w-full text-left px-3 py-2 flex items-center gap-2
          ${isDark ? "hover:bg-white/20" : "hover:bg-zinc-200"}`}
        onClick={() => {
          const next = !passwordEnabled;
          setPasswordEnabled(next);
          onTogglePassword(note.id, next);
          onClose();
        }}
      >
        <Lock className="w-4 h-4" />
        <span>{passwordEnabled ? "Remove Password" : "Add Password"}</span>
      </button>

      {/* Trash / Restore */}
      <button
        className={`w-full text-left px-3 py-2 flex items-center gap-2
    ${isDark ? "hover:bg-white/20" : "hover:bg-zinc-200"}`}
        onClick={() => {
          onToggleTrash(note.id, note.isTrashed == 1);
          onClose();
        }}
      >
        <Trash2 className="w-4 h-4" />
        <span>
          {note.isTrashed == 1 ? "Restore from Trash" : "Move to Trash"}
        </span>
      </button>

      {/* Word count */}
      <div className="px-3 py-1 border-t flex items-center gap-2">
        <span>Words: {wordCount}</span>
      </div>

      {/* Last edited */}
      <div className="px-3 py-1 flex items-center gap-2">
        <span>
          {note.lastEdited
            ? `Edited ${formatDistanceToNow(new Date(note.lastEdited), {
                addSuffix: true,
              })}`
            : "Edited unknown"}
        </span>
      </div>
    </div>
  );
}
