import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ImageUpload from '../components/common/ImageUpload';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';
import { Modal } from '../components/ui/modal';
import { useModal } from '../hooks/useModal';
import { getImageUrl } from './PartnersManagement';

interface BannerSlide {
  id: string;
  image: string;
  alt: {
    en: string;
    ru: string;
  };
  caption: {
    en: string;
    ru: string;
  };
}

interface BannerData {
  title: {
    en: string;
    ru: string;
  };
  slidesList: BannerSlide[];
}

interface Section {
  id: number;
  section: string;
  data: BannerData;
  createdAt: string;
  updatedAt: string;
}

const BannerManagement: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerData>({
    title: { en: 'Banner Carousel', ru: 'Баннерная карусель' },
    slidesList: []
  });
  const [editingSlide, setEditingSlide] = useState<BannerSlide | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [newSlide, setNewSlide] = useState<BannerSlide>({ 
    id: '', 
    image: '', 
    alt: { en: '', ru: '' },
    caption: { en: '', ru: '' }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [sectionExists, setSectionExists] = useState(false);
  const [titleSaveTimeout, setTitleSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [deleteSlideIndex, setDeleteSlideIndex] = useState<number>(-1);

  // Modal hooks
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isAddEditOpen, openModal: openAddEditModal, closeModal: closeAddEditModal } = useModal();

  useEffect(() => {
    fetchBannerData();
    
    // Cleanup timeout on unmount
    return () => {
      if (titleSaveTimeout) {
        clearTimeout(titleSaveTimeout);
      }
    };
  }, []);

  const fetchBannerData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/sections/name/banner_carousel');
      if (response.data && response.data.data) {
        let fetchedData = response.data.data.data;
        
        // Convert old format to new format if needed and add IDs to slides that don't have them
        if (fetchedData.en && fetchedData.ru) {
          // Old format - convert to new format
          const convertedData: BannerData = {
            title: {
              en: fetchedData.en.title || 'Banner Carousel',
              ru: fetchedData.ru.title || 'Баннерная карусель'
            },
            slidesList: fetchedData.en.slidesList?.map((slide: any, index: number) => ({
              id: slide.id || `slide_${Date.now()}_${index}`,
              image: slide.image,
              alt: {
                en: slide.alt || '',
                ru: fetchedData.ru.slidesList?.[index]?.alt || ''
              },
              caption: {
                en: slide.caption || '',
                ru: fetchedData.ru.slidesList?.[index]?.caption || ''
              }
            })) || []
          };
          setBannerData(convertedData);
        } else {
          // New format - just add missing IDs
          const addMissingIds = (slides: any[]) => {
            return slides.map((slide, index) => ({
              ...slide,
              id: slide.id || `slide_${Date.now()}_${index}`,
              alt: typeof slide.alt === 'string' ? { en: slide.alt, ru: slide.alt } : slide.alt,
              caption: typeof slide.caption === 'string' ? { en: slide.caption, ru: slide.caption } : slide.caption
            }));
          };

          if (fetchedData.slidesList) {
            fetchedData.slidesList = addMissingIds(fetchedData.slidesList);
          }

          setBannerData(fetchedData);
        }
        setSectionExists(true);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Section doesn't exist, start with default data
        setSectionExists(false);
      } else {
        setError('Failed to fetch banner data');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveBannerData = async (dataToSave?: BannerData) => {
    try {
      setLoading(true);
      const requestData = {
        section: 'banner_carousel',
        data: dataToSave || bannerData
      };

      let response;
      if (sectionExists) {
        // Update existing section
        const sectionsResponse = await axiosInstance.get('/api/sections');
        const existingSection = sectionsResponse.data.data.find((s: Section) => s.section === 'banner_carousel');
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
      const errorMessage = error.response?.data?.message || 'Failed to save banner data';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlide = async () => {
    if (!newSlide.image || !newSlide.alt.en || !newSlide.alt.ru || !newSlide.caption.en || !newSlide.caption.ru) {
      setError('Please fill all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const updatedData = { ...bannerData };
      const slideWithId = {
        ...newSlide,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      };
      updatedData.slidesList.push(slideWithId);
      
      // Save to database immediately
      await saveBannerData(updatedData);
      
      setBannerData(updatedData);
      setNewSlide({ id: '', image: '', alt: { en: '', ru: '' }, caption: { en: '', ru: '' } });
      closeAddEditModal();
      setError('');
      setSuccess('Banner slide added successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to add banner slide');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSlide = (index: number) => {
    const slide = bannerData.slidesList[index];
    setEditingSlide({ ...slide });
    setEditingIndex(index);
    openAddEditModal();
  };

  const handleUpdateSlide = async () => {
    if (!editingSlide?.image || !editingSlide?.alt.en || !editingSlide?.alt.ru || !editingSlide?.caption.en || !editingSlide?.caption.ru) {
      setError('Please fill all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      setLoading(true);
      const updatedData = { ...bannerData };
      updatedData.slidesList[editingIndex] = { ...editingSlide };
      
      // Save to database immediately
      const saved = await saveBannerData(updatedData);
      
      if (saved) {
        setBannerData(updatedData);
        setEditingSlide(null);
        setEditingIndex(-1);
        closeAddEditModal();
        setError('');
        setSuccess('Banner slide updated successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError('Failed to update banner slide');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlide = (index: number) => {
    setDeleteSlideIndex(index);
    openDeleteModal();
  };

  const confirmDeleteSlide = async () => {
    if (deleteSlideIndex === -1) return;

    try {
      setLoading(true);
      const updatedData = { ...bannerData };
      updatedData.slidesList.splice(deleteSlideIndex, 1);
      
      // Save to database immediately
      const saved = await saveBannerData(updatedData);
      
      if (saved) {
        setBannerData(updatedData);
        setSuccess('Banner slide deleted successfully!');
        closeDeleteModal();
        setDeleteSlideIndex(-1);
      }
    } catch (error) {
      setError('Failed to delete banner slide');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = async (language: 'en' | 'ru', value: string) => {
    const updatedData = { ...bannerData };
    updatedData.title[language] = value;
    setBannerData(updatedData);
    
    // Debounce the save operation to avoid too many API calls
    if (titleSaveTimeout) {
      clearTimeout(titleSaveTimeout);
    }
    
    const timeout = setTimeout(async () => {
      try {
        await saveBannerData(updatedData);
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
    setEditingSlide(null);
    setEditingIndex(-1);
    setNewSlide({ id: '', image: '', alt: { en: '', ru: '' }, caption: { en: '', ru: '' } });
    setError('');
  };

  const handleImageUpload = (url: string) => {
    if (editingSlide) {
      setEditingSlide({ ...editingSlide, image: url });
    } else {
      setNewSlide({ ...newSlide, image: url });
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Banner Management</h2>
          <div className="flex gap-2">
            <button
              onClick={() => openAddEditModal()}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
            >
              Add Banner Slide
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
              value={bannerData.title.en}
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
              value={bannerData.title.ru}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alt Text (EN)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alt Text (RU)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Caption (EN)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Caption (RU)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : bannerData.slidesList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No banner slides found
                  </td>
                </tr>
              ) : (
                bannerData.slidesList.map((slide: BannerSlide, index: number) => (
                  <tr key={slide.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-24 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={getImageUrl(slide.image)}
                          alt={slide.alt.en}
                          className="max-w-full max-h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const imageKey = slide.image;
                            
                            // Try different extensions for banner images
                            if (!imageKey.startsWith('http') && !imageKey.startsWith('/')) {
                              if (target.src.endsWith('.jpg')) {
                                target.src = `/images/carousel/${imageKey}.png`;
                              } else if (target.src.endsWith('.png')) {
                                target.src = `/images/carousel/${imageKey}.webp`;
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
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48">
                      <div className="truncate" title={slide.alt.en}>
                        {slide.alt.en}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48">
                      <div className="truncate" title={slide.alt.ru}>
                        {slide.alt.ru}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48">
                      <div className="truncate" title={slide.caption.en}>
                        {slide.caption.en}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48">
                      <div className="truncate" title={slide.caption.ru}>
                        {slide.caption.ru}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditSlide(index)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(index)}
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
        className="max-w-[500px] mx-auto p-5"
      >
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingSlide ? 'Edit Banner Slide' : 'Add New Banner Slide'}
          </h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            editingSlide ? handleUpdateSlide() : handleAddSlide();
          }}>
            {editingSlide && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slide ID
                </label>
                <input
                  type="text"
                  value={editingSlide.id}
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
                Banner Image
              </label>
              <ImageUpload
                value={editingSlide ? editingSlide.image : newSlide.image}
                onChange={handleImageUpload}
                required={true}
                options={{
                  quality: 0.9,
                  maxWidth: 1920,
                  maxHeight: 1080
                }}
                placeholder="Upload banner image"
                showUrlInput={true}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload an image or enter a URL. Recommended size: 1920x1080px
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text (English)
                </label>
                <textarea
                  value={editingSlide ? editingSlide.alt.en : newSlide.alt.en}
                  onChange={(e) => {
                    if (editingSlide) {
                      setEditingSlide({ 
                        ...editingSlide, 
                        alt: { ...editingSlide.alt, en: e.target.value } 
                      });
                    } else {
                      setNewSlide({ 
                        ...newSlide, 
                        alt: { ...newSlide.alt, en: e.target.value } 
                      });
                    }
                  }}
                  disabled={loading}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter English alt text for the image"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text (Russian)
                </label>
                <textarea
                  value={editingSlide ? editingSlide.alt.ru : newSlide.alt.ru}
                  onChange={(e) => {
                    if (editingSlide) {
                      setEditingSlide({ 
                        ...editingSlide, 
                        alt: { ...editingSlide.alt, ru: e.target.value } 
                      });
                    } else {
                      setNewSlide({ 
                        ...newSlide, 
                        alt: { ...newSlide.alt, ru: e.target.value } 
                      });
                    }
                  }}
                  disabled={loading}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter Russian alt text for the image"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption (English)
                </label>
                <textarea
                  value={editingSlide ? editingSlide.caption.en : newSlide.caption.en}
                  onChange={(e) => {
                    if (editingSlide) {
                      setEditingSlide({ 
                        ...editingSlide, 
                        caption: { ...editingSlide.caption, en: e.target.value } 
                      });
                    } else {
                      setNewSlide({ 
                        ...newSlide, 
                        caption: { ...newSlide.caption, en: e.target.value } 
                      });
                    }
                  }}
                  disabled={loading}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter English caption text"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption (Russian)
                </label>
                <textarea
                  value={editingSlide ? editingSlide.caption.ru : newSlide.caption.ru}
                  onChange={(e) => {
                    if (editingSlide) {
                      setEditingSlide({ 
                        ...editingSlide, 
                        caption: { ...editingSlide.caption, ru: e.target.value } 
                      });
                    } else {
                      setNewSlide({ 
                        ...newSlide, 
                        caption: { ...newSlide.caption, ru: e.target.value } 
                      });
                    }
                  }}
                  disabled={loading}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter Russian caption text"
                  required
                />
              </div>
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
                  ? (editingSlide ? 'Updating...' : 'Adding...') 
                  : (editingSlide ? 'Update Slide' : 'Add Slide')
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
        onConfirm={confirmDeleteSlide}
        title="Delete Banner Slide"
        itemName={deleteSlideIndex !== -1 ? `Slide ${deleteSlideIndex + 1}` : undefined}
        isLoading={loading}
      />
    </>
  );
};

export default BannerManagement;
