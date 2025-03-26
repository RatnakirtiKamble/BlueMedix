import React, { useState, useRef, useEffect } from "react";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const home = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt"); 
    navigate("/auth"); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-slate-300 px-6 py-4 flex justify-between items-center relative">

      <button className="text-2xl font-bold font-sans" onClick={home}>
        Amaron <span className="text-orange-400">Dashboard</span>
      </button>

      {/* User Icon & Popup Menu */}
      <div className="relative">
        <button className="w-10 h-10 rounded-full flex items-center justify-center" onClick={toggleMenu}>
          <UserCircle size={28} className="text-black" />
        </button>

        {menuOpen && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 flex flex-col">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
