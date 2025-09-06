"use client"
import { useState, useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPause, FaTrash, FaRetweet } from 'react-icons/fa';
import { HiMiniBookmark, HiListBullet } from "react-icons/hi2";
import { MdEdit } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import Link from 'next/link';
export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [buyData, setBuyData] = useState([]);
  const [sellData, setSellData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('enquiries'); // or'requests'
  const [inquiries, setInquiries] = useState([]); // your list
  const [buyCount, setBuyCount] = useState(0);
  const [sellCount, setSellCount] = useState(0);
  const [profileDp, setProfileDp] = useState("");
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) fetchprofileData();
  }, [token]);

  const fetchprofileData = async () => {
    try {
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
      setEmail(data.email);
    } catch (err) {
      console.log("profile fetch error:", err.message);
    }
  };

  // action API for delete,repost
  // In Dashboard.jsx
  const handleAction = async (inquiryId, actionType) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(
        `http://65.2.4.179:8000/api/v1/dashboard/inquiries/${inquiryId}/${actionType}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );

      const result = await response.json();
      if (response.ok) {

        alert(`${result.message} ${inquiryId}`);
        // ✅ Close dropdown after action
        setOpen(null);
        // ✅ Find the updated item from state
        let updatedItem =
          buyData.find(i => i.id === inquiryId) ||
          sellData.find(i => i.id === inquiryId);

        if (updatedItem) {
          if (updatedItem.inquiry_type?.toLowerCase() === 'buy') {
            setBuyData(prev => {
              const filtered = prev.filter(i => i.id !== inquiryId);
              return [updatedItem, ...filtered];
            });
          } else {
            setSellData(prev => {
              const filtered = prev.filter(i => i.id !== inquiryId);
              return [updatedItem, ...filtered];
            });
          }
        }

        // 🔄 Refresh from API (optional, to stay in sync)
        // fetchData(true);
      } else {
        alert('Action failed');
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };


  const fetchData = async (force = false) => {
    try {
      const token = localStorage.getItem('access_token');
      const noCache = force ? `&_=${Date.now()}` : "";

      const [buyRes, sellRes] = await Promise.all([
        fetch(`http://65.2.4.179:8000/api/v1/dashboard/my?inquiry_type=buy&sort_by=created_at&sort_dir=desc&page=1&page_size=10${noCache}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Cache-Control': 'no-store',
          }
        }),
        fetch(`http://65.2.4.179:8000/api/v1/dashboard/my?inquiry_type=sell&sort_by=created_at&sort_dir=desc&page=1&page_size=10${noCache}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Cache-Control': 'no-store',
          }
        })
      ]);

      const buyData = buyRes.ok ? await buyRes.json() : { results: [] };
      const sellData = sellRes.ok ? await sellRes.json() : { results: [] };

      const filteredBuy = buyData.results?.filter(item => item.inquiry_type?.toLowerCase() === 'buy') || [];
      const filteredSell = sellData.results?.filter(item => item.inquiry_type?.toLowerCase() === 'sell') || [];

      setBuyData(filteredBuy);
      setSellData(filteredSell);

      setBuyCount(filteredBuy.length);
      setSellCount(filteredSell.length);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r min-h-screen  ">
        {/* Profile Section */}
        <div className="mb-6 border-b border-gray-200 pb-4 mt-1">
          <div className="flex justify-center flex-wrap text-center gap-4 px-4 ">
            {/* Profile Image */}
            <img
              src={profileDp || "/DP-placeholder.jpg"}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600 shadow-sm mt-3"
            />

            {/* Profile Info */}
            <div>
              <p className="font-semibold text-gray-800 text-lg">
                {profileName || "User"}
              </p>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        </div>


        {/* Nav Section */}
        <nav className="text-sm text-gray-700 space-y-1 p-4">
          {/* Active Section */}
          <li
            className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${activeTab === 'enquiries' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
              }`}
            onClick={() => setActiveTab('enquiries')}
          >
            <HiListBullet />
            <span>My Enquiries</span>
          </li>
          {/* Menu Items */}
          <ul className="mt-3 space-y-2">
            <li
              className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${activeTab === 'requests' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('requests')}
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              <span>Requests</span>
            </li>
            <li
              className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${activeTab === 'offers' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('offers')}
            >
              {/* icon */}
              <HiMiniBookmark /><span>Offers</span>
            </li>
            <li className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${activeTab === 'messageview' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`} onClick={() => setActiveTab('messageview')} >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z" /></svg>
              <span>Messages</span>
            </li>
            <li
              className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${activeTab === 'tabwishlist' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('tabwishlist')}
            >
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3h14a2 2 0 012 2v2a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
              <span>Wishlist</span>
            </li>
            <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01" /></svg>
              <span>Sponsored Ads</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z" /></svg>
                <span>Analytics</span>
              </div>
              <span className="text-xs text-purple-600 font-medium">Premium</span>
            </li>
            <li>
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4v16m8-8H4" />
                </svg>
                <span>Account Settings</span>
              </Link>
            </li>

          </ul>

          {/* Quick Links */}
          <div className="mt-6">
            <p className="text-xs text-gray-400 px-3 mb-2">Quick Links</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 1116 0A8 8 0 012 10z" /></svg>
                <span>AI Search</span>
              </li>
              <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
                <span>Help Center</span>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === 'enquiries' && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-black">Welcome back, John!</h2>
            <p className="text-gray-600 mb-6">
              Manage your buy and sell enquiries, connect with traders, and grow your business.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <StatCard title="Active Request Enquiries" count={buyCount} trend="+3 this week" />
              <StatCard title="Active Offers Enquiries" count={sellCount} trend="+5 today" />
              {/* <StatCard title="Connections" count={24} trend="+7 this month" /> */}
            </div>

            {/* Requests & Offers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Section
                title="Requests"
                open={open}
                setOpen={setOpen}
                data={buyData}
                handleAction={handleAction}
                selectedProduct={selectedProduct}
                setActiveTab={setActiveTab}
                setSelectedProduct={setSelectedProduct}
                tabKey="requests"   // 👈 will open requests tab
              />
              <Section
                title="Offers"
                open={open}
                setOpen={setOpen}
                data={sellData}
                handleAction={handleAction}
                selectedProduct={selectedProduct}
                setActiveTab={setActiveTab}
                setSelectedProduct={setSelectedProduct}
                tabKey="offers"     // 👈 will open offers tab
              />
            </div>

            {/* Recent Messages */}
            <div className="mt-10 mb-8">
              {/* <h4 className="text-lg font-semibold mb-4">Recent Messages</h4>
              <div className="bg-white rounded-lg shadow divide-y">
                {[
                  {
                    name: 'Sarah Wilson',
                    type: 'Buy Enquiry',
                    message: 'Interested in your electronics components...',
                    time: '2 hours ago',
                    avatar: '/img-avatar.png',
                    badgeColor: 'bg-blue-100 text-blue-800',
                  },
                  {
                    name: 'Mike Johnson',
                    type: 'Sell Enquiry',
                    message: 'Can we discuss bulk pricing for the laptops?',
                    time: '4 hours ago',
                    avatar: '/img-avatar.png',
                    badgeColor: 'bg-green-100 text-green-800',
                  },
                  {
                    name: 'Alex Rodriguez',
                    type: 'Buy Enquiry',
                    message: 'Looking for office furniture for our new location...',
                    time: '1 day ago',
                    avatar: '/img-avatar.png',
                    badgeColor: 'bg-blue-100 text-blue-800',
                  },
                  {
                    name: 'David Chen',
                    type: 'Sell Enquiry',
                    message: 'We have the electronic components you need in stock...',
                    time: '2 days ago',
                    avatar: '/img-avatar.png',
                    badgeColor: 'bg-green-100 text-green-800',
                  },
                ].map((msg, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={msg.avatar}
                        alt={msg.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{msg.name}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${msg.badgeColor}`}>
                            {msg.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{msg.message}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{msg.time}</div>
                  </div>
                ))}
              </div> */}

              {/* Recent Messages */}
              <h4 className="text-lg font-semibold mb-4">Recent Messages</h4>
              <div className="bg-white rounded-lg shadow divide-y">
                <RecentMessages />

              </div>




            </div>
          </>
        )}

        {activeTab === 'requests' && <RequestsView requests={[...buyData]} />}
        {activeTab === 'offers' && <OffersView offers={[...sellData]} />}
        {activeTab === 'tabwishlist' && <FetchWishlistItems />}
        {activeTab === 'messageview' && <MessageView />}
      </main>

    </div>
  );
}

// Sub-components
function StatCard({ title, count, trend }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-semibold">{count}</h3>
      <p className="text-green-600 text-xs">{trend}</p>
    </div>
  );
}

// Section Title
function Section({
  title,
  open,
  setOpen,
  data,
  handleAction,
  selectedProduct,
  setSelectedProduct,
  setActiveTab,
  tabKey // pass "requests" or "offers" when using
}) {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold">{title}</h4>

        {/* Single View More button */}
        <button
          className="text-indigo-600 text-sm"
          onClick={() => setActiveTab(tabKey)}
        >
          View More
        </button>
      </div>

      <div className="space-y-4">
        {data.length > 0 ? (
          data.slice(0, 3).map((item, index) => (
            <ContentCard
              key={index}
              data={item}
              open={open}
              setOpen={setOpen}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              handleAction={handleAction}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No enquiries found.</p>
        )}
      </div>
    </section>
  );
}


//  content card
function ContentCard({ open, setOpen, data, handleAction, selectedProduct, setSelectedProduct }) {
  const [showActions, setShowActions] = useState(false);
  const toggleActions = () => setShowActions(!showActions);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const inquiryId = data?.id;
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow">

        <div className='flex justify-between'>
          <span className="bg-[#DBEAFE] text-[#1E40AF] text-xs px-2 py-1 rounded-full mb-1 inline-block">
            {data?.category || 'Product'}
          </span>
          <span
            className={`inline-block w-3 h-3 rounded-full border-2 mb-1 animate-pulse shadow 
               ${data.is_paused
                ? 'bg-red-400 border-red-600 shadow-red-400'
                : 'bg-green-400 border-green-600 shadow-green-400'}`}>
          </span>
        </div>
        <div className="flex justify-between">
          <div onClick={() => {
            setSelectedProduct(data);
            setOpen(true);
          }} className="cursor-pointer bg-white px-4 py-2 w-full">
            <h5 className="font-semibold text-sm">{data?.product_name}</h5>

            {data?.catalog_number && <p className="text-xs text-gray-500">Catalog No: {data.catalog_number}</p>}
            {data?.brand && <p className="text-xs text-gray-500">Brand: {data.brand}</p>}
            {data?.description && <p className="text-xs text-gray-500 mt-1 mb-1">{data.description}</p>}
            <p className="text-xs text-gray-500">By: {data?.user_name}</p>
            <p className="text-xs text-gray-500 mb-2">Location: {data?.location}</p>
            {/* User List */}
            <div className="mt-4 space-y-2">
              {data.users && data.users.length > 0 ? (
                data.users.map((user, idx) => (
                  <UserCard key={user.id || idx} inquiryId={data.id} user={user} />
                ))
              ) : (
                <UserCard inquiryId={data.id} user={null} />
              )}
            </div>

            {/* <ProductDetailsModal isOpen={open} onClose={() => setOpen(false)} data={selectedProduct} /> */}
          </div>

          <div className="relative">
            <button onClick={toggleActions}>
              <BsThreeDotsVertical className="text-gray-600 hover:text-black" />
            </button>

            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
                <ul className="text-sm">
                  <li onClick={() => { handleAction(inquiryId, 'pause'); setShowActions(false); }} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <FaPause className="mr-2 text-gray-600" /> Pause
                  </li>
                  <li
                    onClick={() => {
                      handleAction(inquiryId, 'delete');
                      setShowActions(false);   // ✅ close dropdown
                    }}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaTrash className="mr-2 text-gray-600" /> Delete
                  </li>
                  <li
                    onClick={() => {
                      handleAction(inquiryId, 'repost');
                      setShowActions(false);   // ✅ close dropdown
                    }}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaRetweet className="mr-2 text-gray-600" /> Repost
                  </li>
                  <li
                    key={data.id}
                    onClick={() => {
                      setSelectedInquiry(data);
                      setShowEditModal(true);
                      setShowActions(false);   // ✅ close dropdown on edit
                    }}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <MdEdit />
                    <span className="ml-2">Edit</span>
                  </li>
                </ul>
              </div>
            )}

            <EditInquiryModal
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              inquiry={selectedInquiry}
            // onUpdate={(updated) => {
            //   fetchData(); // or update state list manually
            // }}
            />
          </div>
        </div>
      </div >
    </>
  );
}

// User Card of match potential inquiries...
function UserCard({ inquiryId, user }) {
  const [userData, setUserData] = useState(user || null);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attachment, setAttachment] = useState(null);
  const token = localStorage.getItem("access_token");
  const [receiverId, setReceiverId] = useState(null);
  const [inquiry, setInquiry] = useState(null);
  const [conversationId, setConversionId] = useState(null);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [createdAt, setCreatedat] = useState(null);

  useEffect(() => {
    const matchInquiry = async () => {
      // ✅ If user prop is passed, no need to fetch
      if (user) {
        setUserData(user);
        setReceiverId(user.user_id);
        setInquiry(inquiryId);
        return;
      }

      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://65.2.4.179:8000/api/v1/dashboard/inquiries/match/${inquiryId}?max_days_old=30&page=1&limit=20`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("📦 Full API response:", data);

        // Handle both formats: direct array OR { results: array }
        const inquiries = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
            ? data.results
            : [];

        if (inquiries.length > 0) {
          setUserData(inquiries[0]);
          setReceiverId(inquiries[0].user_id);
          setInquiry(inquiries[0].id);
          setCreatedat(inquiries[0].created_at);
        } else {
          console.warn("No inquiry data found");
        }
      } catch (error) {
        console.error("❌ Failed to fetch inquiry match:", error);
      }
    };

    matchInquiry();
  }, [inquiryId, user]);


  const handleEmojiClick = (emojiData) => {
    setMessageContent((prev) => prev + emojiData.emoji); // Append emoji to text
    setShowEmojiPicker(false); // Close picker after selecting
  };
  // Fetch Messages
  // Fetch Messages
  const fetchMessages = async (skipLoader = false) => {
    const otherUserId = receiverId;
    if (!otherUserId) return;

    if (!skipLoader) setLoading(true);   // show loader only for first load

    try {
      // 1️⃣ First API: Get conversation_id
      const res1 = await fetch(
        `http://65.2.4.179:8000/api/v1/dashboard/conversations/by-user/${otherUserId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data1 = await res1.json();
      const conversationId = data1?.conversation_id;
      setConversionId(conversationId);

      if (!conversationId) {
        console.warn("No conversation ID found.");
        return; // ❌ don’t wipe messages here
      }

      // 2️⃣ Second API: Get messages for this conversation
      const res2 = await fetch(
        `http://65.2.4.179:8000/api/v1/dashboard/conversations/${conversationId}/messages?limit=50`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data2 = await res2.json();
      setMessages(data2?.messages || []);
    } catch (err) {
      console.error("Fetch messages failed:", err);
    } finally {
      if (!skipLoader) setLoading(false);
    }
  };


  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  // ✅ Send message

  // const handleSend = async () => {

  //   // ✅ keep a reference before clearing
  //   const currentAttachment = attachment;

  //   // 1️⃣ Optimistic UI
  //   const tempMessage = {
  //     id: Date.now(),
  //     content: messageContent,
  //     sender_id: Number(localStorage.getItem("user_id")),
  //     created_at: createdAt,
  //     attachment: currentAttachment ? URL.createObjectURL(currentAttachment) : null,
  //   };
  //   setMessages((prev) => [...prev, tempMessage]);

  //   // 2️⃣ Reset input fields
  //   setMessageContent("");
  //   setAttachment(null);

  //   // ✅ reset file input manually
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }


  //   // 3️⃣ Build formData
  //   const formData = new FormData();
  //   formData.append("inquiry_id", inquiry);
  //   formData.append("receiver_id", receiverId);
  //   formData.append("content", messageContent || ""); // fallback to empty if only attachment
  //   if (currentAttachment) {
  //     formData.append("attachment", currentAttachment);
  //   }

  //   try {
  //     await fetch("http://65.2.4.179:8000/api/v1/dashboard/messages/new-inquiry", {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //       body: formData,
  //     });
  //     fetchMessages();
  //   } catch (err) {
  //     console.error("Send message failed:", err);
  //   }
  // };

  const handleSend = async () => {
    if ((!messageContent.trim() && !attachment) || !receiverId) return;

    const currentAttachment = attachment;

    // 1️⃣ Optimistic message
    const tempMessage = {
      id: Date.now(),
      content: messageContent || "",
      sender_id: Number(localStorage.getItem("user_id")),
      created_at: new Date().toISOString(),
      attachment: currentAttachment ? URL.createObjectURL(currentAttachment) : null,
    };
    setMessages((prev) => [...prev, tempMessage]);

    // 2️⃣ Reset input
    setMessageContent("");
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    scrollToBottom();

    // 3️⃣ Build FormData
    const formData = new FormData();
    formData.append("inquiry_id", inquiry);
    formData.append("receiver_id", receiverId);
    formData.append("content", messageContent || "");
    if (currentAttachment) formData.append("attachment", currentAttachment);

    // 4️⃣ API call
    try {
      await fetch("http://65.2.4.179:8000/api/v1/dashboard/messages/new-inquiry", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      // refresh messages but don’t trigger loader
      fetchMessages(true);
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };
  // ✅ Fetch messages when modal opens
  useEffect(() => {
    if (showModal) {
      fetchMessages();
    }
  }, [showModal]);



  if (!userData) return null;


  // Handle scroll detection
  const handleScroll = () => {
    const el = chatRef.current;
    if (!el) return;
    const isBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
    setIsAtBottom(isBottom);
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    const el = chatRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
        <div className="flex items-center gap-3">
          <img
            src="/img-avatar.png"
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-semibold text-gray-800 leading-none flex items-center gap-3 pb-2">
              <span>{userData.user_name}</span>
              <div>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded mt-1">
                  Verified Buyer
                </span>
                <span className="text-sm text-gray-600 ml-1">4.8 rating</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-tight">
              {userData.location}
            </p>
          </div>
        </div>

        <div className="text-right flex items-center gap-2">
          <div className="bg-blue-100 text-xs rounded px-3 py-1 font-semibold mb-2">
            {userData.product_name}
            <p className="text-xs text-gray-600">
              Catalog No: <strong>{userData.catalog_number}</strong>
            </p>
            <p className="text-xs text-gray-600">
              Brand: <strong>{userData.brand}</strong>
            </p>
            <p className="text-xs text-gray-600">
              Pack Size: <strong>{userData.pack_size}</strong>
            </p>
          </div>
          <div>
            <button
              className="mt-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              Message
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="
              bg-white rounded-xl shadow-md 
              w-[95%] sm:w-[420px] md:w-[480px] 
              h-[80vh] max-h-[90vh] 
              font-sans flex flex-col overflow-hidden
            ">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40?img=5"
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">{userData.user_name}</p>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            {/* Chat messages */}
            <div ref={chatRef}
              onScroll={handleScroll} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 relative">
              {messages.length === 0 && loading && (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    style={{ animationDelay: "0.2s" }}
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  />
                  <div
                    style={{ animationDelay: "0.4s" }}
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  />
                </div>
              )}  {messages.length === 0 && !loading && (
                <p className="text-gray-400 text-sm">No messages yet.</p>
              )} {(
                messages.map((msg) => {
                  const isSender = msg.sender_id === Number(localStorage.getItem("user_id"));
                  const hasFile = msg.file_name && msg.secure_file_url; // ✅ check if file exists

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3`}
                    >
                      <div className="max-w-xs md:max-w-sm">
                        {/* Sender name */}
                        <p className="text-xs text-gray-500 mb-1">{msg.sender_name}</p>

                        {/* Combined bubble for text + file */}
                        {(msg.content || hasFile) && (
                          <div
                            className={`p-3 rounded-lg border ${isSender
                              ? "bg-primary text-white border-none  rounded-br-none"
                              : "bg-gray-200 text-gray-800 border-gray-300 rounded-bl-none"
                              }`}
                          >
                            {/* File attachment (if exists) */}
                            {/* File attachment (if exists) */}
                            {hasFile && (
                              <div
                                className={`flex items-center gap-3 p-3 rounded-lg border overflow-hidden max-w-[16rem] sm:max-w-[20rem] ${isSender
                                  ? "bg-primary text-white border-none rounded-br-none"
                                  : "bg-white text-black border-gray-300 rounded-bl-none"
                                  }`}
                              >
                                {/* File icon */}
                                <div className="flex-shrink-0 w-8 h-8">
                                  {msg.file_name.endsWith(".pdf") ? (
                                    <img src="./pdf.png" alt="PDF" className="w-8 h-8 object-contain" />
                                  ) : msg.file_name.endsWith(".xls") || msg.file_name.endsWith(".xlsx") ? (
                                    <img src="./logo.png" alt="Excel" className="w-8 h-8 object-contain" />
                                  ) : (
                                    <img src="/photo-gallery.png" alt="File" className="w-8 h-8 object-contain" />
                                  )}
                                </div>

                                {/* File details */}
                                <div className="flex flex-col flex-grow overflow-hidden">
                                  <span className="font-medium truncate">{msg.file_name}</span>
                                  <span
                                    className={`text-xs truncate ${isSender ? "text-white" : "text-gray-600"}`}
                                  >
                                    {(msg.file_size / 1024).toFixed(1)} KB · {msg.file_mime_type}
                                  </span>
                                </div>

                                {/* Download button */}
                                <Link
                                  href={msg.secure_file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`text-[20px] ${isSender ? "text-white" : "text-gray-700"}`}
                                >
                                  <i className="fa-regular fa-circle-down"></i>
                                </Link>
                              </div>
                            )}

                            {/* Normal text message (if exists) */}
                            {msg.content && (
                              <p className="text-sm mb-1 mt-1 break-words">{msg.content}</p>
                            )}
                          </div>
                        )}

                        {/* Timestamp */}
                        <p className="text-[10px] text-black mt-1">
                          {new Date(msg.created_at).toLocaleString()}
                        </p>

                      </div>

                    </div>
                  );
                })

              )}


            </div>
            {/* Input area */}
            <div className="flex flex-col border-t bg-white relative">
              {/* File preview (if attachment is selected) */}
              {attachment && (
                <div className="p-3 border-b bg-gray-50">
                  <div className="flex items-center gap-3">
                    {/* File icon */}
                    <div className="flex-shrink-0">
                      <i className="fa fa-paperclip bg-primary" aria-hidden="true"></i>
                    </div>

                    {/* File details */}
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium text-gray-800 truncate">{attachment.name}</p>
                      <p className="text-xs text-gray-500">{(attachment.size / 1024).toFixed(1)} KB</p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => setAttachment(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>

                  {/* ✅ Optional caption field */}
                  <input
                    type="text"
                    placeholder="Add a caption (optional)..."
                    className="mt-2 w-full border rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                  />
                </div>
              )}

              {/* Message / Input controls */}
              <div className="flex items-center gap-3 px-3 py-2">
                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0 z-50">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}

                {/* File upload */}
                <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="*/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <img width="35" height="35" src="https://img.icons8.com/fluency/48/add-file.png" alt="add-file" />
                </label>
                {/* Normal text input (only show if no file selected) */}
                {!attachment && (
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    className="flex-1 border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                )}

                {/* Emoji button */}
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  😊
                </button>

                {/* Send button */}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700"
                  onClick={handleSend}
                >
                  ➤
                </button>
              </div>
              {/* ✅ Scroll-to-bottom button is now inside the chat */}
              {!isAtBottom && (
                <button
                  onClick={scrollToBottom}
                  className="fixed bottom-28 left-1/2 -translate-x-1/2 
             bg-white backdrop-blur-sm text-black  
             w-9 h-9 flex items-center justify-center
             rounded-full z-50"
                >
                  <i className="fa-regular fa-circle-down text-[22px]"></i>
                </button>

              )}
            </div>
          </div>
        </div>
      )}

    </>
  );
}

// Request section tab
function RequestsView({ requests }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [BuyData, setBuyData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const pageSize = 5;
  const dataToShow = isFiltered ? BuyData : requests;
  const totalPages = Math.ceil(dataToShow.length / pageSize);
  const paginatedData = dataToShow.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);





  const ReqData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const category = document.getElementById("category").value;
      const location = document.getElementById("location").value;
      const sort = document.getElementById("sort").value;
      const search = document.getElementById("search").value;
      // const startDate = document.getElementById("start_date").value;
      // const endDate = document.getElementById("end_date").value;

      const queryParams = new URLSearchParams({
        type: 'buy',
        category: category !== 'All Categories' ? category : '',
        location: location !== 'All Locations' ? location : '',
        search,
        sort_by: 'created_at',
        sort_dir: sort,
        // start_date: startDate || '',
        // end_date: endDate || '',
        page: 1,
        page_size: 10
      });

      const response = await fetch(`http://65.2.4.179:8000/api/v1/dashboard/my?${queryParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      const results = data.results || [];

      setBuyData(results);

      // Extract filter options
      const uniqueCategories = [...new Set(results.map(item => item.category).filter(Boolean))];
      const uniqueLocations = [...new Set(results.map(item => item.location).filter(Boolean))];

      setCategories(uniqueCategories);
      setLocations(uniqueLocations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    ReqData();
  }, []);



  const handleFilterChange = async () => {

    const isAnyFilterApplied = (
      category !== 'All Categories' ||
      location !== 'All Locations' ||
      search.trim() !== ''
    );

    setIsFiltered(isAnyFilterApplied);

    if (isAnyFilterApplied) {
      await ReqData();
    } else {
      setBuyData([]); // Reset to show default requests
    }
  };



  return (
    <div>
      {/* Top Filter Bar */}
      {/* Requests Header Box */}
      <div className="bg-[#5D47FF] text-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-1">Requests</h2>
        <p className="text-sm opacity-90">
          View and respond to aggregated product needs from active buyers. Attachments require Premium to access.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 justify-between">
        {/* Start Date */}
        {/* <input type="date" id="start_date" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange} /> */}

        {/* End Date */}
        {/* <input type="date" id="end_date" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange} /> */}
        <div className="flex gap-2">
          {/* Category */}
          <select id="category" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange}>
            <option>All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Location */}
          <select id="location" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange}>
            <option>All Locations</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Sort */}
          <select id="sort" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange}>
            <option value="desc">Latest First</option>
            <option value="asc">Oldest First</option>
          </select>


        </div>
        {/* Search */}
        <input type="text" id="search" className="border px-3 py-2 rounded text-sm" placeholder="Search requests..." onChange={handleFilterChange} />
      </div>
      {/* Request Cards */}
      <div className="space-y-4">
        {paginatedData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
              <span className='bg-[#DBEAFE] text-[#1E40AF] text-xs px-2 py-1 rounded-full mb-1 inline-block'>{item.type === 'sell' ? 'Products' : 'products'}</span>
              <span>{new Date(item.created_at).toLocaleString()}</span>
            </div>
            <h4 className="text-md font-semibold mb-1">{item.title || item.product_name}</h4>

            {/* Product or Job Info */}
            {item.product_name ? (
              <>
                <div className='flex items-center justify-between w-1/2'>
                  <p className="text-sm text-gray-500">Catalog No: <strong>{item.catalog_no || 'N/A'}</strong></p>
                  <p className="text-sm text-gray-500">Brand: <strong>{item.brand || 'N/A'}</strong></p>
                  <p className="text-sm text-gray-500">Pack size: <strong>{item.pack_size || 'N/A'}</strong></p>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-medium mb-1">Job description:</p>
                <p className="text-sm text-gray-500">{item.description || 'No description available.'}</p>
                <p className="bg-[#DBEAFE] text-[#1E40AF] text-xs px-2 py-1 rounded-full mb-1 inline-block">Job type: <strong>{item.job_type || 'N/A'}</strong></p>
              </>
            )}

            {/* User List */}
            <div className="mt-4 space-y-2">
              {item.users && item.users.length > 0 ? (
                item.users.map((user, idx) => (
                  <UserCard key={user.id || idx} inquiryId={item.id} user={user} />
                ))
              ) : (
                <UserCard inquiryId={item.id} user={null} /> // placeholder
              )}
            </div>



          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 border rounded ${currentPage === num + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Offer Section tab

function OffersView({ offers }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [SellData, setSellData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const pageSize = 5;
  const dataToShow = isFiltered ? SellData : offers;
  const totalPages = Math.ceil(dataToShow.length / pageSize);
  const paginatedData = dataToShow.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const ReqData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const category = document.getElementById("category").value;
      const location = document.getElementById("location").value;
      const sort = document.getElementById("sort").value;
      const search = document.getElementById("search").value;
      // const startDate = document.getElementById("start_date").value;
      // const endDate = document.getElementById("end_date").value;

      const queryParams = new URLSearchParams({
        type: 'sell',
        category: category !== 'All Categories' ? category : '',
        location: location !== 'All Locations' ? location : '',
        search,
        sort_by: 'created_at',
        sort_dir: sort,
        // start_date: startDate || '',
        // end_date: endDate || '',
        page: 1,
        page_size: 10
      });

      const response = await fetch(`http://65.2.4.179:8000/api/v1/dashboard/my?${queryParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      const results = data.results || [];

      setSellData(results);

      // Extract filter options
      const uniqueCategories = [...new Set(results.map(item => item.category).filter(Boolean))];
      const uniqueLocations = [...new Set(results.map(item => item.location).filter(Boolean))];

      setCategories(uniqueCategories);
      setLocations(uniqueLocations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    ReqData();
  }, []);



  const handleFilterChange = async () => {

    const isAnyFilterApplied = (
      category !== 'All Categories' ||
      location !== 'All Locations' ||
      search.trim() !== ''
    );

    setIsFiltered(isAnyFilterApplied);

    if (isAnyFilterApplied) {
      await ReqData();
    } else {
      setSellData([]); // Reset to show default requests
    }
  };


  return (
    <div>
      {/* Offers Header */}
      <div className="bg-[#5D47FF] text-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-1">Offers</h2>
        <p className="text-sm opacity-90">
          Browse product offers from verified suppliers. Pricing and MOQ may vary. Premium unlocks more insights.
        </p>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 justify-between">
        {/* Start Date */}
        {/* <input type="date" id="start_date" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange} /> */}

        {/* End Date */}
        {/* <input type="date" id="end_date" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange} /> */}
        <div className="flex gap-2">
          {/* Category */}
          <select id="category" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange}>
            <option>All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Location */}
          <select id="location" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange}>
            <option>All Locations</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Sort */}
          <select id="sort" className="border px-3 py-2 rounded text-sm" onChange={handleFilterChange}>
            <option value="desc">Latest First</option>
            <option value="asc">Oldest First</option>
          </select>


        </div>
        {/* Search */}
        <input type="text" id="search" className="border px-3 py-2 rounded text-sm" placeholder="Search requests..." onChange={handleFilterChange} />
      </div>

      {/* Offer Cards */}
      <div className="space-y-4">
        {paginatedData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
              <span className='bg-[#DBEAFE] text-[#1E40AF] text-xs px-2 py-1 rounded-full mb-1 inline-block'>{item.type === 'buy' ? 'Products' : 'products'}</span>
              <span>{new Date(item.created_at).toLocaleString()}</span>
            </div>
            <h4 className="text-md font-semibold mb-1">{item.title || item.product_name}</h4>

            {/* Product or Job Info */}
            {item.product_name ? (
              <>
                <div className='flex items-center justify-between w-1/2'>
                  <p className="text-sm text-gray-500">Catalog No: <strong>{item.catalog_no || 'N/A'}</strong></p>
                  <p className="text-sm text-gray-500">Brand: <strong>{item.brand || 'N/A'}</strong></p>
                  <p className="text-sm text-gray-500">Pack size: <strong>{item.pack_size || 'N/A'}</strong></p>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-medium mb-1">Job description:</p>
                <p className="text-sm text-gray-500">{item.description || 'No description available.'}</p>
                <p className="bg-[#DBEAFE] text-[#1E40AF] text-xs px-2 py-1 rounded-full mb-1 inline-block">Job type: <strong>{item.job_type || 'N/A'}</strong></p>
              </>
            )}

            {/* User List */}
            <div className="mt-4 space-y-2">
              {item.users && item.users.length > 0 ? (
                item.users.map((user, idx) => (
                  <UserCard key={user.id || idx} inquiryId={item.id} user={user} />
                ))
              ) : (
                <UserCard inquiryId={item.id} user={null} /> // placeholder
              )}
            </div>



          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 border rounded ${currentPage === num + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Edit Requets anfOffer Modal
function EditInquiryModal({ isOpen, onClose, inquiry, onUpdate }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(inquiry || {});
  }, [inquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://65.2.4.179:8000/api/v1/dashboard/inquiry/${inquiry.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        // onUpdate();
        alert("Inquiry updated successfully");
        onClose();
      } else {
        console.error('Failed to update inquiry');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen || !inquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl overflow-scroll h-screen">
        <h2 className="text-xl font-semibold mb-4">Edit Inquiry</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {[
            { name: 'inquiry_type', label: 'Type' },
            { name: 'product_name', label: 'Product Name' },
            { name: 'catalog_number', label: 'Catalog No.' },
            { name: 'sku', label: 'SKU' },
            { name: 'brand', label: 'Brand' },
            { name: 'cas_number', label: 'CAS No.' },
            { name: 'category', label: 'Category' },
            { name: 'pack_size', label: 'Pack Size' },
          ].map((field) => (
            <div key={field.name} className="col-span-2">
              <label className="text-sm text-gray-700">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
          ))}

          <div className="col-span-2">
            <label className="text-sm text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              rows="3"
            />
          </div>

          <div className="col-span-2 flex justify-end mt-4 gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Wistlist tab
function FetchWishlistItems({ tabwishlist }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState({}); // ✅ Keep only this one
  const [showModal, setShowModal] = useState(false);
  // Price states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [selectedSKU, setSelectedSKU] = useState('');
  const [packSize, setPacksize] = useState('');
  const [selectedChatId, setSelectedChatId] = useState(null);
  const token = localStorage.getItem('access_token');
  const [selectedIdentifiers, setSelectedIdentifiers] = useState([]); // <-- ✅ Add this line
  // Compare states
  const [compareList, setCompareList] = useState([]);
  const [showComparePopup, setShowComparePopup] = useState(false);
  const [showComparisonChart, setShowComparisonChart] = useState(false);
  const [publicationData, setPublicationData] = useState([]);
  const [loadingPrice, setLoadingPrice] = useState(false);

  useEffect(() => {
    const savedChatId = localStorage.getItem("chat_id");
    if (savedChatId) {
      setSelectedChatId(savedChatId);
    }
  }, []);



  // wishlist
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://65.2.4.179:8000/api/v1/chat/wishlist', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      console.log("Wishlist API data:", data); // ✅ log for verification

      // Set wishlist items for UI if needed
      setWishlistItems(data);

      // ✅ Convert to map
      const wishlistMap = {};
      data.forEach(item => {
        if (item.catalog_number) {
          wishlistMap[item.catalog_number] = true;
        }
      });

      console.log("Mapped wishlist:", wishlistMap); // ✅ confirm output
      setWishlist(wishlistMap); // ✅ update state used by icons
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);


  const handleViewPrices = async (productUrl, product) => {
    if (!selectedChatId || !token || !productUrl) return;

    setSelectedProduct(product);
    setLoadingProductId(product.id);
    setShowPriceModal(false);
    setPriceData([]);

    try {
      const response = await fetch(
        `http://65.2.4.179:8000/api/v1/chat/chat/product-price?product_url=${encodeURIComponent(productUrl)}&chat_id=${selectedChatId}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (Array.isArray(data.products)) {
        setPriceData(data.products);
      }

      setShowPriceModal(true);
    } catch (error) {
      console.error("Error fetching price data:", error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleCompareToggle = (product) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.catalog_number === product.catalog_number);
      if (exists) {
        return prev.filter((p) => p.catalog_number !== product.catalog_number);
      } else if (prev.length < 2) {
        return [...prev, product];
      } else {
        alert("You can only compare up to 2 products");
        return prev;
      }
    });
    setShowComparePopup(true);
  };



  // Wishlist toggle API

  const handleWishlistToggle = async (product) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    const payload = {
      catalog_number: product.catalog_number,
      product_name: product.product_name || product.title || 'Unknown Product',
      brand: product.brand || '',
      cas_number: product.cas_number || '',
      category: product.category || '',
      description: product.description || '',
      pack_size: product.pack_size || '',
      price: product.price || '',
      product_url: product.product_url || '',
      image_url: product.image_url || ''
    };

    try {
      const response = await fetch('http://65.2.4.179:8000/api/v1/chat/wishlist/toggle', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Wishlist toggled:", data);

      // 🔄 Refresh wishlist from server
      fetchWishlist();

    } catch (error) {
      console.error("Error toggling wishlist:", error);
      alert("Failed to toggle wishlist.");
    }
  };



  const fetchPublications = async (identifiersInput = []) => {
    const token = localStorage.getItem("access_token");

    // 🛡️ Ensure it's an array
    const identifiers = Array.isArray(identifiersInput) ? identifiersInput : [identifiersInput];

    if (!identifiers.length || !token) {
      console.warn("❌ Missing identifiers or token");
      return;
    }

    const queryParams = identifiers
      .filter(Boolean)
      .map((id) => `identifier=${encodeURIComponent(id)}&type=name`)
      .join("&");

    try {
      const res = await fetch(`http://65.2.4.179:8000/api/v1/chat/chat/publications/?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      console.log("✅ Publications API response:", data);

      setPublicationData(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      console.error("Error fetching publications:", err);
      setPublicationData([]);
    }
  };
  if (loading) return <div>Loading wishlist...</div>;

  return (
    <>
      {/* Offers Header */}
      <div className="bg-[#5D47FF] text-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-1">Wishlist</h2>
        <p className="text-sm opacity-90">
          Your wishlisted products.
        </p>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 justify-between">
        {/* Search */}
        <div className='w-3/4'>
          <input type="text" id="search" className="border px-2 py-2 rounded text-sm w-full" placeholder="Search products..." />
        </div>

        <button className='bg-[#5D47FF] text-white p-2 rounded-lg shadow mb-6'>Add products</button>
      </div>
      {/* Wishlist UI */}
      <div className="flex flex-wrap gap-4">
        {wishlistItems.map((product, idx) => (
          <div
            key={idx}
            className="w-[260px] border border-gray-200 p-4 rounded-lg shadow hover:shadow-md bg-white transition"
          >
            <div className="flex gap-3">
              <img
                src={product.image_url || "/placeholder.png"}
                alt={product.product_name}
                className="w-24 h-24 object-contain mb-2"
              />
              <div className="mb-2">
                <h3 className="text-sm font-semibold leading-tight">
                  {product.product_name}
                </h3>
                <p className="text-xs text-gray-600">
                  Brand: {product.brand || "Not specified"}
                </p>
                <p className="text-xs text-gray-600">
                  Catalog No.: {product.catalog_number}
                </p>
                <p className="text-xs text-gray-600">
                  CAS No: {product.cas_number || "Not specified"}
                </p>
              </div>
            </div>



            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3 text-indigo-600">
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className="hover:text-indigo-800"
                  title="Toggle Wishlist"
                >
                  <i
                    className={`fa-heart ${wishlist?.[product.catalog_number] ? 'fa-solid ' : 'fa-regular'
                      }`}
                  />

                </button>


                <button
                  className="hover:text-indigo-800"
                  onClick={() => handleCompareToggle(product)}
                  title="Compare"
                >
                  <i className="fa-solid fa-code-compare" />
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedIdentifiers([
                    product.title,
                    product.catalog_number,
                    product.cas_number,
                  ]);
                  setShowModal(true);
                  fetchPublications(
                    [product.title, product.catalog_number, product.cas_number].filter(Boolean)
                  );
                }}
                className="mt-2 text-xs text-indigo-700 underline"
              >
                Publications
              </button>
            </div>

            <button
              className="w-full text-sm py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
              onClick={() => handleViewPrices(product.product_url, product)}
              disabled={loadingProductId === product.id}
            >
              {loadingProductId === (product.id || product.catalog_number)
                ? "Loading..."
                : "Buy / Sell"}
            </button>
          </div>
        ))}
      </div>

      {/* Price Modal */}
      {showPriceModal && selectedProduct && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">Price Details</h2>
              <button
                onClick={() => setShowPriceModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-xmark text-xl" />
              </button>
            </div>

            {/* Loader */}
            {loadingPrice ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                <span className="mt-4 text-gray-500">Fetching prices...</span>
              </div>
            ) : (
              <>
                {/* Product Title */}
                <h3 className="text-2xl font-bold mt-4 mb-3 text-gray-800">
                  {selectedProduct.title}
                </h3>

                {/* Product Info */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded p-2">
                    <div className="text-xs text-blue-800 font-medium">Brand</div>
                    <div className="text-sm font-semibold text-blue-900">
                      {selectedProduct.brand || 'N/A'}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded p-2">
                    <div className="text-xs text-green-800 font-medium">Catalog No.</div>
                    <div className="text-sm font-semibold text-green-900">
                      {selectedProduct.catalog_number || 'N/A'}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded p-2">
                    <div className="text-xs text-purple-800 font-medium">CAS No.</div>
                    <div className="text-sm font-semibold text-purple-900">
                      {selectedProduct.cas_number || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Pack Sizes Table */}
                <h4 className="text-md font-semibold mb-2 text-gray-700">
                  Available Pack Sizes
                </h4>
                <table className="w-full text-sm border rounded overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-2 border">Select</th>
                      <th className="p-2 border">Pack Size</th>
                      <th className="p-2 border">SKU</th>
                      <th className="p-2 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceData.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2 border text-center">
                          <input
                            type="checkbox"
                            checked={selectedSKU === item.sku}
                            onChange={() => {
                              setSelectedSKU(selectedSKU === item.sku ? '' : item.sku);
                              setPacksize(packSize === item.size ? '' : item.size);
                            }}

                          />
                        </td>
                        <td className="p-2 border">{item.size}</td>
                        <td className="p-2 border">{item.sku}</td>
                        <td className="p-2 border">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>


                </table>

                {/* CTA Buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                    onClick={() => handleInquiry('buy', selectedProduct)}
                    disabled={!selectedSKU}
                  >
                    <i className="fa-solid fa-cart-shopping" /> Buy
                  </button>

                  <button
                    className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 flex items-center gap-2"
                    onClick={() => handleInquiry('sell', selectedProduct)}
                    disabled={!selectedSKU}
                  >
                    <i className="fa-solid fa-store" /> Sell
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Publications Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl h-[90vh] flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">
              Select Identifiers for {selectedProduct?.title}
            </h2>


            {/* Identifier Checkboxes */}
            <div className="mb-4 flex flex-wrap gap-3">
              {[selectedProduct?.title, selectedProduct?.catalog_number, selectedProduct?.cas_number]
                .filter(Boolean)
                .map((identifier, idx) => {
                  const isChecked = selectedIdentifiers.includes(identifier);
                  const isDisabled = selectedIdentifiers.length > 0 && !isChecked;

                  return (
                    <label key={idx} className="flex items-center gap-2 text-lg text-black font-bold">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          let updated = [];

                          if (checked) {
                            updated = [identifier]; // Only allow one at a time
                          }

                          setSelectedIdentifiers(updated);
                          fetchPublications(updated);
                        }}
                      />
                      {identifier}
                    </label>
                  );
                })}
            </div>


            {/*  Publications */}
            <div className="overflow-y-auto flex-1 pr-2 border-t pt-4">
              {Array.isArray(publicationData) && publicationData.length > 0 ? (
                publicationData.map((pub, idx) => (
                  <div key={idx} className="mb-4 border-b pb-3">
                    <h3 className="font-bold text-gray-800">{pub.Title}</h3>
                    <p className="text-sm text-gray-700">{pub.Authors?.join(', ')}</p>
                    <p className="text-xs text-gray-600 italic">
                      {pub.Journal} ({pub.Date?.Year}-{pub.Date?.Month}-{pub.Date?.Day})
                    </p>
                    <p className="text-sm mt-2 text-gray-800">{pub.Abstract}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No publications found.</p>
              )}
            </div>

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 self-end"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Compare Popup */}
      {showComparePopup && (
        <div className="fixed bottom-4 left-0 right-0 px-4 z-50">
          <div className="bg-white shadow-xl rounded-lg p-4 flex justify-between items-center max-w-4xl mx-auto">
            <div className="text-sm font-medium text-gray-700 w-1/4">
              Choose up to 2 products to compare
            </div>
            <div className="flex gap-4 items-center w-2/4 justify-center">
              {compareList.map((product, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={product.image_url || "/placeholder.png"}
                    alt={product.title}
                    className="w-20 h-20 object-contain border rounded"
                  />
                  <button
                    className="absolute top-0 right-0 -mt-1 -mr-1 bg-indigo-600 text-white rounded-full w-5 h-5"
                    onClick={() =>
                      setCompareList(prev =>
                        prev.filter(p => p.catalog_number !== product.catalog_number)
                      )
                    }
                  >
                    &times;
                  </button>
                  <p className="text-xs text-center mt-1 w-24 truncate">{product.title}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 w-1/4 justify-end">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
                disabled={compareList.length < 2}
                onClick={() => setShowComparisonChart(true)}
              >
                Compare
              </button>
              <button className="text-sm" onClick={() => setShowComparePopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Chart */}
      {showComparisonChart && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="text-lg font-semibold">Comparison Chart</div>
            <button onClick={() => setShowComparisonChart(false)}>
              <i className="fa-solid fa-xmark text-xl" />
            </button>
          </div>

          <div className="mt-8 px-8 overflow-x-auto">
            <table className="w-full text-sm text-center border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 w-1/4 text-left">Product</th>
                  {compareList.map((product, idx) => (
                    <th key={idx} className="p-2">
                      <div className="flex flex-col items-center">
                        <img src={product.image_url} className="w-28 h-28 object-contain" />
                        <p className="mt-2 font-medium">{product.title}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Catalog", key: "catalog_number" },
                  { label: "Brand", key: "brand" },
                  { label: "Quantity/Unit", key: "quantity" },
                  { label: "Price", key: "price" },
                  { label: "Description", key: "description" },
                  { label: "Specification", key: "specification" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2 text-left font-medium bg-gray-50">{row.label}</td>
                    {compareList.map((product, i) => (
                      <td key={i} className="p-2">{product[row.key] || "—"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

// Message View
function MessageView() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null); // ✅ store clicked conversation

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(
          `http://65.2.4.179:8000/api/v1/dashboard/conversations`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setMessages(data.conversations || []);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation); // store selected conversation
    setShowModal(true); // open modal
  };

  return (
    <div className="w-full">
      <div className="bg-[#5D47FF] text-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-1">Messages</h2>
        <p className="text-sm opacity-90">This is the Message View</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div id="message-conversation" className="bg-white rounded-lg shadow divide-y">
          {messages.map((msg, index) => (
            <div
              key={msg.conversation_id || index}
              onClick={() => handleConversationClick(msg)} // ✅ open modal on click
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    msg.other_profile_image_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      msg.other_full_name || 'User'
                    )}`
                  }
                  alt={msg.other_full_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{msg.other_full_name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Chat
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{msg.last_message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pass selected conversation to modal */}
      <InquiryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        conversation={activeConversation} // ✅ send details to modal
      />
    </div>
  );
}

// Message send Modal....
function InquiryModal({ isOpen, onClose, conversation, inquiry }) {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [attachment, setAttachment] = useState(null);
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const messagesEndRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const handleEmojiClick = (emojiData) => {
    setMessageContent((prev) => prev + emojiData.emoji); // Append emoji to text
    setShowEmojiPicker(false); // Close picker after selecting
  };

  const fetchMessages = async () => {
    if (!conversation?.conversation_id) return;
    try {
      const res = await fetch(
        `http://65.2.4.179:8000/api/v1/dashboard/conversations/${conversation.conversation_id}/messages?limit=50`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setMessages(data?.messages || []);
      console.log("message ka data", data.messages);
    } catch (err) {
      console.error("Fetch messages failed:", err);
    }
    finally {
      setLoading(false); // ✅ always stop loading
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen, conversation?.conversation_id]);

  // ✅ Auto-scroll to the last message when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSend = async () => {
    // ✅ allow sending if there’s either text OR file
    if ((!messageContent.trim() && !attachment) || !conversation?.other_user_id) return;

    // ✅ keep a reference before clearing
    const currentAttachment = attachment;

    // 1️⃣ Optimistic UI
    const tempMessage = {
      id: Date.now(),
      content: messageContent || "", // fallback to empty string
      sender_id: Number(localStorage.getItem("user_id")),
      created_at: new Date().toISOString(),
      attachment: currentAttachment ? URL.createObjectURL(currentAttachment) : null,
    };
    setMessages((prev) => [...prev, tempMessage]);

    // 2️⃣ Reset input state
    setMessageContent("");
    setAttachment(null);

    // ✅ reset file input manually
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }


    // 3️⃣ Build FormData
    const formData = new FormData();
    formData.append("conversation_id", conversation.conversation_id);
    formData.append("content", messageContent || "");
    if (currentAttachment) {
      formData.append("attachment", currentAttachment);
    }

    // 4️⃣ API call
    try {
      await fetch("http://65.2.4.179:8000/api/v1/dashboard/messages/send", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      fetchMessages();
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };


  useEffect(() => {
    if (isOpen) fetchMessages();
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle scroll detection
  const handleScroll = () => {
    const el = chatRef.current;
    if (!el) return;
    const isBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
    setIsAtBottom(isBottom);
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    const el = chatRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="
      bg-white rounded-xl shadow-md 
      w-[95%] sm:w-[420px] md:w-[480px] 
      h-[80vh] max-h-[90vh] 
      font-sans flex flex-col overflow-hidden
    ">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img
              src={conversation?.other_profile_image_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation?.other_full_name || "User")}`}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-sm">{conversation?.other_full_name}</p>
              <span className="text-xs text-green-500">Online</span>
            </div>
          </div>
          <button
            onClick={onClose} // ✅ Corrected
            className="text-gray-500 text-xl font-bold hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {/* Chat messages */}
        <div ref={chatRef}
          onScroll={handleScroll} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 relative">
          {loading ? (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div
                style={{ animationDelay: "0.2s" }}
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              />
              <div
                style={{ animationDelay: "0.4s" }}
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              />
            </div>
          ) : messages.length === 0 ? (
            <p className="text-gray-400 text-sm">No messages yet.</p>
          ) : (
            messages.map((msg) => {
              const isSender = msg.sender_id === Number(localStorage.getItem("user_id"));
              const hasFile = msg.file_name && msg.secure_file_url; // ✅ check if file exists

              return (
                <div
                  key={msg.id}
                  className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3`}
                >
                  <div className="max-w-xs md:max-w-sm">
                    {/* Sender name */}
                    <p className="text-xs text-gray-500 mb-1">{msg.sender_name}</p>

                    {/* Combined bubble for text + file */}
                    {(msg.content || hasFile) && (
                      <div
                        className={`p-3 rounded-lg border ${isSender
                          ? "bg-primary text-white border-none  rounded-br-none"
                          : "bg-gray-200 text-gray-800 border-gray-300 rounded-bl-none"
                          }`}
                      >
                        {/* File attachment (if exists) */}
                        {/* File attachment (if exists) */}
                        {hasFile && (
                          <div
                            className={`flex items-center gap-3 p-3 rounded-lg border overflow-hidden max-w-[16rem] sm:max-w-[20rem] ${isSender
                              ? "bg-primary text-white border-none rounded-br-none"
                              : "bg-white text-black border-gray-300 rounded-bl-none"
                              }`}
                          >
                            {/* File icon */}
                            <div className="flex-shrink-0 w-8 h-8">
                              {msg.file_name.endsWith(".pdf") ? (
                                <img src="./pdf.png" alt="PDF" className="w-8 h-8 object-contain" />
                              ) : msg.file_name.endsWith(".xls") || msg.file_name.endsWith(".xlsx") ? (
                                <img src="./logo.png" alt="Excel" className="w-8 h-8 object-contain" />
                              ) : (
                                <img src="/photo-gallery.png" alt="File" className="w-8 h-8 object-contain" />
                              )}
                            </div>

                            {/* File details */}
                            <div className="flex flex-col flex-grow overflow-hidden">
                              <span className="font-medium truncate">{msg.file_name}</span>
                              <span
                                className={`text-xs truncate ${isSender ? "text-white" : "text-gray-600"}`}
                              >
                                {(msg.file_size / 1024).toFixed(1)} KB · {msg.file_mime_type}
                              </span>
                            </div>

                            {/* Download button */}
                            <Link
                              href={msg.secure_file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-[20px] ${isSender ? "text-white" : "text-gray-700"}`}
                            >
                              <i className="fa-regular fa-circle-down"></i>
                            </Link>
                          </div>
                        )}

                        {/* Normal text message (if exists) */}
                        {msg.content && (
                          <p className="text-sm mb-1 mt-1 break-words">{msg.content}</p>
                        )}
                      </div>
                    )}

                    {/* Timestamp */}
                    <p className="text-[10px] text-black mt-1">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>

                  </div>

                </div>
              );
            })

          )}


        </div>
        {/* Input area */}
        <div className="flex flex-col border-t bg-white relative">
          {/* File preview (if attachment is selected) */}
          {attachment && (
            <div className="p-3 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                {/* File icon */}
                <div className="flex-shrink-0">
                  <i className="fas fa-file-alt text-2xl text-gray-600"></i>
                </div>

                {/* File details */}
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-gray-800 truncate">{attachment.name}</p>
                  <p className="text-xs text-gray-500">{(attachment.size / 1024).toFixed(1)} KB</p>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => setAttachment(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>

              {/* ✅ Optional caption field */}
              <input
                type="text"
                placeholder="Add a caption (optional)..."
                className="mt-2 w-full border rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>
          )}

          {/* Message / Input controls */}
          <div className="flex items-center gap-3 px-3 py-2">
            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            {/* File upload */}
            <label className="cursor-pointer text-gray-500 hover:text-gray-700">
              <input
                type="file"
                ref={fileInputRef}
                accept="*/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <img width="35" height="35" src="https://img.icons8.com/fluency/48/add-file.png" alt="add-file" />
            </label>
            {/* Normal text input (only show if no file selected) */}
            {!attachment && (
              <input
                type="text"
                placeholder="Type your message here..."
                className="flex-1 border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();  // ⬅ stops form reload
                    handleSend();
                  }
                }}
              />
            )}

            {/* Emoji button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="text-gray-500 hover:text-gray-700"
            >
              😊
            </button>

            {/* Send button */}
            <button
              type="submit"
              className="text-blue-600 hover:text-blue-700"
              onClick={handleSend}
            >
              ➤
            </button>
          </div>
          {/* ✅ Scroll-to-bottom button is now inside the chat */}
          {!isAtBottom && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-28 left-1/2 -translate-x-1/2 
             bg-white backdrop-blur-sm text-black  
             w-9 h-9 flex items-center justify-center
             rounded-full z-50"
            >
              <i className="fa-regular fa-circle-down text-[22px]"></i>
            </button>

          )}
        </div>
      </div>

    </div >
  );
}

// Recent Messages..
function RecentMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://65.2.4.179:8000/api/v1/dashboard/conversations`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        // ✅ Only keep the first 3 conversations
        setMessages((data.conversations || []).slice(0, 3));
      } catch (err) {
        console.error("Error fetching conversations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow divide-y">
      {loading ? (
        <p className="text-gray-500 p-4">Loading recent messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500 p-4">No recent messages found.</p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={msg.conversation_id || index}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  msg.other_profile_image_url ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    msg.other_full_name || "User"
                  )}`
                }
                alt={msg.other_full_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{msg.other_full_name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    Chat
                  </span>
                </div>
                <p className="text-sm text-gray-500">{msg.last_message}</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {new Date(msg.updated_at).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}