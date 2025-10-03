import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useSearchParams } from 'react-router';
import ImageUpload from '../common/ImageUpload';

interface SectorItemServiceDetailsFormProps {
  onSuccess?: () => void;
  detailId?: number;
}

const SectorItemServiceDetailsForm: React.FC<
  SectorItemServiceDetailsFormProps
> = ({ onSuccess, detailId }) => {
  const [form, setForm] = useState({
    title: '',
    titleRu: '',
    description: [''],
    descriptionRu: [''],
    imageSrc: '',
    pdfUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const sectorItemServiceIdParam =
    searchParams.get('sectorItemServiceId') || '';

  // Fetch existing details if editing
  useEffect(() => {
    if (detailId) {
      setLoading(true);
      axiosInstance
        .get(`/api/sector-item-service-details/${detailId}`)
        .then((res) => {
          setForm({
            title: res.data.title || '',
            titleRu: res.data.titleRu || '',
            description: Array.isArray(res.data.description)
              ? res.data.description
              : [res.data.description || ''],
            descriptionRu: Array.isArray(res.data.descriptionRu)
              ? res.data.descriptionRu
              : [res.data.descriptionRu || ''],
            imageSrc: res.data.imageSrc || '',
            pdfUrl: res.data.pdfUrl || '',
          });
        })
        .catch((err) =>
          setError(err.response?.data?.error || 'Failed to fetch details')
        )
        .finally(() => setLoading(false));
    }
  }, [detailId]);

  const handleDescriptionChange = (idx: number, value: string) => {
    setForm((f) => ({
      ...f,
      description: f.description.map((desc, i) => (i === idx ? value : desc)),
    }));
  };

  const handleDescriptionRuChange = (idx: number, value: string) => {
    setForm((f) => ({
      ...f,
      descriptionRu: f.descriptionRu.map((desc, i) =>
        i === idx ? value : desc
      ),
    }));
  };

  const addDescriptionField = () => {
    setForm((f) => ({ ...f, description: [...f.description, ''] }));
  };

  const addDescriptionRuField = () => {
    setForm((f) => ({ ...f, descriptionRu: [...f.descriptionRu, ''] }));
  };

  const removeDescriptionField = (idx: number) => {
    setForm((f) => ({
      ...f,
      description: f.description.filter((_, i) => i !== idx),
    }));
  };

  const removeDescriptionRuField = (idx: number) => {
    setForm((f) => ({
      ...f,
      descriptionRu: f.descriptionRu.filter((_, i) => i !== idx),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url: string) => {
    setForm({ ...form, imageSrc: url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (detailId) {
        await axiosInstance.put(
          `/api/sector-item-service-details/${detailId}`,
          {
            ...form,
            description: form.description,
            descriptionRu: form.descriptionRu,
            sectorItemServiceId: Number(sectorItemServiceIdParam),
          }
        );
      } else {
        await axiosInstance.post('/api/sector-item-service-details', {
          ...form,
          description: form.description,
          descriptionRu: form.descriptionRu,
          sectorItemServiceId: Number(sectorItemServiceIdParam),
        });
      }
      setSuccess(true);
      if (!detailId)
        setForm({
          title: '',
          titleRu: '',
          description: [''],
          descriptionRu: [''],
          imageSrc: '',
          pdfUrl: '',
        });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error saving service details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mx-auto p-4 border rounded shadow bg-white"
    >
      {/* <h2 className="text-xl font-bold mb-2">{detailId ? 'Update' : 'Create'} Service Details</h2> */}

      <div className="flex flex-row gap-4">
        <div>
          <label className="block font-medium mb-1">Title (English)</label>
          <input
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title (English)"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="titleRu" className="block font-medium mb-1">
            Title (Russian)
          </label>
          <input
            name="titleRu"
            value={form.titleRu}
            onChange={(e) => setForm({ ...form, titleRu: e.target.value })}
            placeholder="Title (Russian)"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div>
          <label className="block font-medium mb-1">
            Description (English)
          </label>
          {form.description.map((desc, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <textarea
                value={desc}
                onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                placeholder={`Description ${idx + 1} (English)`}
                className="w-full border px-3 py-2 rounded"
                required
                rows={2}
              />
              {form.description.length > 1 && (
                <button
                  type="button"
                  className="ml-2 text-red-600 hover:text-red-800 text-lg"
                  onClick={() => removeDescriptionField(idx)}
                  title="Remove"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 mt-1"
            onClick={addDescriptionField}
          >
            + Add Description (English)
          </button>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Description (Russian)
          </label>
          {form.descriptionRu.map((desc, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <textarea
                value={desc}
                onChange={(e) => handleDescriptionRuChange(idx, e.target.value)}
                placeholder={`Description ${idx + 1} (Russian)`}
                className="w-full border px-3 py-2 rounded"
                required
                rows={2}
              />
              {form.descriptionRu.length > 1 && (
                <button
                  type="button"
                  className="ml-2 text-red-600 hover:text-red-800 text-lg"
                  onClick={() => removeDescriptionRuField(idx)}
                  title="Remove"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 mt-1"
            onClick={addDescriptionRuField}
          >
            + Add Description (Russian)
          </button>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Image</label>
        <ImageUpload
          value={form.imageSrc}
          onChange={handleImageUpload}
          required={true}
          options={{
            quality: 0.8,
            maxWidth: 1920,
            maxHeight: 1080,
          }}
        />
      </div>

      <input
        name="pdfUrl"
        value={form.pdfUrl}
        onChange={handleChange}
        placeholder="PDF URL (optional)"
        className="w-full border px-3 py-2 rounded"
        type="url"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading
          ? detailId
            ? 'Updating...'
            : 'Submitting...'
          : detailId
          ? 'Update'
          : 'Create'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {success && (
        <div className="text-green-600">
          Service details {detailId ? 'updated' : 'created'}!
        </div>
      )}
    </form>
  );
};

export default SectorItemServiceDetailsForm;
