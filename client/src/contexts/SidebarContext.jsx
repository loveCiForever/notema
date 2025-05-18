// src/contexts/SidebarContext.jsx

"use client";

import { createContext, useContext, useState, useEffect } from "react";
// Sử dụng dữ liệu mẫu từ file data.js
import mockNotes from "../components/data/data";
import { noteApi } from "../services/noteApi";
import { toast } from "react-toastify";
// Default sidebar menu items (chỉ chứa category, không chứa notes)
const defaultMenuItems = [
  { id: "search", type: "search", label: "Search", icon: "search", notes: [] },
  { id: "home", type: "home", label: "Home", icon: "home", notes: [] },
  {
    id: "favorite",
    type: "notes",
    label: "Favorite Notes",
    icon: "star",
    notes: [],
  },
  {
    id: "private",
    type: "notes",
    label: "Private Notes",
    icon: "lock",
    notes: [],
  },
  // {
  //   id: "public",
  //   type: "notes",
  //   label: "Public Notes",
  //   icon: "globe",
  //   notes: [],
  // },
  { id: "trash", type: "trash", label: "Trash", icon: "trash", notes: [] },
];

const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children, userId }) => {
  // collapsed: true = section is collapsed
  const defaultCollapsed = defaultMenuItems.reduce((acc, sec) => {
    acc[sec.id] = sec.id !== "search"; // chỉ search mở, ví dụ
    return acc;
  }, {});

  // States
  const [isOpen, setIsOpen] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [width, setWidth] = useState(300);
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [notes, setNotes] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState(defaultCollapsed);
  const [showItemCount, setShowItemCount] = useState(10);
  const [sortOrder, setSortOrder] = useState("newest");
  const [isMobile, setIsMobile] = useState(false);

  // Load mock notes once
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetched = await noteApi.getNotes(userId);
        const notesArray = Array.isArray(fetched.data) ? fetched.data : [];
        setNotes(notesArray);
        updateMenuItemsWithNotes(notesArray);
      } catch (err) {
        console.error("Failed to fetch notes, using mockNotes:", err);
        setNotes(mockNotes);
        updateMenuItemsWithNotes(mockNotes);
      }
    };

    fetchNotes();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [userId]);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // utility: distribute notes into menuItems
  const updateMenuItemsWithNotes = (allNotes) => {
    const favoriteNotes = allNotes.filter(
      (n) => n.isFavourite == 1 && n.isTrashed != 1
    );
    const privateNotes = allNotes.filter(
      (n) =>
        (n.visibility === null || n.visibility === "private") &&
        n.isFavourite != 1 &&
        n.isTrashed != 1
    );
    const publicNotes = allNotes.filter(
      (n) => n.visibility === "public" && n.isTrashed != 1
    );
    const trashNotes = allNotes.filter((n) => n.isTrashed == 1);

    setMenuItems((mi) =>
      mi.map((item) => {
        switch (item.id) {
          case "favorite":
            return { ...item, notes: favoriteNotes };
          case "private":
            return { ...item, notes: privateNotes };
          case "public":
            return { ...item, notes: publicNotes };
          case "trash":
            return { ...item, notes: trashNotes };
          default:
            return item;
        }
      })
    );
  };

  // toggle favorite flag
  const toggleFavorite = async (noteId) => {
    try {
      const res = await noteApi.toggleFavourite(noteId);
      if (!res.success) {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }

    const updated = notes.map((n) =>
      n.id === noteId ? { ...n, favorite: !n.favorite } : n
    );
    setNotes(updated);
    updateMenuItemsWithNotes(updated);
  };

  // trash / restore / delete operations
  const moveToTrash = (noteId) => {
    const updated = notes.map((n) =>
      n.id === noteId ? { ...n, deleted: true } : n
    );
    setNotes(updated);
    updateMenuItemsWithNotes(updated);
  };
  const restoreFromTrash = (noteId) => {
    const updated = notes.map((n) =>
      n.id === noteId ? { ...n, deleted: false } : n
    );
    setNotes(updated);
    updateMenuItemsWithNotes(updated);
  };
  const deleteForever = (noteId) => {
    const updated = notes.filter((n) => n.id !== noteId);
    setNotes(updated);
    updateMenuItemsWithNotes(updated);
  };

  // reorder menu items array
  const reorderMenuItems = (startIndex, endIndex) => {
    setMenuItems((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  // sort notes within a section
  const sortNotes = (sectionId, order) => {
    setSortOrder(order);
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id !== sectionId) return item;
        const sorted = [...item.notes];
        if (order === "newest")
          sorted.sort(
            (a, b) => new Date(b.lastEdited) - new Date(a.lastEdited)
          );
        else if (order === "oldest")
          sorted.sort(
            (a, b) => new Date(a.lastEdited) - new Date(b.lastEdited)
          );
        else if (order === "alphabetical")
          sorted.sort((a, b) => a.title.localeCompare(b.title));
        return { ...item, notes: sorted };
      })
    );
  };

  // toggle collapse of section
  const toggleSection = (sectionId) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // open sidebar and expand only one section
  const openAndExpand = (sectionId) => {
    setIsOpen(true);
    setCollapsedSections((prev) =>
      Object.fromEntries(Object.keys(prev).map((id) => [id, id !== sectionId]))
    );
  };

  // format timestamp
  const formatTimestamp = (ts) => {
    const d = new Date(ts);
    return d.toLocaleDateString("vn-VN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const value = {
    isOpen,
    setIsOpen,
    toggleSidebar: () => {
      if (!isLocked) setIsOpen((o) => !o);
    },
    isLocked,
    toggleLock: () => setIsLocked((l) => !l),
    width,
    setWidth,
    menuItems,
    notes,
    collapsedSections,
    toggleSection,
    reorderMenuItems,
    showItemCount,
    setShowItemCount,
    sortOrder,
    sortNotes,
    toggleFavorite,
    moveToTrash,
    restoreFromTrash,
    deleteForever,
    formatTimestamp,
    isMobile,
    openAndExpand,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
