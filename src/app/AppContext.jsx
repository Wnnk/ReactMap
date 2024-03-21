"use client"
import React, { createContext, useMemo, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
  const [state, setState] = useState({ displayNavigation:true });
  const contextValue = useMemo(() =>{
    return {
      state,
      setState  
    };
  },[state,setState]);
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return React.useContext(AppContext);
}