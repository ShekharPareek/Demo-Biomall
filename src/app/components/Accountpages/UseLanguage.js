"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faGlobe, faLanguage, faClock, faDollarSign, faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function LanguageRegionSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState("English (United States)");
  const [selectedRegion, setSelectedRegion] = useState("United States");

  return (
    <>
      {/* <div
        style={{
          background: "linear-gradient(to right, #4F46E5 0%, #9333EA 100%)",
        }}
        className="p-5 text-white flex items-start font-semibold"
      >
        Language & Region
      </div> */}

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 flex-1 mt-5 ">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">

          Language & Region
        </h2>

        <div className="space-y-6">
          {/* Language Section */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">

                Choose your Language
              </label>
              <p className="text-xs text-primary mt-1 bg-[#EFF6FF] rounded-full p-2">
                <i class="fas fa-bolt text-primary"></i> Auto-detected: English (English (United States))
              </p>
            </div>
            <input
              type="text"
              placeholder="Search languages..."
              className="mt-2 w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring focus:border-blue-500"
            />
            <p className="text-sm mt-2">
              Selected: <span className="text-blue-600 font-medium">{selectedLanguage}</span>
            </p>
          </div>

          {/* Region Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">

              Region
            </label>
            <div className="relative mt-2">
              <select
                className="w-full appearance-none px-3 py-2 border rounded text-sm focus:outline-none focus:ring focus:border-blue-500"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option>United States</option>
                <option>India</option>
                <option>Canada</option>
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded text-sm space-y-1">
              <p>
                <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-500" />
                <strong>Date:</strong> 06/22/2025
              </p>
              <p>
                <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-500" />
                <strong>Time:</strong> 2:30 PM
              </p>
              <p>
                <FontAwesomeIcon icon={faDollarSign} className="mr-2 text-gray-500" />
                <strong>Currency:</strong> $1,234.56
              </p>
            </div>
          </div>

          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Apply Changes
          </button>
        </div>
      </div>
    </>
  );
}
