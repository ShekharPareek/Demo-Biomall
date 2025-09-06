import React from "react";

export default function ProductDetailsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Product Details */}
        <div className="mb-4">
          <h5 className="font-semibold text-lg">HPCL systems</h5>
          <p className="text-sm text-gray-500">
            Catalog No: <span className="font-medium">12345</span> | Brand: <span className="font-medium">BioHyT</span>
          </p>
          <p className="text-sm text-gray-500">Pack Size: 10 ml</p>
          <p className="text-sm text-gray-500">
            Category: <span className="font-medium">Laboratory Equipment</span>
          </p>
        </div>

        <hr className="mb-4" />

        {/* Sellers List */}
        <div>
          <h6 className="text-sm font-semibold mb-3">Potential Sellers (15)</h6>
          <ul className="space-y-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                    className="w-8 h-8 rounded-full"
                    alt="User"
                  />
                  <div>
                    <p className="text-sm font-medium">Name {index + 1} ***</p>
                    <p className="text-xs text-gray-500">Company Name</p>
                    <p className="text-xs text-gray-400">City, India</p>
                  </div>
                </div>
                <button className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
                  Message
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
