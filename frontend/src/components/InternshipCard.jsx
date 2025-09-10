import React, { useState } from 'react';
import ApplicationModal from './ApplicationModal';

export default function InternshipCard({ title, company, location, salary }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='border p-4 rounded shadow hover:shadow-lg transition'>
      <h3 className='text-xl font-bold'>{title}</h3>
      <p className='text-gray-600'>{company}</p>
      <p>{location}</p>
      <p className='font-medium'>{salary}</p>
      <button
        onClick={() => setIsModalOpen(true)}
        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
      >
        Apply Now
      </button>

      <ApplicationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
