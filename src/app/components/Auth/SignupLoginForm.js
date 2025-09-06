'use client';
import { useState } from 'react';
import AuthForm from './AuthForm';
import VerifyOtpModal from '../Models/VerifyotpModal';
import LoginModal from '../Models/login';

export default function AuthFlow() {
  const [showSignupModal, setShowSignupModal] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');

  const handleSignupSuccess = (email) => {
    setShowSignupModal(false);
    setOtpEmail(email);
    setShowOtpModal(true);
  };

  const handleOtpVerified = () => {
    setShowOtpModal(false);
    setShowLoginModal(true); // After OTP verification, show login if needed
  };

  return (
    <>
      {showSignupModal && (
        <AuthForm
          onClose={() => setShowSignupModal(false)}
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}
      {showOtpModal && (
        <VerifyOtpModal
          isOpen={showOtpModal}
          email={otpEmail}
          onVerify={handleOtpVerified}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </>
  );
}
