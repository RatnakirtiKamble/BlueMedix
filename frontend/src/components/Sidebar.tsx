import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Package, User } from "lucide-react";

type SidebarProps = {
  setActive: (name: string) => void; 
};

const Sidebar: React.FC<SidebarProps> = ({ setActive }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`relative sidebar bg-slate-900 text-white font-bold ${isOpen ? "w-72" : "w-20"} h-full fixed top-0 left-0 flex flex-col transition-all duration-300`}>
      

      <div className="p-4">
        <ul className="mt-4 space-y-2">
          <li className="p-2 hover:bg-slate-700 rounded">
            <button className="flex items-center gap-x-5 relative" onClick={() => setActive("user")}>
              <User />
              <span className={`whitespace-nowrap transition-all absolute left-10 ${isOpen ? "opacity-100 visible delay-200" : "opacity-0 invisible"}`}>
                User Management
              </span>
            </button>
          </li>

          <li className="p-2 hover:bg-slate-700 rounded">
            <button className="flex items-center gap-x-5 relative" onClick={() => setActive("product")}>
              <Package />
              <span className={`whitespace-nowrap transition-all absolute left-10 ${isOpen ? "opacity-100 visible delay-200" : "opacity-0 invisible"}`}>
                Product Management
              </span>
            </button>
          </li>
        </ul>
      </div>

      <button 
        className="absolute top-1/2 right-[-16px] transform -translate-y-1/2 bg-white text-slate-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md border"
        onClick={toggleSidebar}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

    </div>
  );
};

export default Sidebar;
