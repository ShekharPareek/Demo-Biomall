'use client';

import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa6'; // Plane icon (optional)
const ForgotPassword = ({ onClose, onLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleSubmitEmail = () => {
    setStep(2); // Show OTP sent screen
  };

  const handleOtpContinue = () => {
    setStep(3); // Show New Password screen
  };

  const handlePasswordReset = () => {
    alert('Password reset successful!');
    // You could also redirect to login page here
  };

  return (
    <div className="modal fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="min-h-screen flex items-center justify-center relative w-full px-4">
        <div className="relative z-10 w-full max-w-md bg-white shadow-lg rounded-xl px-8 py-10 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-700">✕</button>

          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-2">Forgot Password?</h2>
              <div className="text-indigo-600 text-5xl mb-4 flex justify-center">
                <FaLock />
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Enter your Email or User ID and we’ll send you a reset password link.
              </p>
              <input
                type="email"
                placeholder="Enter Email or User ID"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSubmitEmail}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm font-medium"
              >
                Submit
              </button>
              <div className="mt-4 text-sm">
                <a href="/login" className="text-indigo-600 hover:underline">Back to Login</a>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Check Your Email</h2>
              <div className="text-indigo-600 text-5xl mb-4 flex justify-center">
                <FaPaperPlane />
              </div>
              <p className="text-gray-600 text-sm mb-2">
                We’ve sent an email to the address
                <br />
                <strong>{email.replace(/^(.{2}).*(@.*)$/, '****$2')}</strong>
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Please check your inbox (and your spam folder, just in case) for an email from biomall
              </p>
              <button
                onClick={handleOtpContinue}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm font-medium"
              >
                Enter OTP
              </button>
              <div className="mt-4 text-sm">
                <a href="/login" className="text-indigo-600 hover:underline">Back to Login</a>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
              <input
                type="password"
                placeholder="Enter New Password"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handlePasswordReset}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm font-medium"
              >
                Reset Password
              </button>
              <div className="mt-4 text-sm">
                <span onClick={onLogin} className="text-indigo-600 hover:underline">Back to Login</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

  );
};

export default ForgotPassword;
