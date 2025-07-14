import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import DefaultPfp from '../../assets/Default_pfp.jpg';

const DEFAULT_PFP = DefaultPfp;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [activeTab, setActiveTab] = useState('published');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/user/info/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });
        setUser(res.data);
        setNewName(res.data.full_name || '');
      } catch (err) {
        setError('Failed to load user info');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleNameUpdate = async () => {
    if (!newName.trim() || newName === user.full_name) {
      setEditingName(false);
      return;
    }

    setIsUpdating(true);
    try {
      const res = await axios.patch(
        'http://127.0.0.1:8000/api/user/info/',
        { full_name: newName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );
      setUser({ ...user, full_name: res.data.full_name });
      setEditingName(false);
    } catch (err) {
      setError('Failed to update name');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={40} color="#2563eb" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        <div className="relative">
          <img
            src={user.profile_picture || DEFAULT_PFP}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow"
            onError={e => { e.target.onerror = null; e.target.src = DEFAULT_PFP; }}
          />
          <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          {editingName ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="text-2xl font-bold border-b-2 border-blue-500 focus:outline-none px-1 py-1"
                autoFocus
              />
              <button
                onClick={handleNameUpdate}
                disabled={isUpdating}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition disabled:opacity-50"
              >
                {isUpdating ? (
                  <ClipLoader size={16} color="#ffffff" />
                ) : (
                  'Save'
                )}
              </button>
              <button
                onClick={() => {
                  setEditingName(false);
                  setNewName(user.full_name || '');
                }}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user.full_name || 'No Name Provided'}
              </h2>
              <button
                onClick={() => setEditingName(true)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          )}
          <p className="text-gray-600 mb-3">{user.email}</p>
          <div className="flex gap-4 text-sm">
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              <span className="font-medium">{user.blog_posts?.length || 0}</span> Posts
            </div>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
              <span className="font-medium">{user.drafts?.length || 0}</span> Drafts
            </div>
            <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
              <span className="font-medium">{user.bookmarks?.length || 0}</span> Bookmarks
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('published')}
            className={`py-3 px-1 font-medium text-sm border-b-2 ${activeTab === 'published' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Published Posts
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`py-3 px-1 font-medium text-sm border-b-2 ${activeTab === 'drafts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Drafts
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`py-3 px-1 font-medium text-sm border-b-2 ${activeTab === 'bookmarks' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Bookmarks
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'published' && (
          <div>
            <h3 className="sr-only">Published Blog Posts</h3>
            {user.blog_posts && user.blog_posts.filter(post => post.status === 'published').length > 0 ? (
              <ul className="space-y-3">
                {user.blog_posts.filter(post => post.status === 'published').map(post => (
                  <li key={post.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt || 'No excerpt available'}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {post.view_count || 0}
                        </span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="mt-3 text-lg font-medium text-gray-900">No published posts yet</h4>
                <p className="mt-1 text-gray-500">Your published articles will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'drafts' && (
          <div>
            <h3 className="sr-only">Drafts</h3>
            {user.drafts && user.drafts.length > 0 ? (
              <ul className="space-y-3">
                {user.drafts.map(draft => (
                  <li key={draft.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-yellow-300 transition shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{draft.title || 'Untitled Draft'}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{draft.excerpt || 'No excerpt available'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {draft.status || 'draft'}
                        </span>
                        <span className="text-sm text-gray-500">{new Date(draft.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h4 className="mt-3 text-lg font-medium text-gray-900">No drafts yet</h4>
                <p className="mt-1 text-gray-500">Your draft articles will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div>
            <h3 className="sr-only">Bookmarks</h3>
            {user.bookmarks && user.bookmarks.length > 0 ? (
              <ul className="space-y-3">
                {user.bookmarks.map(bm => (
                  <li key={bm.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{bm.post.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{bm.post.excerpt || 'No excerpt available'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          bm.post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {bm.post.status}
                        </span>
                        <span className="text-sm text-gray-500">{new Date(bm.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <h4 className="mt-3 text-lg font-medium text-gray-900">No bookmarks yet</h4>
                <p className="mt-1 text-gray-500">Save articles to read later and they'll appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;