'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiFile, FiCheck } from 'react-icons/fi';

export default function FileUploadDialog({ isOpen, onClose, onUpload }) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map(file => ({
      file,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type,
      customName: ''
    }));
    setFiles(selectedFiles);
  };

  const handleCustomNameChange = (index, value) => {
    const updatedFiles = [...files];
    updatedFiles[index].customName = value;
    setFiles(updatedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    try {
      const formData = new FormData();
      
      // Add each file with its custom name
      files.forEach((fileData, index) => {
        const displayName = fileData.customName || fileData.name;
        formData.append(`files[${index}][file]`, fileData.file);
        formData.append(`files[${index}][displayName]`, displayName);
      });

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Replace with your actual API endpoint
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(interval);
      setUploadProgress(100);
      
      if (response.ok) {
        setUploadComplete(true);
        const result = await response.json();
        if (onUpload) {
          onUpload(result);
        }
        
        // Reset after successful upload
        setTimeout(() => {
          setFiles([]);
          setUploadComplete(false);
          setUploadProgress(0);
          onClose();
        }, 1500);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Upload Files</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isUploading}
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          {!uploadComplete ? (
            <>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => !isUploading && fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  disabled={isUploading}
                />
                <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  {files.length > 0 
                    ? `${files.length} file(s) selected` 
                    : 'Drag & drop files here or click to browse'}
                </p>
                <p className="text-sm text-gray-500">
                  Max file size: 10MB per file
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Selected Files</h3>
                  <div className="space-y-3">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <FiFile className="text-blue-500 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </div>
                            <div className="text-xs text-gray-500">{file.size}</div>
                            <input
                              type="text"
                              className="mt-1 block w-full text-sm border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 bg-transparent"
                              placeholder="Custom name (optional)"
                              value={file.customName}
                              onChange={(e) => handleCustomNameChange(index, e.target.value)}
                              disabled={isUploading}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          disabled={isUploading}
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Complete!</h3>
              <p className="text-gray-600">
                Your files have been uploaded successfully.
              </p>
            </div>
          )}
        </div>

        {!uploadComplete && (
          <div className="flex justify-end p-4 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mr-3"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm ${
                files.length === 0 || isUploading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
