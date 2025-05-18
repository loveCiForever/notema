import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isDark, setIsDark] = useState(localStorage.getItem("isDark") === "true");

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      setIsDark(next === "dark");
      localStorage.setItem("theme", next);
      // console.log("Theme changed to ", next);
      localStorage.setItem("isDark", next === "dark");
      // console.log("Is Daark ", isDark, 'next', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
