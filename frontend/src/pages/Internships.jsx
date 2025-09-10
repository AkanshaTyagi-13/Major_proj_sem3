import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ApplicationModal from '../components/ApplicationModal';
import ApplicationsViewer from '../components/ApplicationsViewer';

export default function Internships() {
  // Sample internships
  const internshipsData = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'Tech Corp',
      location: 'Remote',
      stipend: '₹10,000',
      description:
        'Work on building interactive UI using React and Tailwind CSS.',
      skills: ['React', 'Tailwind CSS', 'JavaScript'],
      reviews: [
        { name: 'Anonymous', rating: 4, comment: 'Great experience!' },
        { name: 'John Doe', rating: 5, comment: 'Learned a lot!' },
        { name: 'Jane Smith', rating: 4, comment: 'Supportive team.' },
      ],
    },
    {
      id: 2,
      title: 'Backend Developer Intern',
      company: 'Code Solutions',
      location: 'Delhi',
      stipend: '₹8,000',
      description: 'Assist in building secure APIs using Node.js and Express.',
      skills: ['Node.js', 'Express', 'MongoDB'],
      reviews: [
        { name: 'Anonymous', rating: 3, comment: 'Challenging work.' },
        { name: 'Alex', rating: 4, comment: 'Good learning opportunity.' },
      ],
    },
  ];

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [stipendFilter, setStipendFilter] = useState('');
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [internshipToApply, setInternshipToApply] = useState(null);

  // Filter logic
  const filteredInternships = internshipsData.filter((internship) => {
    return (
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter ? internship.location === locationFilter : true) &&
      (stipendFilter ? internship.stipend === stipendFilter : true)
    );
  });

  // Average rating function
  const getAverageRating = (reviews) => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Handle apply button click
  const handleApplyClick = (internship) => {
    setInternshipToApply(internship);
    setIsApplicationModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsApplicationModalOpen(false);
    setInternshipToApply(null);
  };

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      {/* Search & Filters */}
      <h1 className='text-2xl font-bold mb-4'>
        Find the Right Internship for You
      </h1>
      <div className='flex gap-3 mb-6'>
        <input
          type='text'
          placeholder='Search internships'
          className='border p-2 rounded w-1/3'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className='border p-2 rounded'
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value=''>Location</option>
          <option value='Remote'>Remote</option>
          <option value='Delhi'>Delhi</option>
        </select>
        <select
          className='border p-2 rounded'
          value={stipendFilter}
          onChange={(e) => setStipendFilter(e.target.value)}
        >
          <option value=''>Stipend</option>
          <option value='₹10,000'>₹10,000</option>
          <option value='₹8,000'>₹8,000</option>
        </select>
        <button className='bg-blue-500 text-white px-4 py-2 rounded'>
          Explore Internships
        </button>
      </div>

      {/* Layout */}
      <div className='grid grid-cols-3 gap-6'>
        {/* Left Column: List */}
        <div className='col-span-1 space-y-4'>
          <h2 className='font-semibold text-lg'>Featured Internships</h2>
          {filteredInternships.map((internship) => (
            <div
              key={internship.id}
              className='border rounded p-4'
            >
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <h3 className='font-bold'>{internship.title}</h3>
                  <p className='text-sm text-gray-600'>{internship.company}</p>
                  <p className='text-sm text-gray-500'>{internship.location} • {internship.stipend}</p>
                </div>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => setSelectedInternship(internship)}
                  className='bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors'
                >
                  View Details
                </button>
                <button
                  onClick={() => handleApplyClick(internship)}
                  className='bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors'
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Details */}
        <div className='col-span-2 border rounded p-4'>
          {selectedInternship ? (
            <>
              <h2 className='font-bold text-xl'>{selectedInternship.title}</h2>
              <p className='text-gray-600'>{selectedInternship.company}</p>
              <p>
                {selectedInternship.location} • {selectedInternship.stipend}
              </p>

              <hr className='my-3' />

              <h3 className='font-semibold'>Description & Responsibilities</h3>
              <p className='text-gray-700 mb-3'>
                {selectedInternship.description}
              </p>

              <h3 className='font-semibold'>Required Skills</h3>
              <ul className='list-disc list-inside mb-3'>
                {selectedInternship.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>

              {/* Average Rating */}
              <div className='flex items-center gap-2 mb-2'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i <
                        Math.round(getAverageRating(selectedInternship.reviews))
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }
                  />
                ))}
                <span>
                  {getAverageRating(selectedInternship.reviews)} out of 5 •{' '}
                  {selectedInternship.reviews.length} reviews
                </span>
              </div>

              {/* Reviews */}
              {selectedInternship.reviews.map((review, idx) => (
                <div key={idx} className='mb-2 border-t pt-2'>
                  <div className='flex items-center gap-1'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <p className='text-sm'>{review.comment}</p>
                  <p className='text-xs text-gray-500'>{review.name}</p>
                </div>
              ))}

              {/* Apply Button */}
              <div className='mt-6 pt-4 border-t'>
                <button
                  onClick={() => handleApplyClick(selectedInternship)}
                  className='bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors'
                >
                  Apply for this Internship
                </button>
              </div>
            </>
          ) : (
            <p>Select an internship to view details</p>
          )}
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={handleModalClose}
        internship={internshipToApply}
      />

      {/* Applications Viewer - Only on home page */}
      <ApplicationsViewer />
    </div>
  );
}
