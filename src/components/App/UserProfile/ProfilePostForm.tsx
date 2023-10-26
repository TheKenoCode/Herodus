// React imports
// External libraries and components
import axios from 'axios';
// Next.js components and hooks
import React, { useEffect, useRef, useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
// Icons
import { RiCloseFill } from 'react-icons/ri';
import ModalImage from 'react-modal-image';
// Redux hooks and actions
import { useDispatch } from 'react-redux';

import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice';
import { fetchAllUsers } from '@/lib/redux/slices/userSlice';
import { AppDispatch } from '@/lib/redux/store';
interface ProfilePostFormProps {
  newPostFormOpen: boolean;
}
export default function ProfilePostForm({
  newPostFormOpen,
}: ProfilePostFormProps) {
  const dispatch = useDispatch<AppDispatch>(); // Local state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [content, setContent] = useState('');
  // const [feedback, setFeedback] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  // Effects
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedImage) {
      URL.revokeObjectURL(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // Handlers
  const handleClick = () => {
    ref.current?.click();
    setSelectedImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageCancel = () => {
    setSelectedImage(null);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in local storage.'); //eslint-disable-line
      // setFeedback('Error: No token found in local storage.');
      return;
    }
    const formData = new FormData();
    formData.append('content', content);
    if (selectedImage != null) {
      formData.append('image', selectedImage);
    }

    axios
      .post('/api/userposts', formData, {
        headers: {
          authToken: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(fetchUserPosts());
        setContent('');
        setSelectedImage(null); // Reset the selected image
        // setFeedback('Post created successfully!');
      })
      .catch((error) => {
        console.error('Error creating post:', error); //eslint-disable-line
        // setFeedback(`Error: ${error.message}`);
      });
  };

  return (
    <div className=' z-0 bg-blackBG     md:w-[600px]   relative transition-all transform duration-300 ease-in-out'>
      <div
        className={`pt-2 border-b border-grayBorder  max-w-2xl mx-auto px-4 transform origin-top h-0 ease-in-out
    transition-all duration-300 
    ${
      newPostFormOpen
        ? 'opacity-100  border-t border-grayBorder h-full visible '
        : 'opacity-0 scale-y-0 h-0 collapse '
    }`}
      >
        <div className='flex mt-8 '>
          <form
            onSubmit={handleSubmit}
            className='relative flex flex-col justify-between w-full h-full mb-4 '
          >
            <textarea
              value={content}
              name='content'
              onChange={handleContentChange}
              className='w-full py-2 mb-2 text-white resize-none focus:outline-none rounded-2xl bg-blackBG'
              placeholder="What's happening?"
              style={{ minHeight: '60px', overflow: 'hidden' }} // Set a minimum height to establish an initial size
            />

            <div className='relative group w-full overflow-hidden rounded-xl mb-20'>
              {selectedImage && (
                <>
                  <RiCloseFill
                    className='absolute z-10 hidden text-5xl text-gray-200 cursor-pointer group-hover:block hover:text-secondary top-2 right-2'
                    onClick={() => {
                      handleImageCancel();
                    }}
                  />
                  <ModalImage
                    small={URL.createObjectURL(selectedImage)}
                    medium={URL.createObjectURL(selectedImage)}
                    alt='Preview'
                    className=' group-hover:opacity-50 border transition-all object-cover duration-300 ease-in border-[#333639]  rounded-2xl w-full  h-[600px]'
                  />
                </>
              )}
            </div>

            <div className='sticky bottom-0 flex items-center justify-between pt-2 text-white border-t border-secondary bg-blackBG'>
              <div className='relative my-auto ' onClick={handleClick}>
                <BsCardImage className='top-0 my-auto text-2xl cursor-pointer text-secondary' />
                <input
                  type='file'
                  ref={ref}
                  name='image'
                  className='absolute hidden'
                  onChange={handleImageChange}
                />
              </div>

              <div className='flex'>
                <span
                  className={`text-sm text-gray-300 ${
                    content.length > 280 ? 'text-red-500' : ''
                  } my-auto`}
                >
                  {content.length}/280
                </span>
                <button
                  type='submit'
                  className='px-4 text-sm py-[4px]  ml-2   text-white border-2 rounded-full border-secondary hover:bg-secondary transition-all duration-300 ease-in cursor-pointer'
                  disabled={content.length > 280}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
