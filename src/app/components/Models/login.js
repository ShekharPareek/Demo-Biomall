// // 'use client';
// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { auth, signInWithEmailAndPassword } from '../lib/firebase';

// // export default function Login({ onClose, onSignup }) {
// //   const router = useRouter();

// //   const [step, setStep] = useState('input');
// //   const [input, setInput] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [error, setError] = useState('');

// //   const isEmail = (val) => /\S+@\S+\.\S+/.test(val);
// //   const isMobile = (val) => /^[0-9]{10}$/.test(val);

// //   const handleInitialSubmit = (e) => {
// //     e.preventDefault();
// //     if (isEmail(input)) {
// //       setStep('password');
// //     } else if (isMobile(input)) {
// //       // Here you should call your sendOTP API
// //       console.log('Send OTP to:', input);
// //       setStep('otp');
// //     } else {
// //       setError('Enter a valid email or mobile number.');
// //     }
// //   };

// //   const handlePasswordLogin = async (e) => {
// //     e.preventDefault();
// //     setError('');

// //     try {
// //       const url = `http://65.2.4.179:8000/api/v1/user/login-email?email=${encodeURIComponent(input.trim())}&password=${encodeURIComponent(password)}`;

// //       const response = await fetch(url, {
// //         method: 'POST', // still POST
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         // Optional: Some APIs expect an empty body with query parameters
// //         body: null,
// //       });

// //       const result = await response.json();

// //       if (response.ok) {
// //         alert('Login successful:', result);
// //         router.push('/');
// //         onClose?.();
// //       } else {
// //         setError(result.message || 'Login failed. Please check your credentials.');
// //       }
// //     } catch (err) {
// //       console.error('Login error:', err);
// //       setError('Something went wrong. Please try again.');
// //     }
// //   };



// //   const handleOtpVerify = (e) => {
// //     e.preventDefault();
// //     // Replace this with actual OTP verification logic
// //     if (otp === '123456') {
// //       router.push('/');
// //       onClose?.();
// //     } else {
// //       setError('Invalid OTP');
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
// //       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
// //         <button onClick={onClose} className="absolute right-3 top-3 text-xl text-gray-400 hover:text-gray-600">✕</button>

// //         <h2 className="text-center text-lg font-semibold">Welcome Back</h2>
// //         <p className="mb-4 text-center text-sm text-gray-500">Sign in to access your account</p>

// //         {(step === 'input') && (
// //           <form onSubmit={handleInitialSubmit} className="space-y-4">
// //             <input
// //               type="text"
// //               placeholder="Enter your Email or Mobile"
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
// //               required
// //             />
// //             {error && <p className="text-sm text-red-500">{error}</p>}
// //             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Continue</button>
// //           </form>
// //         )}

// //         {(step === 'password') && (
// //           <form onSubmit={handlePasswordLogin} className="space-y-4">
// //             <input
// //               type="password"
// //               placeholder="Enter your password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
// //               required
// //             />
// //             {error && <p className="text-sm text-red-500">{error}</p>}
// //             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
// //           </form>
// //         )}

// //         {(step === 'otp') && (
// //           <form onSubmit={handleOtpVerify} className="space-y-4">
// //             <input
// //               type="text"
// //               placeholder="Enter OTP"
// //               value={otp}
// //               onChange={(e) => setOtp(e.target.value)}
// //               className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
// //               required
// //             />
// //             {error && <p className="text-sm text-red-500">{error}</p>}
// //             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Verify OTP</button>
// //           </form>
// //         )}

// //         <div className="my-4 flex items-center">
// //           <hr className="flex-1 border-gray-300" />
// //           <span className="mx-2 text-sm text-gray-400">or continue with</span>
// //           <hr className="flex-1 border-gray-300" />
// //         </div>

// //         <div className="space-y-2">
// //           <button className="w-full border rounded-lg flex items-center justify-center py-2">
// //             <FontAwesomeIcon icon={faGoogle} className="mr-2 text-red-600" />
// //             Continue with Google
// //           </button>
// //           <button className="w-full border rounded-lg flex items-center justify-center py-2">
// //             <FontAwesomeIcon icon={faLinkedin} className="mr-2 text-blue-700" />
// //             Continue with LinkedIn
// //           </button>
// //         </div>

// //         <p className="mt-4 text-center text-sm">
// //           Don’t have an account? <span className="text-blue-500 hover:underline cursor-pointer" onClick={onSignup}>Sign up</span>
// //         </p>

// //         <p className="mt-4 text-center text-xs text-gray-400">
// //           By signing in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }



// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// export default function Login({ onClose, onSignup }) {
//   const router = useRouter();

//   const [step, setStep] = useState('input');
//   const [input, setInput] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [resetToken, setResetToken] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const isEmail = (val) => /\S+@\S+\.\S+/.test(val);
//   const isMobile = (val) => /^[0-9]{10}$/.test(val);

//   const handleInitialSubmit = (e) => {
//     e.preventDefault();
//     if (isEmail(input)) {
//       setStep('password');
//     } else if (isMobile(input)) {
//       console.log('Send OTP to:', input);
//       setStep('otp');
//     } else {
//       setError('Enter a valid email or mobile number.');
//     }
//   };

//   const handlePasswordLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const url = `http://65.2.4.179:8000/api/v1/user/login-email?email=${encodeURIComponent(input.trim())}&password=${encodeURIComponent(password)}`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: null,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         localStorage.setItem('refresh_token', result.refresh_token);
//         localStorage.setItem('access_token', result.access_token);
//         localStorage.setItem('user_id', result.user_id);

//         console.log('Tokens saved to localStorage');
//         alert('Login successful');
//         console.log(result);
//         router.push('/');
//         onClose?.();
//       } else {
//         setError(result.message || 'Login failed. Please check your credentials.');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   const handleOtpVerify = (e) => {
//     e.preventDefault();
//     if (otp === '123456') {
//       router.push('/');
//       onClose?.();
//     } else {
//       setError('Invalid OTP');
//     }
//   };

//   const handleResetRequest = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const url = `http://65.2.4.179:8000/api/v1/user/auth/request-password-reset?email=${encodeURIComponent(input.trim())}`;
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (res.ok) {
//         alert('Reset email sent. Please check your inbox.');
//         setStep('resetConfirm');
//       } else {
//         const data = await res.json();
//         setError(data.message || 'Reset request failed.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Failed to request password reset.');
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!resetToken || !newPassword || newPassword !== confirmPassword) {
//       setError('Make sure all fields are valid and passwords match.');
//       return;
//     }

//     try {
//       const res = await fetch('http://65.2.4.179:8000/api/v1/user/auth/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           token: resetToken,
//           new_password: newPassword,
//           confirm_password: confirmPassword,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('Password reset successful. You can now log in.');
//         setStep('password');
//       } else {
//         setError(data.message || 'Failed to reset password.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong. Try again.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//         <button onClick={onClose} className="absolute right-3 top-3 text-xl text-gray-400 hover:text-gray-600">✕</button>

//         <h2 className="text-center text-lg font-semibold">Welcome Back</h2>
//         <p className="mb-4 text-center text-sm text-gray-500">Sign in to access your account</p>

//         {step === 'input' && (
//           <form onSubmit={handleInitialSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter your Email or Mobile"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="w-full rounded border px-3 py-2 text-sm"
//               required
//             />
//             {error && <p className="text-sm text-red-500">{error}</p>}
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Continue</button>
//           </form>
//         )}

//         {step === 'password' && (
//           <form onSubmit={handlePasswordLogin} className="space-y-4">
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full rounded border px-3 py-2 text-sm"
//               required
//             />
//             <div className="text-right text-sm">
//               <button
//                 type="button"
//                 onClick={() => setStep('resetRequest')}
//                 className="text-blue-500 hover:underline"
//               >
//                 Forgot password?
//               </button>
//             </div>
//             {error && <p className="text-sm text-red-500">{error}</p>}
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
//           </form>
//         )}

//         {step === 'otp' && (
//           <form onSubmit={handleOtpVerify} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full rounded border px-3 py-2 text-sm"
//               required
//             />
//             {error && <p className="text-sm text-red-500">{error}</p>}
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Verify OTP</button>
//           </form>
//         )}

//         {step === 'resetRequest' && (
//           <form onSubmit={handleResetRequest} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="w-full rounded border px-3 py-2 text-sm"
//               required
//             />
//             {error && <p className="text-sm text-red-500">{error}</p>}
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Send Reset Email</button>
//           </form>
//         )}

//         {step === 'resetConfirm' && (
//           <form onSubmit={handleResetPassword} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter reset token"
//               value={resetToken}
//               onChange={(e) => setResetToken(e.target.value)}
//               className="w-full rounded border px-3 py-2 text-sm"
//               required
//             />
//             <input
//               type="password"
//               placeholder="New password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full rounded border px-3 py-2 text-sm"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Confirm password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full rounded border px-3 py-2 text-sm"
//               required
//             />
//             {error && <p className="text-sm text-red-500">{error}</p>}
//             <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Reset Password</button>
//           </form>
//         )}

//         <div className="my-4 flex items-center">
//           <hr className="flex-1 border-gray-300" />
//           <span className="mx-2 text-sm text-gray-400">or continue with</span>
//           <hr className="flex-1 border-gray-300" />
//         </div>

//         <div className="space-y-2">
//           <button className="w-full border rounded-lg flex items-center justify-center py-2">
//             <FontAwesomeIcon icon={faGoogle} className="mr-2 text-red-600" />
//             Continue with Google
//           </button>
//           <button className="w-full border rounded-lg flex items-center justify-center py-2">
//             <FontAwesomeIcon icon={faLinkedin} className="mr-2 text-blue-700" />
//             Continue with LinkedIn
//           </button>
//         </div>

//         <p className="mt-4 text-center text-sm">
//           Don’t have an account? <span className="text-blue-500 hover:underline cursor-pointer" onClick={onSignup}>Sign up</span>
//         </p>

//         <p className="mt-4 text-center text-xs text-gray-400">
//           By signing in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
//         </p>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login({ onClose, onSignup }) {
  const router = useRouter();

  const [step, setStep] = useState('input');
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmail = (val) => /\S+@\S+\.\S+/.test(val);
  const isMobile = (val) => /^[0-9]{10}$/.test(val);

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isEmail(input)) {
      setStep('password');
    } else if (isMobile(input)) {
      try {
        const res = await fetch(`http://65.2.4.179:8000/api/v1/user/login-whatsapp/send-otp?country_code=%2B91&mobile=${input}`, {
          method: 'POST',
        });
        const result = await res.json();

        if (res.ok) {
          setStep('otp');
          setShowResend(false); // hide initially
          localStorage.setItem('refresh_token', result.refresh_token);
          localStorage.setItem('access_token', result.access_token);
          localStorage.setItem('user_id', result.user_id);
          setTimeout(() => setShowResend(true), 55000); // show after 55s
        }
        if (result.access_token) {
          onSuccess(data.access_token); // 🔑 notify parent
        }
        else {
          setError(result.message || 'Failed to send OTP.');
        }
      } catch (err) {
        setError('Something went wrong while sending OTP.');
        console.error(err);
      }
    } else {
      setError('Enter a valid email or mobile number.');
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = `http://65.2.4.179:8000/api/v1/user/login-email?email=${encodeURIComponent(input.trim())}&password=${encodeURIComponent(password)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: null,
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('refresh_token', result.refresh_token);
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('user_id', result.user_id);

        alert('Login successful');
        router.push('/');
        onClose?.();
        // ✅ Reload the page
        window.location.reload();
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = `http://65.2.4.179:8000/api/v1/user/login-whatsapp/verify?country_code=%2B91&mobile=${input}&otp=${otp}`;
      const res = await fetch(url, { method: 'POST' });
      const result = await res.json();

      if (res.ok) {
        localStorage.setItem('refresh_token', result.refresh_token);
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('user_id', result.user_id);

        alert('Login successful via OTP');
        router.push('/');
        onClose?.();
      } else {
        setError(result.message || 'OTP verification failed.');
      }
    } catch (err) {
      setError('Something went wrong while verifying OTP.');
      console.error(err);
    }
  };

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = `http://65.2.4.179:8000/api/v1/user/auth/request-password-reset?email=${encodeURIComponent(input.trim())}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        alert('Reset email sent. Please check your inbox.');
        setStep('resetConfirm');
      } else {
        const data = await res.json();
        setError(data.message || 'Reset request failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to request password reset.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!resetToken || !newPassword || newPassword !== confirmPassword) {
      setError('Make sure all fields are valid and passwords match.');
      return;
    }

    try {
      const res = await fetch('http://65.2.4.179:8000/api/v1/user/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: resetToken,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      if (res.ok) {
        alert('Password reset successful. Please log in.');
        setStep('input');
      } else {
        const data = await res.json();
        setError(data.message || 'Password reset failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to reset password.');
    }
  };
  const handleResendOtp = async () => {
    setError('');
    try {
      const res = await fetch(`http://65.2.4.179:8000/api/v1/user/resend-whatsapp-otp?country_code=%2B91&mobile=${input}`, {
        method: 'POST',
      });

      const result = await res.json();

      if (res.ok) {
        alert('OTP resent via WhatsApp.');
        setShowResend(false);
        setTimeout(() => setShowResend(true), 22000);
      } else {
        setError(result.message || 'Failed to resend OTP.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while resending OTP.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute right-3 top-3 text-xl text-gray-400 hover:text-gray-600">✕</button>

        <h2 className="text-center text-lg text-primary font-semibold">Welcome Back To BioMall</h2>
        <p className="mb-4 text-center text-sm text-gray-500">Sign in to access your account</p>

        {step === 'input' && (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Email or Mobile"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
              required
            />
            <div className="flex justify-end text-sm text-blue-500 cursor-pointer" onClick={() => setStep('forgot')}>
              Forgot Password?
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Continue</button>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
              required
            />

            {showResend && (
              <div
                className="text-sm text-blue-500 hover:underline cursor-pointer text-right"
                onClick={handleResendOtp}
              >
                Resend OTP via WhatsApp
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Verify OTP</button>
          </form>
        )}



        {step === 'forgot' && (
          <form onSubmit={handleResetRequest} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Send Reset Email</button>
          </form>
        )}

        {step === 'resetConfirm' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="text"
              placeholder="Enter reset token"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
              required
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Reset Password</button>
          </form>
        )}

        <div className="my-4 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-sm text-gray-400">or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="space-y-2">
          <button className="w-full border rounded-lg flex items-center justify-center py-2">
            <FontAwesomeIcon icon={faGoogle} className="mr-2 text-red-600" />
            Continue with Google
          </button>
          <button className="w-full border rounded-lg flex items-center justify-center py-2">
            <FontAwesomeIcon icon={faLinkedin} className="mr-2 text-blue-700" />
            Continue with LinkedIn
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          Don’t have an account? <span className="text-blue-500 hover:underline cursor-pointer" onClick={onSignup}>Sign up</span>
        </p>

        <p className="mt-4 text-center text-xs text-gray-400">
          By signing in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
