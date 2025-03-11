import { useState, useEffect } from "react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  // Initialize theme state from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Apply theme class to HTML element when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
    }
    
    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={`icon-container ${theme}`}>
        {theme === "light" ? (
          <i className="fa-solid fa-lightbulb text-yellow-400 text-xl animate-glow"></i>
        ) : (
          <i className="fa-regular fa-lightbulb text-gray-400 text-xl"></i>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;