import { Internship } from '@/types';

export const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    stipend: 25000,
    description: 'Join our dynamic frontend team to build cutting-edge web applications using React, TypeScript, and modern development practices.',
    responsibilities: [
      'Develop responsive web applications using React and TypeScript',
      'Collaborate with design team to implement UI/UX designs',
      'Write clean, maintainable code following best practices',
      'Participate in code reviews and team meetings'
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git'],
    duration: '6 months',
    type: 'Full-time',
    postedDate: '2024-01-10',
    applicationDeadline: '2024-02-15',
    rating: 4.2,
    reviews: [
      {
        id: 'r1',
        userName: 'Priya Sharma',
        rating: 4,
        comment: 'Great learning experience with excellent mentorship. The team is very supportive.',
        date: '2024-01-05',
      },
      {
        id: 'r2',
        userName: 'Anonymous',
        rating: 5,
        comment: 'Amazing work culture and real-world projects. Highly recommend!',
        date: '2024-01-03',
        isAnonymous: true,
      },
      {
        id: 'r3',
        userName: 'Rahul Kumar',
        rating: 4,
        comment: 'Good exposure to latest technologies and industry practices.',
        date: '2023-12-28',
      }
    ]
  },
  {
    id: '2',
    title: 'UI/UX Design Intern',
    company: 'DesignStudio Pro',
    location: 'Mumbai, India',
    stipend: 20000,
    description: 'Work with our creative team to design intuitive user experiences for mobile and web applications.',
    responsibilities: [
      'Create wireframes and prototypes for new features',
      'Conduct user research and usability testing',
      'Design user interfaces using Figma and Adobe Creative Suite',
      'Collaborate with developers to ensure design implementation'
    ],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing'],
    duration: '4 months',
    type: 'Full-time',
    postedDate: '2024-01-08',
    applicationDeadline: '2024-02-10',
    rating: 4.5,
    reviews: [
      {
        id: 'r4',
        userName: 'Sneha Patel',
        rating: 5,
        comment: 'Incredible learning opportunity with hands-on project experience.',
        date: '2024-01-02',
      },
      {
        id: 'r5',
        userName: 'Anonymous',
        rating: 4,
        comment: 'Great mentors and real client projects to work on.',
        date: '2023-12-30',
        isAnonymous: true,
      }
    ]
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Analytics Hub',
    location: 'Hyderabad, India',
    stipend: 30000,
    description: 'Dive into data analysis and machine learning projects that drive business decisions.',
    responsibilities: [
      'Analyze large datasets using Python and SQL',
      'Build machine learning models for predictive analytics',
      'Create data visualizations and reports',
      'Present findings to stakeholders'
    ],
    skills: ['Python', 'SQL', 'Machine Learning', 'Pandas', 'NumPy', 'Tableau'],
    duration: '6 months',
    type: 'Full-time',
    postedDate: '2024-01-12',
    applicationDeadline: '2024-02-20',
    rating: 4.3,
    reviews: [
      {
        id: 'r6',
        userName: 'Arjun Singh',
        rating: 4,
        comment: 'Excellent exposure to real-world data problems and modern tools.',
        date: '2024-01-01',
      }
    ]
  },
  {
    id: '4',
    title: 'Digital Marketing Intern',
    company: 'MarketGrow Agency',
    location: 'Delhi, India',
    stipend: 18000,
    description: 'Learn digital marketing strategies across social media, SEO, and content marketing.',
    responsibilities: [
      'Manage social media accounts and create content',
      'Assist in SEO optimization and keyword research',
      'Analyze marketing campaign performance',
      'Support email marketing campaigns'
    ],
    skills: ['Social Media Marketing', 'SEO', 'Content Writing', 'Google Analytics', 'Facebook Ads'],
    duration: '3 months',
    type: 'Part-time',
    postedDate: '2024-01-09',
    applicationDeadline: '2024-02-05',
    rating: 3.8,
    reviews: [
      {
        id: 'r7',
        userName: 'Kavya Reddy',
        rating: 4,
        comment: 'Good practical experience with various marketing tools.',
        date: '2023-12-25',
      }
    ]
  },
  {
    id: '5',
    title: 'Backend Developer Intern',
    company: 'ServerTech Solutions',
    location: 'Chennai, India',
    stipend: 28000,
    description: 'Build scalable backend systems using Node.js, Python, and cloud technologies.',
    responsibilities: [
      'Develop REST APIs using Node.js and Express',
      'Work with databases and optimize queries',
      'Deploy applications on cloud platforms',
      'Implement security best practices'
    ],
    skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
    duration: '6 months',
    type: 'Full-time',
    postedDate: '2024-01-11',
    applicationDeadline: '2024-02-18',
    rating: 4.1,
    reviews: [
      {
        id: 'r8',
        userName: 'Vikram Joshi',
        rating: 4,
        comment: 'Great learning experience with modern backend technologies.',
        date: '2023-12-20',
      }
    ]
  },
  {
    id: '6',
    title: 'Mobile App Developer Intern',
    company: 'AppCraft Studios',
    location: 'Pune, India',
    stipend: 22000,
    description: 'Develop mobile applications for iOS and Android using React Native and Flutter.',
    responsibilities: [
      'Build cross-platform mobile apps',
      'Implement responsive UI designs',
      'Integrate APIs and third-party services',
      'Test apps on different devices'
    ],
    skills: ['React Native', 'Flutter', 'JavaScript', 'Dart', 'Mobile UI/UX'],
    duration: '5 months',
    type: 'Full-time',
    postedDate: '2024-01-07',
    applicationDeadline: '2024-02-12',
    rating: 4.4,
    reviews: [
      {
        id: 'r9',
        userName: 'Ritu Agarwal',
        rating: 5,
        comment: 'Amazing team and cutting-edge mobile development practices.',
        date: '2023-12-15',
      }
    ]
  }
];