import { useState, useEffect } from 'react';
import PageMeta from '../components/common/PageMeta';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import ComponentCard from '../components/common/ComponentCard';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../components/ui/table';
import Button from '../components/ui/button/Button';
import { Modal } from '../components/ui/modal';
import CareersForm from '../components/Careers/CareersForm';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';
import { useModal } from '../hooks/useModal';
import axiosInstance from '../utils/axiosInstance';

interface Job {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CareersSectionData {
  en: {
    jobs: Job[];
  };
  ru: {
    jobs: Job[];
  };
}

interface CareersSection {
  id: number;
  section: string;
  data: CareersSectionData;
  createdAt: string;
  updatedAt: string;
}

export default function Careers() {
  const [careersSection, setCareersSection] = useState<CareersSection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ru'>('en');
  const [deleteJobId, setDeleteJobId] = useState<number | null>(null);

  // Modal hooks
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  // Fetch careers section data
  const fetchCareersData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.get('/api/sections/name/careers');
      setCareersSection(response.data.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        // Section doesn't exist yet, create it
        await createCareersSection();
      } else {
        setError(err.response?.data?.message || 'Failed to fetch careers data');
      }
    } finally {
      setLoading(false);
    }
  };

  // Create initial careers section
  const createCareersSection = async () => {
    try {
      const initialData = {
        section: 'careers',
        data: {
          en: { jobs: [] },
          ru: { jobs: [] }
        }
      };
      
      const response = await axiosInstance.post('/api/sections', initialData);
      setCareersSection(response.data.data);
    } catch (err: any) {
      setError('Failed to create careers section');
    }
  };

  // Add or update job
  const handleSaveJob = async (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!careersSection) return;

    try {
      let updatedJobs: Job[];
      
      if (editingJob) {
        // Update existing job
        updatedJobs = careersSection.data[selectedLanguage].jobs.map(job => 
          job.id === editingJob.id 
            ? { ...job, ...jobData, updatedAt: new Date().toISOString() }
            : job
        );
      } else {
        // Add new job
        const newJob: Job = {
          id: Date.now(), // Simple ID generation
          ...jobData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        updatedJobs = [...careersSection.data[selectedLanguage].jobs, newJob];
      }

      const updatedSection = {
        ...careersSection,
        data: {
          ...careersSection.data,
          [selectedLanguage]: { jobs: updatedJobs }
        }
      };

      // Update section in database
      await axiosInstance.put(`/api/sections/${careersSection.id}`, {
        section: careersSection.section,
        data: updatedSection.data
      });

      setCareersSection(updatedSection);
      setIsModalOpen(false);
      setEditingJob(null);
    } catch (err: any) {
      setError('Failed to save job');
    }
  };

  // Delete job
  const handleDeleteJob = (jobId: number) => {
    setDeleteJobId(jobId);
    openDeleteModal();
  };

  const confirmDeleteJob = async () => {
    if (!careersSection || !deleteJobId) return;

    try {
      const updatedJobs = careersSection.data[selectedLanguage].jobs.filter(job => job.id !== deleteJobId);
      const updatedSection = {
        ...careersSection,
        data: {
          ...careersSection.data,
          [selectedLanguage]: { jobs: updatedJobs }
        }
      };

      const response = await axiosInstance.put(`/api/sections/${careersSection.id}`, {
        section: 'careers',
        data: updatedSection.data
      });

      setCareersSection(response.data.data);
      closeDeleteModal();
      setDeleteJobId(null);
    } catch (err: any) {
      setError('Failed to delete job');
    }
  };

  // Open modal for creating new job
  const openCreateModal = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing job
  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  // Get current jobs based on selected language
  const getCurrentJobs = () => {
    return careersSection?.data[selectedLanguage]?.jobs || [];
  };

  useEffect(() => {
    fetchCareersData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const currentJobs = getCurrentJobs();

  return (
    <>
      <PageMeta
        title="Careers Management | Turkmen Gala CMS"
        description="Manage job listings and career opportunities"
      />
      <PageBreadcrumb pageTitle="Careers" />
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <ComponentCard title="Job Listings">
        <div className="space-y-6">
          {/* Language selector and header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white/90">
                Current Positions ({currentJobs.length})
              </h3>
              <div className="flex rounded-lg border border-gray-300 dark:border-gray-700">
                <button
                  onClick={() => setSelectedLanguage('en')}
                  className={`px-3 py-1 text-sm font-medium rounded-l-lg ${
                    selectedLanguage === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setSelectedLanguage('ru')}
                  className={`px-3 py-1 text-sm font-medium rounded-r-lg ${
                    selectedLanguage === 'ru'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  Русский
                </button>
              </div>
            </div>
            <Button onClick={openCreateModal}>
              Add New Job ({selectedLanguage.toUpperCase()})
            </Button>
          </div>

          {/* Jobs table */}
          {currentJobs.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-200 dark:border-gray-800">
                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Job Title
                    </TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Description
                    </TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Created
                    </TableCell>
                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentJobs.map((job) => (
                    <TableRow key={job.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                          {job.title}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div 
                          className="text-sm text-gray-700 dark:text-gray-300 max-w-md"
                          dangerouslySetInnerHTML={{ 
                            __html: job.description.substring(0, 150) + (job.description.length > 150 ? '...' : '')
                          }}
                        />
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(job)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-medium mb-2">No job listings yet ({selectedLanguage.toUpperCase()})</h3>
                <p className="text-sm">Create your first job posting in {selectedLanguage === 'en' ? 'English' : 'Russian'} to get started.</p>
              </div>
            </div>
          )}
        </div>
      </ComponentCard>

      {/* Modal for creating/editing jobs */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CareersForm
          job={editingJob}
          onSave={handleSaveJob}
          onCancel={closeModal}
          language={selectedLanguage}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteJob}
        title="Delete Job"
        itemName={careersSection?.data[selectedLanguage]?.jobs.find(job => job.id === deleteJobId)?.title}
        isLoading={loading}
      />
    </>
  );
}
