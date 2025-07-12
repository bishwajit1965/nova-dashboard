import API_PATHS from "../common/apiPaths/apiPaths";
import SettingsContext from "./SettingsContext";
import { useApiQuery } from "../common/hooks/useApiQuery";

const SettingsProvider = ({ children }) => {
  const {
    data: settings,
    isLoading,
    isError,
    error,
  } = useApiQuery({
    url: API_PATHS.SETTINGS.ENDPOINT, // Replace with actual endpoint
    queryKey: API_PATHS.SETTINGS.KEY, // Replace with actual query key
    options: {
      staleTime: 60 * 1000, // Optional
    },
  });

  const value = {
    settings,
    loading: isLoading,
    error: isError ? error : null,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
