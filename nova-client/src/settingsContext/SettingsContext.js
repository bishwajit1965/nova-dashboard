import { createContext } from "react";

const SettingsContext = createContext({
  settings: null,
  loading: true,
  error: null,
});

export default SettingsContext;
