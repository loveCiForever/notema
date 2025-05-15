"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const SearchModal = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const { theme } = useTheme();

  // Mock categories for filtering
  const categories = ["All", "Favorite", "Private", "Public"];
  const [activeCategory, setActiveCategory] = useState("All");

  // Mock search results
  const searchResults =
    query.length > 0
      ? [
          {
            id: 1,
            title: "Project overview",
            category: "Documents",
            tags: ["work", "important"],
          },
          {
            id: 2,
            title: "Meeting minutes",
            category: "Documents",
            tags: ["work"],
          },
          {
            id: 3,
            title: "Design assets",
            category: "Images",
            tags: ["design"],
          },
          {
            id: 3,
            title: "Design assets",
            category: "Images",
            tags: ["design"],
          },
          {
            id: 3,
            title: "Design assets",
            category: "Images",
            tags: ["design"],
          },
          {
            id: 3,
            title: "Design assets",
            category: "Images",
            tags: ["design"],
          },
          {
            id: 3,
            title: "Design assets",
            category: "Images",
            tags: ["design"],
          },
          {
            id: 3,
            title: "Design assets",
            category: "Images",
            tags: ["design"],
          },
        ]
      : [];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Background overlay */}
      <div
        className={`absolute inset-0 backdrop-blur-sm ${
          theme === "dark" ? "bg-black/50" : "bg-black/30"
        }`}
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden ${
          theme === "dark"
            ? "bg-zinc-900 text-zinc-200"
            : "bg-white text-zinc-800"
        }`}
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {/* Header with search input */}
        <div
          className={`border-b ${
            theme === "dark" ? "border-zinc-800" : "border-zinc-100"
          }`}
        >
          <div className="flex items-center px-4 h-16">
            <Search
              className={`h-5 w-5 mr-3 ${
                theme === "dark" ? "text-zinc-500" : "text-zinc-400"
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anything..."
              className="flex-1 bg-transparent border-none outline-none text-lg"
              style={{
                color: theme === "dark" ? "#e5e7eb" : "#1f2937",
              }}
              autoFocus
            />
            <button
              onClick={onClose}
              className={`ml-2 p-2 rounded-full hover:${
                theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
              }`}
            >
              <X
                className={`h-5 w-5 cursor-pointer ${
                  theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                }`}
              />
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex px-4 pb-2 space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 cursor-pointer text-sm rounded-full transition-colors ${
                  activeCategory === category
                    ? theme === "dark"
                      ? "bg-white text-zinc-900 font-medium"
                      : "bg-zinc-900 text-white font-medium"
                    : theme === "dark"
                    ? "text-zinc-400 hover:bg-zinc-800"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results area */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {query.length > 0 ? (
            searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className={`px-4 py-3 cursor-pointer group transition-colors ${
                      theme === "dark"
                        ? "hover:bg-zinc-800/50"
                        : "hover:bg-zinc-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-medium ${
                          theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                        }`}
                      >
                        {result.title}
                      </h3>
                      <ArrowRight className="h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-1 flex items-center">
                      <span
                        className={`text-xs mr-3 ${
                          theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {result.category}
                      </span>
                      <div className="flex gap-1.5">
                        {result.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${
                              theme === "dark"
                                ? "bg-zinc-800 text-zinc-300"
                                : "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div
                  className={`rounded-full p-3 mb-4 ${
                    theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
                  }`}
                >
                  <Search className="h-6 w-6 text-zinc-400" />
                </div>
                <h3
                  className={`font-medium mb-1 ${
                    theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                  }`}
                >
                  No results found
                </h3>
                <p
                  className={`text-sm max-w-md ${
                    theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  We couldn't find anything matching "{query}". Try using
                  different keywords.
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <p
                className={`text-sm max-w-md cursor-default ${
                  theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                Start typing to search through your notes and documents
              </p>
            </div>
          )}
        </div>

        {/* Footer with keyboard shortcuts */}
        <div
          className={`border-t px-4 py-3 ${
            theme === "dark" ? "border-zinc-800" : "border-zinc-100"
          }`}
        >
          <div className="flex justify-end text-xs cursor-default">
            <span
              className={`${
                theme === "dark" ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Press{" "}
              <kbd
                className={`px-1.5 py-0.5 rounded font-mono ${
                  theme === "dark"
                    ? "bg-zinc-800 text-zinc-200"
                    : "bg-zinc-100 text-zinc-800"
                }`}
              >
                Esc
              </kbd>{" "}
              to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
