"use client";

import { useEffect, useRef } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotificationPopup({ onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="absolute top-[31px] right-[200px] mt-2 w-80 bg-white border rounded-lg shadow-lg z-50"
    >
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
      </div>
      <div className="px-4 pb-2 space-y-4 max-h-80 overflow-y-auto">
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-1">Today</div>
          <NotificationItem
            text="5 people visited your profile"
            time="Today at 10:30 AM"
          />
          <NotificationItem
            text="Your job offer was viewed by Tech Corp"
            time="Today at 9:15 AM"
          />
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-1">Yesterday</div>
          <NotificationItem
            text="5 people visited your profile"
            time="Yesterday at 3:45 PM"
          />
          <NotificationItem
            text="Your job offer was viewed by Global Solutions Inc"
            time="Yesterday at 2:20 PM"
          />
        </div>
      </div>
      <div className="border-t p-3 text-sm text-indigo-600 hover:underline text-center cursor-pointer">
        View all notifications →
      </div>
    </div>
  );
}

function NotificationItem({ text, time }) {
  return (
    <div className="flex items-start gap-3 mb-2">
      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
        <FontAwesomeIcon icon={faBell} className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm text-gray-800">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
