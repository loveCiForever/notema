
import React, { useState } from "react"
import { useSidebar } from "../../../contexts/SidebarContext"
import { MoreHorizontal, Star, StarOff, Copy, Link, Trash, RefreshCw, X, Edit } from "lucide-react"
import { useTheme } from "../../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const SidebarNoteItem = ({ note, sectionId }) => {
  const { toggleFavorite, moveToTrash, restoreFromTrash, deleteForever, formatTimestamp } = useSidebar();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNoteClick = () => {
    navigate(`./note/${note.id}`);
  };

  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = () => {
    setShowDropdown(false);
  };

  React.useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  const getIcon = () => {
    switch (sectionId) {
      case "favorite":
        return <Star className="h-4 w-4 text-yellow-400" />;
      case "public":
        return <Link className="h-4 w-4 text-blue-400" />;
      case "trash":
        return <Trash className="h-4 w-4 text-red-400" />;
      default:
        return <Edit className="h-4 w-4 text-gray-400" />;
    }
  };

  const {theme} = useTheme();
  
  return (
    <div onClick={() => {handleNoteClick()}} className={`relative flex items-center my-2 py-1 px-2 rounded-md group cursor-pointer transition-colors ${theme === "dark" ? "border-white text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-zinc-100"}`} >
      <div className="flex items-center flex-1 min-w-0">
        <div className="mr-2">{getIcon()}</div>
        <span className="truncate text-sm">{note.title}</span>
      </div>

      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown((v) => !v);
          }}
          className={`p-1 cursor-pointer rounded-md opacity-0 transition-opacity group-hover:opacity-100 ${theme === "dark" ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`} 
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {showDropdown && (
        <div
          className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg z-50 py-1 text-sm ${
            theme === "dark"
              ? "bg-zinc-800 text-white"
              : "bg-zinc-100 text-black"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Favorite */}
          <button
            className={`flex items-center w-full px-3 py-2 cursor-pointer hover:text-amber-500 ${theme === "dark" ? "hover:bg-white/30" : "hover:bg-zinc-200"}`}
            onClick={() => {
              toggleFavorite(note.id);
              setShowDropdown(false);
            }}
          >
            {note.favorite ? (
              <>
                <StarOff className="h-4 w-4 mr-2" />
                <span>Remove from favorites</span>
              </>
            ) : (
              <>
                <Star className="h-4 w-4 mr-2" />
                <span>Add to favorites</span>
              </>
            )}
          </button>

          {/* Duplicate */}
          <button className={`flex items-center w-full px-3 py-2 cursor-pointer ${theme === "dark" ? "hover:bg-white/30" : "hover:bg-zinc-200" }`}>
            <Copy className="h-4 w-4 mr-2" />
            <span>Duplicate</span>
          </button>

          {/* Copy link */}
          <button className={`flex items-center w-full px-3 py-2 cursor-pointer ${theme === "dark" ? "hover:bg-white/30" : "hover:bg-zinc-200" }`}>
            <Link className="h-4 w-4 mr-2" />
            <span>Copy link</span>
          </button>

          {/* Rename */}
          <button className={`flex items-center w-full px-3 py-2 cursor-pointer ${theme === "dark" ? "hover:bg-white/30" : "hover:bg-zinc-200" }`}>
            <Edit className="h-4 w-4 mr-2" />
            <span>Rename</span>
          </button>

          {/* Trash / Restore / Delete Forever */}
          {note.deleted ? (
            <>
              <button
                className={`flex items-center w-full px-3 py-2 cursor-pointer hover:text-green-400 ${theme === "dark" ? "hover:bg-white/30" : "hover:bg-zinc-200"}`}
                onClick={() => {
                  restoreFromTrash(note.id);
                  setShowDropdown(false);
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>Restore from trash</span>
              </button>
              <button
                className={`flex items-center w-full px-3 py-2 cursor-pointer hover:text-red-400 ${theme === "dark" ? "hover:bg-white/30" : "hover:bg-zinc-200"}`}
                onClick={() => {
                  deleteForever(note.id);
                  setShowDropdown(false);
                }}
              >
                <X className="h-4 w-4 mr-2" />
                <span>Delete forever</span>
              </button>
            </>
          ) : (
            <button
              className={`flex items-center w-full px-3 py-2 cursor-pointer hover:text-red-400 ${theme === "dark" ? "hover:bg-white/30" : "hover:bg-zinc-200"}`}
              onClick={() => {
                moveToTrash(note.id);
                setShowDropdown(false);
              }}
            >
              <Trash className="h-4 w-4 mr-2" />
              <span>Move to trash</span>
            </button>
          )}

          {/* Footer */}
          <div className="px-3 py-2 text-xs border-t border-black/20 dark:border-white/20 mt-1">
            Last edited by {note.editedBy}
            <span> {formatTimestamp(note.lastEdited)}</span>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};


export default SidebarNoteItem
