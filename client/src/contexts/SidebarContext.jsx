"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Default sidebar menu items
const defaultMenuItems = [
  { id: "search", type: "search", label: "Search", icon: "search" },
  { id: "home", type: "home", label: "Home", icon: "home" },

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
  {
    id: "public",
    type: "notes",
    label: "Public Notes",
    icon: "globe",
    notes: [],
  },
  { id: "trash", type: "trash", label: "Trash", icon: "trash", notes: [] },
];

// Sample notes data
const sampleNotes = [
  {
    id: "1",
    title: "Meeting Notes",

    favorite: true,
    public: false,
    deleted: false,
    lastEdited: new Date().toISOString(),
    editedBy: "You",
  },
  {
    id: "2",
    title: "Project Ideas",
    favorite: true,
    public: false,
    deleted: false,
    lastEdited: new Date().toISOString(),
    editedBy: "You",
  },
  {
    id: "3",
    title: "Shopping List",
    favorite: false,
    public: false,
    deleted: false,
    lastEdited: new Date().toISOString(),
    editedBy: "You",
  },
  {
    id: "4",
    title: "Team Roadmap",
    favorite: false,
    public: true,
    deleted: false,
    lastEdited: new Date().toISOString(),
    editedBy: "Alex",
  },
  {
    id: "5",
    title: "Old Draft",
    favorite: false,
    public: false,
    deleted: true,
    lastEdited: new Date().toISOString(),
    editedBy: "You",
  },
  {
    id: "5",
    title: "Old Draft",
    favorite: false,
    public: false,
    deleted: true,
    lastEdited: new Date().toISOString(),
    editedBy: "You",
  },
  {
    id: "5",
    title: "Old Draft",
    favorite: false,
    public: false,
    deleted: true,
    lastEdited: new Date().toISOString(),
    editedBy: "You",
  },
  {
    id: "5",
    title: "Old Draft",
    favorite: false,
    public: false,
    deleted: true,
    lastEdited: new Date().toISOString(),
    editedBy: "You",
  },
];

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const defaultCollapsed = defaultMenuItems.reduce((acc, sec) => {
    acc[sec.id] = sec.id === "trash";
    return acc;
  }, {});
  // Sidebar state
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [width, setWidth] = useState(300); // Default width
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [notes, setNotes] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState(defaultCollapsed);
  const [showItemCount, setShowItemCount] = useState(10);
  const [sortOrder, setSortOrder] = useState("newest");
  const [isMobile, setIsMobile] = useState(false);

  // Initialize notes data
  useEffect(() => {
    const favoriteNotes = sampleNotes.filter(
      (note) => note.favorite && !note.deleted
    );
    const privateNotes = sampleNotes.filter(
      (note) => !note.public && !note.favorite && !note.deleted
    );
    const publicNotes = sampleNotes.filter(
      (note) => note.public && !note.deleted
    );
    const trashNotes = sampleNotes.filter((note) => note.deleted);

    // Update menu items with notes
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === "favorite") return { ...item, notes: favoriteNotes };
        if (item.id === "private") return { ...item, notes: privateNotes };
        if (item.id === "public") return { ...item, notes: publicNotes };
        if (item.id === "trash") return { ...item, notes: trashNotes };
        return item;
      })
    );

    setNotes(sampleNotes);
  }, []);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    if (!isLocked) {
      setIsOpen((prev) => !prev);
    }
  };

  // Toggle lock state
  const toggleLock = () => {
    setIsLocked((prev) => !prev);
  };

  // Toggle section collapse
  const toggleSection = (sectionId) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Reorder menu items
  const reorderMenuItems = (startIndex, endIndex) => {
    const result = Array.from(menuItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setMenuItems(result);
  };

  // Add note to favorites
  const toggleFavorite = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, favorite: !note.favorite } : note
      )
    );

    // Update menu items
    updateMenuItemsWithNotes();
  };

  // Move note to trash
  const moveToTrash = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, deleted: true } : note
      )
    );

    // Update menu items
    updateMenuItemsWithNotes();
  };

  // Restore note from trash
  const restoreFromTrash = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, deleted: false } : note
      )
    );

    // Update menu items
    updateMenuItemsWithNotes();
  };

  // Delete note permanently
  const deleteForever = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));

    // Update menu items
    updateMenuItemsWithNotes();
  };

  // Update menu items with current notes
  const updateMenuItemsWithNotes = () => {
    const favoriteNotes = notes.filter(
      (note) => note.favorite && !note.deleted
    );
    const privateNotes = notes.filter(
      (note) => !note.public && !note.favorite && !note.deleted
    );
    const publicNotes = notes.filter((note) => note.public && !note.deleted);
    const trashNotes = notes.filter((note) => note.deleted);

    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === "favorite") return { ...item, notes: favoriteNotes };
        if (item.id === "private") return { ...item, notes: privateNotes };
        if (item.id === "public") return { ...item, notes: publicNotes };
        if (item.id === "trash") return { ...item, notes: trashNotes };
        return item;
      })
    );
  };
  // Set when sidebar closed
  const openAndExpand = (sectionId) => {
    setIsOpen(true);
    setCollapsedSections((prev) => {
      const newState = {};
      Object.keys(prev).forEach((id) => {
        newState[id] = id !== sectionId;
        // sectionId → false (mở), còn lại → true (đóng)
      });
      return newState;
    });
  };
  // Sort notes
  const sortNotes = (sectionId, order) => {
    setSortOrder(order);

    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === sectionId) {
          const sortedNotes = [...item.notes];

          if (order === "newest") {
            sortedNotes.sort(
              (a, b) => new Date(b.lastEdited) - new Date(a.lastEdited)
            );
          } else if (order === "oldest") {
            sortedNotes.sort(
              (a, b) => new Date(a.lastEdited) - new Date(b.lastEdited)
            );
          } else if (order === "alphabetical") {
            sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
          }

          return { ...item, notes: sortedNotes };
        }
        return item;
      })
    );
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("vn-VN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const value = {
    isOpen,
    setIsOpen,
    isLocked,
    toggleLock,
    width,
    setWidth,
    menuItems,
    setMenuItems,
    toggleSidebar,
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
