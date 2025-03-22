import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Save, XCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchUser = async (id: string) => {
  const { data } = await axios.get(`http://localhost:5000/users/${id}`);
  return data;
};

const updateUser = async ({ id, updatedUser }: { id: string; updatedUser: any }) => {
  await axios.put(`http://localhost:5000/users/${id}`, updatedUser);
};

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id!),
  });

  const mutation = useMutation({
    mutationFn: (updatedUser: any) => updateUser({ id: id!, updatedUser }),
    onSuccess: () => {
      toast.success("User updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate(`/users/${id}`), // Navigate after toast disappears
      });
    },
  });

  // Local state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    email: "",
    role: "",
  });

  // Update local state when data is fetched
  React.useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        gender: data.gender,
        age: data.age,
        email: data.email,
        role: data.role,
      });
    }
  }, [data]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <p className="text-center text-white">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">Error loading user.</p>;

  return (
    <div className="flex items-center justify-center h-[calc(100vh-74px)] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <ToastContainer />
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-white text-center border border-white/30">
        <h1 className="text-3xl font-bold mb-4">Edit User</h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-white/80 text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-white/80 text-gray-900 focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-white/80 text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-white/80 text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-white/80 text-gray-900 focus:outline-none"
            >
              <option value="isCustomer">Customer</option>
              <option value="isSeller">Seller</option>
              <option value="isAdmin">Admin</option>
            </select>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-red-400 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-red-500 transition"
            >
              <XCircle size={16} />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
