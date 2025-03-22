import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const navigate = useNavigate();

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", formData);
      toast.success("Product added successfully!", { position: "top-right", autoClose: 2000 });
      setTimeout(() => navigate(-1), 2000);
    } catch (error) {
      toast.error("Failed to add product.", { position: "top-right" });
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col items-center justify-center text-black bg-white p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 w-full rounded-md" required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 w-full rounded-md" required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 w-full rounded-md" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full rounded-md" required />
        <input type="text" name="image" placeholder="Image Link" value={formData.image} onChange={handleChange} className="border p-2 w-full rounded-md" required />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800 w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
