import React, { createContext, useState, useContext, useEffect } from 'react';

// 1rem mặc định ~16px, hiệu chỉnh tùy ý các huynh
const FontContext = createContext({ fontFamily: 'sans-serif', fontSize: 16, setFontFamily: () => {}, setFontSize: () => {} });

export const FontProvider = ({ children }) => {
  const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') || 'sans-serif');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 16);

  // Khi font thay đổi, cập nhật cả <html>
  useEffect(() => {
    document.documentElement.style.fontFamily = fontFamily;
    localStorage.setItem('fontFamily', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    // document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  return (
    <FontContext.Provider value={{ fontFamily, fontSize, setFontFamily, setFontSize }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);
