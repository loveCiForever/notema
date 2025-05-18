import React from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const NewNote = ({ onClick }) => {
  const { isDark } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`
        group flex items-center gap-2 px-4 py-4 rounded-full shadow-md
        cursor-pointer transition-colors duration-200
        ${isDark
          ? 'bg-gray-100 text-zinc-800 hover:bg-gray-300'
          : 'bg-blue-500 text-white hover:bg-blue-200 hover:text-blue-800'}
        }
      `}
    >
      <Plus
        className="w-5 h-5 transform transition-transform duration-1000
                   group-hover:rotate-360"
      />
      <span
        className="text-sm font-medium transition-all duration-500
                   hidden group-hover:block"
      >
        New Note
      </span>
    </button>
  );
};

export default NewNote;
