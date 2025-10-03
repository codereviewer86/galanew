import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ImageUpload from '../components/common/ImageUpload';
import { Modal } from '../components/ui/modal';
import { useModal } from '../hooks/useModal';
import { getImageUrl } from './PartnersManagement';

interface Accreditation {
  id: string;
  image: string;
  alt: {
    en: string;
    ru: string;
  };
}

interface AccreditationsData {
  title: {
    en: string;
    ru: string;
  };
  accreditationsList: Accreditation[];
}

interface Section {
  id: number;
  section: string;
  data: AccreditationsData;
  createdAt: string;
  updatedAt: string;
}

const AccreditationsManagement: React.FC = () => {
  const [accreditationsData, setAccreditationsData] = useState<AccreditationsData>({
    title: { en: 'Our Accreditations', ru: 'Наши аккредитации' },
    accreditationsList: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sectionExists, setSectionExists] = useState(false);
  const [titleSaveTimeout, setTitleSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [editingAccreditation, setEditingAccreditation] = useState<Accreditation | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const [newAccreditation, setNewAccreditation] = useState<Omit<Accreditation, 'id'>>({
    image: '',
    alt: { en: '', ru: '' }
  });

  // Modal hook
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    fetchAccreditationsData();
    
    // Cleanup timeout on component unmount
    return () => {
      if (titleSaveTimeout) {
        clearTimeout(titleSaveTimeout);
      }
    };
  }, []);

  const addMissingIds = (accreditations: Accreditation[]): Accreditation[] => {
    return accreditations.map(accreditation => ({
      ...accreditation,
      id: accreditation.id || (Date.now().toString() + Math.random().toString(36).substr(2, 9))
    }));
  };

  const fetchAccreditationsData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/sections');
      const sections = response.data.data;
      const accreditationsSection = sections.find((section: Section) => section.section === 'our_accreditations');
      
      if (accreditationsSection) {
        let fetchedData = accreditationsSection.data;
        
        // Ensure accreditationsList exists and has IDs
        if (fetchedData.accreditationsList) {
          fetchedData.accreditationsList = addMissingIds(fetchedData.accreditationsList);
        }

        setAccreditationsData(fetchedData);
        setSectionExists(true);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Section doesn't exist, start with default data
        setSectionExists(false);
      } else {
        setError('Failed to fetch accreditations data');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveAccreditationsData = async (dataToSave?: AccreditationsData) => {
    try {
      setLoading(true);
      const requestData = {
        section: 'our_accreditations',
        data: dataToSave || accreditationsData
      };

      let response;
      if (sectionExists) {
        // Update existing section
        const sectionsResponse = await axiosInstance.get('/api/sections');
        const existingSection = sectionsResponse.data.data.find((s: Section) => s.section === 'our_accreditations');
        if (existingSection) {
          response = await axiosInstance.put(`/api/sections/${existingSection.id}`, requestData);
        } else {
          response = await axiosInstance.post('/api/sections', requestData);
        }
      } else {
        // Create new section
        response = await axiosInstance.post('/api/sections', requestData);
      }

      if (response.status === 200 || response.status === 201) {
        setSectionExists(true);
        return true;
      }
      return false;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to save accreditations data';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccreditation = async (index: number) => {
    try {
      setLoading(true);
      const updatedData = { ...accreditationsData };
      updatedData.accreditationsList.splice(index, 1);
      
      // Save to database immediately
      const saved = await saveAccreditationsData(updatedData);
      
      if (saved) {
        setAccreditationsData(updatedData);
        setSuccess('Accreditation deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError('Failed to delete accreditation');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = async (language: 'en' | 'ru', value: string) => {
    const updatedData = { ...accreditationsData };
    updatedData.title[language] = value;
    setAccreditationsData(updatedData);
    
    // Debounce the save operation to avoid too many API calls
    if (titleSaveTimeout) {
      clearTimeout(titleSaveTimeout);
    }
    
    const timeout = setTimeout(async () => {
      try {
        await saveAccreditationsData(updatedData);
        setSuccess(`${language.toUpperCase()} title updated successfully`);
        setTimeout(() => setSuccess(''), 2000);
      } catch (error) {
        setError(`Failed to update ${language.toUpperCase()} title`);
        setTimeout(() => setError(''), 3000);
      }
    }, 1000); // Wait 1 second after user stops typing
    
    setTitleSaveTimeout(timeout);
  };

  const handleEditAccreditation = (index: number) => {
    const accreditation = accreditationsData.accreditationsList[index];
    setEditingAccreditation({ ...accreditation });
    setEditingIndex(index);
    openModal();
  };

  const handleUpdateAccreditation = async () => {
    if (!editingAccreditation?.image || !editingAccreditation?.alt.en || !editingAccreditation?.alt.ru) {
      setError('Please fill all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const updatedData = { ...accreditationsData };
      updatedData.accreditationsList[editingIndex] = { ...editingAccreditation };
      
      // Save to database immediately
      const saved = await saveAccreditationsData(updatedData);
      
      if (saved) {
        setAccreditationsData(updatedData);
        setEditingAccreditation(null);
        setEditingIndex(-1);
        closeModal();
        setSuccess('Accreditation updated successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError('Failed to update accreditation');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccreditation = async () => {
    if (!newAccreditation.image || !newAccreditation.alt.en || !newAccreditation.alt.ru) {
      setError('Please fill all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const updatedData = { ...accreditationsData };
      const accreditationWithId = {
        ...newAccreditation,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      };
      
      updatedData.accreditationsList.push(accreditationWithId);
      
      // Save to database immediately
      const saved = await saveAccreditationsData(updatedData);
      
      if (saved) {
        setAccreditationsData(updatedData);
        setNewAccreditation({ image: '', alt: { en: '', ru: '' } });
        closeModal();
        setSuccess('Accreditation added successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError('Failed to add accreditation');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    closeModal();
    setEditingAccreditation(null);
    setEditingIndex(-1);
    setNewAccreditation({ image: '', alt: { en: '', ru: '' } });
    setError('');
  };

  const handleImageUpload = (url: string) => {
    if (editingAccreditation) {
      setEditingAccreditation({ ...editingAccreditation, image: url });
    } else {
      setNewAccreditation({ ...newAccreditation, image: url });
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Accreditations Management</h2>
          <div className="flex gap-2">
            <button
              onClick={() => openModal()}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
            >
              Add Accreditation
            </button>
          </div>
        </div>
        
        {/* Success/Error Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded">
            {success}
          </div>
        )}

        {/* Title Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Section Title (English)
              {loading && <span className="ml-2 text-xs text-blue-600">Saving...</span>}
            </label>
            <input
              type="text"
              value={accreditationsData.title.en}
              onChange={(e) => handleTitleChange('en', e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Enter English title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Section Title (Russian)
              {loading && <span className="ml-2 text-xs text-blue-600">Saving...</span>}
            </label>
            <input
              type="text"
              value={accreditationsData.title.ru}
              onChange={(e) => handleTitleChange('ru', e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Enter Russian title"
            />
          </div>
        </div>

        {/* Accreditations List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Image Key/URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Alt Text (EN)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Alt Text (RU)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : accreditationsData.accreditationsList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No accreditations found
                  </td>
                </tr>
              ) : (
                accreditationsData.accreditationsList.map((accreditation: Accreditation, index: number) => (
                  <tr key={accreditation.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={getImageUrl(accreditation.image)}
                          alt={accreditation.alt.en}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const imageKey = accreditation.image;
                            
                            // Try different extensions for accreditation logos
                            if (!imageKey.startsWith('http') && !imageKey.startsWith('/')) {
                              if (target.src.endsWith('.svg')) {
                                target.src = `/images/logo/${imageKey}.png`;
                              } else if (target.src.endsWith('.png')) {
                                target.src = `/images/logo/${imageKey}.jpg`;
                              } else {
                                // Final fallback - show placeholder text
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent && !parent.querySelector('.fallback-text')) {
                                  const fallbackDiv = document.createElement('div');
                                  fallbackDiv.className = 'fallback-text text-xs text-gray-500 dark:text-gray-400 text-center p-2';
                                  fallbackDiv.textContent = 'No Image';
                                  parent.appendChild(fallbackDiv);
                                }
                              }
                            } else {
                              // For full URLs, just show fallback
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent && !parent.querySelector('.fallback-text')) {
                                const fallbackDiv = document.createElement('div');
                                fallbackDiv.className = 'fallback-text text-xs text-gray-500 dark:text-gray-400 text-center p-2';
                                fallbackDiv.textContent = 'No Image';
                                parent.appendChild(fallbackDiv);
                              }
                            }
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      <span title={accreditation.image}>
                        {accreditation.image.length > 40 ? `${accreditation.image.substring(0, 40)}...` : accreditation.image}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {accreditation.alt.en}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {accreditation.alt.ru}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditAccreditation(index)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAccreditation(index)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={resetModal}
        className="max-w-md mx-auto p-5"
      >
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            {editingAccreditation ? 'Edit Accreditation' : 'Add New Accreditation'}
          </h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            editingAccreditation ? handleUpdateAccreditation() : handleAddAccreditation();
          }}>
            {editingAccreditation && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Accreditation ID
                </label>
                <input
                  type="text"
                  value={editingAccreditation.id}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  placeholder="Auto-generated ID"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This ID is auto-generated and cannot be changed
                </p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accreditation Image
              </label>
              <ImageUpload
                value={editingAccreditation ? editingAccreditation.image : newAccreditation.image}
                onChange={handleImageUpload}
                required={true}
                options={{
                  quality: 0.9,
                  maxWidth: 800,
                  maxHeight: 600
                }}
                placeholder="Upload accreditation logo"
                showUrlInput={true}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Upload a logo image or enter a URL. SVG or PNG format recommended for logos.
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alt Text (English)
              </label>
              <input
                type="text"
                value={editingAccreditation ? editingAccreditation.alt.en : newAccreditation.alt.en}
                onChange={(e) => {
                  if (editingAccreditation) {
                    setEditingAccreditation({ 
                      ...editingAccreditation, 
                      alt: { ...editingAccreditation.alt, en: e.target.value } 
                    });
                  } else {
                    setNewAccreditation({ 
                      ...newAccreditation, 
                      alt: { ...newAccreditation.alt, en: e.target.value } 
                    });
                  }
                }}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter English alt text for the image"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alt Text (Russian)
              </label>
              <input
                type="text"
                value={editingAccreditation ? editingAccreditation.alt.ru : newAccreditation.alt.ru}
                onChange={(e) => {
                  if (editingAccreditation) {
                    setEditingAccreditation({ 
                      ...editingAccreditation, 
                      alt: { ...editingAccreditation.alt, ru: e.target.value } 
                    });
                  } else {
                    setNewAccreditation({ 
                      ...newAccreditation, 
                      alt: { ...newAccreditation.alt, ru: e.target.value } 
                    });
                  }
                }}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter Russian alt text for the image"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading 
                  ? (editingAccreditation ? 'Updating...' : 'Adding...') 
                  : (editingAccreditation ? 'Update Accreditation' : 'Add Accreditation')
                }
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AccreditationsManagement;
