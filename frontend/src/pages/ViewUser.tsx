import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Trash, XCircle, UserCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchUser = async (id: string) => {
  const { data } = await axios.get(`http://localhost:5000/users/${id}`);
  return data;
};

const deleteUser = async (id: string) => {
  await axios.delete(`http://localhost:5000/users/${id}`);
};

const ViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id!),
  });

  const mutation = useMutation({
    mutationFn: () => deleteUser(id!),
    onSuccess: () => {
      toast.success("User deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate(-1), 
      });
    },
  });

  if (isLoading) return <p className="text-center text-white">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">Error loading user.</p>;

  return (
    <div className="flex items-center justify-center h-[calc(100vh-73px)] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-6">
      <ToastContainer /> 
      
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg text-white text-center border border-white/30">
        <UserCircle size={80} className="mx-auto text-white/80 mb-4" />
        <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
        <p className="text-lg text-white/70">{data.email}</p>
        
        <div className="mt-6 text-left space-y-2">
          <p><span className="font-semibold">Gender:</span> {data.gender}</p>
          <p><span className="font-semibold">Age:</span> {data.age}</p>
          <p><span className="font-semibold">Role:</span> <span>{data.role == "isAdmin" ? "Admin" : data.role == "isCustomer" ? "Customer" : "Seller"}</span></p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate(`/users/${id}/edit`)}
            className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            <Edit size={16} />
            Edit
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
          >
            <Trash size={16} />
            Delete
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center text-gray-800">
            <h2 className="text-xl font-bold mb-2">Confirm Deletion</h2>
            <p className="text-gray-600">Are you sure you want to delete this user?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                <XCircle size={16} />
                Cancel
              </button>
              <button
                onClick={() => {
                  mutation.mutate();
                  setShowDeleteModal(false);
                }}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <Trash size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
