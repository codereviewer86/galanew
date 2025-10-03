import React, { createContext, useContext, ReactNode } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';

interface AuthContextType {
  admin: any;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const adminAuth = useAdminAuth();
  
  const value: AuthContextType = {
    ...adminAuth,
    isAuthenticated: !!adminAuth.admin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
