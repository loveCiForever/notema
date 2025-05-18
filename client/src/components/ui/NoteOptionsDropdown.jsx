import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont } from '../../contexts/FontContext';
import { MoreHorizontal, Type, Text, Lock, Eye, Info, Trash2, Star, Globe } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import PasswordModal from '../ui/PasswordModal';

const FONT_FAMILIES = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];

export default function NoteOptionsDropdown({
  show,
  onClose,
  note,
  onTogglePassword,
  onToggleFavorite,
  onToggleTrash,
  onTogglePublic,
  fontSize,
  onFontSizeChange
}) {
  const { isDark } = useTheme();
  const { fontFamily, setFontFamily } = useFont();
  const [passwordEnabled, setPasswordEnabled] = useState(!!localStorage.getItem(`note_pass_${note.id}`));
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'change', 'remove'

  const handleSetPassword = (password) => {
    localStorage.setItem(`note_pass_${note.id}`, password);
    setPasswordEnabled(true);
    onTogglePassword(note.id, true);
    setShowPasswordModal(false);
  };

  const handleChangePassword = (oldPassword, newPassword) => {
    const savedPassword = localStorage.getItem(`note_pass_${note.id}`);
    if (savedPassword !== oldPassword) {
      alert('Mật khẩu cũ không đúng');
      return;
    }
    localStorage.setItem(`note_pass_${note.id}`, newPassword);
    setShowPasswordModal(false);
  };

  const handleRemovePassword = (confirmPassword) => {
    const savedPassword = localStorage.getItem(`note_pass_${note.id}`);
    if (savedPassword !== confirmPassword) {
      alert('Mật khẩu không đúng');
      return;
    }
    localStorage.removeItem(`note_pass_${note.id}`);
    setPasswordEnabled(false);
    onTogglePassword(note.id, false);
    setShowPasswordModal(false);
  };

  const wordCount = (() => {
    const text = typeof note.content === 'string'
      ? note.content
      : (note.content.blocks || []).map(b => b.data.text).join(' ');
    return text.trim().split(/\s/).filter(Boolean).length;
  })();

  if (!show) return null;
  return (
    <div
      className={`absolute right-0 mt-1 w-64 rounded-md shadow-lg z-50 py-2 text-sm
        ${isDark ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black'}`}
      onClick={e => e.stopPropagation()}
    >
      {/* Font selector */}
      <div className="px-3 py-2 flex items-center gap-2">
        <Type className="w-4 h-4" />
        <select
          className={`flex-1 bg-transparent outline-none`}
          value={fontFamily}
          onChange={e => setFontFamily(e.target.value)}
        >
          {FONT_FAMILIES.map(f => (
            <option className={`${isDark ? "bg-zinc-700" : ""}`} key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Font size slider */}
      <div className="px-3 py-2 border-b flex items-center gap-2">
        <Text className="w-4 h-4" />
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={e => onFontSizeChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-8 text-right">{fontSize}px</span>
      </div>

      {/* Favourite */}
      <button
        className={`w-full text-left px-3 py-2 flex items-center gap-2
          ${isDark ? 'hover:bg-white/20' : 'hover:bg-zinc-200'}`}
        onClick={() => {
          onToggleFavorite(note.id, !note.isFavourite);
          onClose();
        }}
      >
        <Star className="w-4 h-4" />
        <span>{note.isFavourite ? 'Remove Favourite' : 'Add to Favourite'}</span>
      </button>

      {/* Public / Private */}
      <button
        className={`w-full text-left px-3 py-2 flex items-center gap-2
          ${isDark ? 'hover:bg-white/20' : 'hover:bg-zinc-200'}`}
        onClick={() => {
          onTogglePublic(note.id, note.visibility !== 'public');
          onClose();
        }}
      >
        <Globe className="w-4 h-4" />
        <span>{note.visibility === 'public' ? 'Make Private' : 'Make Public'}</span>
      </button>

      {/* Password options */}
      {!passwordEnabled ? (
        <button
          className={`w-full text-left px-3 py-2 flex items-center gap-2
            ${isDark ? 'hover:bg-white/20' : 'hover:bg-zinc-200'}`}
          onClick={() => {
            setModalMode('create');
            setShowPasswordModal(true);
          }}
        >
          <Lock className="w-4 h-4" />
          <span>Add Password</span>
        </button>
      ) : (
        <>
          <button
            className={`w-full text-left px-3 py-2 flex items-center gap-2
              ${isDark ? 'hover:bg-white/20' : 'hover:bg-zinc-200'}`}
            onClick={() => {
              setModalMode('change');
              setShowPasswordModal(true);
            }}
          >
            <Lock className="w-4 h-4" />
            <span>Change Password</span>
          </button>
          <button
            className={`w-full text-left px-3 py-2 flex items-center gap-2
              ${isDark ? 'hover:bg-white/20' : 'hover:bg-zinc-200'}`}
            onClick={() => {
              setModalMode('remove');
              setShowPasswordModal(true);
            }}
          >
            <Lock className="w-4 h-4" />
            <span>Remove Password</span>
          </button>
        </>
      )}

      {/* Trash / Restore */}
      <button
        className={`w-full text-left px-3 py-2 flex items-center gap-2
          ${isDark ? 'hover:bg-white/20' : 'hover:bg-zinc-200'}`}
        onClick={() => {
          onToggleTrash(note.id, !note.isDeleted);
          onClose();
        }}
      >
        <Trash2 className="w-4 h-4" />
        <span>{note.isDeleted ? 'Restore from Trash' : 'Move to Trash'}</span>
      </button>

      {/* Word count */}
      <div className="px-3 py-1 border-t flex items-center gap-2">
        <span>Words: {wordCount}</span>
      </div>

      {/* Last edited */}
      <div className="px-3 py-1 flex items-center gap-2">
        <span>{note.lastEdited ? (
          `Edited ${formatDistanceToNow(new Date(note.lastEdited), { addSuffix: true })}`
        ) : (
          'Edited unknown'
        )}
        </span>
      </div>

      {/* Password Modal */}
      <PasswordModal
        open={showPasswordModal}
        onConfirm={modalMode === 'create' ? handleSetPassword : modalMode === 'change' ? handleChangePassword : handleRemovePassword}
        onCancel={() => setShowPasswordModal(false)}
        title={modalMode === 'create' ? "Set a password for this note" : modalMode === 'change' ? "Change password for this note" : "Remove password for this note"}
        mode={modalMode}
      />
    </div>
  );
}