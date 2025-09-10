// src/components/FilterBar.jsx
import { useMemo } from 'react';

export default function FilterBar({
  filters,
  setFilters,
  allLocations,
  onReset,
  resultCount,
}) {
  const modes = ['Remote', 'Hybrid', 'On-site'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleModeToggle = (mode) => {
    setFilters((prev) => {
      const set = new Set(prev.modes);
      set.has(mode) ? set.delete(mode) : set.add(mode);
      return { ...prev, modes: set };
    });
  };

  const locationOptions = useMemo(
    () => ['All', ...allLocations],
    [allLocations]
  );

  return (
    <div className='bg-white border rounded p-4'>
      <div className='grid gap-3 md:grid-cols-4'>
        {/* Search */}
        <div>
          <label className='block text-sm font-medium mb-1'>Search</label>
          <input
            name='q'
            value={filters.q}
            onChange={handleChange}
            placeholder='Role, company, or skill'
            className='w-full p-2 border rounded'
          />
        </div>

        {/* Location */}
        <div>
          <label className='block text-sm font-medium mb-1'>Location</label>
          <select
            name='location'
            value={filters.location}
            onChange={handleChange}
            className='w-full p-2 border rounded bg-white'
          >
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Salary Min */}
        <div>
          <label className='block text-sm font-medium mb-1'>
            Min Salary (₹)
          </label>
          <input
            name='min'
            type='number'
            min={0}
            value={filters.min}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
        </div>

        {/* Sort */}
        <div>
          <label className='block text-sm font-medium mb-1'>Sort by</label>
          <select
            name='sort'
            value={filters.sort}
            onChange={handleChange}
            className='w-full p-2 border rounded bg-white'
          >
            <option value='relevance'>Relevance</option>
            <option value='stipend-high'>Stipend: High to Low</option>
            <option value='rating-high'>Rating: High to Low</option>
            <option value='newest'>Newest</option>
          </select>
        </div>
      </div>

      {/* Modes */}
      <div className='mt-3'>
        <div className='text-sm font-medium mb-1'>Work Mode</div>
        <div className='flex gap-2 flex-wrap'>
          {modes.map((m) => (
            <button
              key={m}
              type='button'
              onClick={() => handleModeToggle(m)}
              className={`px-3 py-1 rounded border text-sm ${
                filters.modes.has(m)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Footer row */}
      <div className='mt-4 flex items-center justify-between'>
        <div className='text-sm text-gray-600'>{resultCount} results</div>
        <button onClick={onReset} className='text-sm text-blue-600 underline'>
          Reset filters
        </button>
      </div>
    </div>
  );
}
