import React, { createContext } from "react";
import { siteContext, siteContextValue } from "./siteSlice";
import config from "../config.json";

export const AppContext = createContext({
  site: siteContext,
  config,
});

export const AppProvider = ({ children }) => {
  const contextValue = {
    site: siteContextValue(),
    config,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
