'use client';

// React imports
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux slice imports
import { fetchPosts } from '@/lib/redux/slices/blogPostSlice';
import { RootState } from '@/lib/redux/store';
import { AppDispatch } from '@/lib/redux/store';

import BlogPostCard from '@/components/Blog/BlogPostCard';

// Assets
import blogCardImage from '@/public/assets/blogcardimage.jpg';
interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
export default function Blog() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.blogPost.posts);
  const status = useSelector((state: RootState) => state.blogPost.status);
  const error = useSelector((state: RootState) => state.blogPost.error);

  // Fetch posts on initial render
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  // Filter out duplicate posts
  const uniquePosts = Array.from(
    new Map(posts.map((post: Post) => [post['_id'], post])).values(),
  );

  return (
    <div className='bg-center bg-no-repeat bg-cover bg-blackBG'>
      <div className='relative w-full h-[400px] overflow-hidden'>
        <Image
          src={blogCardImage}
          alt='header'
          layout='fill'
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black opacity-60'></div>

        {/* Centering the title */}
        <h1 className='absolute z-10 w-full px-4 text-4xl font-extrabold text-center text-white transform -translate-x-1/2 -translate-y-1/2 md:text-5xl left-1/2 top-1/2'>
          Herodus Blog
        </h1>
      </div>

      <section className='py-10 mt-8'>
        {/* Loading state */}
        {status === 'loading' && (
          <div className='w-full text-lg font-medium text-center '>
            <div className='w-12 h-12 mx-auto text-white ease-linear border-4 border-t-4 border-gray-200 rounded-full loader'></div>
            Loading posts...
          </div>
        )}

        {/* Display posts */}
        {status === 'succeeded' && posts && posts.length > 0 && (
          <div className='container grid grid-cols-1 gap-6 mx-auto mt-8 md:grid-cols-2 xl:grid-cols-3'>
            {uniquePosts.reverse().map((post: Post) => (
              <BlogPostCard post={post} key={post._id} />
            ))}
          </div>
        )}

        {/* No posts available state */}
        {status === 'succeeded' && (!posts || posts.length === 0) && (
          <div className='w-full mt-8 text-lg font-medium text-center text-gray-600'>
            No posts available.
          </div>
        )}

        {/* Error state */}
        {status === 'failed' && (
          <div className='w-full mt-8 text-lg font-medium text-center text-red-500'>
            Error: {error}
          </div>
        )}
      </section>
    </div>
  );
}
