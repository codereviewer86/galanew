import React, { useEffect } from 'react';
import { useImageUpload, UploadImageOptions } from '../../utils/imageUpload';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onFileSelect?: (file: File | null) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
  onError?: (error: string) => void;
  options?: UploadImageOptions;
  required?: boolean;
  className?: string;
  previewClassName?: string;
  label?: string;
  placeholder?: string;
  showUrlInput?: boolean;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value = '',
  onChange,
  onFileSelect,
  onUploadStart,
  onUploadEnd,
  onError,
  options,
  required = false,
  className = '',
  previewClassName = 'w-24 h-24',
  label = 'Image',
  placeholder = 'Enter image URL (optional)',
  showUrlInput = true,
  disabled = false,
}) => {
  const {
    selectedFile,
    uploading,
    error,
    handleFileChange,
    upload,
    reset,
  } = useImageUpload();

  // Notify parent about file selection
  useEffect(() => {
    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  }, [selectedFile, onFileSelect]);

  // Notify parent about upload state changes
  useEffect(() => {
    if (uploading && onUploadStart) {
      onUploadStart();
    } else if (!uploading && onUploadEnd) {
      onUploadEnd();
    }
  }, [uploading, onUploadStart, onUploadEnd]);

  // Notify parent about errors
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInternalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
  };

  const uploadAndSetUrl = async () => {
    try {
      const url = await upload(options);
      if (url) {
        onChange(url);
        reset();
      }
    } catch (err) {
      // Error is already handled by the hook and notified via onError
    }
  };

  // Auto-upload when file is selected
  useEffect(() => {
    if (selectedFile && !uploading) {
      uploadAndSetUrl();
    }
  }, [selectedFile]);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(URL.createObjectURL(selectedFile));
      }
    };
  }, [selectedFile]);

  const previewSrc = selectedFile ? URL.createObjectURL(selectedFile) : value;

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* File Upload Input */}
      <input
        type="file"
        onChange={handleInternalFileChange}
        accept="image/*"
        disabled={disabled || uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      
      {/* URL Input as backup */}
      {showUrlInput && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Or enter image URL directly</label>
          <input
            type="text"
            value={value}
            onChange={handleUrlChange}
            placeholder={placeholder}
            disabled={disabled || uploading}
            required={required && !selectedFile}
            className="w-full border px-3 py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Image Preview */}
      {previewSrc && (
        <div className="mt-3">
          <img 
            src={previewSrc}
            alt="Preview" 
            className={`object-cover rounded border border-gray-300 ${previewClassName}`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {selectedFile && (
            <div className="mt-1">
              <small className="text-gray-500">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </small>
            </div>
          )}
          {uploading && (
            <div className="mt-2">
              <small className="text-blue-600 flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading image...
              </small>
            </div>
          )}
          {error && (
            <div className="mt-2">
              <small className="text-red-600">{error}</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
