import React, { useEffect, useState } from 'react';
import axiosInstance, { VITE_API_BASE_URL } from '../../utils/axiosInstance';
import { useSearchParams, useNavigate } from 'react-router';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import SectorItemServiceForm from './SectorItemServiceForm';

interface SectorItemService {
  id: number;
  to: string;
  img: string;
  brandLogo?: string;
  label: string;
  labelRu: string;
  description: string;
  descriptionRu: string;
  sectorItemId: number;
}


const SectorItemServiceList: React.FC = () => {
  const [services, setServices] = useState<SectorItemService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sectorItemIdParam = searchParams.get('sectorItemId') || '';

  // Modal states
  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { isOpen: isCreateOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
  // Form states
  const [selectedService, setSelectedService] = useState<SectorItemService | null>(null);
  const [, setFormData] = useState({
    to: '',
    img: '',
    label: '',
    labelRu: '',
    description: '',
    descriptionRu: '',
    sectorItemId: Number(sectorItemIdParam)
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/sector-item-services?sectorItemId=${sectorItemIdParam}`);
      setServices(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: SectorItemService) => {
    setSelectedService(service);
    console.log(service)
    setFormData({
      to: service.to,
      img: service.img,
      label: service.label,
      labelRu: service.labelRu,
      description: service.description,
      descriptionRu: service.descriptionRu,
      sectorItemId: service.sectorItemId
    });
    openEditModal();
  };

  const handleDelete = (service: SectorItemService) => {
    setSelectedService(service);
    openDeleteModal();
  };

  const confirmDelete = async () => {
    if (!selectedService) return;
    try {
      await axiosInstance.delete(`/api/sector-item-services/${selectedService.id}`);
      await fetchServices();
      closeDeleteModal();
      setSelectedService(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete service');
    }
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectorItemIdParam]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto mt-8">
      {/* Create Button */}
      <div className="mb-4 text-right">
        <Button onClick={openCreateModal}>
          Create New Service
        </Button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Label (EN)</th>
            <th className="px-4 py-2 border-b text-left">Label (RU)</th>
            <th className="px-4 py-2 border-b text-left">Description (EN)</th>
            <th className="px-4 py-2 border-b text-left">Description (RU)</th>
            <th className="px-4 py-2 border-b text-left">Image</th>
            <th className="px-4 py-2 border-b text-left">Brand Logo</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">No sector item services found.</td>
            </tr>
          ) : (
            services.map(service => (
              <tr
                style={{ cursor: 'pointer' }}
                className="hover:bg-gray-100"
                onClick={() => navigate(`/sector-item-service-detail?sectorItemServiceId=${service.id}`)}
                key={service.id}
              >
                <td className="px-4 py-2 border-b">{service.label}</td>
                <td className="px-4 py-2 border-b">{service.labelRu}</td>
                <td className="px-4 py-2 border-b">
                  <div className="max-w-xs truncate" title={service.description || ''}>
                    {service.description || '—'}
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="max-w-xs truncate" title={service.descriptionRu || ''}>
                    {service.descriptionRu || '—'}
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  <img src={service.img && service.img !== " " ? `${VITE_API_BASE_URL}${service.img}` : '/completion.webp'} alt={service.label} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2 border-b">
                  <img src={service.brandLogo && service.brandLogo !== " " ? `${VITE_API_BASE_URL}${service.brandLogo}` : '/completion.webp'} alt={`${service.label} brand`} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(service);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(service);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal with SectorItemServiceForm */}
      <Modal isOpen={isEditOpen} onClose={closeEditModal} className="max-w-[600px] m-4">
        <div className="relative w-full p-6 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
          <div className="mb-6">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Service
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update the service information below.
            </p>
          </div>
          {selectedService && (
            <SectorItemServiceForm
              mode="update"
              serviceId={selectedService.id}
              initialData={{
                to: selectedService.to,
                img: selectedService.img,
                label: selectedService.label,
                description: selectedService.description,
                labelRu: selectedService.labelRu,
                descriptionRu: selectedService.descriptionRu,
              }}
              onSuccess={() => {
                closeEditModal();
                setSelectedService(null);
                fetchServices();
              }}
            />
          )}
        </div>
      </Modal>

      {/* Create Modal with SectorItemServiceForm */}
      <Modal isOpen={isCreateOpen} onClose={closeCreateModal} className="max-w-[600px] m-4">
        <div className="relative w-full p-6 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
          <div className="mb-6">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create New Service
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill in the details to create a new sector item service.
            </p>
          </div>
          <SectorItemServiceForm
            mode="create"
            onSuccess={() => {
              closeCreateModal();
              fetchServices();
            }}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={closeDeleteModal} className="max-w-[450px] m-4">
        <div className="relative w-full p-6 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full dark:bg-red-900/20">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h4 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white/90">
              Delete Service
            </h4>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Are you sure you want to delete <span className="font-medium text-gray-800 dark:text-white/90">"{selectedService?.label}"</span>?
            </p>
            <p className="mt-2 text-sm text-center text-gray-400 dark:text-gray-500">
              This action cannot be undone.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Button size="sm" variant="outline" onClick={closeDeleteModal} className="min-w-[100px]">
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={confirmDelete}
              className="min-w-[100px] !bg-red-500 hover:!bg-red-600 !text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SectorItemServiceList;
