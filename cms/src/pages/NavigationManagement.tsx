import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';
import { useModal } from '../hooks/useModal';

interface NavigationItem {
  id: number;
  name: string;
  nameRu: string;
  link: string;
}

interface Subcategory {
  id: number;
  name: string;
  nameRu: string;
  items: NavigationItem[];
}

interface Category {
  id: number;
  name: string;
  nameRu: string;
  icon: string;
  brands?: string[];
  subcategories: Subcategory[];
}

interface FeaturedBrands {
  title: string;
  titelRussian: string;
}

interface NavigationData {
  featuredBrands: FeaturedBrands;
  categories: Category[];
}

const NavigationManagement: React.FC = () => {
  const [navigationSection, setNavigationSection] = useState<any>(null);
  const [navigationData, setNavigationData] = useState<NavigationData>({
    featuredBrands: {
      title: "Featured Brands",
      titelRussian: "Рекомендуемые бренды"
    },
    categories: []
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ru'>('en');
  const [activeTab, setActiveTab] = useState<'featured-brands' | 'categories' | 'subcategories' | 'items'>('featured-brands');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);

  // Form states
  const [featuredBrandsForm, setFeaturedBrandsForm] = useState({ title: '', titelRussian: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '', nameRu: '', icon: '', brands: '' });
  const [subcategoryForm, setSubcategoryForm] = useState({ name: '', nameRu: '' });
  const [itemForm, setItemForm] = useState({ name: '', nameRu: '', link: '' });
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<number | null>(null);

  // Delete modal states
  const [deleteType, setDeleteType] = useState<'category' | 'subcategory' | 'item' | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteItemName, setDeleteItemName] = useState<string>('');

  // Modal hooks
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  useEffect(() => {
    fetchNavigationData();
  }, []);

  const fetchNavigationData = async () => {
    setLoading(true);
    try {
      // Try to fetch existing navigation section
      const response = await axiosInstance.get('/api/sections');
      const sections = response.data.data;
      const navSection = sections.find((section: any) => section.section === 'navigation');
      
      if (navSection) {
        setNavigationSection(navSection);
        setNavigationData(navSection.data || {
          featuredBrands: {
            title: "Featured Brands",
            titelRussian: "Рекомендуемые бренды"
          },
          categories: []
        });
      } else {
        // Create default structure if no navigation section exists
        setNavigationData({
          featuredBrands: {
            title: "Featured Brands",
            titelRussian: "Рекомендуемые бренды"
          },
          categories: []
        });
      }
    } catch (error) {
      setErrors(['Error fetching navigation data']);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNavigationData = async () => {
    setSubmitting(true);
    setErrors([]);
    
    try {
      // Update featured brands data if form has values
      const updatedNavigationData = {
        ...navigationData,
        featuredBrands: {
          title: featuredBrandsForm.title || navigationData.featuredBrands.title,
          titelRussian: featuredBrandsForm.titelRussian || navigationData.featuredBrands.titelRussian
        }
      };

      const requestData = {
        section: 'navigation',
        data: updatedNavigationData,
      };

      let response;
      if (navigationSection) {
        response = await axiosInstance.put(`/api/sections/${navigationSection.id}`, requestData);
      } else {
        response = await axiosInstance.post('/api/sections', requestData);
      }

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Navigation data saved successfully!');
        if (!navigationSection) {
          setNavigationSection(response.data.data);
        }
        // Update local state with the saved data
        setNavigationData(updatedNavigationData);
        // Reset form
        setFeaturedBrandsForm({ title: '', titelRussian: '' });
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error: any) {
      setErrors([error.response?.data?.message || 'Error saving navigation data']);
    } finally {
      setSubmitting(false);
    }
  };

  // Category CRUD operations
  const addCategory = () => {
    if (!categoryForm.name.trim()) return;
    
    const newCategory: Category = {
      id: Date.now(),
      name: categoryForm.name,
      nameRu: categoryForm.nameRu,
      icon: categoryForm.icon || 'bi-circle',
      brands: categoryForm.brands ? categoryForm.brands.split(',').map(b => b.trim()).filter(b => b) : [],
      subcategories: []
    };

    setNavigationData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));

    setCategoryForm({ name: '', nameRu: '', icon: '', brands: '' });
  };

  const updateCategory = (categoryId: number) => {
    if (!categoryForm.name.trim()) return;

    setNavigationData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? { 
              ...cat, 
              name: categoryForm.name, 
              nameRu: categoryForm.nameRu, 
              icon: categoryForm.icon,
              brands: categoryForm.brands ? categoryForm.brands.split(',').map(b => b.trim()).filter(b => b) : []
            }
          : cat
      )
    }));

    setEditingCategory(null);
    setCategoryForm({ name: '', nameRu: '', icon: '', brands: '' });
  };

  const deleteCategory = (categoryId: number) => {
    const category = getCurrentCategories().find(cat => cat.id === categoryId);
    setDeleteType('category');
    setDeleteId(categoryId);
    setDeleteItemName(category?.name || 'this category');
    openDeleteModal();
  };

  // Subcategory CRUD operations
  const addSubcategory = () => {
    if (!subcategoryForm.name.trim() || !selectedCategoryId) return;
    
    const newSubcategory: Subcategory = {
      id: Date.now(),
      name: subcategoryForm.name,
      nameRu: subcategoryForm.nameRu,
      items: []
    };

    setNavigationData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === selectedCategoryId
          ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
          : cat
      )
    }));

    setSubcategoryForm({ name: '', nameRu: '' });
  };

  const updateSubcategory = (subcategoryId: number) => {
    if (!subcategoryForm.name.trim() || !selectedCategoryId) return;

    setNavigationData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === selectedCategoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.map(sub =>
                sub.id === subcategoryId
                  ? { 
                      ...sub, 
                      name: subcategoryForm.name, 
                      nameRu: subcategoryForm.nameRu
                    }
                  : sub
              )
            }
          : cat
      )
    }));

    setEditingSubcategory(null);
    setSubcategoryForm({ name: '', nameRu: '' });
  };

  const deleteSubcategory = (subcategoryId: number) => {
    const subcategory = getCurrentCategory()?.subcategories.find(sub => sub.id === subcategoryId);
    setDeleteType('subcategory');
    setDeleteId(subcategoryId);
    setDeleteItemName(subcategory?.name || 'this subcategory');
    openDeleteModal();
  };

  // Item CRUD operations
  const addItem = () => {
    if (!itemForm.name.trim() || !itemForm.link.trim() || !selectedCategoryId || !selectedSubcategoryId) return;
    
    const newItem: NavigationItem = {
      id: Date.now(),
      name: itemForm.name,
      nameRu: itemForm.nameRu,
      link: itemForm.link
    };

    setNavigationData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === selectedCategoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.map(sub =>
                sub.id === selectedSubcategoryId
                  ? { ...sub, items: [...sub.items, newItem] }
                  : sub
              )
            }
          : cat
      )
    }));

    setItemForm({ name: '', nameRu: '', link: '' });
  };

  const updateItem = (itemId: number) => {
    if (!itemForm.name.trim() || !itemForm.link.trim() || !selectedCategoryId || !selectedSubcategoryId) return;

    setNavigationData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === selectedCategoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.map(sub =>
                sub.id === selectedSubcategoryId
                  ? {
                      ...sub,
                      items: sub.items.map(item =>
                        item.id === itemId
                          ? { ...item, name: itemForm.name, nameRu: itemForm.nameRu, link: itemForm.link }
                          : item
                      )
                    }
                  : sub
              )
            }
          : cat
      )
    }));

    setEditingItem(null);
    setItemForm({ name: '', nameRu: '', link: '' });
  };

  const deleteItem = (itemId: number) => {
    const item = getCurrentSubcategory()?.items.find(itm => itm.id === itemId);
    setDeleteType('item');
    setDeleteId(itemId);
    setDeleteItemName(item?.name || 'this item');
    openDeleteModal();
  };

  const confirmDelete = () => {
    if (!deleteId || !deleteType) return;

    if (deleteType === 'category') {
      setNavigationData(prev => ({
        ...prev,
        categories: prev.categories.filter(cat => cat.id !== deleteId)
      }));
    } else if (deleteType === 'subcategory' && selectedCategoryId) {
      setNavigationData(prev => ({
        ...prev,
        categories: prev.categories.map(cat =>
          cat.id === selectedCategoryId
            ? { ...cat, subcategories: cat.subcategories.filter(sub => sub.id !== deleteId) }
            : cat
        )
      }));
    } else if (deleteType === 'item' && selectedCategoryId && selectedSubcategoryId) {
      setNavigationData(prev => ({
        ...prev,
        categories: prev.categories.map(cat =>
          cat.id === selectedCategoryId
            ? {
                ...cat,
                subcategories: cat.subcategories.map(sub =>
                  sub.id === selectedSubcategoryId
                    ? { ...sub, items: sub.items.filter(item => item.id !== deleteId) }
                    : sub
                )
              }
            : cat
        )
      }));
    }

    // Reset modal state
    closeDeleteModal();
    setDeleteType(null);
    setDeleteId(null);
    setDeleteItemName('');
  };

  const getCurrentCategories = () => navigationData.categories || [];
  const getCurrentCategory = () => getCurrentCategories().find(cat => cat.id === selectedCategoryId);
  const getCurrentSubcategory = () => getCurrentCategory()?.subcategories.find(sub => sub.id === selectedSubcategoryId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Navigation Management</h2>
          <div className="flex space-x-3">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'ru')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English (EN)</option>
              <option value="ru">Russian (RU)</option>
            </select>
            <button
              onClick={saveNavigationData}
              disabled={submitting}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {submitting && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{submitting ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            {errors.map((error, index) => (
              <p key={index} className="text-red-700">{error}</p>
            ))}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('featured-brands')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'featured-brands'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Featured Brands
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('subcategories')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'subcategories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Subcategories
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'items'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Items
            </button>
          </nav>
        </div>

        {/* Featured Brands Tab */}
        {activeTab === 'featured-brands' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Featured Brands Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title (English)"
                  value={featuredBrandsForm?.title || navigationData.featuredBrands.title}
                  onChange={(e) => setFeaturedBrandsForm({ ...featuredBrandsForm, title: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Title (Russian)"
                  value={featuredBrandsForm.titelRussian || navigationData.featuredBrands.titelRussian}
                  onChange={(e) => setFeaturedBrandsForm({ ...featuredBrandsForm, titelRussian: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">Changes will be saved when you click "Save Changes" button above.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-semibold mb-3">Current Settings</h4>
              <div className="space-y-2">
                <p><strong>English Title:</strong> {navigationData.featuredBrands.title}</p>
                <p><strong>Russian Title:</strong> {navigationData.featuredBrands.titelRussian}</p>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Category Name (English)"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Category Name (Russian)"
                  value={categoryForm.nameRu}
                  onChange={(e) => setCategoryForm({ ...categoryForm, nameRu: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Bootstrap Icon (e.g., bi-house)"
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Brands (comma separated)"
                  value={categoryForm.brands}
                  onChange={(e) => setCategoryForm({ ...categoryForm, brands: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={editingCategory ? () => updateCategory(editingCategory) : addCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Categories ({selectedLanguage.toUpperCase()})</h3>
              {getCurrentCategories().map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center space-x-3">
                    <i className={`bi ${category.icon} text-lg`}></i>
                    <div className="flex flex-col">
                      <span className="font-medium">{selectedLanguage === 'en' ? category.name : category.nameRu}</span>
                      <span className="text-sm text-gray-500">({category.subcategories.length} subcategories)</span>
                      {category.brands && category.brands.length > 0 && (
                        <span className="text-xs text-blue-600">Brands: {category.brands.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setCategoryForm({ 
                          name: category.name, 
                          nameRu: category.nameRu, 
                          icon: category.icon,
                          brands: category.brands ? category.brands.join(', ') : ''
                        });
                        setEditingCategory(category.id);
                      }}
                      className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subcategories Tab */}
        {activeTab === 'subcategories' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Manage Subcategories</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <select
                  value={selectedCategoryId || ''}
                  onChange={(e) => setSelectedCategoryId(Number(e.target.value) || null)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {getCurrentCategories().map((category) => (
                    <option key={category.id} value={category.id}>
                      {selectedLanguage === 'en' ? category.name : category.nameRu}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Subcategory Name (English)"
                  value={subcategoryForm.name}
                  onChange={(e) => setSubcategoryForm({ ...subcategoryForm, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedCategoryId}
                />
                <input
                  type="text"
                  placeholder="Subcategory Name (Russian)"
                  value={subcategoryForm.nameRu}
                  onChange={(e) => setSubcategoryForm({ ...subcategoryForm, nameRu: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedCategoryId}
                />
                <button
                  onClick={editingSubcategory ? () => updateSubcategory(editingSubcategory) : addSubcategory}
                  disabled={!selectedCategoryId}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {editingSubcategory ? 'Update' : 'Add Subcategory'}
                </button>
              </div>
            </div>

            {selectedCategoryId && getCurrentCategory() && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                  Subcategories for "{selectedLanguage === 'en' ? getCurrentCategory()?.name : getCurrentCategory()?.nameRu}"
                </h3>
                {getCurrentCategory()?.subcategories.map((subcategory) => (
                  <div key={subcategory.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{selectedLanguage === 'en' ? subcategory.name : subcategory.nameRu}</span>
                        <span className="text-sm text-gray-500">({subcategory.items.length} items)</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSubcategoryForm({ 
                            name: subcategory.name, 
                            nameRu: subcategory.nameRu
                          });
                          setEditingSubcategory(subcategory.id);
                        }}
                        className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSubcategory(subcategory.id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Manage Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  value={selectedCategoryId || ''}
                  onChange={(e) => {
                    setSelectedCategoryId(Number(e.target.value) || null);
                    setSelectedSubcategoryId(null);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {getCurrentCategories().map((category) => (
                    <option key={category.id} value={category.id}>
                      {selectedLanguage === 'en' ? category.name : category.nameRu}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedSubcategoryId || ''}
                  onChange={(e) => setSelectedSubcategoryId(Number(e.target.value) || null)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedCategoryId}
                >
                  <option value="">Select Subcategory</option>
                  {getCurrentCategory()?.subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {selectedLanguage === 'en' ? subcategory.name : subcategory.nameRu}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Item Name (English)"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedSubcategoryId}
                />
                <input
                  type="text"
                  placeholder="Item Name (Russian)"
                  value={itemForm.nameRu}
                  onChange={(e) => setItemForm({ ...itemForm, nameRu: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedSubcategoryId}
                />
                <input
                  type="url"
                  placeholder="Item Link"
                  value={itemForm.link}
                  onChange={(e) => setItemForm({ ...itemForm, link: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedSubcategoryId}
                />
                <button
                  onClick={editingItem ? () => updateItem(editingItem) : addItem}
                  disabled={!selectedSubcategoryId}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </div>

            {selectedSubcategoryId && getCurrentSubcategory() && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                  Items for "{selectedLanguage === 'en' ? getCurrentSubcategory()?.name : getCurrentSubcategory()?.nameRu}"
                </h3>
                {getCurrentSubcategory()?.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">{selectedLanguage === 'en' ? item.name : item.nameRu}</span>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        {item.link}
                      </a>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setItemForm({ name: item.name, nameRu: item.nameRu, link: item.link });
                          setEditingItem(item.id);
                        }}
                        className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={`Delete ${deleteType || 'Item'}`}
        itemName={deleteItemName}
        message={`Are you sure you want to delete this ${deleteType}? This action cannot be undone.`}
      />
    </div>
  );
};

export default NavigationManagement;
