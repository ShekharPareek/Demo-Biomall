// code 2
'use client';

import { useEffect, useState, useRef } from 'react';
import { Beaker, Truck, MessageCircle, Briefcase } from "lucide-react";
import Sidebar from './sidebar';
import { Carousel } from "@material-tailwind/react";
import "swiper/css";
import Link from 'next/link';
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FreeMode, Pagination } from 'swiper/modules';
export default function AIAssistant({ onInquiryComplete }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [publicationData, setPublicationData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;
  const [activeIndex, setActiveIndex] = useState(0);
  const [priceData, setPriceData] = useState([]);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [selectedSKU, setSelectedSKU] = useState('');
  const [packSize, setPacksize] = useState('');
  const [wishlist, setWishlist] = useState({});
  const [selectedIdentifiers, setSelectedIdentifiers] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showComparePopup, setShowComparePopup] = useState(false);
  const [showComparisonChart, setShowComparisonChart] = useState(false);
  const productName = selectedProduct?.name || "Selected Product";
  const [file, setFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // ← action like 'summarize'
  const [optionPrompt, setOptionPrompt] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [guestChat, setGuestChat] = useState(false);
  const fileInputRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const limit = 10; // how many products to fetch at once
  const [catalogCount, setCatalogCount] = useState(0); // total items
  const chatEndRef = useRef(null);
  const lastScrollTop = useRef(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [isNewChat, setIsNewChat] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const chatContainerRef = useRef(null);

  const suggestions = [
    "What would you like to do with this?",
    "Ask me anything about your document...",
    "Type a message and hit Enter 🚀",
  ];


  useEffect(() => {
    const currentText = suggestions[index];

    let typingSpeed = deleting ? 20 : 40;


    const timeout = setTimeout(() => {
      if (!deleting) {
        // typing
        if (charIndex < currentText.length) {
          setPlaceholder((prev) => prev + currentText.charAt(charIndex));
          setCharIndex((prev) => prev + 1);
        } else {
          // pause before deleting
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        // deleting
        if (charIndex > 0) {
          setPlaceholder((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          // move to next suggestion
          setDeleting(false);
          setIndex((prev) => (prev + 1) % suggestions.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);


  // useEffect(() => {
  //   const initUserChat = async () => {
  //     if (!selectedChatId) {   // ✅ Only create if no chat selected
  //       const isLoggedIn = !!token;

  //       const url = isLoggedIn
  //         ? "http://65.2.4.179:8000/api/v1/chat/new"
  //         : "http://65.2.4.179:8000/api/v1/guest/chat/new";

  //       console.log("➡️ Creating new chat at:", url);

  //       try {
  //         const res = await fetch(url, {
  //           method: "POST",
  //           headers: {
  //             ...(isLoggedIn && { Authorization: `Bearer ${token}` }),
  //             "Content-Type": "application/json",
  //             "Accept": "application/json",
  //           },
  //           body: JSON.stringify("New Chat"),
  //         });

  //         let data;
  //         try {
  //           data = await res.json();
  //         } catch {
  //           data = await res.text(); // fallback if not JSON
  //         }

  //         if (res.ok && data.id) {
  //           console.log("✅ Chat created:", data);

  //           localStorage.setItem("chat_id", data.id);
  //           setSelectedChatId(data.id);

  //           if (typeof fetchChatHistory === "function") {
  //             fetchChatHistory(data.id); // ✅ pass chat_id
  //           }

  //           if (onChatSelect) onChatSelect(data.id);
  //         } else {
  //           console.error("❌ Chat creation failed:", {
  //             status: res.status,
  //             statusText: res.statusText,
  //             data,
  //           });
  //         }
  //       } catch (err) {
  //         console.error("🚨 Auto newChat error:", err);
  //       }
  //     }
  //   };

  //   initUserChat();
  // }, [token, selectedChatId]); // ✅ will run again when token is loaded



  // Show/hide scroll button on scroll


  // For Auto New Chat create
  // ✅ Auto New Chat for Logged-in Users
  useEffect(() => {
    const initUserChat = async () => {
      if (!token) return; // No token, skip

      // ✅ First check if chat already exists in localStorage
      const storedChatId = localStorage.getItem("chat_id");
      if (storedChatId) {
        setSelectedChatId(storedChatId);

        if (typeof fetchChatHistory === "function") {
          fetchChatHistory(storedChatId);
        }
        return; // ✅ stop here, don't create new chat
      }

      // ✅ If no chat yet, create a new one
      if (!selectedChatId) {
        const url = "http://65.2.4.179:8000/api/v1/chat/chat/new";
        const chatName = "New Chat";

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ name: chatName }), // send object, not raw string
          });

          const data = await res.json();

          if (res.ok && data.id) {
            const chatId = data.id;
            localStorage.setItem("chat_id", chatId);
            setSelectedChatId(chatId);

            if (typeof fetchChatHistory === "function") {
              fetchChatHistory(chatId);
            }
          } else {
            console.error("❌ User chat creation failed:", data);
          }
        } catch (err) {
          console.error("🚨 Auto newChat error (user):", err);
        }
      }
    };

    initUserChat();
  }, [token, selectedChatId]);


  const firstRender = useRef(true); // 👈 track first load

  // Track scroll position
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      lastScrollTop.current =
        container.scrollTop + container.clientHeight;

      const isAtBottom =
        container.scrollHeight - lastScrollTop.current < 50; // px threshold

      setShowScrollButton(!isAtBottom);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto scroll only if near bottom AND not first render
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // skip first run
      return;
    }

    const container = chatContainerRef.current;
    if (!container) return;

    // grab the last message element
    const lastMessage = container.querySelector(".message:last-child");
    if (!lastMessage) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (isNearBottom) {
      // scroll into view of last message instead of chatEndRef
      lastMessage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);


  // Manual scroll-to-bottom
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };



  // Price model checkbox logic for 1sseelct

  useEffect(() => {
    if (priceData.length > 0) {
      setSelectedSKU(priceData[0].sku); // Optional: Auto-select first item
      setPacksize(priceData[0].size)
    }
  }, [priceData]);


  // Hndel new message for scroll
  const handleNewMessage = () => {
    const container = document.getElementById('chat-container');
    if (!container) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 150;

    if (isAtBottom) {
      scrollToBottom();
    } else {
      setShowScrollButton(true);
    }
  };


  useEffect(() => {
    const savedChatId = localStorage.getItem("chat_id");
    if (savedChatId) {
      fetchChatMessages(savedChatId);
    }
  }, [token]);




  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      setInput(query);
      // Optional: sendMessage(query); if you want to auto search
    }
  }, []);

  // Group products into chunks of 3
  const groupProducts = (products, size = 3) => {
    const groups = [];
    for (let i = 0; i < products.length; i += size) {
      groups.push(products.slice(i, i + size));
    }
    return groups;
  };
  const fetchChatMessages = async (chatId) => {
    if (!chatId) {
      console.warn("fetchChatMessages: chatId is missing");
      return;
    }

    if (!token) {
      console.warn("fetchChatMessages: token is missing");
      return;
    }

    try {
      const res = await fetch(`http://65.2.4.179:8000/api/v1/chat/chat/${chatId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Failed to load chat. Server responded with:", res.status, errorData);

        return;
      }

      const data = await res.json();
      handleNewMessage();

      setMessages(
        (data.messages || []).map(m => ({
          role: m.role,
          content: m.message,
          matched_products: m.matched_products || []
        }))
      );

      // Avoid unnecessary re-setting if same ID
      if (selectedChatId !== chatId) {
        setSelectedChatId(chatId);
        localStorage.setItem("chat_id", chatId);
      }

    } catch (err) {
      console.error("Fetch chat error:", err.message || err);
    }
  };


  // const sendMessage = async () => {
  //   if (!input || !selectedChatId) return;

  //   const userMsg = { role: 'user', content: input };
  //   setMessages(prev => [...prev, userMsg]);
  //   setInput('');
  //   setIsLoading(true);

  //   try {
  //     const res = await fetch(`http://65.2.4.179:8000/api/v1/chat/chat/${selectedChatId}/message`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //       body: JSON.stringify(userMsg),
  //     });

  //     const data = await res.json();

  //     const aiMsg = {
  //       role: 'assistant',
  //       content: data.assistant_response,
  //       matched_products: data.matched_products || [],
  //     };

  //     setMessages(prev => [...prev, aiMsg]);
  //   } catch (err) {
  //     console.error("Failed to send message:", err);
  //   } finally {
  //     fetchChatMessages();
  //     setIsLoading(false);
  //   }
  // };

  // PublicationAPI

  const sendMessage = async () => {
    if (!input) return;

    const token = localStorage.getItem("access_token");

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let res;

      if (token && selectedChatId) {
        // ✅ Logged-in user API
        res = await fetch(`http://65.2.4.179:8000/api/v1/chat/chat/${selectedChatId}/message`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(userMsg),
        });
      } else {
        // ✅ Guest API (no chat_id needed)
        res = await fetch("http://65.2.4.179:8000/api/v1/guest/chat/message", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(userMsg),
        });
      }

      const data = await res.json();

      const aiMsg = {
        role: 'assistant',
        content: data.assistant_response || data.content || "No response",
        matched_products: data.matched_products || [],
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      if (token && selectedChatId) {
        fetchChatMessages(); // only fetch history for logged-in users
      }
      setIsLoading(false);
    }
  };


  const handleCheckboxChange = (value, checked) => {
    setSelectedIdentifiers((prev) => {
      return checked ? [...prev, value] : prev.filter((item) => item !== value);
    });
  };

  // Fetch Publication... old code
  // const fetchPublications = async (identifiersInput = []) => {
  //   const token = localStorage.getItem("access_token");
  //   // 🛡️ Ensure it's an array
  //   const identifiers = Array.isArray(identifiersInput) ? identifiersInput : [identifiersInput];

  //   if (!identifiers.length || !token) {
  //     console.warn("❌ Missing identifiers or token");
  //     return;
  //   }

  //   const queryParams = identifiers
  //     .filter(Boolean)
  //     .map((id) => `identifier=${encodeURIComponent(id)}&type=name`)
  //     .join("&");

  //   try {
  //     const res = await fetch(`http://65.2.4.179:8000/api/v1/chat/chat/publications/?${queryParams}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //       },
  //     });

  //     const data = await res.json();
  //     console.log("Publications API response:", data);

  //     setPublicationData(Array.isArray(data.results) ? data.results : []);
  //   } catch (err) {
  //     console.error("Error fetching publications:", err);
  //     setPublicationData([]);
  //   }
  // };


  // Fetch Publications (works for both login + guest)
  const fetchPublications = async (identifiersInput = []) => {
    const token = localStorage.getItem("access_token");

    // 🛡️ Ensure it's always an array
    const identifiers = Array.isArray(identifiersInput)
      ? identifiersInput
      : [identifiersInput];

    if (!identifiers.length) {
      console.warn("❌ Missing identifiers");
      return;
    }

    const queryParams = identifiers
      .filter(Boolean)
      .map((id) => `identifier=${encodeURIComponent(id)}&type=name`)
      .join("&");

    // ✅ Choose endpoint based on login status
    const baseUrl = token
      ? "http://65.2.4.179:8000/api/v1/chat/chat/publications/"
      : "http://65.2.4.179:8000/api/v1/guest/chat/publications/";

    try {
      const res = await fetch(`${baseUrl}?${queryParams}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          Accept: "application/json",
        },
      });

      const data = await res.json();
      console.log("Publications API response:", data);

      setPublicationData(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      console.error("Error fetching publications:", err);
      setPublicationData([]);
    }
  };

  // View Price API Oldcode
  // const handleViewPrices = async (productUrl, product) => {
  //   if (!selectedChatId || !token || !productUrl) return;

  //   setSelectedProduct(product);
  //   setLoadingProductId(product.catalog_number); // 🔥 loader tied to this product only
  //   setLoadingPrice(true);
  //   setShowPriceModal(false);

  //   try {
  //     const response = await fetch(
  //       `http://65.2.4.179:8000/api/v1/chat/chat/product-price?product_url=${encodeURIComponent(productUrl)}&chat_id=${selectedChatId}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();
  //     if (Array.isArray(data.products)) {
  //       setPriceData(data.products);
  //     } else {
  //       setPriceData([]);
  //     }

  //     setShowPriceModal(true);
  //   } catch (error) {
  //     console.error("Error fetching price data:", error);
  //     setPriceData([]);
  //   } finally {
  //     // 👇 remove ONLY the global modal loading, not the button loader
  //     setLoadingPrice(false);
  //     setLoadingProductId(null); // reset when request is fully done
  //   }
  // };

  // View Price API (works for both login + guest)
  const handleViewPrices = async (productUrl, product) => {
    const token = localStorage.getItem("access_token");
    const guestChatId = localStorage.getItem("Guest chat_id"); // ✅ store guest chat id when created

    if (!selectedChatId && !guestChatId) {
      console.warn("❌ No chat_id available");
      return;
    }
    if (!productUrl) return;

    setSelectedProduct(product);
    setLoadingProductId(product.catalog_number); // 🔥 loader tied to this product only
    setLoadingPrice(true);
    setShowPriceModal(false);

    try {
      // ✅ Choose endpoint based on login status
      const baseUrl = token
        ? "http://65.2.4.179:8000/api/v1/chat/chat/product-price"
        : "http://65.2.4.179:8000/api/v1/guest/chat/product-price";

      const chatIdToUse = token ? selectedChatId : guestChatId;

      const response = await fetch(
        `${baseUrl}?product_url=${encodeURIComponent(productUrl)}&chat_id=${chatIdToUse}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // only if logged in
          },
        }
      );

      const data = await response.json();
      if (Array.isArray(data.products)) {
        setPriceData(data.products);
      } else {
        setPriceData([]);
      }

      setShowPriceModal(true);
    } catch (error) {
      console.error("Error fetching price data:", error);
      setPriceData([]);
    } finally {
      // 👇 remove ONLY the global modal loading, not the button loader
      setLoadingPrice(false);
      setLoadingProductId(null); // reset when request is fully done
    }
  };



  // On filechange
  const onFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);             // Show preview
      setIsFileUploaded(false);      // Reset status
      setUploadResponse(null);       // Clear previous response
      setSelectedOption(null);       // Clear selected option
    }
  };



  // Upload document
  const handleFileUpload = async (selectedFile) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('chat_id', selectedChatId);

    try {
      const response = await fetch('http://65.2.4.179:8000/api/v1/chat/chat/upload', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data?.catalogs?.length > 0) {
        setCatalogCount(data.catalogs.length);
        setSessionId(data.session_id);
        setActiveIndex(0);

        // Fetch first page (offset 0)
        fetchProductList(data.session_id, selectedChatId, 0);
      }

      return data;
    } catch (error) {
      alert('Failed to upload file');
      return null;
    }
  };

  // Send button execution 
  const handleSend = async () => {
    setIsSending(true);

    try {
      // ✅ Document action flow
      if (selectedOption && uploadResponse?.type === 'document') {
        await handleOptionClick(selectedOption, uploadResponse.session_id);
        return;
      }

      // ✅ If file exists and not uploaded yet
      if (file && !isFileUploaded) {
        const response = await handleFileUpload(file);

        if (!response) return;

        setUploadResponse(response);
        setIsFileUploaded(true);

        if (response.type === 'product_list') {
          await fetchProductList(response.session_id, selectedChatId);
          return; // ✅ Stop here
        }
      }

      // ✅ NEW: If already uploaded and type is product_list, skip prompt and fetch products
      if (uploadResponse?.type === 'product_list' && isFileUploaded) {
        await fetchProductList(uploadResponse.session_id, selectedChatId);
        return;
      }

      // ✅ Prompt flow
      if (input.trim()) {
        await sendMessage();
      } else {
        alert("Please upload a file or enter a prompt.");
      }
    } catch (error) {
      console.error("Error sending:", error);
    } finally {
      fetchChatMessages();
      setIsSending(false); // 
      // 🔁 Auto-scroll to top after message is handled
      // setTimeout(() => {
      //   if (chatContainerRef.current) {
      //     chatContainerRef.current.scrollTo({
      //       top: 0,
      //       behavior: 'smooth',
      //     });
      //   }
      // }, 100); // wait for message to render
    }
  };



  const fetchProductList = async (filePath, chatId, currentOffset = offset) => {
    const token = localStorage.getItem('access_token');

    try {
      const url = new URL('http://65.2.4.179:8000/api/v1/chat/chat/upload/products');
      url.searchParams.append('file_path', filePath);
      url.searchParams.append('chat_id', chatId);
      // url.searchParams.append('offset', currentOffset);
      url.searchParams.append('offset', 0);
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          matched_products: data.matched_products,
          content: data.assistant_response
        },
      ]);

      // update offset
      const newOffset = currentOffset + data.matched_products.length;
      setOffset(newOffset);

    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
      alert("Failed to load products from uploaded file.");
    }
  };

  // Option Handel Click
  const handleOptionClick = async (action, sessionId) => {
    if (!input.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      const body = new URLSearchParams();
      body.append("session_id", sessionId);
      body.append("chat_id", selectedChatId);
      body.append("action", action);
      body.append("prompt", input);

      const res = await fetch("http://65.2.4.179:8000/api/v1/chat/chat/process-doc-action", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "user", content: `${action.replace(/_/g, " ")}: ${input}` },
        { role: "assistant", content: data.response },
      ]);

      // Reset input & option, but keep file/session for reuse
      setInput('');
      setSelectedOption(null);
    } catch (err) {
      console.error("Action API error", err);
      alert("Failed to perform document action.");
    }
  };


  // Wishlist API..
  const handleWishlistToggle = async (product) => {
    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    const payload = {
      catalog_number: product.catalog_number,
      product_name: product.product_name,
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

      // Toggle local state
      setWishlist((prev) => ({
        ...prev,
        [product.catalog_number]: !prev[product.catalog_number]
      }));
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      alert("Failed to toggle wishlist.");
    }
  };
  // compare products
  const handleCompareToggle = (product) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.catalog_number === product.catalog_number);
      if (exists) {
        return prev.filter((p) => p.catalog_number !== product.catalog_number);
      } else if (prev.length < 5) {
        return [...prev, product];
      } else {
        alert("You can only compare up to 2 products");
        return prev;
      }
    });
    setShowComparePopup(true);
  };

  // remove file
  const handleRemoveFile = () => {
    setFile(null);
    setIsFileUploaded(false);
    setUploadResponse(null);
    setSelectedOption(null);

    // ✅ Reset the input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  // inquirey Buy Sell API

  const handleInquiry = async (inquiryType, product, onResultCallback) => {
    const token = localStorage.getItem('access_token');
    const apiUrl = 'http://65.2.4.179:8000/api/v1/dashboard/inquiry';

    const payload = {
      inquiry_type: inquiryType,
      product_name: product.product_name || "N/A",
      catalog_number: product.catalog_number || "N/A",
      sku: selectedSKU || "N/A",
      brand: product.brand || "N/A",
      cas_number: product.cas_number || "N/A",
      category: product.category || "N/A",
      description: product.description || "N/A",
      pack_size: packSize || "N/A"
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      const result = await response.json();
      console.log('Inquiry submitted:', result);
      alert(`Inquiry for ${inquiryType.toUpperCase()} submitted successfully!`);


      // ✅ Pass result back to Dashboard
      if (typeof onInquiryComplete === 'function') {
        onInquiryComplete(result);
      }

    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry');
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);






  return (
    <div className="flex fixed bottom-0 top-14 w-full">

      <Sidebar
        onChatSelect={async (chatId) => {
          await fetchChatMessages(chatId); // will run with new chatId
          setIsNewChat(false);
          setGuestChat(true);             // show old chat view
        }}
        onNewChat={() => {
          setMessages([]);
          setIsNewChat(true);
        }}
      />



      <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col min-h-screen border-l relative">


        {/* Chat Area */}

        <div id="chat-container" ref={chatContainerRef} className="p-5 space-y-4 flex-1 flex flex-col overflow-y-auto relative h-[80vh]">
          {/* New chat ke UI */}
          {(isNewChat || messages.length === 0 || messages.every(m => !m.content?.trim())) ? (
            // ------------------ New Chat UI ------------------
            <main className={`transition-all duration-300 flex-1 flex items-center justify-center  h-full`}>
              <div className="w-full max-w-4xl text-center">
                {/* Heading */}

                <h1 className="text-3xl font-bold text-gray-800 mb-3">Find Lab Equipment &amp; Supplies</h1>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                  Search for products, post buy/sell requests, or connect with other life science professionals
                </p>
                {/* Search Bar */}
                <div className="p-4 sticky bottom-[70px] z-10 w-full flex justify-center">

                  <div className="w-full md:max-w-[990px] flex flex-col gap-3 rounded-full  shadow-lg">

                    {/* Uploaded File Preview (only for documents) */}

                    {file && (
                      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-2 ">
                        <i className="fa-solid fa-file-alt text-indigo-600 text-lg" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <button
                          onClick={() => {
                            setFile(null); // 🧹 Remove file preview
                            setIsFileUploaded(false); // 🔁 Reset file upload state

                            // 🧼 Clear upload response and selected option
                            setUploadResponse(null);
                            setSelectedOption(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className="text-red-500 text-sm hover:text-red-700"
                          title="Remove"
                        >
                          <i className="fa-solid fa-times" />
                        </button>
                      </div>
                    )}




                    {/* Show options only for document type */}
                    {uploadResponse?.type === 'document' && uploadResponse.options?.length > 0 && (
                      <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm mt-3 relative">

                        {/* ❌ Close button in top-right corner */}
                        <button
                          onClick={() => {
                            setFile(null);              // Remove file
                            setUploadResponse(null);    // Clear options & response
                            setSelectedOption(null);    // Reset selection
                            setIsFileUploaded(false);   // Reset upload status
                          }}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          title="Remove"
                        >
                          <i className="fa-solid fa-times" />
                        </button>

                        <p className="text-sm font-medium text-gray-800 mb-3">
                          {uploadResponse.message || "Select an action:"}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {uploadResponse.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedOption(option)}
                              className={`text-white text-sm px-4 py-1.5 rounded-full transition ${selectedOption === option
                                ? "bg-indigo-800"
                                : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                            >
                              {option.replace(/_/g, ' ')}
                            </button>
                          ))}
                        </div>

                        {selectedOption && (
                          <div className="mt-3 text-sm text-indigo-700 font-medium border-t pt-3 border-gray-200">
                            Action selected: <strong>{selectedOption.replace(/_/g, ' ')}</strong><br />
                            Please enter a prompt below and press send.
                          </div>
                        )}
                      </div>
                    )}



                    {/* Input + Upload + Send Bar */}
                    <div className="flex items-center justify-between  gap-2 px-4 py-4 pr-8 text-lg bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-primary">

                      <input
                        type="text"
                        value={input}
                        placeholder={placeholder}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();

                            if (uploadResponse?.type === "document" && !selectedOption) {
                              alert("Please select an action for the uploaded document below.");
                            } else {
                              sendMessage();
                            }
                          }
                        }}
                        className="flex-1 bg-transparent outline-none text-lg placeholder-gray-500"
                      />

                      {/* Upload icon */}
                      <label htmlFor="file-upload" className="cursor-pointer text-gray-500 hover:text-primary">
                        <i className="fa-solid fa-circle-plus"></i>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".pdf,.docx,.csv,.xlsx,.txt"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={async (e) => {
                          const selected = e.target.files[0];
                          if (selected) {
                            setFile(selected);
                            setIsFileUploaded(false);
                            setUploadResponse(null);
                            setSelectedOption(null);

                            const res = await handleFileUpload(selected);
                            if (res) {
                              setUploadResponse(res);
                              setIsFileUploaded(true);
                            }
                          }
                        }}
                      />



                      {/* Send icon */}
                      <button
                        onClick={handleSend}
                        className="text-primary hover:text-primary flex items-center justify-center"
                        disabled={isSending} // optional: disable while sending
                      >
                        {isSending ? (
                          <i className="fa-solid fa-spinner fa-spin" />
                        ) : (
                          <i className="fa-solid fa-paper-plane" />
                        )}
                      </button>

                    </div>
                  </div>
                </div>
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
          ) : (
            <>
              <div className="flex flex-col h-screen">
                <div id="chat-messages-container" ref={chatContainerRef}>
                  <div className='chat-area-1'>
                    {messages.map((msg, idx) =>
                      msg.role === 'user' ? (
                        <div key={idx} className="flex justify-end mr-3 mb-4 mt-4">
                          <div className="bg-primary text-white rounded-lg rounded-tr-none p-3 max-w-[70%] ml-2">
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        <div key={idx} className="flex flex-col overflow-x-scroll">
                          {/* Matched Products */}
                          {msg.matched_products?.length > 0 && (
                            <Swiper
                              modules={[Navigation, Pagination]}
                              spaceBetween={20}
                              slidesPerView={3}
                              navigation
                              loop={false}
                              pagination={{ clickable: true }}
                              className="w-[950px] flex custom-swiper">
                              {msg.matched_products.map((product, idx) => (
                                <SwiperSlide key={idx} className="h-auto">
                                  <div
                                    className="h-full border border-indigo-200 rounded-lg p-3 shadow-sm bg-white hover:shadow-md transition flex flex-col"
                                  >
                                    <div className="flex gap-3">
                                      <div className="relative">
                                        <img
                                          src={product.image_url || "/placeholder.png"}
                                          alt={product.product_name || "Product"}
                                          className="w-24 h-24 object-contain mb-2"
                                        />

                                        <div className="flex justify-center gap-2 mt-2">
                                          {localStorage.getItem("access_token") && (
                                            <button
                                              onClick={() => handleWishlistToggle(product)}
                                              className="text-indigo-600 hover:text-indigo-800 p-1"
                                              title="Toggle Wishlist"
                                            >
                                              <i
                                                className={`fa-heart ${wishlist[product.catalog_number]
                                                  ? "fa-solid"
                                                  : "fa-regular"
                                                  }`}
                                              ></i>
                                            </button>
                                          )}
                                          <button
                                            className="text-indigo-600 hover:text-indigo-800"
                                            onClick={() => handleCompareToggle(product)}
                                            title="Compare"
                                          >
                                            <i className="fa-solid fa-code-compare" />
                                          </button>
                                        </div>

                                      </div>
                                      <div className="side-b">
                                        <div className="font-semibold text-sm mt-2">
                                          <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                            {product.product_name}
                                          </a>

                                        </div>
                                        <div className="text-xs text-gray-600">
                                          Brand: {product.brand || "N/A"}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                          Catalog No.: {product.catalog_number}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                          CAS No: {product.cas_number}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                          Category: {product.category}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <button
                                        onClick={() => {
                                          setSelectedProduct(product);
                                          setSelectedIdentifiers([
                                            product.product_name,
                                            product.catalog_number,
                                            product.cas_number,
                                          ]);
                                          setShowModal(true);
                                          fetchPublications(
                                            [product.product_name, product.catalog_number, product.cas_number].filter(Boolean)
                                          );
                                        }}
                                        className="mt-2 text-xs text-indigo-700 underline"
                                      >
                                        Publications
                                      </button>


                                      <button
                                        className="mt-2 text-xs text-indigo-700 underline"
                                      >
                                        <a href={product.document_url} target="_blank" rel="noopener noreferrer">
                                          Documents
                                        </a>

                                      </button>

                                      <div className="flex gap-2 mt-3">
                                        <button
                                          onClick={() => handleViewPrices(product.product_url, product)}
                                          disabled={loadingProductId === product.catalog_number} // disable only while this product is loading
                                          className="flex-1 text-xs bg-indigo-600 text-white px-3 py-2 rounded w-full flex items-center justify-center"
                                        >
                                          {loadingProductId === product.catalog_number ? ( // ✅ match catalog_number
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                          ) : (
                                            "Buy / Sell"
                                          )}
                                        </button>
                                        {/* {localStorage.getItem("access_token") && (
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
                                        )} */}



                                        {/* Sell Button */}
                                        {/* <button
                                      className="flex-1 text-xs border border-indigo-600 text-indigo-600 px-3 py-2 rounded w-full flex items-center justify-center"
                                      onClick={() => handleViewPrices(product.product_url, product)}
                                      disabled={loadingProductId === product.id}
                                    >
                                      {loadingProductId === product.id ? (
                                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        "Sell"
                                      )}
                                    </button> */}

                                      </div>





                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}
                            </Swiper>

                          )}


                          <div className="flex mb-5">
                            {/* <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="fa-solid fa-robot text-indigo-600" />
                  </div> */}
                            <div className="rounded-lg rounded-tl-none p-3 max-w-[93%] mt-5 text-gray-700 select-text whitespace-pre-line mb-6">
                              {(msg.content || "")
                                .split("\n")
                                .map((line, i) => {
                                  const parts = line.split(/\*\*(.+?)\*\*/g); // split bold segments
                                  return (
                                    <p key={i} className="mb-1">
                                      {parts.map((part, j) =>
                                        j % 2 === 1 ? (
                                          <strong key={j}>{part}</strong>
                                        ) : (
                                          <span key={j}>{part}</span>
                                        )
                                      )}
                                    </p>
                                  );
                                })}
                            </div>
                            {/* Price Modal */}
                            {showPriceModal && selectedProduct && (
                              <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">

                                  {/* Header */}
                                  <div className="flex justify-between items-center border-b pb-3">
                                    <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
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
                                      <h3 className="text-xl font-bold mt-4 mb-3 text-gray-800">
                                        {selectedProduct.product_name}
                                      </h3>
                                      <p className='mt-2 mb-2 text-sm bg-gray-100 p-2 rounded-lg'>{selectedProduct.description || 'N/A'}</p>

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
                                        <div className="bg-red-50 rounded p-2">
                                          <div className="text-xs text-purple-800 font-medium">Category</div>
                                          <div className="text-sm font-semibold text-purple-900">
                                            {selectedProduct.category || 'N/A'}
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
                                      {localStorage.getItem("access_token") && (
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
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                        </div>

                      )
                    )}
                    <div ref={chatEndRef} />
                    {/* Loading Spinner */}
                    {isLoading && (
                      <div className="flex">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fa-solid fa-robot text-indigo-600" />
                        </div>
                        <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%] text-gray-700">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div style={{ animationDelay: '0.2s' }} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div style={{ animationDelay: '0.4s' }} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          </div>
                        </div>
                      </div>
                    )}
                    {/* scroll Button */}
                    {showScrollButton && (
                      <button
                        onClick={scrollToBottom}
                        className={`fixed bottom-[7.1rem] left-[54%] z-50 w-[50px] h-[50px]  
              backdrop-blur bg-indigo-700/70 text-white 
                p-3 rounded-full shadow-xl hover:bg-primary transition duration-300`}
                        title="Scroll to bottom"
                      >
                        <i className="fa-solid fa-arrow-down text-[26px] font-semibold" />
                      </button>
                    )}
                  </div>
                  {/* Search Bar */}
                  <div className="pt-1 pl-4 pr-4 pb-8 sticky bottom-[0px] z-10 w-full flex justify-center bg-gray-50">

                    <div className="w-full md:max-w-[996px] flex flex-col gap-3 rounded-full  shadow-lg">

                      {/* Uploaded File Preview (only for documents) */}
                      {file && (
                        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-2 ">
                          <i className="fa-solid fa-file-alt text-indigo-600 text-lg" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                          </div>
                          <button
                            onClick={() => {
                              setFile(null); // 🧹 Remove file preview
                              setIsFileUploaded(false); // 🔁 Reset file upload state

                              // 🧼 Clear upload response and selected option
                              setUploadResponse(null);
                              setSelectedOption(null);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            }}
                            className="text-red-500 text-sm hover:text-red-700"
                            title="Remove"
                          >
                            <i className="fa-solid fa-times" />
                          </button>
                        </div>
                      )}



                      {/* Show options only for document type */}
                      {/* Show options only for document type */}
                      {uploadResponse?.type === 'document' && uploadResponse.options?.length > 0 && (
                        <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm mt-3 relative">

                          {/* ❌ Close button in top-right corner */}
                          <button
                            onClick={() => {
                              setFile(null);              // Remove file
                              setUploadResponse(null);    // Clear options & response
                              setSelectedOption(null);    // Reset selection
                              setIsFileUploaded(false);   // Reset upload status
                            }}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            <i className="fa-solid fa-times" />
                          </button>

                          <p className="text-sm font-medium text-gray-800 mb-3">
                            {uploadResponse.message || "Select an action:"}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {uploadResponse.options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedOption(option)}
                                className={`text-white text-sm px-4 py-1.5 rounded-full transition ${selectedOption === option
                                  ? "bg-indigo-800"
                                  : "bg-indigo-600 hover:bg-indigo-700"
                                  }`}
                              >
                                {option.replace(/_/g, ' ')}
                              </button>
                            ))}
                          </div>

                          {selectedOption && (
                            <div className="mt-3 text-sm text-indigo-700 font-medium border-t pt-3 border-gray-200">
                              Action selected: <strong>{selectedOption.replace(/_/g, ' ')}</strong><br />
                              Please enter a prompt below and press send.
                            </div>
                          )}
                        </div>
                      )}



                      {/* Input + Upload + Send Bar */}
                      {/* Input + Upload + Send Bar */}
                      <div className="flex items-center justify-between gap-2 px-4 py-4 pr-8 text-lg bg-white border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-primary">

                        {/* Text Input */}
                        <input
                          type="text"
                          placeholder="What would you like to do with this?"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();

                              if (uploadResponse?.type === "document" && !selectedOption) {
                                alert("Please select an action for the uploaded document below.");
                              } else {
                                sendMessage();
                              }
                            }
                          }}
                          className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                        />

                        {/* Upload dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="cursor-pointer text-gray-500 hover:text-primary"
                          >
                            <i className="fa-solid fa-circle-plus text-primary text-lg"></i>
                          </button>

                          {/* Dropdown Menu */}
                          {showMenu && (
                            <div className="absolute bottom-8 right-0 bg-primary border border-gray-200 rounded-xl shadow-lg w-40 p-2">
                              <label
                                htmlFor="file-upload"
                                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer "
                              > <i className="fa-regular fa-file-lines text-white" />

                                <span className="text-sm text-white">Upload</span>
                              </label>
                              {/* Download sample File */}
                              <label className='flex items-center gap-2 p-2 rounded-lg cursor-pointer '>

                                <i className="fa-solid fa-download text-white"></i>
                                <a
                                  href="/sample-product.xlsx"
                                  download
                                  className="text-sm text-white"
                                >
                                  Sample File
                                </a>
                              </label>

                            </div>
                          )}
                        </div>

                        {/* Hidden File Input */}
                        <input
                          id="file-upload"
                          type="file"
                          accept=".pdf,.docx,.csv,.xlsx,.txt"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={async (e) => {
                            const selected = e.target.files[0];
                            if (selected) {
                              setFile(selected);
                              setIsFileUploaded(false);
                              setUploadResponse(null);
                              setSelectedOption(null);

                              const res = await handleFileUpload(selected);
                              if (res) {
                                setUploadResponse(res);
                                setIsFileUploaded(true);
                              }
                            }
                          }}
                        />

                        {/* Send icon */}
                        <button
                          onClick={handleSend}
                          className="text-primary hover:text-primary flex items-center justify-center"
                          disabled={isSending}
                        >
                          {isSending ? (
                            <i className="fa-solid fa-spinner fa-spin" />
                          ) : (
                            <i className="fa-solid fa-paper-plane" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}

        </div>

      </div >
      {/* Publications Modal */}
      {
        showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50 top-3">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl h-[90vh] flex flex-col">
              <h2 className="text-lg font-semibold mb-4 text-indigo-700">
                Select Identifiers for {selectedProduct?.product_name}
              </h2>

              {/* Identifier Checkboxes */}
              {/* Identifier Checkboxes */}
              {/* <div className="mb-4 flex flex-wrap gap-3">
                {[
                  { label: "Title", value: selectedProduct?.product_name }
                  // { label: "Catalog Number", value: selectedProduct?.catalog_number },
                  // { label: "CAS No", value: selectedProduct?.cas_number },
                ]
                  .filter(item => Boolean(item.value))
                  .map((item, idx) => {
                    const isChecked = selectedIdentifiers.includes(item.value);
                    const isDisabled = selectedIdentifiers.length > 0 && !isChecked;

                    return (
                      <label
                        key={idx}
                        className="flex items-center gap-2 text-lg text-black font-bold"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            let updated = [];

                            if (checked) {
                              updated = [item.value]; // only one allowed
                            }

                            setSelectedIdentifiers(updated);
                            fetchPublications(updated);
                          }}
                        />
                        {item.label}: <span className="font-normal">{item.value}</span>
                      </label>
                    );
                  })}
              </div> */}
              {/*  Publications */}
              {/* Publications */}
              <div className="overflow-y-auto flex-1 pr-2 border-t pt-4">
                {Array.isArray(publicationData) && publicationData.length > 0 ? (
                  publicationData.map((pub, idx) => (
                    <div key={idx} className="mb-4 border-b pb-3">
                      {/* Title */}
                      <h3 className="font-bold text-gray-800">{pub.Title}</h3>

                      {/* Authors */}
                      {pub.Authors && (
                        <p className="text-sm text-gray-700">{pub.Authors.join(", ")}</p>
                      )}

                      {/* Journal + Date */}
                      <p className="text-xs text-gray-600 italic">
                        {pub.Journal}{" "}
                        {pub.Volume && `Vol. ${pub.Volume}`}{" "}
                        {pub.Pages && `pp. ${pub.Pages}`}{" "}
                        {pub.Date && `(${pub.Date})`}
                      </p>

                      {/* PMID */}
                      {pub.PMID && (
                        <p className="text-xs text-blue-600 mt-1">PMID: {pub.PMID}</p>
                      )}

                      {/* Abstract */}
                      {pub.Abstract && (
                        <p className="text-sm mt-2 text-gray-800">{pub.Abstract}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No related publications found</p>
                )}
              </div>

              <p className='pt-2 text-sm text-gray-400'>Disclaimer: Results may not be 100% accurate.</p>
              {/* Close */}
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 self-end"
              >
                Close
              </button>
            </div>
          </div>
        )
      }
      {/* compare product modal  */}
      {
        showComparePopup && (
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
                      alt={product.product_name}
                      className="w-20 h-20 object-contain border rounded"
                    />
                    <button
                      className="absolute top-0 right-0 -mt-1 -mr-1 text-sm text-white bg-indigo-600 rounded-full w-5 h-5 flex items-center justify-center"
                      onClick={() =>
                        setCompareList((prev) =>
                          prev.filter((p) => p.catalog_number !== product.catalog_number)
                        )
                      }
                    >
                      &times;
                    </button>
                    <p className="text-xs text-center mt-1 w-24 truncate">
                      {product.product_name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 w-1/4 justify-end">
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
                  disabled={compareList.length < 2}
                  onClick={() => {
                    setShowComparisonChart(true);
                  }}
                >
                  Compare
                </button>

                <button
                  className="text-black text-sm"
                  onClick={() => setShowComparePopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      }
      {/* comparison chart */}
      {
        showComparisonChart && (
          <div className="fixed inset-0 top-[60px] z-50 bg-white overflow-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
              <div className="text-lg font-semibold">Comparison Chart</div>
              <button onClick={() => setShowComparisonChart(false)}>
                <i className="fa-solid fa-xmark text-xl" />
              </button>
            </div>

            {/* Comparison Table including product images & details */}
            <div className="mt-8 px-8 overflow-x-auto">
              <table className="w-full text-sm text-center border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 w-1/4 text-left">Product</th>
                    {compareList.map((product, idx) => (
                      <th key={idx} className="p-2">
                        <div className="flex flex-col items-center">
                          <img
                            src={product.image_url || "/placeholder.png"}
                            alt={product.product_name}
                            className="w-28 h-28 object-contain"
                          />
                          <p className="mt-2 text-sm font-medium">{product.product_name}</p>
                          <div className="flex gap-2 mt-2">
                            <button
                              className="text-xs bg-indigo-600 text-white px-3 py-1 rounded"
                              onClick={() => handleViewPrices(product.product_url, product)}
                            >
                              Buy
                            </button>
                            <button
                              className="text-xs border border-indigo-600 text-indigo-600 px-3 py-1 rounded"
                              onClick={() => handleViewPrices(product.product_url, product)}
                            >
                              Sell
                            </button>
                          </div>
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
                        <td key={i} className="p-2">
                          {product[row.key] || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </div >
  );
}



