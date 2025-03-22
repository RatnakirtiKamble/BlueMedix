import React, { useState } from "react";
import FetchProducts from "./ProductManagement/FetchProducts";
import AddProduct from "./ProductManagement/AddProduct";

const ProductManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("fetchProducts");

  return (
    <div className="p-4 w-full h-full">
      <div>
        <ul className="flex space-x-5 border-b-2 border-gray-300">
          {["fetchProducts", "addProduct"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`p-2 rounded-t-lg ${
                activeTab === tab
                  ? "opacity-100 border-gray-700 bg-gray-200 text-black"
                  : "opacity-70 border-transparent"
              } transition-all duration-200`}
            >
              {tab === "fetchProducts" ? "List Products" : "Add Product"}
            </button>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {activeTab === "fetchProducts" && <FetchProducts />}
        {activeTab === "addProduct" && <AddProduct />}
      </div>
    </div>
  );
};

export default ProductManagement;
