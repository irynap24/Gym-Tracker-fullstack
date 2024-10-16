// import React, { createContext, useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase"; // Ensure this is your correct Firebase import path

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null); // To store user ID

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//         setUserId(user.uid); // Assuming you want to save the user's ID
//       } else {
//         setIsLoggedIn(false);
//         setUserId(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserContext.Provider value={{ isLoggedIn, userId }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // Ensure this is your correct Firebase import path

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // To store user ID

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid); // Assuming you want to save the user's ID
      } else {
        setIsLoggedIn(false);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
