import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function PasswordModal({ open, onConfirm, onCancel, title, mode }) {
  const { isDark } = useTheme();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  if (!open) return null;

  const handleConfirm = () => {
    if (mode === 'create') {
      if (password === confirmPassword) {
        onConfirm(password);
      } else {
        alert('Mật khẩu xác nhận không khớp');
      }
    } else if (mode === 'change') {
      onConfirm(oldPassword, password);
    } else if (mode === 'remove') {
      onConfirm(password);
    }
    setPassword('');
    setConfirmPassword('');
    setOldPassword('');
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className={`bg-white p-6 rounded shadow-lg w-80 ${isDark ? 'text-white bg-zinc-900' : 'text-black'}`}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {mode === 'create' && (
          <>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded mb-4 ${isDark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-white border-zinc-300 text-black'}`}
              placeholder="Nhập mật khẩu"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border rounded mb-4 ${isDark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-white border-zinc-300 text-black'}`}
              placeholder="Xác nhận mật khẩu"
            />
          </>
        )}
        {mode === 'change' && (
          <>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`w-full p-2 border rounded mb-4 ${isDark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-white border-zinc-300 text-black'}`}
              placeholder="Mật khẩu cũ"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded mb-4 ${isDark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-white border-zinc-300 text-black'}`}
              placeholder="Mật khẩu mới"
            />
          </>
        )}
        {mode === 'remove' && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded mb-4 ${isDark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-white border-zinc-300 text-black'}`}
            placeholder="Nhập mật khẩu để xóa"
          />
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded ${isDark ? 'bg-zinc-600 hover:bg-zinc-500' : 'bg-zinc-200 hover:bg-zinc-300'}`}
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}