'use client'; // only for App Router

import { Search, Plus, ChevronRight } from 'lucide-react';

const dummyProducts = Array(10).fill({
  title: 'Sodium Phosphate 1 M, 100 ml',
  brand: 'Biobryt',
  catalog: 'orb532667',
  casNo: '7558-79-4',
  categories: 'Antibodies, Proteins & ELISA Kits',
  price: '₹3,000',
});

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button className="text-purple-600 hover:text-purple-800 font-semibold text-lg">
            ←
          </button>
          <h2 className="text-xl font-semibold">My Wishlist</h2>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1">
          <Plus size={16} /> Add more product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search this list with product name, catalog no., brand…"
          className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute top-2.5 left-3 text-gray-400" size={16} />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 space-y-4">
          {['Brands', 'Sub-Category', 'Product Type', 'Applications'].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center bg-white p-3 border rounded-md"
            >
              <span className="text-sm font-medium">{item}</span>
              <ChevronRight size={16} className="text-gray-500" />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label className="text-sm">Discounted Offers</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label className="text-sm">Sponsored product</label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {dummyProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-sm p-4 border hover:border-blue-500 transition"
            >
              <div className="h-20 w-full bg-gray-100 rounded mb-3"></div>
              <h3 className="text-sm font-semibold">{product.title}</h3>
              <p className="text-xs text-gray-600">Brand: {product.brand}</p>
              <p className="text-xs text-gray-600">Catalog No.: {product.catalog}</p>
              <p className="text-xs text-gray-600">CAS No: {product.casNo}</p>
              <p className="text-xs text-gray-600 mb-2">Categories: {product.categories}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm font-semibold">{product.price}</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-purple-500 text-purple-600 rounded hover:bg-purple-50">
                    Buy
                  </button>
                  <button className="px-3 py-1 text-sm border border-purple-500 text-purple-600 rounded hover:bg-purple-50">
                    Sell
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
