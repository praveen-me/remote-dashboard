"use client";
import SearchDropdown from "@/components/SearchDropdown";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">Mercor Task</div>
      <div className="flex-grow mx-8">
        <SearchDropdown />
      </div>
      <div className="text-white text-xl font-bold">Settings</div>
    </header>
  );
};

export default Header;
