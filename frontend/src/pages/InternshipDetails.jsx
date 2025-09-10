// src/pages/InternshipDetails.jsx
import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { internships } from '../data/internships';
import { getCompanyById } from '../data/companies';
import Rating from '../components/Rating';

export default function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = useMemo(() => internships.find((i) => i.id === id), [id]);

  if (!item) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='bg-white border p-4 rounded'>Internship not found.</div>
      </div>
    );
  }

  const company = getCompanyById(item.companyId);

  return (
    <div className='container mx-auto px-4 py-8 grid gap-6 md:grid-cols-3'>
      {/* left: content */}
      <div className='md:col-span-2'>
        <div className='bg-white border rounded p-4'>
          <h1 className='text-2xl font-bold'>{item.title}</h1>
          <div className='text-gray-600'>
            {item.companyName} • {item.location} • {item.mode}
          </div>
          <div className='mt-2'>
            <Rating value={item.rating} size='text-base' />
          </div>

          <div className='mt-3 text-sm text-gray-700'>
            Stipend: {item.currency} {item.stipendMin.toLocaleString()} -{' '}
            {item.stipendMax.toLocaleString()}
          </div>

          <div className='mt-4'>
            <h3 className='font-semibold'>Description</h3>
            <p className='mt-2'>{item.description}</p>
          </div>

          <div className='mt-4'>
            <h3 className='font-semibold'>Required Skills</h3>
            <div className='mt-2 flex gap-2 flex-wrap'>
              {item.skills.map((s) => (
                <span key={s} className='px-2 py-0.5 border rounded text-xs'>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {console.log('Company object:', company)}
          {console.log('Company reviews:', company?.reviews)}

          <button
            onClick={() => navigate(`/apply/${item.id}`)}
            className='mt-6 bg-green-600 text-white px-4 py-2 rounded'
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* right: reviews preview */}
      <aside className='bg-white border rounded p-4'>
        <h3 className='font-semibold'>Company Reviews</h3>
        {company ? (
          <>
            <div className='mt-1 text-sm text-gray-700'>
              Average: {company.avgRating} ★
            </div>
            {company.reviews.slice(0, 3).map((r) => (
              <div key={r.id} className='mt-3'>
                <div className='font-semibold'>{'★'.repeat(r.rating)}</div>
                <div className='text-sm'>{r.text}</div>
                <div className='text-xs text-gray-500'>
                  — {r.author} • {r.date}
                </div>
              </div>
            ))}
            <Link
              to={`/companies/${company.id}/reviews`}
              className='block mt-4 text-blue-600'
            >
              View all reviews
            </Link>
          </>
        ) : (
          <div className='text-sm text-gray-600'>No reviews yet.</div>
        )}
      </aside>
    </div>
  );
}
