// src/pages/CompanyReviews.jsx
import { useParams } from 'react-router-dom';
import { getCompanyById } from '../data/companies';

export default function CompanyReviews() {
  const { id } = useParams();
  const company = getCompanyById(id);

  if (!company) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='bg-white border p-4 rounded'>Company not found.</div>
      </div>
    );
  }

  const avg = company.avgRating.toFixed(1);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold'>Reviews — {company.name}</h1>
      <div className='mt-1 text-gray-700'>Average Rating: {avg} ★</div>

      <div className='mt-6 space-y-4'>
        {company.reviews.map((r) => (
          <div key={r.id} className='bg-white border rounded p-4'>
            <div className='font-semibold'>{'★'.repeat(r.rating)}</div>
            <div className='text-sm'>{r.text}</div>
            <div className='text-xs text-gray-500 mt-1'>
              — {r.author} • {r.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
