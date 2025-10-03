import { useState, useEffect } from 'react';
import PageMeta from '../components/common/PageMeta';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import ComponentCard from '../components/common/ComponentCard';
import Button from '../components/ui/button/Button';
import axiosInstance from '../utils/axiosInstance';
import ImageUpload from '../components/common/ImageUpload';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';
import { useModal } from '../hooks/useModal';

interface RegistrationLicenseImage {
  id: string;
  image: string;
  alt: {
    en: string;
    ru: string;
  };
}

interface RegistrationLicenseData {
  title: {
    en: string;
    ru: string;
  };
  description: {
    en: string;
    ru: string;
  };
  images: RegistrationLicenseImage[];
}

export default function RegistrationLicenseManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sectionExists, setSectionExists] = useState(false);
  const [sectionId, setSectionId] = useState<number | null>(null);
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
  
  // Modal hooks
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  
  const [registrationLicenseData, setRegistrationLicenseData] = useState<RegistrationLicenseData>({
    title: {
      en: 'Company Registration License',
      ru: 'Лицензия на регистрацию компании'
    },
    description: {
      en: '"TURKMEN GALA" HJ is a Turkmen certified company registered under license No. 21010027 Our specializations are in the oil & gas (onshore and offshore), industrial sector and energy industries:',
      ru: '"TURKMEN GALA" HJ - туркменская сертифицированная компания, зарегистрированная под лицензией № 21010027. Наши специализации: нефть и газ (на суше и на море), промышленный сектор и энергетическая промышленность:'
    },
    images: Array.from({ length: 10 }, (_, index) => ({
      id: `rl_${index + 1}`,
      image: `/img/registration_license/RL${index + 1}.jpg`,
      alt: {
        en: `Registration License ${index + 1}`,
        ru: `Лицензия на регистрацию ${index + 1}`
      }
    }))
  });

  useEffect(() => {
    fetchRegistrationLicenseData();
  }, []);

  const fetchRegistrationLicenseData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.get('/api/sections/name/company_registration_license');
      if (response.data?.data) {
        const sectionData = response.data.data;
        const fetchedData = sectionData.data;
        
        // Store section ID for updates
        setSectionId(sectionData.id);
        
        // Ensure all images have proper IDs
        const addMissingIds = (images: any[]) => {
          return images.map((image, index) => ({
            ...image,
            id: image.id || `rl_${Date.now()}_${index}`,
            alt: typeof image.alt === 'string' ? { en: image.alt, ru: image.alt } : image.alt
          }));
        };

        if (fetchedData.images) {
          fetchedData.images = addMissingIds(fetchedData.images);
        }

        setRegistrationLicenseData(fetchedData);
        setSectionExists(true);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setSectionExists(false);
      } else {
        setError('Failed to fetch registration license data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (language: 'en' | 'ru', value: string) => {
    setRegistrationLicenseData(prev => ({
      ...prev,
      title: { ...prev.title, [language]: value }
    }));
    debouncedSave();
  };

  const handleDescriptionChange = (language: 'en' | 'ru', value: string) => {
    setRegistrationLicenseData(prev => ({
      ...prev,
      description: { ...prev.description, [language]: value }
    }));
    debouncedSave();
  };

  const handleImageChange = (imageId: string, field: 'image', value: string) => {
    setRegistrationLicenseData(prev => ({
      ...prev,
      images: prev.images.map(image => 
        image.id === imageId ? { ...image, [field]: value } : image
      )
    }));
    debouncedSave();
  };

  const handleImageAltChange = (imageId: string, language: 'en' | 'ru', value: string) => {
    setRegistrationLicenseData(prev => ({
      ...prev,
      images: prev.images.map(image => 
        image.id === imageId 
          ? { ...image, alt: { ...image.alt, [language]: value } }
          : image
      )
    }));
    debouncedSave();
  };

  const addImage = () => {
    const newImage: RegistrationLicenseImage = {
      id: `rl_${Date.now()}`,
      image: '',
      alt: { en: '', ru: '' }
    };
    
    setRegistrationLicenseData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));
  };

  const removeImage = (imageId: string) => {
    setDeleteImageId(imageId);
    openDeleteModal();
  };

  const confirmRemoveImage = () => {
    if (!deleteImageId) return;

    setRegistrationLicenseData(prev => ({
      ...prev,
      images: prev.images.filter(image => image.id !== deleteImageId)
    }));
    
    closeDeleteModal();
    setDeleteImageId(null);
    debouncedSave();
  };

  let saveTimeout: NodeJS.Timeout;
  const debouncedSave = () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveData();
    }, 1000);
  };

  const saveData = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (sectionExists && sectionId) {
        // Update existing section using section ID
        await axiosInstance.put(`/api/sections/${sectionId}`, {
          section: 'company_registration_license',
          data: registrationLicenseData
        });
      } else {
        // Create new section
        const response = await axiosInstance.post('/api/sections', {
          section: 'company_registration_license',
          data: registrationLicenseData
        });
        
        // Store the new section ID for future updates
        if (response.data?.data?.id) {
          setSectionId(response.data.data.id);
        }
        setSectionExists(true);
      }
      
      setSuccess('Registration license data saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error: any) {
      setError('Failed to save registration license data');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNow = () => {
    clearTimeout(saveTimeout);
    saveData();
  };

  const handleImageUpload = (imageId: string, url: string) => {
    handleImageChange(imageId, 'image', url);
  };

  return (
    <div className="p-6">
      <PageMeta 
        title="Registration License Management" 
        description="Manage company registration license images and content"
      />
      <PageBreadcrumb pageTitle="Registration License Management" />

      <ComponentCard title="Company Registration License Management">
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

        {/* Section Title */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title (English)
              {loading && <span className="ml-2 text-xs text-blue-600">Saving...</span>}
            </label>
            <input
              type="text"
              value={registrationLicenseData.title.en}
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
              value={registrationLicenseData.title.ru}
              onChange={(e) => handleTitleChange('ru', e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter Russian title"
            />
          </div>
        </div>

        {/* Section Description */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (English)
              {loading && <span className="ml-2 text-xs text-blue-600">Saving...</span>}
            </label>
            <textarea
              value={registrationLicenseData.description.en}
              onChange={(e) => handleDescriptionChange('en', e.target.value)}
              disabled={loading}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter English description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Russian)
              {loading && <span className="ml-2 text-xs text-blue-600">Saving...</span>}
            </label>
            <textarea
              value={registrationLicenseData.description.ru}
              onChange={(e) => handleDescriptionChange('ru', e.target.value)}
              disabled={loading}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter Russian description"
            />
          </div>
        </div>

        {/* Registration License Images */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Registration License Images</h3>
            <Button
              onClick={addImage}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Add Image
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License Image
                  </th>
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
                {registrationLicenseData.images.map((image, index) => (
                  <tr key={image.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-80">
                        <ImageUpload
                          value={image.image}
                          onChange={(url) => handleImageUpload(image.id, url)}
                          required={false}
                          options={{
                            quality: 0.85,
                            maxWidth: 1200,
                            maxHeight: 800
                          }}
                          placeholder="Upload license document image"
                          showUrlInput={true}
                          className="text-sm"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={image.alt.en}
                        onChange={(e) => handleImageAltChange(image.id, 'en', e.target.value)}
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                        placeholder="English alt text"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={image.alt.ru}
                        onChange={(e) => handleImageAltChange(image.id, 'ru', e.target.value)}
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
                        placeholder="Russian alt text"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => removeImage(image.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button
            onClick={handleSaveNow}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </ComponentCard>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmRemoveImage}
        title="Delete License Image"
        itemName={
          deleteImageId 
            ? registrationLicenseData.images.find(img => img.id === deleteImageId)?.alt.en || 'this license image'
            : undefined
        }
      />
    </div>
  );
}
