import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FiSave, FiEye, FiUpload, FiX, FiTag } from 'react-icons/fi';
import { MdOutlinePublish } from "react-icons/md";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';

const WriteBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    categories: [],
    status: 'draft',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingButton, setLoadingButton] = useState(null);
  const navigate = useNavigate();

  const categoryOptions = [
    { value: 'artificial_intelligence', label: 'Artificial Intelligence' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'smartphone', label: 'Smartphone' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'how_to', label: 'How To' },
    { value: 'news', label: 'News' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
  ];

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'align', 'blockquote', 'code-block', 'link', 'image', 'video'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Please upload a valid image file (JPEG, PNG, GIF, WebP)' }));
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);

      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    document.getElementById('image-upload').value = '';
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter(cat => cat !== value)
        : [...prev.categories, value]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.length > 200) newErrors.title = 'Title must be less than 200 characters';
    if (!formData.content.trim() || formData.content === '<p><br></p>') newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (status) => {
    if (!validateForm()) return;
    setLoadingButton(status);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('status', status);
    formData.categories.forEach(cat => data.append('category_slugs', cat));
    if (formData.image) data.append('image', formData.image);

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/blogs/', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });
      toast.success('Blog posted successfully!');
      if (status === 'published' && res.data.slug) {
        navigate(`/blog/${res.data.slug}`);
      }
      console.log('Posted blog:', res.data);
    } catch (err) {
      console.error('Blog post failed:', err.response?.data || err.message);
      toast.error('Failed to post blog');
    } finally {
      setLoadingButton(null);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Write New Blog Post</h1>
        <p className="text-gray-600">Create and publish your blog content</p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Enter your blog post title..."
            maxLength={200}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          <p className="mt-1 text-sm text-gray-500">{formData.title.length}/200 characters</p>
          {formData.title && (
            <p className="mt-1 text-sm text-gray-500">Slug: {generateSlug(formData.title)}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
          <div className="space-y-3">
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-lg border" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FiX size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
              </div>
            )}
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <FiUpload className="mr-2 h-4 w-4" />
              Choose Image
            </label>
          </div>
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiTag className="inline mr-1 h-4 w-4" />
            Categories
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {categoryOptions.map(category => (
              <label
                key={category.value}
                className={`flex items-center px-3 py-2 border rounded-lg cursor-pointer transition-colors ${formData.categories.includes(category.value)
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={formData.categories.includes(category.value)}
                  onChange={() => handleCategoryChange(category.value)}
                  className="mr-2"
                />
                <span className="text-sm">{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <div className={`border rounded-lg ${errors.content ? 'border-red-500' : 'border-gray-300'}`}>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              modules={modules}
              formats={formats}
              style={{ minHeight: '300px' }}
              placeholder="Write your blog post content here..."
            />
          </div>
          {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium disabled:opacity-60"
            disabled={loadingButton === 'draft' || loadingButton === 'published'}
          >
            {loadingButton === 'draft' ? <ClipLoader size={20} color="#fff" /> : <FiSave className="mr-2 h-4 w-4" />}
            <span className={loadingButton === 'draft' ? 'ml-2 opacity-60' : 'ml-2'}>Save as Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium disabled:opacity-60"
            disabled={loadingButton === 'published'}
          >
            {loadingButton === 'published' ? <ClipLoader size={22} color="#fff" /> : <MdOutlinePublish className="mr-2 h-6 w-6" />}
            <span className={loadingButton === 'published' ? 'ml-2 opacity-60' : 'ml-2'}>Publish</span>
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default WriteBlog;
