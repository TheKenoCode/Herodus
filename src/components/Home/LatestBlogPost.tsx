import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts } from '@/lib/redux/slices/blogPostSlice';
import { RootState } from '@/lib/redux/store';
import { AppDispatch } from '@/lib/redux/store';

import BlogPostCard from '../Blog/BlogPostCard';

export default function LatestBlogPost() {
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
    new Map(posts.map((post) => [post['_id'], post])).values(),
  );
  return (
    <section className='container flex flex-col items-center justify-center h-full px-4 py-20 mx-auto'>
      <div className='max-w-6xl  mx-auto '>
        <div className='container mx-auto mb-10'>
          <h1 className='z-20 mb-4 text-2xl tracking-widest text-center text-secondary font-Chakra'>
            blog
          </h1>
          <div className='w-[250px]   mx-auto border-secondary border-2'></div>
        </div>
        {/* Loading state */}
        {status === 'loading' && (
          <div className='w-full text-lg font-medium text-center '>
            <div className='w-12 h-12 mx-auto text-white ease-linear border-4 border-t-4 border-gray-200 rounded-full loader'></div>
            Loading post...
          </div>
        )}

        {/* Display posts */}
        {status === 'succeeded' && posts && posts.length > 0 && (
          <div className='mx-auto '>
            {uniquePosts
              .slice(-1)
              .reverse()
              .map((post) => (
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
      </div>
    </section>
  );
}
