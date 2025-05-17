import React, { useState } from "react";
import { useSidebar } from "../../../contexts/SidebarContext";
import SidebarNoteItem from "./SidebarNoteItem";
import {
  ChevronDown,
  ChevronRight,
  ArrowUpDown,
  List,
  UserPlus,
  Star,
  Lock,
  Globe,
  Trash,
  Settings,
  Search,
  Home,
} from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import PropTypes from "prop-types";
import SearchModal from "../../ui/SearchModal";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ item, index, onDragStart, onDragEnd, onDragOver }) => {
  const {
    collapsedSections,
    toggleSection,
    showItemCount,
    setShowItemCount,
    sortNotes,
    sortOrder,
    isOpen,
    setIsOpen,
    openAndExpand,
  } = useSidebar();
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCountDropdown, setShowCountDropdown] = useState(false);
  const isCollapsed = collapsedSections[item.id];
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();

  const handleDragStart = (e) => {
    if (item.type === "search" || item.type === "link") return;
    onDragStart(e, index);
  };

  const handleToggleSortDropdown = (e) => {
    e.stopPropagation();
    setShowSortDropdown((prev) => !prev);
    setShowCountDropdown(false);
  };

  const handleToggleCountDropdown = (e) => {
    e.stopPropagation();
    setShowCountDropdown((prev) => !prev);
    setShowSortDropdown(false);
  };

  React.useEffect(() => {
    if (showSortDropdown || showCountDropdown) {
      document.addEventListener("click", () => {
        setShowSortDropdown(false);
        setShowCountDropdown(false);
      });
      return () => document.removeEventListener("click", () => {});
    }
  }, [showSortDropdown, showCountDropdown]);

  const getIcon = () => {
    switch (item.icon) {
      case "search":
        return <Search className={`h-4 w-4`} />;
      case "star":
        return <Star className="h-4 w-4 text-yellow-400" />;
      case "lock":
        return <Lock className={`h-4 w-4 `} />;
      case "globe":
        return <Globe className="h-4 w-4 text-blue-400" />;
      case "trash":
        return <Trash className="h-4 w-4 text-red-400" />;
      case "settings":
        return <Settings className={`h-4 w-4`} />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (item.type === "home") {
      return (
        <>
          {!isOpen && (
            <div
              className={`flex justify-center items-center py-3 cursor-pointer rounded-md hover:bg-gray-200/50 transition-colors`}
              onClick={() => {
                navigate("/home");
              }}
            >
              <Home className="h-4 w-4" />
            </div>
          )}
        </>
      );
    }

    // Nếu đóng sidebar và không phải là search
    if (!isOpen && item.type !== "search" && item.type !== "home") {
      return (
        <div
          className={`flex justify-center items-center py-3 cursor-pointer rounded-md hover:bg-gray-200/50 transition-colors`}
          onClick={() => {
            openAndExpand(item.id);
          }}
        >
          <div className={`flex items-center justify-center`}>{getIcon()}</div>
        </div>
      );
    }
    // Nếu là home

    if (item.type === "search") {
      return (
        <>
          {/* Nút hiển thị Modal */}

          {!isOpen ? (
            <div
              className={`flex justify-center items-center py-3 cursor-pointer rounded-md hover:bg-gray-200/50 transition-colors`}
              onClick={() => {
                // khi collapse: mở sidebar luôn nếu cần
                setShowSearchModal(true);
              }}
            >
              <Search className="h-4 w-4" />
            </div>
          ) : (
            <div
              className={`flex justify-round items-center py-2 cursor-pointer rounded-md hover:bg-gray-200/70 gap-2 bg-zinc-200/30 text-left rounded-md text-sm  transition-colors`}
              onClick={() => {
                // khi collapse: mở sidebar luôn nếu cần
                if (!isOpen) setIsOpen(true);
                setShowSearchModal(true);
              }}
            >
              <Search className="h-4 w-4 ml-3" />
              <span>Search notes...</span>
            </div>
          )}
          {/* Modal */}
          <SearchModal
            open={showSearchModal}
            onClose={() => setShowSearchModal(false)}
          />
        </>
      );
    }

    // là Note hoặc Trash
    if (item.type === "notes" || item.type === "trash") {
      return (
        <>
          <div
            className={`group flex items-center px-3 py-2 cursor-pointer rounded-md hover:bg-gray-200/50 transition-colors`}
            onClick={() => toggleSection(item.id)}
            draggable={item.type !== "search" && item.type !== "link"}
            onDragStart={handleDragStart}
          >
            <div className="mr-2">{getIcon()}</div>
            <span className="flex-1 text-sm font-medium ">{item.label}</span>
            <div className="flex items-center space-x-1 ">
              {item.notes && (
                <span className="text-xs text-zinc-500 dark:zinc-gray-400 mr-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {item.notes.length}
                </span>
              )}
              {item.type === "notes" && (
                <>
                  <div className="relative">
                    <button
                      className={`p-1 rounded-md cursor-pointer hover:bg-gray-200/50 opacity-0 transition-opacity group-hover:opacity-100`}
                      onClick={handleToggleSortDropdown}
                      title="Sort"
                    >
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                    {showSortDropdown && (
                      <div
                        className={`absolute right-0 mt-1 w-40 text-black cursor-pointer rounded-md shadow-lg z-50 py-1 text-xs bg-white`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className={`flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200/50`}
                          onClick={() => {
                            sortNotes(item.id, "newest");
                            setShowSortDropdown(false);
                          }}
                        >
                          <span>Newest first</span>
                        </button>
                        <button
                          className={`flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200/50`}
                          onClick={() => {
                            sortNotes(item.id, "oldest");
                            setShowSortDropdown(false);
                          }}
                        >
                          <span>Oldest first</span>
                        </button>
                        <button
                          className={`flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200/50`}
                          onClick={() => {
                            sortNotes(item.id, "alphabetical");
                            setShowSortDropdown(false);
                          }}
                        >
                          <span>Alphabetical</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      className="p-1 rounded-md cursor-pointer hover:bg-gray-200/50 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={handleToggleCountDropdown}
                      title="Show count"
                    >
                      <List className="h-3.5 w-3.5" />
                    </button>
                    {showCountDropdown && (
                      <div
                        className="absolute right-0 mt-1 w-40 cursor-pointer rounded-md shadow-lg z-50 py-1 text-xs bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {[5, 10, 20, 50].map((count) => (
                          <button
                            key={count}
                            className={`flex items-center w-full text-black px-3 py-2 cursor-pointer hover:bg-black/10`}
                            onClick={() => {
                              setShowItemCount(count);
                              setShowCountDropdown(false);
                            }}
                          >
                            <span>Show {count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              ) : (
                <ChevronDown className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </div>
          </div>
          {!isCollapsed && (
            <div className="pl-8 pr-3 mt-1 space-y-1 ">
              {item.id === "trash" && (
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Search in trash..."
                    className="w-full px-3 py-1 pl-7 bg-gray-100 text-zinc-400 outline-none rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-black border"
                  />
                  <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-gray-400" />
                </div>
              )}
              {item.notes && item.notes.length > 0 ? (
                item.notes
                  .slice(0, showItemCount)
                  .map((note) => (
                    <SidebarNoteItem
                      key={note.id}
                      note={note}
                      sectionId={item.id}
                    />
                  ))
              ) : item.id === "public" ? (
                <div className={`py-2 px-3 text-xs rounded-md bg-zinc-500/20`}>
                  <p>No shared notes yet</p>
                  <button className="mt-2 flex items-center text-blue-500 hover:underline cursor-pointer">
                    <UserPlus className="h-3 w-3 mr-1" />
                    <span>Invite others</span>
                  </button>
                </div>
              ) : (
                <div className="py-2 px-3 text-xs text-gray-500 dark:text-gray-400">
                  No notes found
                </div>
              )}
              {item.id === "trash" && (
                <div className="py-2 text-xs text-gray-500 dark:text-gray-400 italic">
                  Notes will be permanently deleted after 30 days
                </div>
              )}
            </div>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div
      className="mb-1"
      draggable={item.type !== "search" && item.type !== "link"}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {renderContent()}
    </div>
  );
};
SidebarItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    notes: PropTypes.array,
  }).isRequired,
  index: PropTypes.number,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragOver: PropTypes.func,
};

export default SidebarItem;
