import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Internships from './pages/Internships';
import InternshipDetails from './pages/InternshipDetails';
import CompanyReviews from './pages/CompanyReviews';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Internships />} />
        <Route path='/internships' element={<Internships />} />
        <Route path='/internships/:id' element={<InternshipDetails />} />
        <Route path='/companies/:id/reviews' element={<CompanyReviews />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}
