import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import sunIcon from "../../assets/icons/black/sun.svg";
import moonIcon from "../../assets/icons/black/moon.svg";

const SwitchTheme = ({ width, height }) => {
  const { isDark, toggleTheme } = useTheme();
  const trackStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: isDark ? "#52525b" : "#f0f4f6",
    borderRadius: `${height / 2}px`,
    transition: "background-color 0.3s",
    title: "Click here to change theme",
    border: "1px solid #e4e4e7",
  };
  const thumbSize = height - 8;
  const thumbStyle = {
    width: `${thumbSize}px`,
    height: `${thumbSize}px`,
    top: "4px",
    left: isDark ? `${width - thumbSize - 4}px` : "4px",
    borderRadius: "50%",
    background:
      isDark
        ? "linear-gradient(to right, #27272a,rgb(24, 24, 101))"
        : "linear-gradient(to right, #f97316, #facc15)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    transition: "left 0.3s, background 0.3s",
    position: "absolute",
  };

  // icon size and position
  const iconSize = thumbSize * 0.75;
  const iconStyle = (position) => ({
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    position: "absolute",
    top: `${(height - iconSize) / 2}px`,
    [position]: `${(height - iconSize) / 2}px`,
    pointerEvents: "none",
    zIndex: 2,
  });

  return (
    <label className="inline-block relative cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={isDark}
        onChange={toggleTheme}
      />
      <div style={trackStyle} />
      {/* Sun icon: only in light mode */}
      {!isDark && (
        <img src={sunIcon} alt="Sun icon" style={iconStyle("left")} />
      )}
      {/* Moon icon: only in dark mode */}
      {isDark && (
        <img src={moonIcon} alt="Moon icon" style={iconStyle("right")} />
      )}
      <div style={{ ...thumbStyle, zIndex: 1 }} />
    </label>
  );
};

export default SwitchTheme;
