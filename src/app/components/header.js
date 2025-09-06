"use client";

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlaskVial, faCrown, faUser, faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { FaUser, FaList, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PremiumModal from './PremiumModal';
import LoginModal from './Models/login';
import SignupModal from './Auth/SignupLoginForm';
import NotificationPopup from './Notificationpopup';
import ForgotPasswordModal from './Auth/forgotpassword';
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  // const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [profileDp, setProfileDp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // ✅ null means logged out
  const [profileName, setProfileName] = useState("");

  // ✅ Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Logout clears token
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        await fetch(`http://65.2.4.179:8000/api/v1/user/logout?refresh_token=${refreshToken}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // ✅ Always clear data, even if API call fails
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");

      setToken(null);
      setProfileDp("");
      setProfileName("");
    }
  };

  // ✅ Fetch Profile Data
  const fetchprofileData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token || token === "null" || token === "") return;

      const response = await fetch(
        "http://65.2.4.179:8000/api/v1/profile/account/profile_details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;
      const data = await response.json();
      setProfileDp(data.profile_image_url);
      setProfileName(data.full_name);
    } catch (err) {
      console.log("profile fetch error:", err.message);
    }
  };

  // ✅ run when token changes
  useEffect(() => {
    if (token) fetchprofileData();
  }, [token]);

  // ✅ Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken && savedToken !== "null" && savedToken.trim() !== "") {
      setToken(savedToken);
    } else {
      setToken(null);
    }
  }, []);





  return (
    <>
      <header id="header" className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-fluid  px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary mr-8 flex items-center">
                <FontAwesomeIcon icon={faFlaskVial} className="mr-2" />
                <Link
                  href="/"
                  className={`cursor-pointer`}
                >
                  BioMall
                </Link>
              </div>
              <nav className="hidden md:flex space-x-6">
                {/* 
                <Link
                  href="/mydashboard"
                  className={`cursor-pointer ${pathname === '/mydashboard' ? 'text-primary font-medium border-b-2 border-primary pb-1' : 'text-gray-600 hover:text-primary'}`}
                >
                  My Dashboard
                </Link> */}
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button
                id="upgrade-btn"
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-secondary to-primary text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition"
              >
                <FontAwesomeIcon icon={faCrown} className="mr-1" /> Upgrade to Premium
              </button>

              {showModal && <PremiumModal visible={showModal} onClose={() => setShowModal(false)} />}

              <div className="flex">
                {/* ✅ Show login button only if no token */}
                {!token ? (
                  <button
                    onClick={() => setActiveModal("login")}
                    className="bg-white text-primary border border-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> Login
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-4 ml-5">
                    {/* Notifications */}
                    <span
                      className="icons-notification relative cursor-pointer"
                      onClick={() => setShowPopup((prev) => !prev)}
                    >
                      <FontAwesomeIcon icon={faBell} className="text-xl text-primary" />
                      <span id="bages-count" className="bages absolute text-sm  bg-[#EF4444] rounded-full text-white">2</span>
                    </span>
                    {showPopup && <NotificationPopup onClose={() => setShowPopup(false)} />}

                    {/* Profile dropdown */}
                    <div className="relative w-[170px] h-8" ref={dropdownRef}>
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setOpen((prev) => !prev)}
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-cover bg-center"
                          style={{
                            backgroundImage: profileDp
                              ? `url(${profileDp})`
                              : `url("/DP-placeholder.jpg")`,
                          }}
                        />
                        <Link href="/account" className="text-sm font-medium text-gray-700">
                          {profileName || "User"}
                        </Link>
                        <i className="fa-solid fa-caret-down text-primary"></i>
                      </div>

                      {open && (
                        /* The code you provided is creating a dropdown menu for the user profile
                        options in the header component of a React application. Here's a breakdown
                        of what each part of the code is doing: */
                        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                          <div className="py-2 text-sm text-gray-700 space-y-2">
                            <a href="/account" className="flex items-center px-4 py-2 hover:bg-gray-100">
                              <FaUser className="text-indigo-600 mr-2" /> Account Details
                            </a>
                            <a href="/mydashboard" className="flex items-center px-4 py-2 hover:bg-gray-100">
                              <FaList className="text-indigo-600 mr-2" /> My Dashboard
                            </a>
                            <a href="/" onClick={handleLogout} className="flex items-center px-4 py-2 hover:bg-gray-100">
                              <FaSignOutAlt className="text-indigo-600 mr-2" /> Logout
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                id="menu-btn"
                className="md:hidden text-gray-700"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle Menu"
              >
                <FontAwesomeIcon icon={faBars} className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Modals */}
      {activeModal === "login" && (
        <LoginModal
          onClose={() => setActiveModal(null)}
          onSignup={() => setActiveModal("signup")}
          onForgot={() => setActiveModal("forgot")}
        // onLoginSuccess={handleLoginSuccess}
        />
      )}
      {activeModal === "signup" && (
        <SignupModal
          onClose={() => setActiveModal(null)}
          onLogin={() => setActiveModal("login")}
        />
      )}
      {activeModal === "forgot" && (
        <ForgotPasswordModal
          onClose={() => setActiveModal(null)}
          onLogin={() => setActiveModal("login")}
        />
      )}
    </>
  );
}

