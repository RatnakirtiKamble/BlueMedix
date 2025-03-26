import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/products");
  return data;
};

const FetchProducts: React.FC = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const navigate = useNavigate(); 

  if (isLoading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error loading products.</p>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto max-h-[500px] p-2">
        {data?.map((product: any) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-transform border">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            <h2 className="text-lg font-semibold truncate">{product.title}</h2>
            <p className="text-lg font-bold text-green-600 mt-2">${product.price}</p>
            <button
              onClick={() => navigate(`/products/${product.id}`)} 
              className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchProducts;
