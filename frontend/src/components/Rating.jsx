// src/components/Rating.jsx
export default function Rating({ value = 0, size = 'text-sm' }) {
  const full = Math.round(value);
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < full ? '★' : '☆'
  ).join('');
  return (
    <div className={`text-yellow-500 ${size}`}>
      <span className='mr-2'>{stars}</span>
      <span className='text-gray-600'>{value.toFixed(1)}</span>
    </div>
  );
}
