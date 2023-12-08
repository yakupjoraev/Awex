<<<<<<< HEAD
import React, { createContext } from "react"
import { siteContext, siteContextValue } from "./siteSlice"
import config from "../config.json"

export const AppContext = createContext({
  site: siteContext,
  // config,
})

export const AppProvider = ({ children }) => {
  const contextValue = {
    site: siteContextValue(),
    config,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
=======
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
>>>>>>> 741e678a4a13aa4a0d67692a463159962cb77a8a
