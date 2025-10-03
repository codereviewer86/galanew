import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import Button from '../ui/button/Button';
import ImageUpload from '../common/ImageUpload';

interface SectorItemFormProps {
  onSuccess?: () => void;
  itemId?: number | null;
  onClose?: () => void;
  sectorType?: 'ENERGY' | 'INFRA';
}

const SectorItemForm: React.FC<SectorItemFormProps> = ({ onSuccess, itemId, onClose, sectorType }) => {
  const [form, setForm] = useState({ 
    img: '', 
    label: '', 
    labelRu: '',
    description: '',
    descriptionRu: '',
    type: sectorType || 'ENERGY'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch item data for update
  useEffect(() => {
    if (itemId) {
      setLoading(true);
      axiosInstance.get(`/api/sector-items/${itemId}`)
        .then(res => {
          setForm(res.data);
        })
        .catch(() => setError('Failed to fetch item'))
        .finally(() => setLoading(false));
    } else {
      setForm({ 
        img: '', 
        label: '', 
        labelRu: '',
        description: '',
        descriptionRu: '',
        type: sectorType || 'ENERGY'
      });
    }
  }, [itemId, sectorType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url: string) => {
    setForm({ ...form, img: url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      if (itemId) {
        await axiosInstance.put(`/api/sector-items/${itemId}`, form);
      } else {
        await axiosInstance.post('/api/sector-items', form);
      }
      
      setSuccess(true);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.message || err.response?.data?.error || 'Error saving sector item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <ImageUpload
          value={form.img}
          onChange={handleImageUpload}
          required={!itemId} // Required for new items only
          options={{
            quality: 0.8,
            maxWidth: 1920,
            maxHeight: 1080,
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="label">Label (English)</Label>
          <Input
            type="text"
            id="label"
            name="label"
            value={form.label}
            onChange={handleChange}
            placeholder="Enter label in English"
          />
        </div>

        <div>
          <Label htmlFor="labelRu">Label (Russian)</Label>
          <Input
            type="text"
            id="labelRu"
            name="labelRu"
            value={form.labelRu}
            onChange={handleChange}
            placeholder="Enter label in Russian"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="description">Description (English)</Label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description in English (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="descriptionRu">Description (Russian)</Label>
          <textarea
            id="descriptionRu"
            name="descriptionRu"
            value={form.descriptionRu}
            onChange={handleChange}
            placeholder="Enter description in Russian (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 justify-end">
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
        >
          {loading
            ? itemId
              ? 'Updating...'
              : 'Creating...'
            : itemId
            ? 'Update'
            : 'Create'}
        </button>
      </div>

      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      {success && (
        <div className="text-green-600 text-sm mt-2">
          Sector item {itemId ? 'updated' : 'created'} successfully!
        </div>
      )}
    </form>
  );
};

export default SectorItemForm;
