'use client'
import Sidebar from "../sidebar";
import { FaKey, FaSyncAlt } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BsLightbulbFill } from 'react-icons/bs';
import { faFlaskVial, faCrown, faUser, faBars, faBell, falock } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
export default function PasswordSecurity() {
  const [enabled, setEnabled] = useState(false);
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
      <div className="pt-6 bg-white min-h-screen">
        <div className="flex-1">
          <div className="max-w-6xl mx-auto bg-white ">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Password & Security</h2>
            <div className="flex gap-6">


              {/* Change Password Section */}
              <div className="space-y-4">

                <h3 className="text-lg font-semibold text-gray-700"><i className="fas fa-lock text-primary mr-2" />Change Password</h3>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full border p-3 rounded-lg"
                />
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border p-3 rounded-lg"
                />
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  className="w-full border p-3 rounded-lg"
                />
                <button className="bg-gray-400 text-white py-2 px-6 rounded-lg" disabled>
                  Update Password
                </button>

              </div>

              {/* Security Tips */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-2xl shadow border w-full max-w-sm h-fit">
                <div className="flex items-center space-x-2 mb-4">
                  <BsLightbulbFill className="text-yellow-400 text-xl" />
                  <h4 className="text-lg font-semibold text-gray-800">Security Tips</h4>
                </div>
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex items-start space-x-3">
                    <FaKey className="text-blue-500 text-lg mt-1" />
                    <span>
                      <strong>Use a strong, unique password</strong> for your account.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <MdSecurity className="text-indigo-500 text-lg mt-1" />
                    <span>
                      <strong>Enable Two-Factor Authentication</strong> for extra protection.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaSyncAlt className="text-purple-500 text-lg mt-1" />
                    <span>
                      <strong>Change your password regularly</strong>, especially if you suspect any suspicious activity.
                    </span>
                  </li>
                </ul>
              </div>
            </div>


            {/* Two-Factor Authentication */}
            <div className="mt-10 w-fit">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                <i className="fas fa-shield-alt text-primary mr-2" />Two-Factor Authentication (2FA)
                <span className="ml-2 text-green-600 text-sm font-medium">Enabled</span>
              </h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600 mr-4">Enable 2FA for extra security</span>
                <button
                  onClick={() => setEnabled(!enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${enabled ? "bg-primary" : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-700">Authenticator App</h4>
                  <p className="text-sm text-gray-500">Use Google Authenticator or similar app.</p>
                  <span className="inline-block mt-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Active</span>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-700">SMS Verification</h4>
                  <p className="text-sm text-gray-500">Receive codes via text message.</p>
                  <span className="inline-block mt-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Inactive</span>
                </div>
              </div>
            </div>

            {/* Recent Login Activity */}
            <div className="mt-10 pb-5 ">
              <h3 className="text-lg font-semibold text-gray-700 mb-4"><i className="fas fa-history text-primary mr-2" />Recent Login Activity</h3>
              <table className="w-full text-sm text-left text-gray-700">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Date & Time</th>
                    <th className="py-2">Location</th>
                    <th className="py-2">Device/Browser</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">2025-05-22 09:13</td>
                    <td>Boston, MA, USA</td>
                    <td>
                      Chrome (Windows)
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Not You?</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">2025-05-21 22:07</td>
                    <td>London, UK</td>
                    <td>
                      Edge (Windows)
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Not You?</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">2025-05-20 08:42</td>
                    <td>Berlin, DE</td>
                    <td>
                      Safari (iOS)
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Not You?</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}
