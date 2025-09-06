// 'use client';

// export default function ChatPopupModal({ onClose }) {
//   return (
//     <div className="fixed bottom-20 right-6 bg-white shadow-lg rounded-md w-96 max-w-full z-50 border">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-2 border-b">
//         <div className="flex items-center gap-2">
//           <img
//             src="/user.png"
//             alt="Assistant"
//             className="w-8 h-8 rounded-full"
//           />
//           <div>
//             <p className="text-sm font-medium">Order Assistant</p>
//             <p className="text-xs text-green-500">Online</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="text-xs text-gray-500 border px-2 py-1 rounded-full">
//             Preview
//           </button>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>
//       </div>

//       {/* Chat content */}
//       <div className="p-4 space-y-3 h-64 overflow-y-auto bg-gray-50">
//         <div className="flex">
//           <div className="bg-blue-100 px-3 py-2 rounded-lg text-sm">
//             How much quantity do you want?
//           </div>
//         </div>
//       </div>

//       {/* Input */}
//       <div className="p-4 border-t">
//         <div className="flex items-center gap-2 mb-2">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
//           />
//           <button className="text-blue-500 hover:text-blue-700">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path d="M2.94 2.94a1.5 1.5 0 012.12 0l12 12a1.5 1.5 0 01-2.12 2.12L13 16.12V18a1 1 0 01-2 0v-3a1 1 0 01.293-.707l2.793-2.793-9-9a1.5 1.5 0 010-2.12z" />
//             </svg>
//           </button>
//         </div>
//         <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }
