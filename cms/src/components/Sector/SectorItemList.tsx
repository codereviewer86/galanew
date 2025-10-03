import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance, { VITE_API_BASE_URL } from '../../utils/axiosInstance';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import DeleteConfirmationModal from '../ui/DeleteConfirmationModal';
import SectorItemForm from './SectorItemForm';

interface SectorItem {
  id: number;
  img: string;
  label: string;
  labelRu: string;
  description?: string;
  descriptionRu?: string;
  type: 'ENERGY' | 'INFRA';
}

export interface SectorItemListProps {
  sectorType?: 'ENERGY' | 'INFRA';
}

const SectorItemList: React.FC<SectorItemListProps> = ({ sectorType }) => {
  const [items, setItems] = useState<SectorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<SectorItem | null>(null);
  const navigate = useNavigate();

  console.log('SectorItemList rendered with sectorType:', sectorType);

  // Modal states
  const { isOpen: isCreateOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  useEffect(() => {
    fetchItems();
  }, [sectorType]);

  const fetchItems = () => {
    setLoading(true);
    const url = sectorType 
      ? `/api/sector-items?type=${sectorType}`
      : '/api/sector-items';
    
    axiosInstance.get(url)
      .then(res => setItems(res.data))
      .catch(err => setError(err.response?.data?.error || 'Failed to fetch'))
      .finally(() => setLoading(false));
  };

  const handleCreateNew = () => {
    setEditingItemId(null);
    openCreateModal();
  };

  const handleEdit = (item: SectorItem) => {
    setEditingItemId(item.id);
    setSelectedItem(item);
    openEditModal();
  };

  const handleFormSuccess = () => {
    fetchItems(); // Refresh the list
    setEditingItemId(null);
    setSelectedItem(null);
  };

  const handleDelete = (item: SectorItem) => {
    setSelectedItem(item);
    openDeleteModal();
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    try {
      await axiosInstance.delete(`/api/sector-items/${selectedItem.id}`);
      fetchItems(); // Refresh the list
      closeDeleteModal();
      setSelectedItem(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete item');
    }
  };

  return (
    <>
      <div className="flex justify-end items-center mb-4">
        {/* <h2 className="text-2xl font-bold">Sector Items</h2> */}
        <Button onClick={handleCreateNew}>
          Create New {sectorType || 'Sector'} Item
        </Button>
      </div>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {/* <th className="px-4 py-2 border-b">ID</th> */}
              <th className="px-4 py-2 border-b text-left">Label (EN)</th>
              <th className="px-4 py-2 border-b text-left">Label (RU)</th>
              <th className="px-4 py-2 border-b text-left">Description (EN)</th>
              <th className="px-4 py-2 border-b text-left">Description (RU)</th>
              <th className="px-4 py-2 border-b text-left">Image</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">Loading...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">No sector items found.</td>
              </tr>
            ) : (
              items.map(item => (
                <tr
                  style={{ cursor: 'pointer' }}
                  className="hover:bg-gray-100"
                  onClick={() => navigate(`/sector-item-services?sectorItemId=${item.id}`)}
                  key={item.id}
                >
                  {/* <td className="px-4 py-2 border-b text-center">
                    <button
                      className="text-blue-600 underline hover:text-blue-800"
                      onClick={() => navigate(`/sector-item-services?sectorItemId=${item.id}`)}
                    >
                      {item.id}
                    </button>
                    </td> */}
                    <td className="px-4 py-2 border-b">{item.label}</td>
                    <td className="px-4 py-2 border-b">{item.labelRu}</td>
                    <td className="px-4 py-2 border-b">{item.description || '—'}</td>
                    <td className="px-4 py-2 border-b">{item.descriptionRu || '—'}</td>
                  <td className="px-4 py-2 border-b">
                    <img src={item.img && item.img !== " " ? `${VITE_API_BASE_URL}${item.img}` : '/upstream.jpg'} alt={item.label} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item);
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
      </div>

      {/* Create Modal */}
      <Modal isOpen={isCreateOpen} onClose={closeCreateModal} className="max-w-[600px] m-4">
        <div className="relative w-full p-6 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
          <div className="mb-6">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create New Item
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill in the details to create a new sector item.
            </p>
          </div>
          <SectorItemForm
            itemId={null}
            sectorType={sectorType}
            onSuccess={() => {
              closeCreateModal();
              handleFormSuccess();
            }}
            onClose={closeCreateModal}
          />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={closeEditModal} className="max-w-[600px] m-4">
        <div className="relative w-full p-6 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
          <div className="mb-6">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Item
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update the item information below.
            </p>
          </div>
          <SectorItemForm
            itemId={editingItemId}
            sectorType={sectorType}
            onSuccess={() => {
              closeEditModal();
              handleFormSuccess();
            }}
            onClose={closeEditModal}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Item"
        itemName={selectedItem?.label}
      />
    </>
  );
};

export default SectorItemList;
