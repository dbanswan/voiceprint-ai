"use client";

import { useEffect } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
const ThemeToggle = () => {
  const toggleTheme = () => {
    document.body.classList.toggle("dark");

    // Optionally, you could store the user's preference in local storage
    const currentTheme = document.body.classList.contains("dark")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme);
  };

  // Check local storage for the user's preference when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  return (
    <button onClick={toggleTheme}>
      <SunIcon className="h-4 w-4" />
    </button>
  );
};

export default ThemeToggle;
