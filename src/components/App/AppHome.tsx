// React imports
// Next.js and NextAuth utilities
import { useEffect } from 'react';
// Redux-related imports
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice';
import { RootState } from '@/lib/redux/store';
import { AppDispatch } from '@/lib/redux/store';

import PostForm from '@/components/App/PostForm';
// Component imports
import Posts from '@/components/App/Posts';
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
export default function AppHome() {
  // Redux hooks for state and dispatch
  const posts = useSelector((state: RootState) => state.userPost.posts);

  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isAuthenticated,
  );
  const userId = useSelector((state: RootState) => state.auth?.user?._id);

  // Filter and unique posts based on the author ID
  const filteredPosts = Array.from(
    new Map(posts.map((post) => [post['_id'], post])).values(),
  ).reverse();

  // Fetch user posts on component mount
  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [dispatch]);

  return (
    <div className='flex items-start justify-center h-full py-20 bg-cover md:pt-0 bg-blackBG'>
      <div className='flex flex-col justify-start w-screen md:w-full'>
        {isLoggedIn ? (
          <div className=' md:border-x border-grayBorder'>
            <div className='h-[53px] flex justify-center items-center pb-4'>
              <button className='w-full'>
                <span className='pb-3 text-lg font-semibold text-white border-b-4 border-secondary'>
                  For you
                </span>
              </button>
              <button className='w-full'>
                <span className='pb-3 text-lg font-semibold text-gray-500 border-secondary'>
                  Following
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className='items-center flex flex-col justify-center border-b border-grayBorder h-[100px]'>
            <h1 className='text-2xl text-white'>Please Login!</h1>
          </div>
        )}
        {isLoggedIn && <PostForm />}

        <Posts posts={filteredPosts} userId={userId} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}
