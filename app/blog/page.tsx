'use client'

// React imports
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

// Redux slice imports
import { fetchPosts } from '../../redux/slices/blogPostSlice'

// Assets
import blogCardImage from '../../public/assets/blogcardimage.jpg'

interface Props {
  // Define props here if needed
}

const Blog: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state: any) => state.blogPost.posts)
  console.log(posts)
  const status = useSelector((state: any) => state.blogPost.status)
  const error = useSelector((state: any) => state.blogPost.error)

  // Utility function to create a summary of the content
  const createSummary = (content, wordLimit = 20) => {
    const words = content.split(' ')
    if (words.length <= wordLimit) {
      return content
    }
    return `${words.slice(0, wordLimit).join(' ')}...Read more`
  }

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
    <div className="bg-center bg-no-repeat bg-cover">
      <div className="relative w-full h-[400px] overflow-hidden">
        <Image
          src={blogCardImage}
          alt="header"
          layout="fill"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>

        {/* Centering the title */}
        <h1 className="absolute z-10 w-full px-4 text-4xl font-extrabold text-center text-white transform -translate-x-1/2 -translate-y-1/2 md:text-5xl left-1/2 top-1/2">
          Herodus Blog
        </h1>
      </div>

      <section className="py-10 mt-8">
        {/* Loading state */}
        {status === 'loading' && (
          <div className="w-full text-lg font-medium text-center ">
            <div className="w-12 h-12 mx-auto text-white ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"></div>
            Loading posts...
          </div>
        )}

        {/* Display posts */}
        {status === 'succeeded' && posts && posts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 mx-auto mt-8 md:grid-cols-2 lg:grid-cols-3">
            {uniquePosts.reverse().map((post) => (
              <div
                key={post._id}
                className="overflow-hidden border border-gray-600 shadow-lg rounded-3xl bg-primary"
              >
                <Image
                  src={blogCardImage}
                  alt={post.title}
                  className="object-cover w-full h-48"
                />
                <div className="p-5">
                  <Link href={`/blog/${post._id}`}>
                    <h5 className="mb-4 text-2xl font-semibold tracking-tight text-gray-300 hover:underline">
                      {post.title}
                    </h5>
                  </Link>
                  <Link href={`/blog/${post._id}`}>
                    <p
                      className="mb-4 text-gray-400"
                      dangerouslySetInnerHTML={{
                        __html: createSummary(post.content),
                      }}
                    ></p>
                  </Link>
                  <Link
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-secondary hover:bg-third focus:ring-4 focus:ring-blue-300"
                    href={`/blog/${post._id}`}
                  >
                    Read more
                  </Link>
                </div>
              </div>
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
      </section>
    </div>
  )
}

export default Blog
