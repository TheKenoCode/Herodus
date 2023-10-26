/** @format */
'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { BiCamera } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllUsers } from '@/lib/redux/slices/userSlice';
import { AppDispatch } from '@/lib/redux/store';
import { RootState } from '@/lib/redux/store';
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  userLink: string;
  playlistLink: string;

  imageUrl: string;
  coverImage: string;
  YHaplogroup: string;
  MtHaplogroup: string;
  createdAt: string;
}

export default function EditProfile() {
  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  console.log(userId); //eslint-disable-line
  const users = useSelector((state: RootState) => state.user.allUsers);
  const userFromUsers = users.find((u: User) => u._id === userId);
  const defaultUserData = {
    name: '',
    bio: '',
    imageUrl: '',
    coverImage: '',
    location: '',
    userLink: '',
    playlistLink: '',
    YHaplogroup: '',
    MtHaplogroup: '',
  };
  // const userFromAuth = useSelector((state: RootState) => state.auth?.user);
  const [userData, setUserData] = useState(
    userFromUsers ? userFromUsers : defaultUserData,
  );
  const dispatch = useDispatch<AppDispatch>();
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const [selectedAvatarImage, setSelectedAvatarImage] = useState<File | null>(
    null,
  );
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null,
  );

  const handleAvatarClick = () => {
    avatarRef.current?.click();
  };
  const handleCoverClick = () => {
    coverRef.current?.click();
  };
  const handleAvatarImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setSelectedAvatarImage(input.files[0]);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setSelectedCoverImage(input.files[0]);
    }
  };

  useEffect(() => {
    // Fetch all users when the component mounts.
    dispatch(fetchAllUsers());

    // This function will be called when the component unmounts
    return () => {
      if (selectedAvatarImage) {
        URL.revokeObjectURL(URL.createObjectURL(selectedAvatarImage));
      }

      if (selectedCoverImage) {
        URL.revokeObjectURL(URL.createObjectURL(selectedCoverImage));
      }
    };
  }, [dispatch, selectedAvatarImage, selectedCoverImage]);

  useEffect(() => {
    // Update userData when userFromUsers changes.
    if (userFromUsers) {
      setUserData(userFromUsers);
    }
  }, [userFromUsers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in local storage.'); // eslint-disable-line
      // setFeedback('Error: No token found in local storage.');
      return;
    }
    const formData = new FormData();

    // Add the selected avatar image to formData
    if (selectedAvatarImage) {
      formData.append('avatarImage', selectedAvatarImage);
    }
    if (selectedCoverImage) {
      formData.append('coverImage', selectedCoverImage);
    }

    // Add other user details to formData
    formData.append('name', userData.name);
    formData.append('bio', userData.bio);
    formData.append('location', userData.location);
    formData.append('userLink', userData.userLink);
    formData.append('playlistLink', userData.playlistLink);

    formData.append('YHaplogroup', userData.YHaplogroup);
    formData.append('MtHaplogroup', userData.MtHaplogroup);
    console.log('Sending the following data to API:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    axios
      .put(`/api/users/${userId}`, formData, {
        headers: {
          authToken: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle successful response
        console.log('Profile updated successfully:', response.data); // eslint-disable-line
      })
      .catch((error) => {
        // Handle error
        if (error.response && error.response.data) {
          console.error(error.response.data); // eslint-disable-line
        } else {
          console.error('Failed to update profile:', error.message); // eslint-disable-line
          alert(error.message || 'Failed to update profile.');
        }
      });
  };

  return (
    <div className='   w-screen md:w-[600px] text-white py-20 md:py-0'>
      <form onSubmit={handleSubmit} className='space-y-4 '>
        <div className='relative '>
          {/* Cover Image */}
          <div
            className='relative h-[200px] group cursor-pointer overflow-hidden rounded-md'
            onClick={handleCoverClick}
          >
            <span className='absolute z-10 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
              <BiCamera className='hidden text-5xl group-hover:text-secondary group-hover:block' />{' '}
            </span>
            <div className='absolute z-10 w-full h-full group-hover:bg-black group-hover:bg-opacity-30'></div>
            <Image
              src={
                selectedCoverImage
                  ? URL.createObjectURL(selectedCoverImage)
                  : userData.coverImage
              }
              fill
              alt='Cover'
              className='object-cover w-full h-full bg-black'
            />
            <input
              type='file'
              ref={coverRef}
              name='coverImage'
              className='absolute z-50 hidden w-full h-full cursor-pointer top-1/2 '
              onChange={handleCoverImageChange}
            />
          </div>

          {/* Avatar Image */}
          <div className='absolute mb-4 -mt-8 transform -translate-x-1/2 left-1/2'>
            <div className='flex justify-center'>
              <div
                className='relative overflow-hidden rounded-full cursor-pointer group w-28 h-28'
                onClick={handleAvatarClick}
              >
                <span className='absolute z-20 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                  <BiCamera className='hidden text-5xl group-hover:text-secondary group-hover:block' />{' '}
                </span>
                <div className='absolute z-10 w-full h-full group-hover:bg-black group-hover:bg-opacity-30'></div>
                {userData.imageUrl && (
                  <Image
                    src={
                      selectedAvatarImage
                        ? URL.createObjectURL(selectedAvatarImage)
                        : userData.imageUrl
                    }
                    fill
                    alt='Avatar'
                    className='object-contain  rounded-full scale-[.85]  bg-black'
                  />
                )}

                <input
                  type='file'
                  ref={avatarRef}
                  name='avatarImage'
                  className='absolute z-50 hidden w-full h-full cursor-pointer top-1/2 '
                  onChange={handleAvatarImageChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='px-4 space-y-4'>
          <div className='pt-20'>
            <div className='p-2 overflow-hidden border border-grayBorder rounded-xl'>
              <label
                className='block ml-2 text-sm font-medium text-gray-500'
                htmlFor='name'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={userData?.name}
                onChange={handleChange}
                className='w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG'
              />
            </div>
          </div>
          <div className='p-2 overflow-hidden border border-grayBorder rounded-xl'>
            <label
              className='block ml-2 text-sm font-medium text-gray-500'
              htmlFor='location'
            >
              location
            </label>
            <input
              type='text'
              id='location'
              name='location'
              value={userData?.location}
              onChange={handleChange}
              className='w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG'
            />
          </div>
          <div className='p-2 overflow-hidden border border-grayBorder rounded-xl'>
            <label
              className='block ml-2 text-sm font-medium text-gray-500'
              htmlFor='userLink'
            >
              Link
            </label>
            <input
              type='text'
              id='userLink'
              name='userLink'
              value={userData?.userLink}
              onChange={handleChange}
              className='w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG'
            />
          </div>

          <div className='p-2 overflow-hidden border border-grayBorder rounded-xl'>
            <label
              className='block ml-2 text-sm font-medium text-gray-500'
              htmlFor='bio'
            >
              Bio
            </label>
            <textarea
              id='bio'
              name='bio'
              value={userData?.bio}
              onChange={handleChange}
              className='w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG'
              rows={3}
            ></textarea>
          </div>

          <div className='p-2 overflow-hidden border border-grayBorder rounded-xl'>
            <label
              className='block ml-2 text-sm font-medium text-gray-500'
              htmlFor='YHaplogroup'
            >
              YDNA-Haplogroup
            </label>
            <input
              type='text'
              id='YHaplogroup'
              name='YHaplogroup'
              value={userData?.YHaplogroup}
              onChange={handleChange}
              className='w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG'
            />
          </div>
          <div className='p-2 overflow-hidden border border-grayBorder rounded-xl'>
            <label
              className='block ml-2 text-sm font-medium text-gray-500'
              htmlFor='MtHaplogroup'
            >
              MtDNA-Haplogroup
            </label>
            <input
              type='text'
              id='MtHaplogroup'
              name='MtHaplogroup'
              value={userData?.MtHaplogroup}
              onChange={handleChange}
              className='w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG'
            />
          </div>
          <div className='p-2 overflow-hidden border border-grayBorder rounded-xl'>
            <label
              className='block ml-2 text-sm font-medium text-gray-500'
              htmlFor='playlistLink'
            >
              Spotify playlist
            </label>
            <input
              type='text'
              id='playlistLink'
              name='playlistLink'
              value={userData?.playlistLink}
              onChange={handleChange}
              className='w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG'
            />
          </div>
          <button
            type='submit'
            className='px-4 py-2 mt-4 text-white border-2 rounded-full border-third hover:bg-third'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
