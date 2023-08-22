'use client'
// React and Next.js imports
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

// Redux-related imports
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../../../redux/slices/blogPostSlice'

// Assets
import blogCardImage from '../../../public/assets/blogcardimage.jpg'
import logo from '../../../public/assets/logo.png'

interface Props {
  postId: number // Assuming you'll pass the ID of the post you want to display
}

const BlogPost: React.FC<Props> = ({}) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const posts = useSelector((state: any) => state.blogPost.posts)
  const post = useSelector((state: any) =>
    state.blogPost.posts.find((p: any) => p._id === id)
  )
  const status = useSelector((state: any) => state.blogPost.status)
  const error = useSelector((state: any) => state.blogPost.error)

  // Fetch posts on initial render
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [status, dispatch])

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'failed') return <div>Error: {error}</div>
  if (!post) return <div>Post not found.</div>

  return (
    <section className="relative">
      {/* Main Header Image */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <Image
          src={blogCardImage}
          alt="header"
          layout="fill"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
        <h1 className="absolute z-10 w-full px-4 text-4xl font-extrabold text-center text-white transform -translate-x-1/2 -translate-y-1/2 md:text-5xl left-1/2 top-1/2">
          {post.title}
        </h1>
      </div>

      <div className="max-w-5xl px-4 py-8 mx-auto text-white">
        {/* Post Meta Information */}
        {post.date && (
          <span className="flex items-center mb-8 space-x-6 text-sm">
            {new Date(post.date).toLocaleDateString()}
          </span>
        )}

        {/* Post Content */}
        <article
          className="mb-10 text-lg prose text-white break-words whitespace-pre-line post-content lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></article>

        {/* Footer */}
        <footer className="mt-12">
          {/* App Promotion */}
          <div className="flex items-center p-4 rounded-lg bg-[#2e0f52]">
            <Image
              src={logo}
              alt="Herodus Logo"
              className="w-32 h-32 mr-4 rounded"
            />
            <div>
              <h4 className="text-xl font-semibold">Discover Herodus</h4>
              <p className="font-medium text-gray-100 text-md">
                Experience a new way of doing XYZ. Dive deep into features and
                see what makes Herodus special.
              </p>
              <a
                href="/explore-herodus"
                className="inline-block px-4 py-2 mt-2 font-semibold text-white rounded bg-secondary hover:bg-third"
              >
                Explore More
              </a>
            </div>
          </div>

          {/* Sharing Buttons */}
          <div className="flex items-center mt-6 space-x-4">
            <button className="flex items-center px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600">
              <span className="mr-2">🐦 Twitter</span>
            </button>
            <button className="flex items-center px-4 py-2 text-sm text-white bg-blue-700 rounded-md hover:bg-blue-800">
              <span className="mr-2">📘 Facebook</span>
            </button>
            <button className="flex items-center px-4 py-2 text-sm text-white bg-blue-900 rounded-md hover:bg-blue-1000">
              <span className="mr-2">🔗 LinkedIn</span>
            </button>
          </div>

          {/* Related Articles */}
          <div className="mt-10">
            <h3 className="mb-4 text-xl font-semibold">Recent Articles:</h3>
            <ul className="space-y-2">
              {posts
                .slice(-3)
                .reverse()
                .map((post) => (
                  <li key={post._id}>
                    <a href="#" className="text-blue-600 hover:underline">
                      {post.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default BlogPost
