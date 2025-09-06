


// import React, { useState, useRef, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faHeart, faComment, faSignOutAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';
// import { SquarePen, Ellipsis } from 'lucide-react';


// export default function Sidebar({ onChatSelect }) {

//   const [isOpen, setIsOpen] = useState(true);
//   const [showInput, setShowInput] = useState(false);
//   const [chatTitle, setChatTitle] = useState('');
//   const inputRef = useRef(null);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [selectedChatId, setSelectedChatId] = useState('');
//   const [editingChatId, setEditingChatId] = useState(null);
//   const [newTitle, setNewTitle] = useState('');

//   const savedSearches = ['Centrifuge tubes', 'Spectrophotometer', 'Incubator'];

//   useEffect(() => {
//     const storedChatId = localStorage.getItem('chat_id');
//     if (storedChatId) setSelectedChatId(storedChatId);
//   }, []);


//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem("access_token");
//       if (token) {
//         fetchChatHistory(token);
//       }
//     }
//   }, []);

//   const fetchChatHistory = async () => {
//     const token = localStorage.getItem("access_token");
//     if (!token) return;

//     try {
//       const res = await fetch("http://65.2.4.179:8000/api/v1/chat/chat/history", {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json'
//         }
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setChatHistory(data);
//       } else {
//         const errText = await res.text();
//         console.error("Failed to fetch chat history:", errText);
//       }
//     } catch (err) {
//       console.error("Error fetching chat history:", err);
//     }
//   };

//   // Call this in useEffect
//   useEffect(() => {
//     fetchChatHistory();
//   }, []);



//   useEffect(() => {
//     if (showInput) {
//       const handleClickOutside = (e) => {
//         if (inputRef.current && !inputRef.current.contains(e.target)) {
//           if (chatTitle.trim()) {
//             newChat();
//           } else {
//             setShowInput(false);
//           }
//         }
//       };
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => document.removeEventListener('mousedown', handleClickOutside);
//     }
//   }, [showInput, chatTitle]);

//   const newChat = async () => {
//     const token = localStorage.getItem('access_token');
//     const chatName = "New Chat";
//     if (!token) return;

//     try {
//       const res = await fetch("http://65.2.4.179:8000/api/v1/chat/chat/new", {
//         method: "POST",
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(chatName)
//       });

//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem("chat_id", data.id);
//         setChatTitle(chatName); // set as 'new chat'
//         setShowInput(false); // ensure input is hidden
//         fetchChatHistory(); // refresh chat list
//       } else {
//         alert(data.detail || "Failed to create chat");
//       }
//     } catch (err) {
//       console.error("Chat creation error:", err);
//     }
//   };


//   const handleInputKeyDown = (e) => {
//     if (e.key === 'Enter') newChat();
//   };

//   const handleDeleteChat = async (chatId) => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       alert("Access token not found");
//       return;
//     }

//     try {
//       const res = await fetch(`http://65.2.4.179:8000/api/v1/chat/chat/delete`, {
//         method: "DELETE",
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(chatId)
//       });

//       if (res.ok) {
//         // ✅ Close dropdown and refresh chat history
//         setDropdownOpen(null);
//         fetchChatHistory(); // this should be available from useEffect scope

//         // Optional: if the deleted chat was selected, clear it
//         if (selectedChatId === chatId) {
//           setSelectedChatId('');
//           localStorage.removeItem('chat_id');
//         }

//       } else {
//         const data = await res.json();
//         console.error("Failed to delete chat:", data);
//         alert(data.detail || "Delete failed");
//       }
//     } catch (error) {
//       console.error("Error deleting chat:", error);
//     }
//   };


//   const handleEditTitle = async (chatId) => {
//     const token = localStorage.getItem("access_token");
//     if (!newTitle.trim() || newTitle === chatHistory.find(chat => chat.id === chatId)?.title) return;

//     try {
//       const res = await fetch("http://65.2.4.179:8000/api/v1/chat/chat/rename", {
//         method: "POST",
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ chat_id: chatId, new_title: newTitle })
//       });

//       if (res.ok) {
//         fetchChatHistory();
//         setEditingChatId(null);
//         setNewTitle('');
//         setDropdownOpen(null);
//       }
//     } catch (err) {
//       console.error("Rename error:", err);
//     }
//   };

//   const handleLogout = async () => {
//     const refreshToken = localStorage.getItem('refresh_token');
//     if (!refreshToken) return alert("Not logged in");

//     try {
//       const res = await fetch(`http://65.2.4.179:8000/api/v1/user/logout?refresh_token=${refreshToken}`, {
//         method: 'POST'
//       });

//       if (res.ok) {
//         localStorage.clear();
//         alert("Logged out successfully");
//       }
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   // handel chat click


//   return (
//     <>
//       {/* Toggle button (mobile + desktop) */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed top-[90px] left-4 z-50 p-2 bg-slate-950 text-white rounded"
//       >
//         {isOpen ? "Close" : "Menu"}
//       </button>

//       <aside
//         className={`fixed top-[76px] left-0 h-screen bg-white border-r border-gray-200
//   transition-transform duration-300 ease-in-out z-40 w-64
//   ${isOpen ? "translate-x-0" : "-translate-x-full"}
//   `}
//       >


//         {/* Top Nav */}
//         <div className="p-4 space-y-4 border-b">
//           <div className="flex items-center gap-2 text-sm text-gray-700">
//             <FontAwesomeIcon icon={faSearch} />
//             <span>AI Search</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-700">
//             <FontAwesomeIcon icon={faHeart} />
//             <span>Wishlist</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-700">
//             <FontAwesomeIcon icon={faComment} />
//             <span>Messages</span>
//           </div>
//         </div>

//         {/* New Chat */}
//         <div className="bg-gray-50 text-black py-3 px-5 flex items-center gap-2">
//           <button onClick={newChat} className="flex items-center gap-2 text-sm">
//             <SquarePen size={16} /> New Chat
//           </button>
//         </div>


//         {/* Chat History */}
//         <div className="p-4 space-y-4">
//           <h3 className="text-sm font-semibold text-gray-800">Search History</h3>
//           {chatHistory.length > 0 ? (
//             chatHistory.map(({ id, title, created_at }) => (
//               <div
//                 key={id}
//                 className={`p-3 rounded-lg relative cursor-pointer ${selectedChatId === id ? 'bg-gray-100' : 'bg-white'}`}
//                 onClick={() => {
//                   localStorage.setItem('chat_id', id);
//                   setSelectedChatId(id);
//                   if (onChatSelect) {
//                     onChatSelect(id); // <- Trigger message loading
//                   }
//                 }}
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     {editingChatId === id ? (
//                       <input
//                         className="text-sm font-medium text-gray-700 border rounded px-2 py-1"
//                         value={newTitle}
//                         onChange={(e) => setNewTitle(e.target.value)}
//                         onBlur={() => handleEditTitle(id)}
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') handleEditTitle(id);
//                           if (e.key === 'Escape') {
//                             setEditingChatId(null);
//                             setNewTitle('');
//                           }
//                         }}
//                         autoFocus
//                       />
//                     ) : (
//                       <p className="text-sm font-medium text-gray-700">
//                         {title}
//                       </p>
//                     )}

//                     <p className="text-xs text-gray-500">
//                       {new Date(created_at).toLocaleDateString()} • {new Date(created_at).toLocaleTimeString()}
//                     </p>
//                   </div>
//                   <div className="relative">
//                     <button onClick={() => setDropdownOpen(dropdownOpen === id ? null : id)}>
//                       <Ellipsis size={16} />
//                     </button>
//                     {dropdownOpen === id && (
//                       <div className="absolute right-0 top-6 bg-white border rounded shadow-md z-10 w-32">
//                         <button
//                           onClick={() => handleDeleteChat(id)}
//                           className="block w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600"
//                         >
//                           Delete
//                         </button>
//                         <button
//                           onClick={() => {
//                             setEditingChatId(id);
//                             setNewTitle(title);
//                             setDropdownOpen(null); // close dropdown if any
//                           }}
//                           className="block w-full px-3 py-2 text-left text-sm hover:bg-blue-50 text-blue-600"
//                         >
//                           Rename
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-400">No chat history found.<br />Login first.</p>
//           )}
//           {/* Logout */}
//           <button
//             onClick={handleLogout}
//             className="text-red-500 flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded-md mt-4"
//           >
//             <FontAwesomeIcon icon={faSignOutAlt} />
//             Logout
//           </button>
//         </div>
//       </aside>

//     </>
//   );
// }




// New code....

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SquarePen, Ellipsis } from 'lucide-react';
import Link from 'next/link';
import {
  faSearch,
  faHeart,
  faComment,
  faSignOutAlt,
  faBars,
  faBell
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ onChatSelect, onNewChat }) {

  const [isOpen, setIsOpen] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [chatTitle, setChatTitle] = useState('');
  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState('');
  const [editingChatId, setEditingChatId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [collapsed, setCollapsed] = useState(false); // 👈 collapse state
  const savedSearches = ['Centrifuge tubes', 'Spectrophotometer', 'Incubator'];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const storedChatId = localStorage.getItem('chat_id');
    if (storedChatId) setSelectedChatId(storedChatId);
  }, []);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("access_token");
      if (token) {
        fetchChatHistory(token);
      }
    }
  }, []);

  const fetchChatHistory = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const res = await fetch("http://65.2.4.179:8000/api/v1/chat/chat/history", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        setChatHistory(data);
        const storedChatId = localStorage.getItem("chat_id");
        if (storedChatId) {
          setSelectedChatId(storedChatId);
          if (onChatSelect) onChatSelect(storedChatId);
        }
      } else {
        const errText = await res.text();
        console.error("Failed to fetch chat history:", errText);
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
    }
  };

  // Call this in useEffect
  useEffect(() => {
    fetchChatHistory();
  }, []);



  useEffect(() => {
    if (showInput) {
      const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
          if (chatTitle.trim()) {
            newChat();
          } else {
            setShowInput(false);
          }
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showInput, chatTitle]);




  // const newChat = async () => {
  //   const token = localStorage.getItem("access_token");
  //   const chatName = "New Chat";

  //   if (!token) {
  //     alert("⚠️ Please log in to create a new chat.");
  //     return null;
  //   }

  //   try {
  //     const res = await fetch("http://65.2.4.179:8000/api/v1/chat/chat/new", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify({ title: chatName }),
  //     });

  //     const data = await res.json();

  //     if (res.ok && (data.id || data.chat_id)) {
  //       const newId = data.id || data.chat_id;

  //       // Save in local storage
  //       localStorage.setItem("chat_id", newId);

  //       // Update states
  //       setSelectedChatId(newId);
  //       setChatTitle(chatName);
  //       setShowInput(false);

  //       fetchChatHistory(); // refresh sidebar
  //       if (onChatSelect) onChatSelect(newId);

  //       return data;
  //     } else {
  //       alert(data?.detail || "❌ Failed to create chat");
  //       return null;
  //     }
  //   } catch (err) {
  //     console.error("Chat creation error:", err);
  //     alert("❌ Something went wrong while creating a chat");
  //     return null;
  //   }
  // };


  // Helper to create a new guest chat
  // Helper to create a new guest chat
  const newGuestChat = async () => {
    if (selectedChatId) return null;

    const existingGuest = chats?.find(chat => chat.isGuest || chat.title === "Guest Chat");
    if (existingGuest) {
      setSelectedChatId(existingGuest.chat_id);
      if (onChatSelect) onChatSelect(existingGuest.chat_id);
      return existingGuest;
    }

    try {
      const res = await fetch("http://65.2.4.179:8000/api/v1/guest/chat/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify("Guest Chat"),
      });

      const data = await res.json();
      const newId = data.chat_id || data.id; // ✅ normalize id

      if (res.ok && newId) {
        data.isGuest = true;
        data.chat_id = newId; // ✅ normalize

        localStorage.setItem("Guest chat_id", newId); // ✅ consistent key
        setSelectedChatId(newId);
        setChatTitle("Guest Chat");
        setShowInput(false);

        setChats((prev) => [...prev, data]);
        if (onChatSelect) onChatSelect(newId);

        return data;
      } else {
        alert(data?.detail || "❌ Guest chat creation failed");
        return null;
      }
    } catch (err) {
      console.error("Guest chat creation error:", err);
      return null;
    }
  };

  useEffect(() => {
    if (!selectedChatId && (!chats || chats.length === 0)) {
      newGuestChat();
    }
  }, [selectedChatId, chats]); // ✅ reruns when chats change



  const newChat = async () => {
    const token = localStorage.getItem('access_token');
    const chatName = "New Chat";

    if (!token) return null;

    try {
      const res = await fetch("http://65.2.4.179:8000/api/v1/chat/chat/new", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(chatName),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store new chat ID
        localStorage.setItem("chat_id", data.id);

        // ✅ Update React state immediately
        setSelectedChatId(data.id);
        setChatTitle(chatName);
        setShowInput(false);

        fetchChatHistory();

        if (onChatSelect) onChatSelect(data.id);

        return data;
      } else {
        alert(data.detail || "Failed to create chat");
        return null;
      }
    } catch (err) {
      console.error("Chat creation error:", err);
      return null;
    }
  };




  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') newChat();
  };

  const handleDeleteChat = async (chatId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Access token not found");
      return;
    }

    try {
      const res = await fetch(`http://65.2.4.179:8000/api/v1/chat/chat/delete`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatId)
      });

      if (res.ok) {
        // ✅ Close dropdown and refresh chat history
        setDropdownOpen(null);
        fetchChatHistory(); // this should be available from useEffect scope
        // Optional: if the deleted chat was selected, clear it
        if (selectedChatId === chatId) {
          setSelectedChatId('');
          localStorage.removeItem('chat_id');
        }

      } else {
        const data = await res.json();
        console.error("Failed to delete chat:", data);
        alert(data.detail || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };


  const handleEditTitle = async (chatId) => {
    const token = localStorage.getItem("access_token");
    if (!newTitle.trim() || newTitle === chatHistory.find(chat => chat.id === chatId)?.title) return;

    try {
      const res = await fetch("http://65.2.4.179:8000/api/v1/chat/chat/rename", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat_id: chatId, new_title: newTitle })
      });

      if (res.ok) {
        fetchChatHistory();
        setEditingChatId(null);
        setNewTitle('');
        setDropdownOpen(null);
      }
    } catch (err) {
      console.error("Rename error:", err);
    }
  };

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return alert("Not logged in");

    try {
      const res = await fetch(
        `http://65.2.4.179:8000/api/v1/user/logout?refresh_token=${refreshToken}`,
        { method: "POST" }
      );

      if (res.ok) {
        localStorage.clear();
        setIsLoggedIn(false); // ✅ update state immediately
        alert("Logged out successfully");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  // ✅ Auto New Chat for Guest Users
  // useEffect(() => {
  //   const initGuestChat = async () => {
  //     try {
  //       const res = await fetch("http://65.2.4.179:8000/api/v1/guest/chat/new", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify("Guest Chat"),   // ✅ send title in request body
  //       });

  //       const data = await res.json();

  //       if (res.ok) {
  //         setSelectedChatId(data.chat_id);
  //         console.log("Guest Chat Id is:", data.chat_id);

  //         // ✅ Load messages directly
  //         // ✅ trigger Sidebar callback with chat_id
  //         if (onChatSelect) onChatSelect(data.chat_id);

  //       } else {
  //         console.error("Failed to init guest chat:", data);
  //       }
  //     } catch (error) {
  //       console.error("Guest chat init failed:", error);
  //     }
  //   };

  //   initGuestChat();
  // }, []); // runs once
  //   // handel chat click
  return (
    <aside
      className={` h-screen bg-white border-r border-gray-200
      transition-all duration-300 ease-in-out z-40 flex flex-col
      ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Toggle Button */}
      {/* <div className="flex justify-between items-center p-4 border-b">
        {!collapsed && <h2 className="font-bold text-lg"></h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div> */}

      {/* Top Nav */}
      {/* <div className="p-4 space-y-4 border-b">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FontAwesomeIcon icon={faSearch} />
          {!collapsed && <span>AI Search</span>}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FontAwesomeIcon icon={faHeart} />
          {!collapsed && <span>Wishlist</span>}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FontAwesomeIcon icon={faComment} />
          {!collapsed && <span>Messages</span>}
        </div>
      </div> */}

      {/* New Chat */}
      <div
        className={`bg-white text-black py-3 ${collapsed ? "px-3 flex justify-center" : "px-5 flex justify-between gap-2"
          }`}
      >
        <button
          onClick={async () => {
            if (onNewChat) onNewChat(); // ✅ Clear messages

            let newChatObj;

            const token = localStorage.getItem("access_token");
            if (token) {
              // ✅ Logged-in user → create normal chat
              newChatObj = await newChat();
            } else {
              // ✅ Guest user → fallback to guest chat
              newChatObj = await newGuestChat();
            }

            // ✅ Select the newly created chat
            const newId = newChatObj?.id || newChatObj?.chat_id;
            if (newId) {
              setSelectedChatId(newId);
              if (onChatSelect) onChatSelect(newId);
            } else {
              console.error("❌ Failed to create/select new chat");
            }
          }}
          className="flex items-center gap-2 text-sm"
        >
          {!collapsed && <SquarePen size={16} />}
          {!collapsed && "New Chat"}
        </button>


        <button
          onClick={() => setCollapsed(!collapsed)}
          className="pt-1.5 pb-1.5 pr-3 pl-3 bg-primary rounded-full text-white"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {!collapsed && (
        <div className={` text-primary py-3 ${collapsed ? "px-3 flex justify-center" : "px-5 flex justify-between gap-2"
          }`}>
          <div className='flex items-start justify-start'>
            <span
              className="icons-notification relative cursor-pointer group"
            >
              <span className='bg-primary text-white p-2 rounded-lg'><Link
                href="/mydashboard"
                className={`cursor-pointer`}
              >
                Messages
              </Link></span>
              <span id="bages-count" className="bages absolute text-sm  bg-[#EF4444] rounded-full text-white">2</span>
            </span>
          </div>
        </div>
      )}
      {!collapsed && (
        // Chat History (only visible when sidebar is open)
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-800">
            Search History
          </h3>
          <div
            className="overflow-history overflow-y-auto"
            style={{ maxHeight: `${7 * 64}px` }} // 8 chats * approx 64px height per item
          >
            {chatHistory.length > 0 ? (
              chatHistory.map(({ id, title, created_at }) => (
                <div
                  key={id}
                  className={`p-3 rounded-lg relative cursor-pointer ${selectedChatId === id ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => {
                    localStorage.setItem('chat_id', id);
                    setSelectedChatId(id);
                    if (onChatSelect) {
                      onChatSelect(id); // <- Trigger message loading..
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      {editingChatId === id ? (
                        <input
                          className="text-sm font-medium text-gray-700 border rounded px-2 py-1"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onBlur={() => handleEditTitle(id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEditTitle(id);
                            if (e.key === 'Escape') {
                              setEditingChatId(null);
                              setNewTitle('');
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-700">
                          {title}
                        </p>
                      )}

                      <p className="text-xs text-gray-500">
                        {new Date(created_at).toLocaleDateString()} • {new Date(created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="relative">
                      <button onClick={() => setDropdownOpen(dropdownOpen === id ? null : id)}>
                        <Ellipsis size={16} />
                      </button>
                      {dropdownOpen === id && (
                        <div className="absolute right-0 top-6 bg-white border rounded shadow-md z-10 w-32">
                          <button
                            onClick={() => handleDeleteChat(id)}
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              setEditingChatId(id);
                              setNewTitle(title);
                              setDropdownOpen(null); // close dropdown if any
                            }}
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-blue-50 text-blue-600"
                          >
                            Rename
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (

              <div>
                <p className="text-sm text-gray-400">No chat history found.<br />Login first. </p>
                {chats && chats.length > 0 ? (
                  chats.map((chat) => (
                    <div
                      key={chat.chat_id}
                      className={`p-3 text-white rounded-lg cursor-pointer ${selectedChatId === chat.chat_id ? "bg-white" : "bg-white"}`}
                      onClick={() => {
                        localStorage.setItem("Guest chat_id", chat.chat_id);
                        setSelectedChatId(chat.chat_id);
                        if (onChatSelect) onChatSelect(chat.chat_id);
                      }}
                    >
                      {chat.title || "Guest Chat"}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No chat history found.<br />Login first.</p>
                )}
              </div>

            )}
          </div>
          {/* Logout at bottom */}
          {/* <div className="pt-4 pb-4 pr-4 pl-0 border-t">
            <button
              onClick={handleLogout}
              className={`text-red-500 flex items-center gap-2 w-full px-3 py-2 hover:bg-red-50 rounded-md 
              ${collapsed ? "justify-center" : "justify-start"}`}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              {!collapsed && "Logout"}
            </button>
          </div> */}

        </div>
      )}


    </aside>
  );
}

