// External libraries and components
import axios from 'axios';
// Next.js components and utilities
import React, { useEffect, useRef, useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
// Icons
import { RiCloseFill } from 'react-icons/ri';
import ModalImage from 'react-modal-image';
// Redux-related imports
import { useDispatch } from 'react-redux';

import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice';
import { fetchAllUsers } from '@/lib/redux/slices/userSlice';
import { AppDispatch } from '@/lib/redux/store';

export default function PostForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [content, setContent] = useState('');
  // const [feedback, setFeedback] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  // Effects

  useEffect(() => {
    // Fetch all users when the component mounts.
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const handleClick = () => {
    ref.current?.click();
    setSelectedImage(null);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const handleImageCancel = () => {
    setSelectedImage(null);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // Reset the height to 'auto' to get the scroll height correctly
    e.target.style.height = 'auto';
    // Set the height to scrollHeight to grow as content is added
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  useEffect(() => {
    if (selectedImage) {
      URL.revokeObjectURL(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

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
    <div className='border-b z-40 bg-blackBG  md:border-x border-grayBorder  min-h-full w-full md:w-[600px]    transition-all transform duration-300 ease-in-out'>
      <div
        className={`pt-2 max-w-2xl mx-auto px-4 transform origin-top ease-in-out transition-all duration-500 
     opacity-100 scale-y-100 border-t border-grayBorder h-full
     `}
      >
        <div className='flex mt-8'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-between w-full h-full mb-4 '
          >
            <textarea
              value={content}
              name='content'
              onChange={handleContentChange}
              className='w-full py-2 mb-2 text-white resize-none focus:outline-none rounded-2xl bg-blackBG'
              placeholder="What's happening?"
              style={{ minHeight: '60px', overflow: 'hidden' }} // Set a minimum height to establish an initial size
            />

            <div className='relative w-full overflow-hidden group rounded-xl'>
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
                    showRotate={true}
                    alt='Preview'
                    className=' group-hover:opacity-50 border transition-all duration-300 ease-in border-[#333639]  rounded-2xl  '
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
