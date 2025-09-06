import { useState } from 'react';

export default function VerifyOtpModal({ isOpen, email: propEmail, onVerify, onClose }) {
  const [email, setEmail] = useState(propEmail || '');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleVerify = async () => {
    setLoading(true);

    const trimmedEmail = email.trim();
    const trimmedOtp = otp.trim();

    if (!trimmedEmail || !trimmedOtp) {
      alert("Both email and OTP are required.");
      setLoading(false);
      return;
    }

    console.log("Sending:", { email: trimmedEmail, otp: trimmedOtp });

    try {
      const res = await fetch(`http://65.2.4.179:8000/api/v1/user/verify-email-otp?email=${encodeURIComponent(email)}&otp=${otp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        onVerify(); // Proceed to login or next step
      } else {
        console.log("API Error:", data);
        alert(data?.message || "Invalid OTP");
      }
    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    }

    setLoading(false);
  };


  const resendOtp = async () => {
    if (!email || email.trim() === '') {
      alert("Email is required to resend OTP.");
      return;
    }

    setLoading(true);

    const url = `http://65.2.4.179:8000/api/v1/user/resend-email-otp?email=${encodeURIComponent(email.trim())}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        onVerify(); // or show success
      } else {
        console.log("API Error:", data);
        alert(data?.message || "Unable to resend OTP");
      }
    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">Verify Your Email</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-indigo-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
        <button
          onClick={resendOtp}
          className="w-full bg-indigo-600 text-white py-2 rounded mt-2"
          disabled={loading}
        >
          {loading ? 'Resending...' : 'Resend OTP'}
        </button>
        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full mt-2 text-sm text-gray-600 underline"
        >
          Cancel
        </button>
      </div>
    </div>

  );
}
