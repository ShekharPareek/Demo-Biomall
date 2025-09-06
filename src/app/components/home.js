"use client";

// import { useEffect, useState, useRef } from 'react';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { Beaker, Scale3D, Truck, MessageCircle, Briefcase } from 'lucide-react';

// import Sidebar from "./sidebar";
// import Aisearch from "./search/aisearch";
// import SearchResults from "./search/SearchResults";
// import AIAssistant from "./AIAssistant";
// import Testimonials from "./Testimonials";
// import Searchinput from "./search/searchinput";
// import SearchedProducts from "./search/searchedproducts";
// import PremiumModal from "./PremiumModal";
// import FeaturedProducts from "./FeaturedProduct";
// import SearchItemProduct from '../components/searchproductitem';
// export default function HomePage() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   const intervalRef = useRef(null); // <-- Prevents multiple intervals
//   // secure-profile API
//   useEffect(() => {
//     const fetchSecureProfile = async () => {
//       const token = localStorage.getItem('access_token');
//       try {
//         const res = await fetch('http://65.2.4.179:8000/api/v1/user/secure-profile', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Accept': 'application/json',
//           },
//         });

//         if (res.status === 401) {
//           const refreshed = await refreshAccessToken();
//           if (refreshed) return fetchSecureProfile(); // Retry after refresh
//         } else if (res.ok) {
//           const profile = await res.json();
//           console.log('Secure Profile:', profile);
//         }
//       } catch (err) {
//         console.error('Secure profile fetch failed:', err);
//       }
//     };

//     const refreshAccessToken = async () => {
//       const refresh_token = localStorage.getItem('refresh_token');
//       try {
//         const res = await fetch(
//           `http://65.2.4.179:8000/api/v1/user/auth/refresh-token?refresh_token=${refresh_token}`,
//           { method: 'GET' }
//         );

//         if (res.ok) {
//           const result = await res.json();
//           localStorage.setItem('access_token', result.access_token);
//           console.log('Access token refreshed successfully.');
//           return true;
//         } else {
//           console.warn('Refresh token expired. Logging out...');
//           localStorage.clear();
//           return false;
//         }
//       } catch (err) {
//         console.error('Failed to refresh token:', err);
//         return false;
//       }
//     };

//     fetchSecureProfile();

//     // Register interval only once
//     if (!intervalRef.current) {
//       intervalRef.current = setInterval(fetchSecureProfile, 5700000); // 1.59 hrs
//     }

//     return () => clearInterval(intervalRef.current);
//   }, []);

//   // session expire saw poup for login
//   useEffect(() => {
//     const loginToken = localStorage.getItem('access_token');

//     if (!loginToken || loginToken === 'null' || loginToken === '') {
//       setShowModal(true);   // Show modal
//     } else {
//       setShowModal(false);  // Hide modal
//     }
//   }, []);


//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded"
//         aria-label="Toggle sidebar"
//       >
//         <FontAwesomeIcon icon={faBars} />
//       </button>
//       <div className="bg-gray-50 font-sans min-h-screen flex">
//         {/* Sidebar */}
//         <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

//         {/* Main Content */}
//         <main
//           className={`transition-all duration-300 flex-1 flex items-center justify-center
//       ${sidebarOpen ? "ml-64" : "ml-0"}`} // shift content when sidebar open
//         >
//           <div className="w-full max-w-4xl text-center">
//             {/* Hero section Aisearch */}
//             <Aisearch />

//             {/* Cards */}
//             <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 justify-center">
//               {/* Card-1 */}
//               <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
//                 <div className="flex gap-3">
//                   <div className="mb-2 bg-[#DBEAFE] p-2 rounded-full">
//                     <Beaker className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <h3 className="font-semibold text-lg">AI Search</h3>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Instantly find the right lab products with smart AI precision.
//                 </p>
//               </div>

//               {/* Card-2 */}
//               <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
//                 <div className="flex gap-3">
//                   <div className="mb-2 bg-[#D8F8E5] p-2 rounded-full">
//                     <Briefcase className="w-6 h-6 text-green-500" />
//                   </div>
//                   <h3 className="font-semibold text-lg">Compare</h3>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Make informed choices by comparing top brands and product.
//                 </p>
//               </div>

//               {/* Card-3 */}
//               <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
//                 <div className="flex gap-3">
//                   <div className="mb-2 bg-[#F0E9FF] p-2 rounded-full">
//                     <Truck className="w-6 h-6 text-purple-500" />
//                   </div>
//                   <h3 className="font-semibold text-lg">Post Buy/Sell</h3>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Easily list your equipment or post what you need.
//                 </p>
//               </div>

//               {/* Card-4 */}
//               <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
//                 <div className="flex gap-3">
//                   <div className="mb-2 bg-[#F0E9FF] p-2 rounded-full">
//                     <MessageCircle className="w-6 h-6 text-purple-500" />
//                   </div>
//                   <h3 className="font-semibold text-lg">Connect</h3>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Build trusted partnerships with verified industry professionals.
//                 </p>
//               </div>
//             </section>
//           </div>
//         </main>

//         {/* Modals */}
//         <PremiumModal />
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl h-56 flex flex-col">
//             <h1 className="text-lg font-semibold mb-4 text-indigo-700 text-center">
//               Welcome To Bio Mall
//             </h1>
//             <h2 className="text-lg font-semibold mb-4 text-black text-center">
//               Your Session is expired please Login
//             </h2>
//             <div className="flex gap-5 justify-center">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 self-end"
//               >
//                 Close
//               </button>
//             </div>

//           </div>
//         </div>
//       )
//       }
//     </>
//   );
// }



"use client";

import { useEffect, useState, useRef } from "react";
import { Beaker, Truck, MessageCircle, Briefcase } from "lucide-react";

import Sidebar from "./sidebar";
import Aisearch from "./search/aisearch";
import PremiumModal from "./PremiumModal";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const intervalRef = useRef(null); // <-- Prevents multiple intervals

  // secure-profile API
  useEffect(() => {
    const fetchSecureProfile = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const res = await fetch('http://13.233.153.53:8000/api/v1/user/secure-profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (res.status === 401) {
          const refreshed = await refreshAccessToken();
          if (refreshed) return fetchSecureProfile(); // Retry after refresh
        } else if (res.ok) {
          const profile = await res.json();
          console.log('Secure Profile:', profile);
        }
      } catch (err) {
        console.error('Secure profile fetch failed:', err);
      }
    };

    const refreshAccessToken = async () => {
      const refresh_token = localStorage.getItem('refresh_token');
      try {
        const res = await fetch(
          `http://13.233.153.53:8000/api/v1/user/auth/refresh-token?refresh_token=${refresh_token}`,
          { method: 'GET' }
        );

        if (res.ok) {
          const result = await res.json();
          localStorage.setItem('access_token', result.access_token);
          console.log('Access token refreshed successfully.');
          return true;
        } else {
          console.warn('Refresh token expired. Logging out...');
          localStorage.clear();
          return false;
        }
      } catch (err) {
        console.error('Failed to refresh token:', err);
        return false;
      }
    };

    fetchSecureProfile();

    // Register interval only once
    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchSecureProfile, 5700000); // 1.59 hrs
    }

    return () => clearInterval(intervalRef.current);
  }, []);

  // session expire saw poup for login
  useEffect(() => {
    const loginToken = localStorage.getItem('access_token');

    if (!loginToken || loginToken === 'null' || loginToken === '') {
      setShowModal(true);   // Show modal
    } else {
      setShowModal(false);  // Hide modal
    }
  }, []);

  return (
    <>
      <div className="bg-gray-50 font-sans min-h-screen flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* New chat Content */}
        <main
          className={`transition-all duration-300 flex-1 flex items-center justify-center
          ${sidebarOpen ? "ml-54" : "ml-0"}`}
        >
          <div className="w-full max-w-4xl text-center">
            {/* Hero section Aisearch */}
            <Aisearch />

            {/* Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 justify-center">
              {/* Card-1 */}
              <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex gap-3">
                  <div className="mb-2 bg-[#DBEAFE] p-2 rounded-full">
                    <Beaker className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">AI Search</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Instantly find the right lab products with smart AI precision.
                </p>
              </div>

              {/* Card-2 */}
              <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex gap-3">
                  <div className="mb-2 bg-[#D8F8E5] p-2 rounded-full">
                    <Briefcase className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Compare</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Make informed choices by comparing top brands and product.
                </p>
              </div>

              {/* Card-3 */}
              <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex gap-3">
                  <div className="mb-2 bg-[#F0E9FF] p-2 rounded-full">
                    <Truck className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Post Buy/Sell</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Easily list your equipment or post what you need.
                </p>
              </div>

              {/* Card-4 */}
              <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex gap-3">
                  <div className="mb-2 bg-[#F0E9FF] p-2 rounded-full">
                    <MessageCircle className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Connect</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Build trusted partnerships with verified industry professionals.
                </p>
              </div>
            </section>
          </div>
        </main>

        {/* Modals */}
        <PremiumModal />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl h-56 flex flex-col">
            <h1 className="text-lg font-semibold mb-4 text-indigo-700 text-center">
              Welcome To Bio Mall
            </h1>
            <h2 className="text-lg font-semibold mb-4 text-black text-center">
              Your Session is expired please Login
            </h2>
            <div className="flex gap-5 justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 self-end"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
