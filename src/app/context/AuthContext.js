'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const intervalRef = useRef(null);
  const isRefreshingRef = useRef(false); // for race condition
  const [profile, setProfile] = useState(null);

  // Refresh Access Token
  const refreshAccessToken = async () => {
    if (isRefreshingRef.current) return false; // Prevent race conditions
    isRefreshingRef.current = true;

    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
      console.warn('No refresh token found.');
      isRefreshingRef.current = false;
      return false;
    }

    try {
      const res = await fetch(`http://65.2.4.179:8000/api/v1/user/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token }),
      });

      if (res.ok) {
        const result = await res.json();
        localStorage.setItem('access_token', result.access_token);
        console.log('Access token refreshed successfully.');
        isRefreshingRef.current = false;
        return true;
      } else {
        console.warn('Refresh token expired or invalid. Logging out...');
        localStorage.clear();
        setProfile(null);
        isRefreshingRef.current = false;
        return false;
      }
    } catch (err) {
      console.error('Failed to refresh token:', err);
      isRefreshingRef.current = false;
      return false;
    }
  };

  // Secure Profile Fetcher
  const fetchSecureProfile = async (tokenParam) => {
    const token = tokenParam || localStorage.getItem('access_token');
    if (!token) return;

    try {
      const res = await fetch('http://65.2.4.179:8000/api/v1/user/secure-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (res.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const newToken = localStorage.getItem('access_token');
          return fetchSecureProfile(newToken);
        }
      } else if (res.ok) {
        const profileData = await res.json();
        setProfile(profileData);

        console.log('Secure Profile:', profileData);
      }
    } catch (err) {
      console.error('Secure profile fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchSecureProfile();

    // Refresh token ~every 95 minutes (1.58 hours)
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        refreshAccessToken();
      }, 5700000); // 95 minutes
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





