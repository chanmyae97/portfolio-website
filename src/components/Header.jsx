import React from "react";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";

const Header = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center p-4 px-8 md:px-16 lg:px-24">
      <div className="flex items-center gap-2 logo-container">
        <img
          src="/Logo.svg"
          alt="Logo"
          className="w-8 h-8"
          onClick={handleLogoClick}
        />
        <h1 className="text-xl font-bold shimmer-text">Ethan Chan</h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
