import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface Admin {
  id: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  data: Admin;
  message: string;
}

interface UseAdminAuth {
  admin: Admin | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAdminAuth = (): UseAdminAuth => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<LoginResponse>('/api/admin/login', {
        email,
        password,
      });

      if (response.data && response.data.data) {
        setAdmin(response.data.data);
        // Store admin info in localStorage for persistence
        localStorage.setItem('admin', JSON.stringify(response.data.data));
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      await axiosInstance.post('/api/admin/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAdmin(null);
      localStorage.removeItem('admin');
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Check for existing admin session on hook initialization
  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (err) {
        localStorage.removeItem('admin');
      }
    }
  }, []);

  return {
    admin,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };
};
