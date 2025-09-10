// src/data/companies.js
export const companies = [
  {
    id: 'c1',
    name: 'Acme Corp',
    avgRating: 4.3,
    reviews: [
      {
        id: 'r1',
        rating: 5,
        text: 'Great culture and mentoring!',
        author: 'Ravi',
        date: '2025-07-30',
      },
      {
        id: 'r2',
        rating: 4,
        text: 'Good for learning React.',
        author: 'Anita',
        date: '2025-06-20',
      },
      {
        id: 'r3',
        rating: 4,
        text: 'Flexible, supportive team.',
        author: 'Suresh',
        date: '2025-05-15',
      },
    ],
  },
  {
    id: 'c2',
    name: 'BetaTech',
    avgRating: 3.9,
    reviews: [
      {
        id: 'r4',
        rating: 4,
        text: 'Solid backend exposure.',
        author: 'Aarav',
        date: '2025-04-19',
      },
      {
        id: 'r5',
        rating: 3,
        text: 'Pace is a bit fast.',
        author: 'Neha',
        date: '2025-03-09',
      },
    ],
  },
  {
    id: 'c3',
    name: 'DataWorks',
    avgRating: 4.6,
    reviews: [
      {
        id: 'r6',
        rating: 5,
        text: 'Amazing data sets!',
        author: 'Isha',
        date: '2025-05-01',
      },
      {
        id: 'r7',
        rating: 4,
        text: 'Challenging interviews.',
        author: 'Karan',
        date: '2025-05-21',
      },
    ],
  },
];

export function getCompanyById(id) {
  return companies.find((c) => c.id === id);
}