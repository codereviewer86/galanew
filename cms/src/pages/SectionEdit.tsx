import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../utils/axiosInstance';

interface Section {
  id: number;
  section: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

interface SectionFormData {
  section: string;
  data: string; // JSON string for form input
}

const SectionEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id && id !== 'new');

  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState<SectionFormData>({
    section: '',
    data: '',
  });
  const [dynamicJsonData, setDynamicJsonData] = useState<any>({});
  const [isFormMode, setIsFormMode] = useState(true); // Default to form mode for dynamic data
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ru'>('en');

  useEffect(() => {
    if (isEditMode) {
      fetchSection();
    } else {
      // Initialize for new section
      setFormData({ section: '', data: '{}' });
      setDynamicJsonData({});
      setIsFormMode(false); // Start with JSON mode for new sections
      setSelectedLanguage('en');
    }
  }, [id, isEditMode]);

  // Helper functions for dynamic JSON handling
  const parseJsonSafely = (jsonString: string): any => {
    try {
      return JSON.parse(jsonString || '{}');
    } catch {
      return {};
    }
  };

  const stringifyJson = (data: any): string => {
    return JSON.stringify(data, null, 2);
  };

  // Dynamic form field generation based on JSON structure
  const renderDynamicField = (
    key: string,
    value: any,
    path: string = '',
    level: number = 0
  ): React.ReactElement => {
    const fullPath = path ? `${path}.${key}` : key;

    if (value === null || value === undefined) {
      return (
        <div
          key={fullPath}
          className="mb-3"
          style={{ marginLeft: `${level * 20}px` }}
        >
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {key}
          </label>
          <input
            type="text"
            value=""
            onChange={(e) => updateDynamicValue(fullPath, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder={`Enter ${key}`}
          />
        </div>
      );
    }

    if (typeof value === 'string') {
      return (
        <div
          key={fullPath}
          className="mb-3"
          style={{ marginLeft: `${level * 20}px` }}
        >
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {key}
          </label>
          {value.length > 100 ? (
            <textarea
              value={value}
              onChange={(e) => updateDynamicValue(fullPath, e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder={`Enter ${key}`}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => updateDynamicValue(fullPath, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder={`Enter ${key}`}
            />
          )}
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div
          key={fullPath}
          className="mb-3"
          style={{ marginLeft: `${level * 20}px` }}
        >
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {key}
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) =>
              updateDynamicValue(fullPath, parseFloat(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder={`Enter ${key}`}
          />
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div
          key={fullPath}
          className="mb-3"
          style={{ marginLeft: `${level * 20}px` }}
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => updateDynamicValue(fullPath, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">{key}</label>
          </div>
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div
          key={fullPath}
          className="mb-4"
          style={{ marginLeft: `${level * 20}px` }}
        >
          <label className="block text-sm font-medium text-gray-600 mb-2">
            {key} (Array)
          </label>
          <div className="border border-gray-200 rounded p-3">
            {value.map((item, index) => (
              <div
                key={`${fullPath}[${index}]`}
                className="mb-3 pb-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">
                    Item {index + 1}
                  </span>
                </div>
                {typeof item === 'object' && item !== null ? (
                  Object.entries(item).map(([itemKey, itemValue]) =>
                    renderDynamicField(
                      itemKey,
                      itemValue,
                      `${fullPath}[${index}]`,
                      level + 1
                    )
                  )
                ) : (
                  <input
                    type="text"
                    value={String(item)}
                    onChange={(e) =>
                      updateDynamicArrayValue(fullPath, index, e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder={`Item ${index + 1}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div
          key={fullPath}
          className="mb-4"
          style={{ marginLeft: `${level * 20}px` }}
        >
          <label className="block text-sm font-medium text-gray-600 mb-2">
            {key}
          </label>
          <div className="border border-gray-200 rounded p-3">
            {Object.entries(value).map(([subKey, subValue]) =>
              renderDynamicField(subKey, subValue, fullPath, level + 1)
            )}
          </div>
        </div>
      );
    }

    return <div key={fullPath}></div>;
  };

  // Update dynamic values using dot notation path
  const updateDynamicValue = (path: string, value: any) => {
    setDynamicJsonData((prev: any) => {
      const newData = { ...prev };

      // Check if we're working with multilingual data structure
      const hasMultilingualStructure = newData.en || newData.ru;

      if (hasMultilingualStructure) {
        // Ensure the selected language object exists
        if (!newData[selectedLanguage]) {
          newData[selectedLanguage] = {};
        }

        const keys = path.split('.');
        let current = newData[selectedLanguage];

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);

          if (arrayMatch) {
            const [, arrayKey, index] = arrayMatch;
            if (!current[arrayKey]) current[arrayKey] = [];
            if (!current[arrayKey][parseInt(index)])
              current[arrayKey][parseInt(index)] = {};
            current = current[arrayKey][parseInt(index)];
          } else {
            if (!current[key]) current[key] = {};
            current = current[key];
          }
        }

        const lastKey = keys[keys.length - 1];
        const arrayMatch = lastKey.match(/^(.+)\[(\d+)\]$/);

        if (arrayMatch) {
          const [, arrayKey, index] = arrayMatch;
          if (!current[arrayKey]) current[arrayKey] = [];
          current[arrayKey][parseInt(index)] = value;
        } else {
          current[lastKey] = value;
        }
      } else {
        // Original logic for non-multilingual data
        const keys = path.split('.');
        let current = newData;

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);

          if (arrayMatch) {
            const [, arrayKey, index] = arrayMatch;
            if (!current[arrayKey]) current[arrayKey] = [];
            if (!current[arrayKey][parseInt(index)])
              current[arrayKey][parseInt(index)] = {};
            current = current[arrayKey][parseInt(index)];
          } else {
            if (!current[key]) current[key] = {};
            current = current[key];
          }
        }

        const lastKey = keys[keys.length - 1];
        const arrayMatch = lastKey.match(/^(.+)\[(\d+)\]$/);

        if (arrayMatch) {
          const [, arrayKey, index] = arrayMatch;
          if (!current[arrayKey]) current[arrayKey] = [];
          current[arrayKey][parseInt(index)] = value;
        } else {
          current[lastKey] = value;
        }
      }

      return newData;
    });
  };

  // Update array values
  const updateDynamicArrayValue = (path: string, index: number, value: any) => {
    setDynamicJsonData((prev: any) => {
      const newData = { ...prev };

      // Check if we're working with multilingual data structure
      const hasMultilingualStructure = newData.en || newData.ru;

      if (hasMultilingualStructure) {
        // Ensure the selected language object exists
        if (!newData[selectedLanguage]) {
          newData[selectedLanguage] = {};
        }

        const keys = path.split('.');
        let current = newData[selectedLanguage];

        for (const key of keys) {
          if (!current[key]) current[key] = [];
          current = current[key];
        }

        if (Array.isArray(current)) {
          current[index] = value;
        }
      } else {
        // Original logic for non-multilingual data
        const keys = path.split('.');
        let current = newData;

        for (const key of keys) {
          if (!current[key]) current[key] = [];
          current = current[key];
        }

        if (Array.isArray(current)) {
          current[index] = value;
        }
      }

      return newData;
    });
  };

  // Sync data when switching modes or language
  useEffect(() => {
    if (isFormMode) {
      // Only update formData when switching TO form mode, not when dynamicJsonData changes
      setFormData((prev) => ({
        ...prev,
        data: stringifyJson(dynamicJsonData),
      }));
    } else {
      // Only parse JSON when switching TO JSON mode
      const parsed = parseJsonSafely(formData.data);
      setDynamicJsonData(parsed);
    }
  }, [isFormMode]); // Remove dynamicJsonData from dependencies

  // Add a separate effect to handle language changes
  useEffect(() => {
    if (isFormMode) {
      // When language changes in form mode, update the form data
      setFormData((prev) => ({
        ...prev,
        data: stringifyJson(dynamicJsonData),
      }));
    }
  }, [selectedLanguage]); // Only when language changes

  // Helper function to get language-specific data
  const getLanguageData = (data: any, language: string) => {
    if (data && typeof data === 'object' && data[language]) {
      return data[language];
    }
    return data;
  };

  const fetchSection = async () => {
    if (!id || id === 'new') return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/sections/${id}`);
      if (response.status === 200) {
        const sectionData = response.data.data;
        setSection(sectionData);
        const jsonData = JSON.stringify(sectionData.data, null, 2);
        setFormData({
          section: sectionData.section,
          data: jsonData,
        });
        setDynamicJsonData(sectionData.data);
        setIsFormMode(true); // Start with form mode
        setSelectedLanguage('en');
      } else {
        setErrors(['Failed to fetch section']);
      }
    } catch (error) {
      setErrors(['Error fetching section']);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage('');
    setSubmitting(true);

    if (!formData.section.trim()) {
      setErrors(['Section name is required']);
      setSubmitting(false);
      return;
    }

    let parsedData = {};

    // Use dynamic data if in form mode, otherwise parse JSON
    if (isFormMode) {
      parsedData = dynamicJsonData;
    } else {
      if (formData.data.trim()) {
        try {
          parsedData = JSON.parse(formData.data);
        } catch (e) {
          setErrors(['Invalid JSON format in data field']);
          setSubmitting(false);
          return;
        }
      }
    }

    try {
      const requestData = {
        section: formData.section,
        data: parsedData,
      };

      let response;
      if (isEditMode && id) {
        response = await axiosInstance.put(`/api/sections/${id}`, requestData);
      } else {
        response = await axiosInstance.post('/api/sections', requestData);
      }

      if (response.status === 200 || response.status === 201) {
        // Show success message
        const message = isEditMode 
          ? 'Section updated successfully!' 
          : 'Section created successfully!';
        setSuccessMessage(message);
        
        // Scroll to top to show the success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Navigate after a short delay to show the success message
        setTimeout(() => {
          setSuccessMessage('')
        }, 2000);
      } else {
        setErrors([response.data.message || 'Operation failed']);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Error processing request';
      setErrors([errorMessage]);
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/sections');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Section' : 'Create Section'}
            </h2>
            {isEditMode && section && (
              <p className="text-gray-600 mt-1">
                Last updated: {new Date(section.updatedAt).toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex space-x-2 items-center">
            <select
              value={selectedLanguage}
              onChange={(e) =>
                setSelectedLanguage(e.target.value as 'en' | 'ru')
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English (EN)</option>
              <option value="ru">Russian (RU)</option>
            </select>
            {/* <button
              type="button"
              onClick={() => setIsFormMode(!isFormMode)}
              className={`px-4 py-2 rounded-md ${
                isFormMode
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {isFormMode ? 'Form Mode' : 'JSON Mode'}
            </button> */}
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            {errors.map((error, index) => (
              <p key={index} className="text-red-700">
                {error}
              </p>
            ))}
          </div>
        )}

        {successMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-1000000 p-4 bg-green-50 border border-green-200 rounded-md shadow-lg">
            <p className="text-green-700 font-medium">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Name
            </label>
            <input
              type="text"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter section name"
              required
            />
          </div> */}

          {isFormMode ? (
            // Dynamic Form Fields for Selected Language
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Dynamic Form - {selectedLanguage.toUpperCase()}
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                {(() => {
                  const languageData = getLanguageData(
                    dynamicJsonData,
                    selectedLanguage
                  );
                  return Object.keys(languageData || {}).length > 0 ? (
                    Object.entries(languageData).map(([key, value]) =>
                      renderDynamicField(key, value, '', 0)
                    )
                  ) : (
                    <p className="text-gray-500">
                      No data available for {selectedLanguage.toUpperCase()}.
                      Switch to JSON mode to add data, then switch back to form
                      mode for easier editing.
                    </p>
                  );
                })()}
              </div>
            </div>
          ) : (
            // JSON Mode
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data (JSON)
              </label>
              <textarea
                value={formData.data}
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
                rows={25}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder={`Enter JSON data. For multilingual content, use structure like:
{
  "en": {
    "title": "English Title",
    "description": "English Description"
  },
  "ru": {
    "title": "Russian Title", 
    "description": "Russian Description"
  }
}`}
              />
              <p className="text-sm text-gray-500 mt-2">
                Tip: For multilingual content, use "en" and "ru" keys. Switch to
                Form Mode after entering JSON for easier editing per language.
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {submitting && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>
                {submitting 
                  ? (isEditMode ? 'Updating...' : 'Creating...') 
                  : (isEditMode ? 'Update Section' : 'Create Section')
                }
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionEdit;
