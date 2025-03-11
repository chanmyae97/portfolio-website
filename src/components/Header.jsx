import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Header Section
      </h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
