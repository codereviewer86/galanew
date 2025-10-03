import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import axiosInstance, { VITE_API_BASE_URL } from '../../utils/axiosInstance';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import SectorItemServiceDetailsForm from './SectorItemServiceDetailsForm';

interface SectorItemServiceDetails {
  id: number;
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  imageSrc: string;
  pdfUrl?: string;
  sectorItemServiceId: number;
}

const SectorItemServiceDetailsList: React.FC = () => {
  const [details, setDetails] = useState<SectorItemServiceDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedDetail, setSelectedDetail] =
    useState<SectorItemServiceDetails | null>(null);
  const [searchParams] = useSearchParams();
  const sectorItemServiceId = searchParams.get('sectorItemServiceId') || '';

  // Modal states
  const {
    isOpen: isCreateOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  useEffect(() => {
    fetchDetails();
  }, [sectorItemServiceId]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        '/api/sector-item-service-details?sectorItemServiceId=' +
          sectorItemServiceId
      );
      setDetails(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    openCreateModal();
  };

  const handleUpdate = (detail: SectorItemServiceDetails) => {
    setEditingId(detail.id);
    setSelectedDetail(detail);
    openEditModal();
  };

  const handleDelete = (detail: SectorItemServiceDetails) => {
    setSelectedDetail(detail);
    openDeleteModal();
  };

  const confirmDelete = async () => {
    if (!selectedDetail) return;
    try {
      await axiosInstance.delete(
        `/api/sector-item-service-details/${selectedDetail.id}`
      );
      fetchDetails(); // Refresh the list
      closeDeleteModal();
      setSelectedDetail(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete service detail');
    }
  };

  const handleFormSuccess = () => {
    fetchDetails();
    setEditingId(null);
    setSelectedDetail(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div className="flex justify-end items-center mb-4">
        <Button onClick={handleCreate}>Create Service Details</Button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Title (EN)</th>
              <th className="px-4 py-2 border-b text-left">Title (RU)</th>
              <th className="px-4 py-2 border-b text-left">Description (EN)</th>
              <th className="px-4 py-2 border-b text-left">Description (RU)</th>
              <th className="px-4 py-2 border-b text-left">Image</th>
              <th className="px-4 py-2 border-b text-left">PDF</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {details.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No service details found.
                </td>
              </tr>
            ) : (
              details.map((detail) => (
                <tr key={detail.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{detail.title}</td>
                  <td className="px-4 py-2 border-b">{detail.titleRu}</td>
                  <td className="px-4 py-2 border-b">
                    {Array.isArray(detail.description)
                      ? detail.description.map((desc, idx) => (
                          <div key={idx}>{desc}</div>
                        ))
                      : detail.description}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {Array.isArray(detail.descriptionRu)
                      ? detail.descriptionRu.map((desc, idx) => (
                          <div key={idx}>{desc}</div>
                        ))
                      : detail.descriptionRu}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <img
                      src={
                        detail.imageSrc
                          ? `${VITE_API_BASE_URL}${detail.imageSrc}`
                          : '/s8.webp'
                      }
                      alt={detail.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    {detail.pdfUrl ? (
                      <a
                        href={detail.pdfUrl}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        PDF
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(detail)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(detail)}
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
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={closeCreateModal}
        className="max-w-[600px] m-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="relative w-full p-6 bg-white dark:bg-gray-900">
          <div className="mb-6">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create Service Details
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill in the details to create new service details.
            </p>
          </div>
          <SectorItemServiceDetailsForm
            onSuccess={() => {
              closeCreateModal();
              handleFormSuccess();
            }}
          />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        className="max-w-[600px] m-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="relative w-full p-6 bg-white dark:bg-gray-900">
          <div className="mb-6">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Service Details
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update the service details information below.
            </p>
          </div>
          <SectorItemServiceDetailsForm
            detailId={editingId ?? undefined}
            onSuccess={() => {
              closeEditModal();
              handleFormSuccess();
            }}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        className="max-w-[450px] m-4"
      >
        <div className="relative w-full p-6 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full dark:bg-red-900/20">
              <svg
                className="w-8 h-8 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h4 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white/90">
              Delete Service Details
            </h4>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{' '}
              <span className="font-medium text-gray-800 dark:text-white/90">
                "{selectedDetail?.title}"
              </span>
              ?
            </p>
            <p className="mt-2 text-sm text-center text-gray-400 dark:text-gray-500">
              This action cannot be undone.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Button
              size="sm"
              variant="outline"
              onClick={closeDeleteModal}
              className="min-w-[100px]"
            >
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
    </>
  );
};

export default SectorItemServiceDetailsList;
