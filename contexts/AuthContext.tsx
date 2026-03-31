import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface AuthContextType {
  user: any | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Read auth state from Redux store
  const user = useSelector((state: RootState) => state.user?.user);
  const accessToken = useSelector((state: RootState) => state.user?.accessToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to allow Redux rehydration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const isAuthenticated = !!accessToken;

  const value: AuthContextType = {
    user,
    accessToken,
    isLoading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
