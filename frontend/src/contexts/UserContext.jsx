// contexts/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};
