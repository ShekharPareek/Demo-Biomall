"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./sidebar";
import {
  faPlus,
  faPaperclip,
  faMessage,
  faClock,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const mockRequests = [
  {
    id: 1,
    user: "Dr. M***** C***",
    org: "Bio**** Labs",
    location: "Boston, MA",
    type: "Urgent",
    posted: "1 hr ago",
    title: "Request for Lab Equipment Package",
    due: "2024-07-10",
    budget: "$30-50K",
    products: ["HPLC System (Agilent, Waters preferred)", "Microplate Reader (OD & Fluorescence)", "Pipette Set (Single/multi, variable, Eppendorf or Gilson)"],
    requirements: [
      "Equipment not older than 5 years",
      "Warranty: Minimum 1 yr",
      "Delivery within 4 weeks",
      "Installation & Training on-site",
    ],
    tags: ["HPLC", "Microplate Reader", "Pipettes"],
  },
  {
    id: 2,
    user: "Dr. M***** C***",
    org: "Bio**** Labs",
    location: "Boston, MA",
    type: "Urgent",
    posted: "1 hr ago",
    title: "Request for Lab Equipment Package",
    due: "2024-07-10",
    budget: "$30-50K",
    products: ["HPLC System (Agilent, Waters preferred)", "Microplate Reader (OD & Fluorescence)", "Pipette Set (Single/multi, variable, Eppendorf or Gilson)"],
    requirements: [
      "Equipment not older than 5 years",
      "Warranty: Minimum 1 yr",
      "Delivery within 4 weeks",
      "Installation & Training on-site",
    ],
    tags: ["HPLC", "Microplate Reader", "Pipettes"],
  },
  {
    id: 3,
    user: "Dr. M***** C***",
    org: "Bio**** Labs",
    location: "Boston, MA",
    type: "Urgent",
    posted: "1 hr ago",
    title: "Request for Lab Equipment Package",
    due: "2024-07-10",
    budget: "$30-50K",
    products: ["HPLC System (Agilent, Waters preferred)", "Microplate Reader (OD & Fluorescence)", "Pipette Set (Single/multi, variable, Eppendorf or Gilson)"],
    requirements: [
      "Equipment not older than 5 years",
      "Warranty: Minimum 1 yr",
      "Delivery within 4 weeks",
      "Installation & Training on-site",
    ],
    tags: ["HPLC", "Microplate Reader", "Pipettes"],
  },
];

export default function Offers() {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockRequests.length / itemsPerPage);
  const paginatedRequests = mockRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex w-full justify-start">
      <Sidebar />
      <div className="p-6 bg-white min-h-screen mr-10 ml-10 w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 flex justify-between items-center text-white mb-6 w-full">
          <div>
            <h1 className="text-lg font-semibold">Offers</h1>
            <p className="text-sm opacity-90">
              View and respond to aggregated product needs from active buyers.
              Attachments require Premium to access.
            </p>
          </div>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded font-medium text-sm hover:bg-gray-100">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Post New Offer
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-between">
          <div>
            <select className="border rounded px-3 py-2 text-sm">
              <option>All Categories</option>
            </select>
            <select className="border rounded px-3 py-2 text-sm">
              <option>All Locations</option>
            </select>
            <select className="border rounded px-3 py-2 text-sm">
              <option>Posted: Anytime</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search buyer requests..."
              className="border rounded-lg px-8 py-2 text-sm flex-1  border-gray-300  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        {/* Request Cards */}
        {paginatedRequests.map((req) => (
          <div className="space-y-6">
            {mockRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row justify-between gap-4"
              >
                {/* Left Section */}
                <div className="flex gap-4">
                  {/* Avatar */}
                  <img
                    src="https://i.pravatar.cc/60"
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  {/* Main Info */}
                  <div>
                    <div className="flex flex-wrap gap-2 items-center text-xs mb-1">
                      <span className="text-gray-800 font-semibold">
                        {req.user}
                      </span>
                      <span className="text-gray-400">{req.org}</span>
                      <span className="text-gray-400">{req.location}</span>
                    </div>
                    <div className="flex gap-2 mb-2 text-xs">
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                        {req.type}
                      </span>
                      <span className="text-purple-600">Posted {req.posted}</span>
                    </div>
                    <h2 className="text-base font-semibold mb-2">
                      {req.title}
                    </h2>
                    <div className="text-sm mb-2">
                      <p>
                        <strong>Required by:</strong> {req.due}
                      </p>
                    </div>

                    <div className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Products Requested
                        </p>
                        <ul className="list-disc ml-5 text-gray-600">
                          {req.products.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 mb-1">
                          Specific Requirements
                        </p>
                        <ul className="list-disc ml-5 text-gray-600">
                          {req.requirements.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {req.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Note */}
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="text-blue-600 font-medium underline">
                        Premium
                      </span>{" "}
                      access required to download attached.
                    </p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-between items-end text-right min-w-[180px]">
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    Budget: {req.budget}
                  </p>
                  <div className="flex flex-col gap-2 mt-4">
                    <a
                      href="#"
                      className="text-indigo-600 text-sm flex items-center gap-1 hover:underline"
                    >
                      <FontAwesomeIcon icon={faPaperclip} />
                      View Attachment
                    </a>
                    <button className="bg-indigo-600 text-white px-3 py-1.5 text-sm rounded hover:bg-indigo-700">
                      <FontAwesomeIcon icon={faMessage} className="mr-1" />
                      Message User
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-center mt-10">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 border rounded hover:bg-gray-100"
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {[...Array(totalPages).keys()].map((_, idx) => {
              const page = idx + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded ${page === currentPage
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                (page === currentPage - 2 && page > 1) ||
                (page === currentPage + 2 && page < totalPages)
              ) {
                return <span key={page} className="px-2">...</span>;
              } else {
                return null;
              }
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 border rounded hover:bg-gray-100"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </nav>
        </div>
      </div>

    </div>



  );
}
