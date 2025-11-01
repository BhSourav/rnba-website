'use client';

import { useState, useEffect } from 'react';
import { FiFile, FiDownload, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFileId, setEditingFileId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/upload');
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDelete = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      const response = await fetch(`/api/upload/${fileId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setFiles(files.filter(file => file.id !== fileId));
      } else {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file');
    }
  };

  const startEditing = (file) => {
    setEditingFileId(file.id);
    setEditName(file.displayName);
  };

  const cancelEditing = () => {
    setEditingFileId(null);
    setEditName('');
  };

  const saveFileName = async (fileId) => {
    try {
      const response = await fetch(`/api/upload/${fileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName: editName }),
      });
      
      if (response.ok) {
        setFiles(files.map(file => 
          file.id === fileId ? { ...file, displayName: editName } : file
        ));
        setEditingFileId(null);
      } else {
        throw new Error('Failed to update file name');
      }
    } catch (error) {
      console.error('Error updating file name:', error);
      alert('Failed to update file name');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No files uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiFile className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                    <div className="text-sm font-medium text-gray-900">
                      {editingFileId === file.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          autoFocus
                        />
                      ) : (
                        <a 
                          href={file.path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {file.displayName}
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatFileSize(file.size)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(file.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {editingFileId === file.id ? (
                      <>
                        <button
                          onClick={() => saveFileName(file.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Save"
                        >
                          <FiCheck className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-gray-500 hover:text-gray-700"
                          title="Cancel"
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <a
                          href={file.path}
                          download={file.displayName}
                          className="text-blue-600 hover:text-blue-900"
                          title="Download"
                        >
                          <FiDownload className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => startEditing(file)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Rename"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
