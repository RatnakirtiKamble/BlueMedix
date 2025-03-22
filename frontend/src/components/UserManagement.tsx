import React, { useState } from "react";
import ShowUsers from "./UserManagement/ShowUsers";
import AddUser from "./UserManagement/AddUser";

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("showUsers");

  return (
    <div className="p-4 w-full h-full">
      <div>
        <ul className="flex space-x-5 border-b-2 border-gray-300">
          {["showUsers", "addUser"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`p-2 rounded-t-lg ${
                activeTab === tab
                  ? "opacity-100 border-gray-700 bg-gray-200 text-black"
                  : "opacity-70 border-transparent"
              } transition-all duration-200`}
            >
              {tab === "showUsers" ? "Show Users" : "Add User" }
            </button>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        {activeTab === "showUsers" && <ShowUsers />}
        {activeTab === "addUser" && <AddUser />}
      </div>
    </div>
  );
};

export default UserManagement;
