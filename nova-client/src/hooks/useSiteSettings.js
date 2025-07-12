import SiteSettingsContext from "../contexts/SiteSettingsContext";
import { useContext } from "react";

const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within SiteSettingsProvider");
  }
  return context;
};

export default useSiteSettings;
