import React from "react";
import "boxicons";
import { Link } from "react-router-dom";
import DarkModeToggle from "../Ui/DarkModeToggle";

const index = () => {
  return (
    <header className="fixed top-0 w-full shadow-lg bg-white dark:bg-[#2B3844]">
      <div className="container">
        <nav className="flex justify-between items-center py-6">
          <Link to="/" className="text-[#111517] dark:text-white text-base md:text-2xl font-extrabold ">
            Where in the world?
          </Link>

          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default index;
