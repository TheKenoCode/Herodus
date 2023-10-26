import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllUsers } from '@/lib/redux/slices/userSlice';
import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice';
import { AppDispatch } from '@/lib/redux/store';

export default function Dashboard({ setSelectedTab }) {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.userPost.posts);

  const users = useSelector((state: RootState) => state.user.allUsers);
  const numOfPosts = posts.length;
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchUserPosts());
  }, [dispatch]);
  return (
    <div className='h-screen px-8 bg-blackBG'>
      <h1 className='mb-6 text-2xl font-bold text-white '>Admin Dashboard</h1>

      {/* Overview statistics */}
      <div className='grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 xl:grid-cols-4'>
        <div className='p-6 text-white border shadow rounded-3xl bg-primary border-grayBorder'>
          <p className='text-sm text-secondary'>Total Users</p>
          <p className='text-3xl font-bold'>{users.length}</p>
        </div>
        <div className='p-6 text-white border shadow rounded-3xl bg-primary border-grayBorder'>
          <p className='text-sm text-secondary'>Total Posts</p>
          <p className='text-3xl font-bold'>{numOfPosts}</p>
        </div>
        <div className='p-6 text-white border shadow rounded-3xl bg-primary border-grayBorder'>
          <p className='text-sm text-secondary'>Total Comments</p>
          <p className='text-3xl font-bold'>N/A</p>
        </div>
        <div className='p-6 text-white border shadow rounded-3xl bg-primary border-grayBorder'>
          <p className='text-sm text-secondary'>Active Users</p>
          <p className='text-3xl font-bold'>N/A</p>
        </div>
      </div>

      {/* Recent activity */}
      <div className='p-6 mb-8 text-white border shadow rounded-3xl bg-primary border-grayBorder'>
        <h2 className='mb-4 text-xl font-bold'>Recent Activity</h2>
        {/* Sample list of recent activities. Ideally, this would be dynamic and fetched from a server. */}
        <ul>
          {posts
            .slice(-3)
            .reverse()
            .map((post) => (
              <li className='mb-2'>
                User <span className='text-secondary'>@{post.author.name}</span>{' '}
                created a new post.
              </li>
            ))}
        </ul>
      </div>

      {/* Action buttons or quick links */}
      <div className='flex space-x-4'>
        <button
          className='px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700'
          onClick={() => {
            setSelectedTab('Blog');
          }}
        >
          Create New Post
        </button>
        <button
          className='px-4 py-2 text-white rounded bg-emerald-400 hover:bg-emerald-700'
          onClick={() => {
            setSelectedTab('Users');
          }}
        >
          Manage Users
        </button>
      </div>

      {/* Add more components or information as needed */}
    </div>
  );
}
