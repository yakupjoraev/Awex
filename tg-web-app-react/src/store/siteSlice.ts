import { useState } from "react";

export const siteContext = {
  token: "",
  setToken: (token: string) => {},
  settings: {},
  setSettings: () => {},
};

export const siteContextValue = () => {
  const [token, setToken] = useState<string>();
  const [settings, setSettings] = useState<{}>();

  return {
    token,
    setToken,
    settings,
    setSettings,
  };
};
