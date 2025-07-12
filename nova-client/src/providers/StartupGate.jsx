import SplashScreen from "../components/ui/SplashScreen";
import { useAuth } from "../hooks/useAuth";
import { useSettings } from "../hooks/useSettings";

const StartupGate = ({ children }) => {
  const { loading: authLoading } = useAuth();
  const { loading: settingsLoading } = useSettings();
  if (authLoading || settingsLoading) return <SplashScreen />;
  return children;
};

export default StartupGate;
