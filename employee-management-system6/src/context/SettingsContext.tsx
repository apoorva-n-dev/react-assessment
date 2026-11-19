import {
  createContext,
  useState,
} from "react";

import type { ReactNode } from "react";

export type Theme = "light" | "dark";
export type ViewMode = "card" | "table";

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;

  selectedDepartment: string;
  setSelectedDepartment: (department: string) => void;

  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const SettingsContext =
  createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({
  children,
}: SettingsProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const [selectedDepartment, setSelectedDepartment] =
    useState("All");

  const [viewMode, setViewMode] =
    useState<ViewMode>("card");

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        selectedDepartment,
        setSelectedDepartment,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}