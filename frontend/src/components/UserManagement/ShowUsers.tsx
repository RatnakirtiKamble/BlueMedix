import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:5000/users");
  return data;
};

const ShowUsers: React.FC = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">Error loading users.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto max-w-full">
        <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Gender</th>
                <th className="py-2 px-4 border-b text-left">Age</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.gender}</td>
                  <td className="py-2 px-4 border-b">{user.age}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b capitalize">{user.role == 'isAdmin' ? 'Admin' : user.role == 'isCustomer' ? "Customer" : 'Seller'}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="bg-orange-400 hover:bg-orange-600 text-white py-1 px-3 rounded text-sm"
                    >
                      View User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowUsers;
