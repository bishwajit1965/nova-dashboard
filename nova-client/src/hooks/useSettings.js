import SettingsContext from "../settingsContext/SettingsContext";
import { useContext } from "react";

export const useSettings = () => useContext(SettingsContext);
