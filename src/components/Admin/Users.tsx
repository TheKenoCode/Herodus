// --- React and related imports ---
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// --- Redux imports ---
import { fetchAllUsers } from '@/lib/redux/slices/userSlice';
import { RootState } from '@/lib/redux/store';
import { AppDispatch } from '@/lib/redux/store';

interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  userLink: string;
  imageUrl: string;
  createdAt: string;
}

export default function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');

  // Selectors to extract data from the Redux store
  const users = useSelector((state: RootState) => state.user.allUsers);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  // Effect to fetch all users when the component mounts
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user: User) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='h-screen px-8 bg-blackBG'>
      <h1 className='mb-6 text-2xl font-bold text-white'>User Management</h1>

      <input
        type='text'
        placeholder='Search by name or email...'
        className='w-full p-2 mb-6 border rounded'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {status === 'loading' && <p>Loading users...</p>}
      {status === 'succeeded' && (
        <table className='min-w-full table-auto'>
          <thead className='text-white bg-gray-800'>
            <tr>
              <th className='px-4 py-2'>Image</th>
              <th className='px-4 py-2'>Role</th>

              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Created</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {filteredUsers.map((user: User, index) => (
              <tr
                key={user._id}
                className={index % 2 ? 'bg-gray-300' : 'bg-gray-100'}
              >
                <td className='flex items-center justify-center px-4 py-2 border'>
                  <div className='relative w-12 h-12 bg-black rounded-full'>
                    <Image
                      fill
                      src={user.imageUrl}
                      className='z-0 object-cover '
                      alt={user.name}
                    />
                  </div>
                </td>
                <td
                  className={`px-4 py-2 border uppercase font-semibold   ${
                    user.role === 'admin' ? 'text-secondary' : 'text-black'
                  }`}
                >
                  {user.role}
                </td>
                <td className='px-4 py-2 font-semibold border '>{user.name}</td>
                <td className='px-4 py-2 font-semibold border'>{user.email}</td>
                <td className='px-4 py-2 font-semibold border '>{user._id}</td>
                <td className='flex items-center justify-center px-4 py-2 border'>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {status === 'failed' && (
        <p className='mt-6 text-red-600'>Error: {error}</p>
      )}
    </div>
  );
}
