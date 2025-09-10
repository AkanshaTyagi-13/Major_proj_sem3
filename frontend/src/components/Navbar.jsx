import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='bg-gray-800 text-white shadow-md'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <h1 className='text-2xl font-bold'>
          <Link to='/'>Internship Finder</Link>
        </h1>
        <div className='flex space-x-4'>
          <Link to='/' className='hover:text-blue-500'>
            Home
          </Link>

          <Link to='/login' className='hover:text-blue-500'>
            Login
          </Link>
          <Link to='/signup' className='hover:text-blue-500'>
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
