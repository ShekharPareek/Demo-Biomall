// components/ChatPreferencesModal.js
"use client";
import { useState } from "react";

export default function ChatPreferencesModal({ open, onClose }) {
  const [fontSize, setFontSize] = useState(16);
  const [preferences, setPreferences] = useState({
    newMessages: true,
    sounds: false,
    typing: false,
    smartReplies: false,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex justify-center items-center z-50">
      <div className="bg-white w-96 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat Preferences</h2>
          <button onClick={onClose} className="text-white font-bold text-xl">×</button>
        </div>
        <div className="p-4 space-y-3 text-sm text-gray-700">
          {[
            { label: "Always open new messages", key: "newMessages" },
            { label: "Sounds", key: "sounds" },
            { label: "Show typing indicator", key: "typing" },
            { label: "Enable smart replies", key: "smartReplies" },
          ].map(({ label, key }) => (
            <div key={key} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100">
              <span>{label}</span>
              <input
                type="checkbox"
                checked={preferences[key]}
                onChange={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    [key]: !prev[key],
                  }))
                }
                className="w-5 h-5 text-indigo-600 rounded"
              />
            </div>
          ))}
          <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100">
            <span>Font size</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize((size) => Math.max(10, size - 1))}
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                −
              </button>
              <span>{fontSize}px</span>
              <button
                onClick={() => setFontSize((size) => size + 1)}
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
