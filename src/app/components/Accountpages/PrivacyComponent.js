"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles,
  faChartLine,
  faUserCircle,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";

export default function PrivacySettings() {
  const [settings, setSettings] = useState({
    personalization: true,
    tracking1: false,
    tracking2: false,
    onlineStatus: false,
    readReceipts: false,
  });

  const toggleSetting = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const privacyItems = [
    {
      key: "personalization",
      label: "Personalization",
      description: "Enable content and suggestions tailored to your activity.",
      icon: <FontAwesomeIcon icon={faWandMagicSparkles} className="text-pink-500 w-5 h-5" />,
    },
    {
      key: "tracking1",
      label: "Data Tracking",
      description: "Choose whether we can use analytics to improve our services.",
      icon: <FontAwesomeIcon icon={faChartLine} className="text-blue-400 w-5 h-5" />,
    },
    {
      key: "tracking2",
      label: "Data Tracking",
      description: "Choose whether we can use analytics to improve our services.",
      icon: <FontAwesomeIcon icon={faChartLine} className="text-blue-400 w-5 h-5" />,
    },
    {
      key: "onlineStatus",
      label: "Show Online Status",
      description: "Let’s others see when you are online.",
      icon: <FontAwesomeIcon icon={faUserCircle} className="text-green-400 w-5 h-5" />,
    },
    {
      key: "readReceipts",
      label: "Read Receipts",
      description: "Show when you’ve read messages.",
      icon: <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-sky-400 w-5 h-5" />,
    },
  ];

  return (
    <div className="p-0 max-h-screen">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-lg font-semibold px-6 py-3 rounded-t-lg">
        Privacy Settings
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-6">


        <div className="bg-white p-6 rounded-b-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Privacy Settings</h2>

          {privacyItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between border border-gray-100 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                {item.icon}
                <div>
                  <p className="font-semibold text-gray-700">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings[item.key]}
                  onChange={() => toggleSetting(item.key)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-500 relative transition-all duration-200">
                  <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-200 peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
