"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";



export default function Footer() {
  return (
    <footer id="footer" style={{ backgroundColor: "#1F2937" }}
      className="border-t border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">LabConnect</h3>
            <p className="text-gray-400 mb-4">
              Connecting life science professionals with the equipment and supplies they need.
            </p>
            <div className="flex space-x-4">
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fa-brands fa-linkedin text-xl"></i>
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fa-brands fa-twitter text-xl"></i>
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fa-brands fa-facebook text-xl"></i>
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fa-brands fa-instagram text-xl"></i>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white cursor-pointer">Home</span></li>
              <li><span className="hover:text-white cursor-pointer">Browse</span></li>
              <li><span className="hover:text-white cursor-pointer">Buyer Requests</span></li>
              <li><span className="hover:text-white cursor-pointer">Seller Offers</span></li>
              <li><span className="hover:text-white cursor-pointer">Premium</span></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-white cursor-pointer">Blog</span></li>
              <li><span className="hover:text-white cursor-pointer">Webinars</span></li>
              <li><span className="hover:text-white cursor-pointer">Success Stories</span></li>
              <li><span className="hover:text-white cursor-pointer">Contact Support</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Cookie Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Data Processing</span></li>
              <li><span className="hover:text-white cursor-pointer">Accessibility</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2023 LabConnect. All rights reserved.</p>
          <ul className="flex space-x-4 mt-2 md:mt-0">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Cookies Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
