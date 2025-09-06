// components/AppearanceModal.js
"use client";
import { useState } from "react";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

export default function AppearanceModal({ open, onClose }) {
  const [selected, setSelected] = useState("light");

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex justify-center items-center z-50">
      <div className="bg-white w-96 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Appearances</h2>
          <button onClick={onClose} className="text-white font-bold text-xl">×</button>
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-4">Choose your display mode preference</p>
          {["light", "dark", "auto"].map((mode) => (
            <label key={mode} className="flex items-center gap-3 p-3 border rounded-xl mb-3 cursor-pointer hover:border-indigo-500 transition">
              <input
                type="radio"
                name="theme"
                value={mode}
                checked={selected === mode}
                onChange={() => setSelected(mode)}
              />
              <span className="flex items-center gap-2">
                {mode === "light" && <FaSun />}
                {mode === "dark" && <FaMoon />}
                {mode === "auto" && <FaDesktop />}
                {mode === "light" && "Light"}
                {mode === "dark" && "Dark"}
                {mode === "auto" && "Auto (sync with system)"}
              </span>
            </label>
          ))}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded-xl font-medium mt-3">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
