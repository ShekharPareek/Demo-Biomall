"use client";
import React from "react";

const members = [
  {
    name: "Rohini Singh",
    email: "rohinisingh789@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Rohini Singh",
    email: "rohinisingh789@gmail.com",
    role: "",
    status: "Inactive",
  },
  {
    name: "Rohini Singh",
    email: "rohinisingh789@gmail.com",
    role: "",
    status: "Active",
  },
  {
    name: "Rohini Singh",
    email: "rohinisingh789@gmail.com",
    role: "",
    status: "Active",
  },
];

export default function MemberComponent() {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Members</h2>
        <button className="bg-violet-600 text-white px-4 py-2 rounded-md text-sm font-medium">
          Invite
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <ul className="flex space-x-6 text-sm font-medium text-gray-600">
          <li className="border-b-2 border-violet-600 text-violet-600 pb-2 cursor-pointer">
            All Members (7)
          </li>
          <li className="pb-2 cursor-pointer hover:text-violet-600">
            Invited (0)
          </li>
        </ul>
      </div>

      {/* Member List */}
      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                  {member.name}
                  {member.role && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                      {member.role}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{member.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${member.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
                  }`}
              >
                {member.status}
              </span>
              <button className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
