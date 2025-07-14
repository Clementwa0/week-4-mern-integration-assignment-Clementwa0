import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { postsAPI, categoriesAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Save, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const schema = yup.object({
  title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
  content: yup.string().min(10, 'Content must be at least 10 characters').required('Content is required'),
  excerpt: yup.string().max(200, 'Excerpt cannot be more than 200 characters'),
  category: yup.string().required('Category is required'),
  tags: yup.string(),
  isPublished: yup.boolean(),
}).required();

const CreatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isPublished: false,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchPost();
      setIsEditing(true);
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getById(id);
      const post = response.data;
      
      setValue('title', post.title);
      setValue('content', post.content);
      setValue('excerpt', post.excerpt || '');
      setValue('category', post.category._id);
      setValue('tags', post.tags?.join(', ') || '');
      setValue('isPublished', post.isPublished);
    } catch (err) {
      console.error('Error fetching post:', err);
      navigate('/posts');
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Convert tags string to array
      const tags = data.tags
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

      const postData = {
        ...data,
        tags,
      };

      if (isEditing) {
        await postsAPI.update(id, postData);
      } else {
        await postsAPI.create(postData);
      }

      navigate('/posts');
    } catch (err) {
      console.error('Error saving post:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Please log in to create a post.</p>
        <Button onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/posts')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Posts</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center space-x-2"
        >
          {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{previewMode ? 'Hide Preview' : 'Show Preview'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</CardTitle>
              <CardDescription>
                {isEditing ? 'Update your post content and settings.' : 'Share your thoughts with the world.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter post title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt (optional)
                  </label>
                  <textarea
                    {...register('excerpt')}
                    id="excerpt"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Brief description of your post"
                  />
                  {errors.excerpt && (
                    <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register('category')}
                    id="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (optional)
                  </label>
                  <input
                    {...register('tags')}
                    type="text"
                    id="tags"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tags separated by commas"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate tags with commas (e.g., technology, programming, web)
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    {...register('content')}
                    id="content"
                    rows="15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Write your post content here..."
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                  )}
                </div>

                {/* Published Status */}
                <div className="flex items-center space-x-2">
                  <input
                    {...register('isPublished')}
                    type="checkbox"
                    id="isPublished"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                    Publish immediately
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/posts')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        {previewMode && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  How your post will appear to readers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {watchedValues.title || 'Post Title'}
                  </h2>
                  
                  {watchedValues.excerpt && (
                    <p className="text-gray-600">{watchedValues.excerpt}</p>
                  )}

                  {watchedValues.category && (
                    <div className="mb-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {categories.find(c => c._id === watchedValues.category)?.name || 'Category'}
                      </span>
                    </div>
                  )}

                  {watchedValues.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {watchedValues.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700">
                      {watchedValues.content || 'Your content will appear here...'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost; 