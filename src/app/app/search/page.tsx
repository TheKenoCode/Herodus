/** @format */

'use client';

// React imports
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';
// Redux imports
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice';
import { fetchAllUsers } from '@/lib/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/lib/redux/store';

// Components
import PostCard from '@/components/App/PostCard';
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
export default function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.userPost.posts);
  const users = useSelector((state: RootState) => state.user.allUsers);
  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const { id } = useParams<{ id: string }>();

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isAuthenticated
  );

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('posts');
  const lowerCaseQuery = query.toLowerCase();

  const filteredPostsNewMap = Array.from(
    new Map(posts.map((post: UserPost) => [post['_id'], post])).values()
  ).reverse();

  useEffect(() => {
    dispatch(fetchUserPosts());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredPosts = () => {
    if (filter === 'posts') {
      return filteredPostsNewMap.filter((post: UserPost) =>
        post.content && post.content.length > 0 && query
          ? post.content.toLowerCase().includes(lowerCaseQuery)
          : post.content
      );
    }
  };
  const filteredUsers = () => {
    if (filter === 'users') {
      return users.filter((user: User) =>
        user.name ? user.name.toLowerCase().includes(lowerCaseQuery) : false
      );
    }
  };

  return (
    <div className='w-screen md:w-[600px] pt-20 pb-16 md:pb-0 md:pt-2 '>
      <div className='px-2 mb-4 '>
        <input
          type='text'
          placeholder='Search...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full p-2 text-white bg-gray-700 rounded-full focus:outline-none focus:ring-0'
        />
      </div>
      <div className='flex border-b border-grayBorder'>
        <button
          onClick={() => setFilter('posts')}
          className={`py-2 px-4 ${
            filter === 'posts'
              ? 'border-b-2 text-white border-third'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setFilter('users')}
          className={`py-2 px-4 ${
            filter === 'users'
              ? 'border-b-2 text-white border-third'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Users
        </button>
      </div>
      <div>
        {filter === 'posts' ? (
          <>
            {filteredPosts()?.map((post) => (
              <div key={post._id}>
                <PostCard
                  key={post._id}
                  post={post}
                  userId={userId}
                  id={id}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            ))}
          </>
        ) : null}
        {filter === 'users' ? (
          <>
            {filteredUsers()?.map((user, index) => (
              <div key={index}>
                <Link
                  href={`/app/profile/${user._id}`}
                  className='flex items-center p-2 space-x-4 min-h-[100px] border-grayBorder  cursor-pointer border-b hover:bg-purpleBG'
                >
                  <Image
                    width={50}
                    height={50}
                    src={user.imageUrl}
                    alt={user.name}
                    className='object-contain border rounded-full border-grayBorder w-14 h-14 scale-70 bg-blackBG'
                  />
                  <div>
                    <div className='font-bold text-white'>{user.name}</div>
                    <div className='text-base text-gray-500'>@{user.name}</div>

                    <div className='text-gray-400'>{user.bio}</div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}
