import React, { useState, useEffect } from 'react';

export default function ApplicationsViewer() {
  const [applications, setApplications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadApplications = () => {
      const savedApplications = JSON.parse(localStorage.getItem('internshipApplications') || '[]');
      setApplications(savedApplications);
    };

    loadApplications();
    
    // Refresh applications when the component is opened
    if (isOpen) {
      loadApplications();
    }
  }, [isOpen]);

  const clearAllApplications = () => {
    if (window.confirm('Are you sure you want to clear all applications?')) {
      localStorage.removeItem('internshipApplications');
      setApplications([]);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        View Applications ({applications.length})
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">My Applications ({applications.length})</h2>
          <div className="space-x-2">
            <button
              onClick={clearAllApplications}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No applications found. Apply to some internships first!</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{app.internshipTitle}</h3>
                    <p className="text-gray-600">{app.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(app.appliedAt)}</span>
                </div>
                
                <div className="mt-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    app.type === 'resume_upload' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {app.type === 'resume_upload' ? 'Resume Upload' : 'Manual Form'}
                  </span>
                </div>

                {app.type === 'resume_upload' ? (
                  <div className="mt-2 text-sm">
                    <p><strong>File:</strong> {app.fileName}</p>
                    <p><strong>Size:</strong> {formatFileSize(app.fileSize)}</p>
                    <p><strong>Type:</strong> {app.fileType}</p>
                  </div>
                ) : (
                  <div className="mt-2 text-sm space-y-1">
                    <p><strong>Name:</strong> {app.fullName}</p>
                    <p><strong>Email:</strong> {app.email}</p>
                    <p><strong>Skills:</strong> {app.skills}</p>
                    <p><strong>Education:</strong> {app.education}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
