import React, { useState, useEffect } from 'react';
import axiosInstance, { VITE_API_BASE_URL } from '../utils/axiosInstance';
import ImageUpload from '../components/common/ImageUpload';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';
import { Modal } from '../components/ui/modal';
import { useModal } from '../hooks/useModal';

// Helper function to get image URL
export const getImageUrl = (imageKey: string): string => {
  // If it's already a full URL (uploaded file or external), return as is
  if (imageKey.startsWith('http://') || imageKey.startsWith('https://')) {
    return imageKey;
  }

  if(imageKey.startsWith('/uploads/')) return VITE_API_BASE_URL + imageKey;

  // If it's a relative path starting with /, return as is
  if (imageKey.startsWith('/')) {
    return imageKey;
  }
  
  // For partner images (op1, op2, etc.), try common image extensions
  // First try .svg (most common for logos), then .png, then .jpg
  return `/images/logo/${imageKey}.svg`;
};

interface Partner {
  id: string;
  image: string;
  alt: {
    en: string;
    ru: string;
  };
}

interface PartnersData {
  title: {
    en: string;
    ru: string;
  };
  partnersList: Partner[];
}

interface Section {
  id: number;
  section: string;
  data: PartnersData;
  createdAt: string;
  updatedAt: string;
}

const PartnersManagement: React.FC = () => {
  const [partnersData, setPartnersData] = useState<PartnersData>({
    title: { en: 'Our Partners', ru: 'Наши партнеры' },
    partnersList: []
  });
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [newPartner, setNewPartner] = useState<Partner>({ 
    id: '', 
    image: '', 
    alt: { en: '', ru: '' } 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [sectionExists, setSectionExists] = useState(false);
  const [titleSaveTimeout, setTitleSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [deletePartnerIndex, setDeletePartnerIndex] = useState<number>(-1);

  // Modal hooks
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isAddEditOpen, openModal: openAddEditModal, closeModal: closeAddEditModal } = useModal();

  useEffect(() => {
    fetchPartnersData();
    
    // Cleanup timeout on unmount
    return () => {
      if (titleSaveTimeout) {
        clearTimeout(titleSaveTimeout);
      }
    };
  }, []);

  const fetchPartnersData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/sections/name/our_partners');
      if (response.data && response.data.data) {
        let fetchedData = response.data.data.data;
        
        // Convert old format to new format if needed and add IDs to partners that don't have them
        if (fetchedData.en && fetchedData.ru) {
          // Old format - convert to new format
          const convertedData: PartnersData = {
            title: {
              en: fetchedData.en.title || 'Our Partners',
              ru: fetchedData.ru.title || 'Наши партнеры'
            },
            partnersList: fetchedData.en.partnersList?.map((partner: any, index: number) => ({
              id: partner.id || `partner_${Date.now()}_${index}`,
              image: partner.image,
              alt: {
                en: partner.alt || '',
                ru: fetchedData.ru.partnersList?.[index]?.alt || ''
              }
            })) || []
          };
          setPartnersData(convertedData);
        } else {
          // New format - just add missing IDs
          const addMissingIds = (partners: any[]) => {
            return partners.map((partner, index) => ({
              ...partner,
              id: partner.id || `partner_${Date.now()}_${index}`,
              alt: typeof partner.alt === 'string' ? { en: partner.alt, ru: partner.alt } : partner.alt
            }));
          };

          if (fetchedData.partnersList) {
            fetchedData.partnersList = addMissingIds(fetchedData.partnersList);
          }

          setPartnersData(fetchedData);
        }
        setSectionExists(true);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Section doesn't exist, start with default data
        setSectionExists(false);
      } else {
        setError('Failed to fetch partners data');
      }
    } finally {
      setLoading(false);
    }
  };

  const savePartnersData = async (dataToSave?: PartnersData) => {
    try {
      setLoading(true);
      const requestData = {
        section: 'our_partners',
        data: dataToSave || partnersData
      };

      let response;
      if (sectionExists) {
        // Update existing section
        const sectionsResponse = await axiosInstance.get('/api/sections');
        const existingSection = sectionsResponse.data.data.find((s: Section) => s.section === 'our_partners');
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
      const errorMessage = error.response?.data?.message || 'Failed to save partners data';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAddPartner = async () => {
    if (!newPartner.image || !newPartner.alt.en || !newPartner.alt.ru) {
      setError('Please fill all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const updatedData = { ...partnersData };
      const partnerWithId = {
        ...newPartner,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      };
      updatedData.partnersList.push(partnerWithId);
      
      // Save to database immediately
      await savePartnersData(updatedData);
      
      setPartnersData(updatedData);
      setNewPartner({ id: '', image: '', alt: { en: '', ru: '' } });
      closeAddEditModal();
      setError('');
      setSuccess('Partner added successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to add partner');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPartner = (index: number) => {
    const partner = partnersData.partnersList[index];
    setEditingPartner({ ...partner });
    setEditingIndex(index);
    openAddEditModal();
  };

  const handleUpdatePartner = async () => {
    if (!editingPartner?.image || !editingPartner?.alt.en || !editingPartner?.alt.ru) {
      setError('Please fill all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const updatedData = { ...partnersData };
      updatedData.partnersList[editingIndex] = { ...editingPartner };
      
      // Save to database immediately
      const saved = await savePartnersData(updatedData);
      
      if (saved) {
        setPartnersData(updatedData);
        setEditingPartner(null);
        setEditingIndex(-1);
        closeAddEditModal();
        setError('');
        setSuccess('Partner updated successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError('Failed to update partner');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePartner = (index: number) => {
    setDeletePartnerIndex(index);
    openDeleteModal();
  };

  const confirmDeletePartner = async () => {
    if (deletePartnerIndex === -1) return;

    try {
      setLoading(true);
      const updatedData = { ...partnersData };
      updatedData.partnersList.splice(deletePartnerIndex, 1);
      
      // Save to database immediately
      const saved = await savePartnersData(updatedData);
      
      if (saved) {
        setPartnersData(updatedData);
        setSuccess('Partner deleted successfully!');
        closeDeleteModal();
        setDeletePartnerIndex(-1);
      }
    } catch (error) {
      setError('Failed to delete partner');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = async (language: 'en' | 'ru', value: string) => {
    const updatedData = { ...partnersData };
    updatedData.title[language] = value;
    setPartnersData(updatedData);
    
    // Debounce the save operation to avoid too many API calls
    if (titleSaveTimeout) {
      clearTimeout(titleSaveTimeout);
    }
    
    const timeout = setTimeout(async () => {
      try {
        await savePartnersData(updatedData);
        setSuccess(`${language.toUpperCase()} title updated successfully`);
        setTimeout(() => setSuccess(''), 2000);
      } catch (error) {
        setError(`Failed to update ${language.toUpperCase()} title`);
        setTimeout(() => setError(''), 3000);
      }
    }, 1000); // Wait 1 second after user stops typing
    
    setTitleSaveTimeout(timeout);
  };

  const resetModal = () => {
    closeAddEditModal();
    setEditingPartner(null);
    setEditingIndex(-1);
    setNewPartner({ id: '', image: '', alt: { en: '', ru: '' } });
    setError('');
  };

  const handleImageUpload = (url: string) => {
    if (editingPartner) {
      setEditingPartner({ ...editingPartner, image: url });
    } else {
      setNewPartner({ ...newPartner, image: url });
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Partners Management</h2>
          <div className="flex gap-2">
            <button
              onClick={() => openAddEditModal()}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
            >
              Add Partner
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title (English)
              {loading && <span className="ml-2 text-xs text-blue-600">Saving...</span>}
            </label>
            <input
              type="text"
              value={partnersData.title.en}
              onChange={(e) => handleTitleChange('en', e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter English title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title (Russian)
              {loading && <span className="ml-2 text-xs text-blue-600">Saving...</span>}
            </label>
            <input
              type="text"
              value={partnersData.title.ru}
              onChange={(e) => handleTitleChange('ru', e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter Russian title"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image Key/URL
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alt Text (EN)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alt Text (RU)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : partnersData.partnersList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No partners found
                  </td>
                </tr>
              ) : (
                partnersData.partnersList.map((partner: Partner, index: number) => (
                  <tr key={partner.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={getImageUrl(partner.image)}
                          alt={partner.alt.en}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const imageKey = partner.image;
                            
                            // Try different extensions for partner logos
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
                                  fallbackDiv.className = 'fallback-text text-xs text-gray-500 text-center p-2';
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
                                fallbackDiv.className = 'fallback-text text-xs text-gray-500 text-center p-2';
                                fallbackDiv.textContent = 'No Image';
                                parent.appendChild(fallbackDiv);
                              }
                            }
                          }}
                        />
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span title={partner.image}>
                        {partner.image.length > 40 ? `${partner.image.substring(0, 40)}...` : partner.image}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {partner.alt.en}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {partner.alt.ru}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditPartner(index)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePartner(index)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
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
        isOpen={isAddEditOpen} 
        onClose={resetModal}
        className="max-w-md mx-auto p-5"
      >
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingPartner ? 'Edit Partner' : 'Add New Partner'}
          </h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            editingPartner ? handleUpdatePartner() : handleAddPartner();
          }}>
            {editingPartner && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner ID
                </label>
                <input
                  type="text"
                  value={editingPartner.id}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                  placeholder="Auto-generated ID"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This ID is auto-generated and cannot be changed
                </p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partner Logo
              </label>
              <ImageUpload
                value={editingPartner ? editingPartner.image : newPartner.image}
                onChange={handleImageUpload}
                required={true}
                options={{
                  quality: 0.9,
                  maxWidth: 800,
                  maxHeight: 600
                }}
                placeholder="Upload partner logo"
                showUrlInput={true}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a logo image or enter a URL. SVG or PNG format recommended for logos.
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Text (English)
              </label>
              <input
                type="text"
                value={editingPartner ? editingPartner.alt.en : newPartner.alt.en}
                onChange={(e) => {
                  if (editingPartner) {
                    setEditingPartner({ 
                      ...editingPartner, 
                      alt: { ...editingPartner.alt, en: e.target.value } 
                    });
                  } else {
                    setNewPartner({ 
                      ...newPartner, 
                      alt: { ...newPartner.alt, en: e.target.value } 
                    });
                  }
                }}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter English alt text for the image"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Text (Russian)
              </label>
              <input
                type="text"
                value={editingPartner ? editingPartner.alt.ru : newPartner.alt.ru}
                onChange={(e) => {
                  if (editingPartner) {
                    setEditingPartner({ 
                      ...editingPartner, 
                      alt: { ...editingPartner.alt, ru: e.target.value } 
                    });
                  } else {
                    setNewPartner({ 
                      ...newPartner, 
                      alt: { ...newPartner.alt, ru: e.target.value } 
                    });
                  }
                }}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter Russian alt text for the image"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading 
                  ? (editingPartner ? 'Updating...' : 'Adding...') 
                  : (editingPartner ? 'Update Partner' : 'Add Partner')
                }
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeletePartner}
        title="Delete Partner"
        itemName={deletePartnerIndex !== -1 ? `Partner ${deletePartnerIndex + 1}` : undefined}
        isLoading={loading}
      />
    </div>
  );
};

export default PartnersManagement;
