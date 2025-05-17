import React from "react";
import { Pin, Lock, Globe, Star } from 'lucide-react';
import { useTheme } from "../../contexts/ThemeContext";

const NoteCard = ({
  id,
  title,
  content,
  color,
  isPinned = false,
  isLocked = false,
  isFavourite = false, // Lưu ý: backend sử dụng British spelling
  visibility = "private",
  onClick,
  rotation = 0,
  viewMode = "grid",
}) => {
  const { isDark } = useTheme();
  
  // Determine rotation class - only apply in grid mode
  const getRotationClass = () => {
    if (viewMode === "list") return "";
    
    switch(rotation) {
      case -2: return "-rotate-2";
      case -1: return "-rotate-1";
      case 1: return "rotate-1";
      case 2: return "rotate-2";
      default: return "";
    }
  };
  
  // Get background color based on note color and theme
  const getBgColor = () => {
    if (isDark) {
      return `bg-${color}-800/20 shadow-zinc-900/50`;
    } else {
      return `bg-${color}-100 shadow-zinc-300/50`;
    }
  };
  
  // Get gradient color for content fade
  const getGradientColor = () => {
    return `to-${color}-${isDark ? '800/20' : '100'}`;
  };
  
  // Extract text content from JSON or use string directly
  const getContentText = () => {
    if (typeof content === 'string') {
      return content;
    }
    
    // Nếu content là JSON từ EditorJS
    if (content && content.blocks && Array.isArray(content.blocks)) {
      // Lấy text từ các block
      return content.blocks
        .map(block => {
          if (block.type === 'paragraph' || block.type === 'header') {
            return block.data?.text || '';
          }
          return '';
        })
        .join(' ')
        .trim();
    }
    
    return '';
  };
  
  // Truncate content to first 30 characters + "..."
  const contentText = getContentText();
  const truncatedContent = contentText.length > 30 
    ? contentText.substring(0, 30) + "..." 
    : contentText;
  
  // Check if note is public
  const isPublic = visibility === "public";

  return (
    <div 
      className={`
        ${getBgColor()}
        rounded-lg p-4 cursor-pointer transition-all duration-200
        relative overflow-hidden shadow-lg
        ${viewMode === "grid" ? `transform hover:-translate-y-1 ${getRotationClass()}` : "flex items-center"}
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
            {truncatedContent}
            <span className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent ${getGradientColor()} opacity-${isLocked ? '60' : '0'}`}></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;