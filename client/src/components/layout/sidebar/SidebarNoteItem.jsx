
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
    </div>
  );
};


export default SidebarNoteItem
