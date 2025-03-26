import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    email: "",
    password: "",
    role: "",
  });

  const mutation = useMutation({
    mutationFn: async (newUser: typeof formData) => {
      await axios.post("http://localhost:5000/users", newUser);
    },
    onSuccess: () => {
      toast.success("User added successfully!", { autoClose: 2000 });
      setTimeout(() => navigate('/'), 2500);
    },
    onError: () => {
      toast.error("Failed to add user. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="h-[calc(100vh-110)] flex flex-col justify-center items-center p-6 bg-white text-black">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Add User</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md"
          required
        >
          <option value="">Select Role</option>
          <option value="isAdmin">Admin</option>
          <option value="isCustomer">Customer</option>
          <option value="isSeller">Seller</option>
        </select>

        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-800"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
