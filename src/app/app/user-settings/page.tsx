'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/lib/redux/slices/userSlice';
import { logout } from '@/lib/redux/slices/authSlice';
import { AppDispatch } from '@/lib/redux/store';
import { updateAccountAuth } from '@/lib/redux/slices/userSlice';
export default function UserSettings() {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const user = useSelector((state: RootState) => state.auth?.user);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleEmailPasswordChange = (e) => setEmailPassword(e.target.value);
  const toggleTwoFactorAuth = () => setTwoFactorAuth(!twoFactorAuth);

  const updateSettings = async () => {
    if (password !== confirmPassword) {
      window.alert("Passwords don't match, Bro!");
      return;
    }
    if (email && !emailPassword) {
      window.alert('Provide a password to update the email!');
      return;
    }
    dispatch(
      updateAccountAuth({
        userId: userId,
        email: email,
        password: password,
        emailPassword: emailPassword,
      }),
    );
    setEmail('');
    setPassword('');
    setEmailPassword('');
    setConfirmPassword('');
  };

  const deleteUserAccount = async () => {
    const confirmation = window.confirm(
      "Bro, you sure you wanna delete your account? That's a big move!",
    );

    if (confirmation) {
      dispatch(deleteUser(userId));
      dispatch(logout());
      router.push('/goodbye');
    }
  };

  return (
    <div className='w-screen md:w-[600px] pt-20 text-white py-6 px-4 md:py-0 md:px-6 rounded-lg'>
      <h1 className='pb-4 mb-8 text-2xl border-b'>User Settings</h1>
      <div className='mb-4'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center '>
            <label className='block text-sm font-medium'>Email:</label>
            <span className='ml-2'>{user.email}</span>
          </div>

          <button
            className='ml-2'
            onClick={() => setShowEmailInput(!showEmailInput)}
          >
            Edit
          </button>
        </div>
        {showEmailInput && (
          <>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-600'
              placeholder='Update Email'
            />
            <input
              type='password'
              value={emailPassword}
              onChange={handleEmailPasswordChange}
              className='w-full p-3 mt-2 bg-gray-700 border border-gray-700 rounded focus:outline-none focus:border-blue-600'
              placeholder='Password for Email Update'
            />
            <button
              onClick={updateSettings}
              className='px-4 py-2 mt-4 text-white border-2 rounded-full border-third hover:bg-third'
            >
              Update email
            </button>
          </>
        )}
      </div>
      <div className='mb-4'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center '>
            <label className='block text-sm font-medium'>Password:</label>
            <span className='ml-2'>***************</span>
          </div>
          <button
            className='ml-2'
            onClick={() => setShowPasswordInput(!showPasswordInput)}
          >
            Edit
          </button>
        </div>
        {showPasswordInput && (
          <>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-600'
              placeholder='Update Password'
            />
            <input
              type='password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className='w-full p-3 mt-2 bg-gray-700 border border-gray-700 rounded focus:outline-none focus:border-blue-600'
              placeholder='Confirm Password'
            />
            <button
              onClick={updateSettings}
              className='px-4 py-2 mt-4 text-white border-2 rounded-full border-third hover:bg-third'
            >
              Update password
            </button>
          </>
        )}
      </div>
      <div className='flex items-center mb-6'>
        <input
          type='checkbox'
          checked={twoFactorAuth}
          onChange={toggleTwoFactorAuth}
          className='mr-2 text-blue-600'
        />
        <label className='text-sm'>Enable Two Factor Authentication</label>
      </div>
      <div className='flex flex-col'>
        <button
          onClick={deleteUserAccount}
          className='px-4 py-2 mt-4 text-white border-2 rounded-full border-secondary hover:bg-secondary'
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
