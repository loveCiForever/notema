import React from "react";
import { Pin, Lock, Globe, Star } from 'lucide-react';
import { useTheme } from "../../contexts/ThemeContext";

// Map of tailwind classes for each color
const COLOR_CLASSES = {
  yellow: {
    light: 'bg-yellow-100 shadow-zinc-300/50',
    dark: 'bg-yellow-800 shadow-zinc-900/50'
  },
  blue: {
    light: 'bg-blue-100 shadow-zinc-300/50',
    dark: 'bg-blue-800 shadow-zinc-900/50'
  },
  green: {
    light: 'bg-green-100 shadow-zinc-300/50',
    dark: 'bg-green-800 shadow-zinc-900/50'
  },
  pink: {
    light: 'bg-pink-100 shadow-zinc-300/50',
    dark: 'bg-pink-800 shadow-zinc-900/50'
  },
  purple: {
    light: 'bg-purple-100 shadow-zinc-300/50',
    dark: 'bg-purple-800 shadow-zinc-900/50'
  },
  orange: {
    light: 'bg-orange-100 shadow-zinc-300/50',
    dark: 'bg-orange-800 shadow-zinc-900/50'
  },
  teal: {
    light: 'bg-teal-100 shadow-zinc-300/50',
    dark: 'bg-teal-800 shadow-zinc-900/50'
  },
  indigo: {
    light: 'bg-indigo-100 shadow-zinc-300/50',
    dark: 'bg-indigo-800 shadow-zinc-900/50'
  }
};

const GRADIENT_CLASSES = {
  yellow: { light: 'to-yellow-100', dark: 'to-yellow-800/20' },
  blue: { light: 'to-blue-100', dark: 'to-blue-800/20' },
  green: { light: 'to-green-100', dark: 'to-green-800/20' },
  pink: { light: 'to-pink-100', dark: 'to-pink-800/20' },
  purple: { light: 'to-purple-100', dark: 'to-purple-800/20' },
  orange: { light: 'to-orange-100', dark: 'to-orange-800/20' },
  teal: { light: 'to-teal-100', dark: 'to-teal-800/20' },
  indigo: { light: 'to-indigo-100', dark: 'to-indigo-800/20' }
};

const NoteCard = ({
  id,
  title,
  content,
  color = 'yellow',
  isPinned = false,
  isLocked = false,
  isFavourite = false,
  visibility = "private",
  onClick,
  rotation = 0,
  viewMode = "grid",
}) => {
  const { isDark } = useTheme();

  // Rotation classes
  const getRotationClass = () => {
    if (viewMode === "list") return "";
    return {
      '-2': '-rotate-2',
      '-1': '-rotate-1',
      '1': 'rotate-1',
      '2': 'rotate-2'
    }[rotation] || '';
  };

  // Background color
  const bgClass = COLOR_CLASSES[color]?.[isDark ? 'dark' : 'light']
    || COLOR_CLASSES.yellow[isDark ? 'dark' : 'light'];

  // Gradient for fade effect
  const gradientClass = GRADIENT_CLASSES[color]?.[isDark ? 'dark' : 'light']
    || GRADIENT_CLASSES.yellow[isDark ? 'dark' : 'light'];

  // Extract and truncate content
  const extractText = () => {
    if (typeof content === 'string') return content;
    if (content?.blocks) {
      return content.blocks
        .filter(b => ['paragraph', 'header'].includes(b.type))
        .map(b => b.data.text)
        .join(' ');
    }
    return '';
  };
  const text = extractText();
  const truncated = text.length > 30 ? text.slice(0, 30) + '...' : text;
  const isPublic = visibility === 'public';

  return (
    <div
      className={`
        ${bgClass}
        rounded-lg p-4 cursor-pointer transition-all duration-200
        relative overflow-hidden shadow-lg
        ${viewMode === 'grid' ? `transform hover:-translate-y-1 ${getRotationClass()}` : 'flex items-center'}
        ${isLocked ? 'blur-[1px]' : ''}
      `}
      onClick={onClick}
    >
      {/* List view left side content */}
      {viewMode === "list" && (
        <div className="flex-shrink-0 mr-4">
          <div className="w-10 h-10 flex items-center justify-center">
            {isPinned && <Pin className="w-5 h-5 text-red-500" />}
            {!isPinned && isFavourite && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
          </div>
        </div>
      )}

      {/* Grid view pin icon */}
      {viewMode === "grid" && isPinned && (
        <div className="absolute -top-1 -right-1 rotate-12">
          <Pin className="w-8 h-8 text-red-500 opacity-70" />
        </div>
      )}

      {/* Lock icon */}
      {isLocked && (
        <div className={`absolute ${viewMode === "grid" ? "top-2 right-2" : "top-4 right-4"}`}>
          <Lock className="w-4 h-4 text-zinc-500" />
        </div>
      )}

      {/* Main content */}
      <div className={viewMode === "list" ? "flex-grow" : ""}>
        <div className="mb-2 flex justify-between items-start">
          <h3 className={`font-medium ${viewMode === "grid" ? "text-lg" : "text-base"} ${isDark ? 'text-zinc-200' : 'text-zinc-800'} ${isLocked ? 'text-zinc-400' : ''}`}>
            {title}
          </h3>

          <div className="flex gap-1 mt-1">
            {/* Favorite icon in grid view */}
            {viewMode === "grid" && isFavourite && !isPinned && (
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            )}

            {/* Public/Global icon */}
            {isPublic && (
              <Globe className="w-4 h-4 text-blue-500" />
            )}
          </div>
        </div>

        <div className={`
          ${isDark ? 'text-zinc-300' : 'text-zinc-700'} 
          ${isLocked ? 'text-zinc-400 opacity-70' : ''} 
          text-sm
        `}>
          <p className="relative">
            {truncated}
            <span className={`absolute inset-0 bg-gradient-to-r from-transparent ${gradientClass} opacity-${isLocked ? '60' : '0'}`} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;