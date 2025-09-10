import { useState } from 'react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signup attempt: ${name} - ${email}`);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded shadow-md w-96'
      >
        <h2 className='text-2xl font-bold mb-4 text-center'>Signup</h2>
        <input
          type='text'
          placeholder='Full Name'
          className='w-full p-2 border rounded mb-4'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Email'
          className='w-full p-2 border rounded mb-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='w-full p-2 border rounded mb-4'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type='submit'
          className='w-full bg-green-500 text-white py-2 rounded'
        >
          Signup
        </button>
      </form>
    </div>
  );
}
