import React from "react";
import { UserCircle } from "lucide-react";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  const home = () => {
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-slate-300 px-6 py-4 flex justify-between items-center">

      <button className="text-2xl font-bold font-sans" onClick={home}>Amaron <span className="text-orange-400">Dashboard</span></button>

      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <UserCircle size={28} className="text-black" />
      </div>

    </header>
  );
};

export default Header;
