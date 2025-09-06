"use client";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";

export default function NotificationComponent() {
  const [activeTab, setActiveTab] = useState("Unread");

  const tabs = ["All", "Unread", "Read"];
  const notifications = Array(5).fill({
    title: "5 people visited your profile",
    time: "Today at 10:30 AM",
    icon: "https://cdn-icons-png.flaticon.com/512/3472/3472620.png", // replace with your actual icon
  });

  return (
    <div className="p-[30px]">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-lg font-semibold px-6 py-3 rounded-t-lg">
        Members
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 pt-4 border-b">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-sm font-medium ${activeTab === tab
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white px-6 py-4 space-y-3">
        {notifications.map((note, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 bg-gray-50 p-4 rounded-md"
          >
            <img src={note.icon} alt="icon" className="w-6 h-6 mt-1" />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{note.title}</span>
              <span className="text-sm text-gray-500">{note.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
