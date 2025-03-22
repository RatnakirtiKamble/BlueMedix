import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const fetchProduct = async (id: string) => {
  const { data } = await axios.get(`http://localhost:5000/products/${id}`);
  return data;
};

const updateProduct = async ({ id, updatedData }: { id: string; updatedData: any }) => {
  await axios.put(`http://localhost:5000/products/${id}`, updatedData);
};

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
  });

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: (updatedData: any) => updateProduct({ id: id!, updatedData }),
    onSuccess: () => {
      toast.success("Product updated successfully!", { autoClose: 2000 });
      setTimeout(() => navigate(`/products/${id}`), 2500);
    },
    onError: () => {
      toast.error("Failed to update product. Try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) return <p className="text-center">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">Error loading product.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <img src={data.image} alt={data.title} className="w-full h-64 object-contain mb-4" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Title"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Price"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Category"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Image URL"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
