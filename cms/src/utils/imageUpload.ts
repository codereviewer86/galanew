import { useState } from 'react';
import axiosInstance from './axiosInstance';

export interface UploadImageOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: 'jpeg' | 'webp' | 'png';
}

export interface UploadImageResult {
  success: boolean;
  url?: string;
  filename?: string;
  message?: string;
}

/**
 * Uploads an image file to the server
 * @param file - The image file to upload
 * @param options - Optional compression options
 * @returns Promise with upload result
 */
export const uploadImage = async (
  file: File,
  options?: UploadImageOptions
): Promise<string> => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed');
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 10MB');
  }

  try {
    const formData = new FormData();
    formData.append('image', file);

    // Add query parameters for compression options
    const queryParams = new URLSearchParams();
    if (options?.quality) queryParams.append('quality', options.quality.toString());
    if (options?.maxWidth) queryParams.append('maxWidth', options.maxWidth.toString());
    if (options?.maxHeight) queryParams.append('maxHeight', options.maxHeight.toString());
    if (options?.format) queryParams.append('format', options.format);

    const url = `/api/upload/image${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      return response.data.url;
    } else {
      throw new Error(response.data.message || 'Upload failed');
    }
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    } else if (err.message) {
      throw new Error(err.message);
    } else {
      throw new Error('Image upload failed');
    }
  }
};

/**
 * Hook for managing image upload state
 */
export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setError(null);
  };

  const upload = async (options?: UploadImageOptions): Promise<string | null> => {
    if (!selectedFile) return null;

    setUploading(true);
    setError(null);

    try {
      const url = await uploadImage(selectedFile, options);
      return url;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setError(null);
    setUploading(false);
  };

  return {
    selectedFile,
    uploading,
    error,
    handleFileChange,
    upload,
    reset,
  };
};
