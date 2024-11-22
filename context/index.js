"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  let [state, setState] = useState("Name will come");

  const Signup = async ({ Firstname, Lastname, Email, Password, Country }) => {
    try {
      const UserObj = {
        Firstname,
        Lastname,
        Email,
        Password,
        Country,
      };
      const response = await fetch("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserObj,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add users");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      throw new Error("error in adding user"+error);
    }
  };

  const Exporters = {
    state,
    setState,
    Signup
  };

  return (
    <AppContext.Provider value={Exporters}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
