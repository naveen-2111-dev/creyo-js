"use client"
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Create a Context for the user data
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("accessToken");
      if (token) {
        const decoded = jwtDecode(token);
        setMail(decoded.email);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      if (isLoggedIn && mail) {
        try {
          const res = await fetch("/api/welcome", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: mail }),
          });
          const data = await res.json();
          setName(data.data.name);
          setRole(data.data.role);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, [isLoggedIn, mail]);

  return (
    <UserContext.Provider value={{ isLoggedIn, name, role }}>
      {children}
    </UserContext.Provider>
  );
};
