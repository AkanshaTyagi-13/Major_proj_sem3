import { useState } from 'react';

export default function ApplicationModal({ isOpen, onClose, internship }) {
  const [mode, setMode] = useState('upload');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    skills: '',
    education: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveToLocalStorage = (applicationData) => {
    const existingApplications = JSON.parse(localStorage.getItem('internshipApplications') || '[]');
    const newApplication = {
      id: Date.now(),
      internshipTitle: internship?.title || 'Unknown Internship',
      company: internship?.company || 'Unknown Company',
      appliedAt: new Date().toISOString(),
      ...applicationData
    };
    existingApplications.push(newApplication);
    localStorage.setItem('internshipApplications', JSON.stringify(existingApplications));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mode === 'upload') {
      const fileInput = e.target.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      
      if (file) {
        const applicationData = {
          type: 'resume_upload',
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        };
        saveToLocalStorage(applicationData);
      }
    } else {
      const applicationData = {
        type: 'manual_form',
        ...formData
      };
      saveToLocalStorage(applicationData);
    }
    
    alert(`Applied to ${internship?.title || 'internship'} successfully! Application saved locally.`);
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      skills: '',
      education: ''
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-start z-50'>
      <div className='bg-white rounded-lg p-6 max-w-lg mx-auto mt-20 shadow-lg outline-none w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Apply for {internship?.title}</h2>

        {/* Mode Switch */}
        <div className='flex gap-4 mb-4'>
          <button
            onClick={() => setMode('upload')}
            className={`px-4 py-2 rounded ${
              mode === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Upload Resume
          </button>
          <button
            onClick={() => setMode('manual')}
            className={`px-4 py-2 rounded ${
              mode === 'manual' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Manual Form
          </button>
        </div>

        {/* Upload Resume Mode */}
        {mode === 'upload' ? (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-4'>
              <input
                type='file'
                accept='.pdf,.doc,.docx'
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                required
              />
              <p className='text-xs text-gray-500 mt-2'>
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
            <button
              type='submit'
              className='bg-green-500 px-4 py-2 rounded text-white w-full hover:bg-green-600 transition-colors'
            >
              Submit Application
            </button>
          </form>
        ) : (
          // Manual Form Mode
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='text'
              name='fullName'
              placeholder='Full Name'
              value={formData.fullName}
              onChange={handleInputChange}
              className='border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Email Address'
              value={formData.email}
              onChange={handleInputChange}
              className='border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            <input
              type='text'
              name='skills'
              placeholder='Skills (e.g., React, JavaScript, Python)'
              value={formData.skills}
              onChange={handleInputChange}
              className='border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            <textarea
              name='education'
              placeholder='Education (e.g., Bachelor in Computer Science, XYZ University)'
              value={formData.education}
              onChange={handleInputChange}
              className='border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none'
              required
            />
            <button
              type='submit'
              className='bg-green-500 px-4 py-2 rounded text-white w-full hover:bg-green-600 transition-colors'
            >
              Submit Application
            </button>
          </form>
        )}

        <button 
          onClick={onClose} 
          className='mt-4 text-red-500 underline hover:text-red-700 transition-colors'
        >
          Close
        </button>
      </div>
    </div>
  );
}
