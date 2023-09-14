'use client'
// React and Next.js imports
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

// Redux-related imports
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '@/lib/redux/slices/blogPostSlice'
import {
  SlSocialTwitter,
  SlSocialInstagram,
  SlSocialYoutube,
} from 'react-icons/Sl'
// Assets
import blogCardImage from '@/public/assets/blogcardimage.jpg'
import logo from '@/public/assets/logo.png'
import Link from 'next/link'

interface Props {
  postId: number // Assuming you'll pass the ID of the post you want to display
}

const BlogPost: React.FC<Props> = ({}) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const posts = useSelector((state: any) => state.blogPost.posts)
  const post = useSelector((state: any) =>
    state.blogPost.posts.find((p: any) => p._id === id),
  )
  const status = useSelector((state: any) => state.blogPost.status)
  const error = useSelector((state: any) => state.blogPost.error)
  const uniquePosts = Array.from(
    new Map(posts.map((post) => [post['_id'], post])).values(),
  )
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
    <section className="relative bg-blackBG">
      {/* Main Header Image */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <Image
          src={blogCardImage}
          alt="header"
          layout="fill"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
        <h1 className="absolute z-10 w-full px-4 text-4xl md:w-[800px] font-extrabold text-center text-white transform -translate-x-1/2 -translate-y-1/2 md:text-5xl left-1/2 top-1/2">
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
          <div className="flex items-center p-4 rounded-lg bg-purpleBG">
            <Image
              src={logo}
              alt="Herodus Logo"
              className="w-32 h-24 mr-4 rounded"
            />
            <div>
              <h4 className="text-xl font-semibold">Discover Herodus</h4>
              <p className="font-medium my-4 text-gray-100 text-md">
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
            <a
              target="_blank"
              href="https://twitter.com/HerodusOfficial"
              className="flex items-center px-4 py-2 text-sm text-secondary rounded-md "
            >
              <SlSocialTwitter className="mr-2 text-2xl" />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/herodusofficial/"
              className="flex items-center px-4 py-2 text-sm text-secondary rounded-md "
            >
              <SlSocialInstagram className="mr-2 text-2xl" />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/@HerodusOfficial/featured"
              className="flex items-center px-4 py-2 text-sm text-secondary rounded-md "
            >
              <SlSocialYoutube className="mr-2 text-3xl" />
            </a>
          </div>

          {/* Related Articles */}
          <div className="mt-10">
            <h3 className="mb-4 text-xl font-semibold">Recent Articles:</h3>
            <ul className="space-y-2">
              {uniquePosts
                .slice(-3)
                .reverse()
                .map((post) => (
                  <li key={post._id}>
                    <a href="#" className="text-third hover:underline">
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
