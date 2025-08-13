export interface User {
  id: string;
  email: string;
  name: string;
  skills?: string[];
  education?: string;
  experience?: string;
  resume?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: number;
  description: string;
  responsibilities: string[];
  skills: string[];
  duration: string;
  type: 'Full-time' | 'Part-time' | 'Remote';
  postedDate: string;
  applicationDeadline: string;
  reviews: Review[];
  rating: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isAnonymous?: boolean;
}

export interface Application {
  id: string;
  internshipId: string;
  userId: string;
  appliedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  coverLetter?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}