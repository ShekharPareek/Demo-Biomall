'use client';
import { useState } from 'react';
import LoginModal from '../Models/login';

export default function AuthForm({ onClose, onSignupSuccess, onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode] = useState('+91');
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('Please agree to the Terms and Privacy Policy.');
      return;
    }

    try {
      const response = await fetch('http://65.2.4.179:8000/api/v1/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: password,
          mobile: mobileNumber,
          country_code: countryCode,
          organization: organization,
          designation: designation,
          referral_source: referralSource,
          country: country,
          state: state,
          city: city,
          zipcode: zipcode,
          is_active: true,
          is_admin: false
        })
      });

      const result = await response.json();
      if (response.ok) {
        onSignupSuccess(email); // Open OTP modal
      } else {
        // Handle validation error from backend
        const firstError = result?.detail?.[0]?.msg || result.message || 'Signup failed.';
        setError(firstError);
      }

    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full relative">
        <h2 className="text-xl font-semibold mb-4 text-center text-primary">Signup to BioMall</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Full Name *"
            className="border p-2 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <div className="flex border rounded p-2">
            <span className="mr-2">{countryCode}</span>
            <input
              type="tel"
              placeholder="Mobile No. *"
              className="flex-1 outline-none"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <input
            placeholder="Organization *"
            className="border p-2 rounded"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <input
            placeholder="Designation *"
            className="border p-2 rounded"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
          <select
            className="border p-2 rounded"
            value={referralSource}
            onChange={(e) => setReferralSource(e.target.value)}
          >
            <option value="">How did you hear about us?</option>
            <option value="Google">Google</option>
            <option value="Friend">Friend</option>
            <option value="Advertisement">Advertisement</option>
          </select>
          <input
            placeholder="Country *"
            className="border p-2 rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <input
            placeholder="State *"
            className="border p-2 rounded"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <input
            placeholder="City *"
            className="border p-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            placeholder="Zipcode *"
            className="border p-2 rounded"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
          <div className="col-span-2 flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span>
              I agree to the <a href="#" className="text-blue-600 underline">Terms</a> and{' '}
              <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
            </span>
          </div>
          <input
            type="email"
            placeholder="Email Address *"
            className="col-span-2 border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password *"
            className="col-span-2 border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 underline"
          >
            Login
          </button>
        </p>

        <button onClick={onClose} className="absolute top-5 right-5 text-xl">✕</button>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSignup={() => {
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}
