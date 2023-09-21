import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { fetchPosts } from '@/lib/redux/slices/blogPostSlice'
import BlogPostCard from '../Blog/BlogPostCard'

const LatestBlogPost: React.FC = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state: any) => state.blogPost.posts)
  console.log(posts)
  const status = useSelector((state: any) => state.blogPost.status)
  const error = useSelector((state: any) => state.blogPost.error)

  // Fetch posts on initial render
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [status, dispatch])

  // Filter out duplicate posts
  const uniquePosts = Array.from(
    new Map(posts.map((post) => [post['_id'], post])).values()
  )
  return (
    <section className="container flex flex-col items-center justify-center h-full px-4 py-40 mx-auto">
      <h1 className="mb-4 text-4xl tracking-widest text-center text-secondary font-Chakra">
        Blog
      </h1>
      <div className="w-[250px]   mx-auto  border-secondary border-2"></div>

      <div className="max-w-6xl py-10 mx-auto mt-8">
        {/* Loading state */}
        {status === 'loading' && (
          <div className="w-full text-lg font-medium text-center ">
            <div className="w-12 h-12 mx-auto text-white ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"></div>
            Loading post...
          </div>
        )}

        {/* Display posts */}
        {status === 'succeeded' && posts && posts.length > 0 && (
          <div className="mx-auto ">
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
          <div className="w-full mt-8 text-lg font-medium text-center text-gray-600">
            No posts available.
          </div>
        )}

        {/* Error state */}
        {status === 'failed' && (
          <div className="w-full mt-8 text-lg font-medium text-center text-red-500">
            Error: {error}
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestBlogPost
