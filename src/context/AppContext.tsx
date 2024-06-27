import React, { createContext, ReactNode, useState, useContext } from "react";

interface User {
  name: string;
  email: string;
  token: string;
}

interface AppContextInterface {
  user: User[] | null;
  setUser: (user: User[] | null) => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User[] | null>(null);
  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextInterface => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
