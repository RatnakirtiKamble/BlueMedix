import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EditIcon, Trash } from "lucide-react";

const fetchProduct = async (id: string) => {
  const { data } = await axios.get(`http://localhost:5000/products/${id}`);
  return data;
};

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
  });

  if (isLoading) return <p className="text-center">Loading product details...</p>;
  if (error) return <p className="text-center text-red-500">Error loading product.</p>;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setShowDeleteModal(false);
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
    };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center gap-4">
          <button onClick={handleEdit} className="opacity-40 hover:opacity-100">
            <EditIcon />
          </button>
          <button onClick={() => setShowDeleteModal(true)} className="opacity-40 hover:opacity-100">
            <Trash color="darkred" />
          </button>
        </div>
        <img src={data.image} alt={data.title} className="w-full h-64 object-contain mb-4" />
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="text-gray-600">{data.description}</p>
        <p className="text-2xl font-bold text-green-600 mt-2">${data.price}</p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
