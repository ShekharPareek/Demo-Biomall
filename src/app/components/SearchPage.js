"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Briefcase, Clock, Lock, Plus, Mic, Send, Heart, Repeat2 } from 'lucide-react';
import Sidebar from "./sidebar";
import Aisearch from "./search/aisearch";
import SearchResults from "./search/SearchResults";
import AIAssistant from "./AIAssistant";
import Testimonials from "./Testimonials";
import Searchinput from "./search/searchinput";
import SearchedProducts from "./search/searchedproducts";
import ProductDetails from "./Models/product detail model";
import PremiumModal from "./PremiumModal";

export default function SearchPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [input, setInput] = useState('');
  const jobs = [
    { title: 'Junior Microbiologist', description: 'Conduct basic laboratory tests and assist in analyzing microorganisms to support research and quality control activities.' },
    { title: 'Research Scientist', description: 'Conduct basic laboratory tests and assist in analyzing microorganisms to support research and quality control activities.' },
    { title: 'Clinical Research Associate', description: 'Conduct basic laboratory tests and assist in analyzing microorganisms to support research and quality control activities.' },
    { title: 'Biomedical Scientist', description: 'Conduct basic laboratory tests and assist in analyzing microorganisms to support research and quality control activities.' }
  ];
  const product = {
    title: "Sodium Phosphate 1 M, 100 ml",
    brand: "Biorbyt",
    catalog: "orb532667",
    cas: "7558-79-4",
    categories: "Antibodies, Proteins & ELISA Kits",
    price: "3,000",
  };

  const openDetails = (product) => {
    setSelectedProduct(product);
    setIsPanelOpen(true);
  };

  const closeDetails = () => {
    setIsPanelOpen(false);
    setSelectedProduct(null);
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded"
        aria-label="Toggle sidebar"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="bg-gray-50 font-sans">
        <div className="flex">
          {/* Sidebar */}
          {/* <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} /> */}
          {/* <main className="flex-1 ml-0 md:ml-64 p-4 md:p-6"> */}
          <main className=" flex-1   transition-all duration-300 pt-0">
            <div className="w-full">
              <AIAssistant></AIAssistant>

            </div>

          </main>

        </div>
        {/* Chat/Search Input */}
        {/* <Searchinput /> */}
        {/* Premium Upgrade Modal (hidden by default) */}
        <PremiumModal />
        {/* Side Panel with ProductDetails */}
        <ProductDetails product={selectedProduct} isOpen={isPanelOpen} onClose={closeDetails} />

      </div>
    </>
  );
}
