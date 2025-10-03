import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../utils/axiosInstance';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';
import { useModal } from '../hooks/useModal';

interface Section {
  id: number;
  section: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

const SectionManagement: React.FC = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewingSection, setViewingSection] = useState<Section | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [deleteSectionId, setDeleteSectionId] = useState<number>(-1);

  // Modal hooks
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/sections');
      if (response.status === 200) {
        setSections(response.data.data);
      } else {
        setErrors(['Failed to fetch sections']);
      }
    } catch (error) {
      setErrors(['Error fetching sections']);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteSectionId(id);
    openDeleteModal();
  };

  const confirmDeleteSection = async () => {
    if (deleteSectionId === -1) return;

    try {
      const response = await axiosInstance.delete(`/api/sections/${deleteSectionId}`);

      if (response.status === 200) {
        fetchSections();
        closeDeleteModal();
        setDeleteSectionId(-1);
      } else {
        setErrors([response.data.message || 'Failed to delete section']);
      }
    } catch (error) {
      setErrors(['Error deleting section']);
      console.error('Error:', error);
    }
  };

  const handleCreateSection = () => {
    navigate('/sections/new');
  };

  const handleEditSection = (id: number) => {
    navigate(`/sections/${id}`);
  };

  const showViewModal = (section: Section) => {
    setViewingSection(section);
    setViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setViewModalVisible(false);
    setViewingSection(null);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Section Management</h2>
          <button 
            onClick={handleCreateSection}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Create Section
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            {errors.map((error, index) => (
              <p key={index} className="text-red-700">{error}</p>
            ))}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
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
              ) : sections.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No sections found
                  </td>
                </tr>
              ) : (
                sections.filter((section) => section.section).map((section) => (
                  <tr key={section.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                        {section.section}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="truncate">
                        {typeof section.data === 'object' ? (
                          <div>
                            <div className="truncate">
                              {JSON.stringify(section.data).substring(0, 50) + '...'}
                            </div>
                            {(section.data?.en || section.data?.ru) && (
                              <div className="flex gap-1 mt-1">
                                {section.data?.en && (
                                  <span className="inline-flex px-1 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                                    EN
                                  </span>
                                )}
                                {section.data?.ru && (
                                  <span className="inline-flex px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                                    RU
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          String(section.data)
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(section.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(section.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => showViewModal(section)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEditSection(section.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(section.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {viewModalVisible && viewingSection && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-1000000">
            <div className="relative top-20 mx-auto p-5 border w-2/3 max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">View Section</h3>
                
                <div className="space-y-3">
                  <p><strong>ID:</strong> {viewingSection.id}</p>
                  <p><strong>Section Name:</strong> {viewingSection.section}</p>
                  <p><strong>Created:</strong> {new Date(viewingSection.createdAt).toLocaleString()}</p>
                  <p><strong>Updated:</strong> {new Date(viewingSection.updatedAt).toLocaleString()}</p>
                  <div>
                    <strong>Data:</strong>
                    <pre className="mt-2 bg-gray-100 p-3 rounded text-sm overflow-auto max-h-60">
                      {JSON.stringify(viewingSection.data, null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleViewModalCancel}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteSection}
          title="Delete Section"
          itemName={sections.find(s => s.id === deleteSectionId)?.section}
        />
      </div>
    </div>
  );
};

export default SectionManagement;
