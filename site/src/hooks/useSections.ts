import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface Section {
  id: number;
  section: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

export const useSection = (sectionName: string) => {
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSection = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axiosInstance.get<ApiResponse<Section>>(`/api/sections/name/${sectionName}`);
        setSection(response.data.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setSection(null);
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to fetch section');
          setSection(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (sectionName) {
      fetchSection();
    }
  }, [sectionName]);

  return { section, loading, error };
};

export const useSections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axiosInstance.get<ApiResponse<Section[]>>('/api/sections');
        setSections(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch sections');
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.get<ApiResponse<Section[]>>('/api/sections');
      setSections(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch sections');
    } finally {
      setLoading(false);
    }
  };

  return { sections, loading, error, refetch };
};
