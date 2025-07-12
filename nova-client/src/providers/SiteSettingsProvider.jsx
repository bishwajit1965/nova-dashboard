import { useEffect, useState } from "react";

import SiteSettingsContext from "../contexts/SiteSettingsContext";
import api from "../lib/api";

const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await api.get("/settings/public");
        setSettings(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const siteSettingsInfo = {
    settings,
    loading,
    error,
  };

  return (
    <SiteSettingsContext.Provider value={siteSettingsInfo}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export default SiteSettingsProvider;
