// React imports
import axios from 'axios';
// Next.js components
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactHashtag from 'react-hashtag';
// Icons
import {
  BiBarChart,
  BiComment,
  BiDotsHorizontalRounded,
  BiLike,
  BiRepost,
  BiShareAlt,
} from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import { useImageSize } from 'react-image-size';
import ModalImage from 'react-modal-image';
import { useDispatch } from 'react-redux';
// External libraries and components
import ReactTimeAgo from 'react-time-ago';

import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice';
import { fetchUserById } from '@/lib/redux/slices/userSlice';
import { AppDispatch } from '@/lib/redux/store';
import { useRouter } from 'next/navigation';
import PostMenu from './PostMenu';

// Type definitions
interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  role: string;
  location: string;
  userLink: string;
  imageUrl: string;
  coverImage: string;
  YHaplogroup: string;
  MtHaplogroup: string;
  likedPosts: UserPost[];
  createdAt: string;
}
interface UserPost {
  _id: string;
  content: string;
  author: User;
  imageUrl: string;
  likes: string[];
  createdAt: string;
}

interface PostCardProps {
  post: UserPost;
  userId?: string;
  id?: string;
  isLoggedIn?: boolean;
}

export default function PostCard({
  post,
  userId,
  id,
  isLoggedIn,
}: PostCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [dimensions] = useImageSize(post.imageUrl);
  const userHasLiked = post?.likes?.includes(userId);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>(); // Determine image orientation (portrait or landscape)
  useEffect(() => {
    if (dimensions) {
      setIsPortrait(dimensions.width < dimensions.height);
    }
  }, []);

  const handleLikeClick = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in local storage.'); //eslint-disable-line
      // setFeedback('Error: No token found in local storage.');
      return;
    }
    axios
      .put(
        `/api/userposts/likes/${post._id}`,
        {},
        {
          headers: { authToken: `Bearer ${token}` },
        }
      )
      .then(() => {
        dispatch(fetchUserPosts());
        if (id) {
          dispatch(fetchUserById(id));
        }
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message to the user)
        console.error('Failed to like:', error); //eslint-disable-line
        alert(error.message || 'Failed to like');
      });
  };
  return (
    <div key={post._id} className='p-4 border-b shadow-sm border-grayBorder '>
      <div className='flex'>
        {/* Profile Image */}

        <Link
          className=' mr-4 w-[50px] overflow-hidden h-[50px] relative bg-black rounded-full'
          href={`/app/profile/${post.author._id}`}
        >
          <Image
            src={post.author.imageUrl || '/public/assets/Ripple-1s-200px.gif'}
            alt={`${post.author.name}'s profile`}
            fill
            className='object-contain scale-[.85] '
          />
        </Link>

        {/* Post Content */}
        <div className='w-full'>
          <div className='flex justify-between'>
            <div className='flex'>
              <Link className='flex' href={`/app/profile/${post.author._id}`}>
                <div className='flex items-center w-min'>
                  <h3 className='my-auto mr-2 text-base font-bold text-white'>
                    {post.author.name}
                  </h3>
                  {post.author?.role === 'admin' && (
                    <MdVerified className='mt-1 text-xl text-third' />
                  )}
                </div>

                <span className='text-gray-500 text-base my-auto ml-[4px]'>
                  @{post.author.name}
                </span>
              </Link>

              <span className=' mx-[6px] font-bold text-xl my-auto text-gray-400'>
                ·
              </span>
              <span className='my-auto text-base text-gray-500'>
                <ReactTimeAgo
                  date={Date.parse(post.createdAt)}
                  locale='en-US'
                  timeStyle='round-minute'
                />
              </span>
            </div>
            <div className='relative'>
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
              >
                <BiDotsHorizontalRounded className='text-2xl text-gray-500 cursor-pointer hover:text-secondary' />
              </button>
              <PostMenu
                menuOpen={menuOpen}
                post={post}
                id={id}
                setMenuOpen={setMenuOpen}
              />
            </div>
          </div>
          <p className='text-base text-white break-words whitespace-pre-wrap'>
            <ReactHashtag>{post.content}</ReactHashtag>
          </p>

          {/* Optional Image */}
          {post.imageUrl && (
            <div
              className={`relative ${
                isPortrait ? 'w-full md:w-[400px] h-[600px]' : 'w-full  '
              } overflow-hidden rounded-xl mt-2`}
            >
              <ModalImage
                small={post.imageUrl}
                medium={post.imageUrl}
                showRotate={true}
                alt='img'
                className='rounded-xl border border-[#333639] object-cover'
              />
            </div>
          )}

          {/* post actions */}
          <div className='flex justify-between w-full h-10'>
            <div className='flex items-center justify-center'>
              <BiComment className='text-xl text-gray-500 cursor-pointer hover:text-third' />
              <span className='ml-2 text-gray-500'>0</span>
            </div>

            <div className='flex items-center justify-center'>
              <BiRepost className='text-2xl text-gray-500 cursor-pointer hover:text-green-500' />
              <span className='ml-2 text-gray-500'>0</span>
            </div>
            <div className='flex items-center justify-center'>
              <BiLike
                className={`text-xl cursor-pointer hover:text-secondary ${
                  userHasLiked ? 'text-secondary' : 'text-gray-500'
                }`}
                onClick={() => {
                  if (!isLoggedIn) {
                    router.push('/auth/login');
                  } else {
                    handleLikeClick();
                  }
                }}
              />{' '}
              <span className='ml-2 text-gray-500'>{post.likes.length}</span>
            </div>
            <div className='flex items-center justify-center'>
              <BiShareAlt className='text-xl text-gray-500 cursor-pointer hover:text-third' />
              <span className='ml-2 text-gray-500'>0</span>
            </div>
            <div className='flex items-center justify-center'>
              <BiBarChart className='text-2xl text-gray-500 cursor-pointer hover:text-third' />
              <span className='ml-2 text-gray-500'>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
