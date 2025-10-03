import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import axiosInstance from '../../utils/axiosInstance';
import ImageUpload from '../common/ImageUpload';

interface SectorItemServiceFormProps {
  onSuccess?: () => void;
  serviceId?: number;
  mode?: 'create' | 'update';
  initialData?: {
    to: string;
    img: string;
    brandLogo?: string;
    label: string;
    labelRu: string;
    description?: string;
    descriptionRu?: string;
  };
}

const SectorItemServiceForm: React.FC<SectorItemServiceFormProps> = ({
  onSuccess,
  serviceId,
  mode = 'create',
  initialData,
}) => {
  const [searchParams] = useSearchParams();
  const sectorItemIdParam = searchParams.get('sectorItemId') || '';
  const [form, setForm] = useState(
    initialData || {
      img: '',
      brandLogo: '',
      label: '',
      labelRu: '',
      description: '',
      descriptionRu: '',
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url: string) => {
    setForm({ ...form, img: url });
  };

  const handleBrandLogoUpload = (url: string) => {
    setForm({ ...form, brandLogo: url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = {
        ...form,
        sectorItemId: Number(sectorItemIdParam),
      };

      if (mode === 'update' && serviceId) {
        // Update existing service
        await axiosInstance.put(
          `/api/sector-item-services/${serviceId}`,
          formData
        );
        setSuccess(true);
      } else {
        // Create new service
        await axiosInstance.post('/api/sector-item-services', formData);
        setSuccess(true);
        setForm({
          img: '',
          brandLogo: '',
          label: '',
          labelRu: '',
          description: '',
          descriptionRu: '',
        });
      }

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(
        err.message ||
          err.response?.data?.error ||
          `Error ${
            mode === 'update' ? 'updating' : 'creating'
          } sector item service`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!serviceId) return;

    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/api/sector-item-services/${serviceId}`);
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Error deleting sector item service'
      );
    } finally {
      setLoading(false);
    }
  };

  // Load existing data when in update mode
  React.useEffect(() => {
    if (mode === 'update' && serviceId && !initialData) {
      const loadServiceData = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/sector-item-services/${serviceId}`
          );
          setForm({
            img: response.data.img || '',
            brandLogo: response.data.brandLogo || '',
            label: response.data.label || '',
            labelRu: response.data.labelRu || '',
            description: response.data.description || '',
            descriptionRu: response.data.descriptionRu || '',
          });
        } catch (err: any) {
          setError('Error loading service data');
        }
      };
      loadServiceData();
    }
  }, [mode, serviceId, initialData]);

  // Optionally, update sectorItemId if the param changes
  React.useEffect(() => {
    setForm((f) => ({ ...f, sectorItemId: sectorItemIdParam }));
  }, [sectorItemIdParam]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded shadow bg-white"
    >
      {/* <h2 className="text-xl font-bold mb-2">
        {mode === 'update' ? 'Update Sector Item Service' : 'Create Sector Item Service'}
      </h2> */}

      {/* Image Upload Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Service Image
        </label>
        <ImageUpload
          value={form.img}
          onChange={handleImageUpload}
          required={mode === 'create' && !form.img}
          options={{
            quality: 0.8,
            maxWidth: 1920,
            maxHeight: 1080,
          }}
        />
      </div>

      {/* Brand Logo Upload Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Brand Logo
        </label>
        <ImageUpload
          value={form.brandLogo}
          onChange={handleBrandLogoUpload}
          required={false}
          options={{
            quality: 0.9,
            maxWidth: 800,
            maxHeight: 600,
          }}
        />
      </div>

      <div className="flex flex-row gap-4">
        <input
          name="label"
          value={form.label}
          onChange={handleChange}
          placeholder="Label (English)"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="labelRu"
          value={form.labelRu}
          onChange={handleChange}
          placeholder="Label (Russian)"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="flex flex-row gap-4">
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description in English (optional)"
          className="w-full border px-3 py-2 rounded min-h-[100px] resize-vertical"
          rows={4}
        />

        <textarea
          name="descriptionRu"
          value={form.descriptionRu}
          onChange={handleChange}
          placeholder="Description in Russian (optional)"
          className="w-full border px-3 py-2 rounded min-h-[100px] resize-vertical"
          rows={4}
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Processing...' : mode === 'update' ? 'Update' : 'Create'}
        </button>

        {mode === 'update' && serviceId && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>

      {error && <div className="text-red-600">{error}</div>}
      {success && (
        <div className="text-green-600">
          {mode === 'update'
            ? 'Sector item service updated successfully!'
            : 'Sector item service created successfully!'}
        </div>
      )}
    </form>
  );
};

export default SectorItemServiceForm;
