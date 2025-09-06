"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlaskVial, faCrown, faUser, faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { FaUser, FaList, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import PersonalInfo from '../Accountpages/PersonalInfo';
import PasswordSecurity from '../Accountpages/PasswordSecurity';
import LanguageRegionSettings from '../Accountpages/UseLanguage';
import ChatPreferences from '../Accountpages/ChatPreferences';
import AppearanceSettings from '../Accountpages/AppearancesSetting';
import MemberComponent from '../Accountpages/MemberComponent';
import NotificationComponent from '../Accountpages/NotificationComponent';
import PrivacySettings from '../Accountpages/PrivacyComponent';
import BillingPlan from '../Accountpages/PremiumPlanSection';
export default function AccountSettings() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [showAppearance, setShowAppearance] = useState(false);
  const [showChatPrefs, setShowChatPrefs] = useState(false);


  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      console.warn('No refresh token found.');
      alert("Refresh Token not Found Please Login First")
      return;
    }

    try {
      const res = await fetch(`http://65.2.4.179:8000/api/v1/user/logout?refresh_token=${refreshToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        // Clear tokens from localStorage
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');

        console.log('Logout successful');
        alert(res.message || 'Logout successful');
      } else {
        const data = await res.json();
        console.error('Logout failed:', data);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <>
      {/* <div
        style={{
          background: "linear-gradient(to right, #4F46E5 0%, #9333EA 100%)",
        }}
        className="p-5 text-white flex items-start font-semibold"
      >
        Password & Security
      </div> */}

      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-4 min-h">
          {/* dropdown */}
          <div className="relative inline-block text-left">
            {/* Trigger Button */}
            <button
              className="inline-flex items-center gap-2 text-gray-800 font-semibold hover:text-indigo-600 focus:outline-none border-b-gray-400 pb-4"
            >
              <span className="text-indigo-600">
                <FaUser className="text-lg" />
              </span>
              Account Details <span><i className="fa-solid fa-caret-down"></i></span>
            </button>
          </div>
          {/* dropdown */}
          <nav className="space-y-6 text-sm text-gray-700">
            {/* Profile Section */}
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Profile</div>
              <ul className="space-y-1">
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${activeSection === 'personal' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setActiveSection('personal')}>
                  <i className="fas fa-user" /> Personal Information
                </li>
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${activeSection === 'personal' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setActiveSection('professional')}>
                  <i className="fas fa-briefcase" /> Professional Details
                </li>
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${activeSection === 'personal' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`}>
                  <i className="fas fa-flask" /> Research Interests
                </li>
              </ul>
            </div>

            {/* Account Section */}
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Account</div>
              <ul className="space-y-1">
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${activeSection === 'security' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setActiveSection('security')}>
                  <i className="fas fa-lock" /> Password & Security
                </li>
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${activeSection === 'security' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setActiveSection('notification')}>
                  <i className="fas fa-bell" /> Notifications
                </li>
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${activeSection === 'billing' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setActiveSection('billing')}>
                  <i className="fas fa-credit-card" /> Billing & Plans
                </li>
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${activeSection === 'member' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setActiveSection('member')}>

                  <i className="fas fa-users"></i> Members
                </li>
              </ul>
            </div>

            {/* Preferences Section */}
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Preferences</div>
              <ul className="space-y-1">
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${activeSection === 'language' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setActiveSection('language')}>
                  <i className="fas fa-language" /> Language & Region
                </li>
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${setShowAppearance === true ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setShowAppearance(true)}>
                  <i className="fas fa-adjust" /> Appearance
                </li>
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${setShowChatPrefs === true ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setShowChatPrefs(true)}>
                  <i className="fas fa-comments" /> Chat Preferences
                </li>
              </ul>
            </div>

            {/* Privacy Section */}
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Privacy</div>
              <ul className="space-y-1">
                <li className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${activeSection === 'privacy' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
                  }`} onClick={() => setActiveSection('privacy')}>
                  <i className="fas fa-shield-alt" /> Privacy Settings
                </li>
                <li className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">
                  <i className="fas fa-file-alt" /> Terms & Policies
                </li>
              </ul>
            </div>

            {/* Logout */}
            <button onClick={handleLogout} className="text-red-500 flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded-md mt-2">
              <i className="fas fa-sign-out-alt" /> Logout
            </button>
          </nav>
        </aside>
        {/* other section */}
        {/* Right Content Panel */}
        <main className="flex-1">
          {activeSection === 'personal' && <PersonalInfo />}
          {activeSection === 'security' && <PasswordSecurity />}
          {activeSection === 'language' && <LanguageRegionSettings />}
          {activeSection === 'member' && <MemberComponent />}
          {activeSection === 'notification' && <NotificationComponent />}
          {activeSection === 'privacy' && <PrivacySettings />}
          {activeSection === 'billing' && <BillingPlan />}
          {/* {activeSection === 'appearance' && <AppearanceSettings  />}
          {activeSection === 'chat' && <ChatPreferences />} */}
          {/* Add more conditions if needed */}
        </main>
        <AppearanceSettings open={showAppearance} onClose={() => setShowAppearance(false)} />
        <ChatPreferences open={showChatPrefs} onClose={() => setShowChatPrefs(false)} />
      </div>
    </>
  );
}
