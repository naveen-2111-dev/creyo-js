"use client"

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({children}){
    let [state,setState] = useState("Name will come");

    const Exporters = {
        state,
        setState
    }

    return (
        <AppContext.Provider value={Exporters}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext);
}