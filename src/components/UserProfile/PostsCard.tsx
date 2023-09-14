// React imports
import React, { useState, useEffect } from 'react'

// Next.js components
import Image from 'next/image'
import Link from 'next/link'

// External libraries and components
import ReactTimeAgo from 'react-time-ago'
import ModalImage from 'react-modal-image'
import ReactHashtag from 'react-hashtag'
import { useImageSize } from 'react-image-size'

// Icons
import {
  BiLike,
  BiComment,
  BiRepost,
  BiShareAlt,
  BiBarChart,
  BiDotsHorizontalRounded,
} from 'react-icons/bi'
import { MdVerified } from 'react-icons/md'

// Assets
import profileImg from '@/public/assets/Herodotus.png'
import loading from '@/public/assets/Ripple-1s-200px.gif'

// Type definitions
interface Post {
  _id: string
  author: { name: string }
  content: string
  createdAt: string
  imageUrl: string
}

interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isPortrait, setIsPortrait] = useState(false)
  const [dimensions, { loading, error }] = useImageSize(post.imageUrl)

  // Determine image orientation (portrait or landscape)
  useEffect(() => {
    if (dimensions) {
      setIsPortrait(dimensions.width < dimensions.height)
    }
  }, [dimensions])
  return (
    <div key={post._id} className="p-4 border-b shadow-sm border-grayBorder ">
      <div className="flex">
        {/* Profile Image */}
        <Link href={`/app/profile/${post.author._id}`}>
          <div className=" mr-4 w-[50px] overflow-hidden h-[50px] relative bg-black rounded-full">
            <Image
              src={post.author.imageUrl || loading}
              alt={`${post.author.name}'s profile`}
              fill
              className="object-contain scale-[.85] "
            />
          </div>
        </Link>

        {/* Post Content */}
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex">
              <Link className="flex" href={`/app/profile/${post.author._id}`}>
                <div className="flex items-center w-min">
                  <h3 className="my-auto mr-2 text-base font-bold text-white">
                    {post.author.name}
                  </h3>
                  {post.author?.role === 'admin' && (
                    <MdVerified className="mt-1 text-xl text-third" />
                  )}
                </div>

                <span className="text-gray-500 text-base my-auto ml-[4px]">
                  @{post.author.name}
                </span>
              </Link>

              <span className=" mx-[6px] font-bold text-xl my-auto text-gray-400">
                ·
              </span>
              <span className="my-auto text-base text-gray-500">
                <ReactTimeAgo
                  date={post.createdAt}
                  locale="en-US"
                  timeStyle="round-minute"
                />
              </span>
            </div>
            <BiDotsHorizontalRounded className="text-2xl text-gray-500 cursor-pointer hover:text-secondary" />
          </div>
          <p className="text-base text-white break-words whitespace-pre-wrap">
            <ReactHashtag>{post.content}</ReactHashtag>
          </p>

          {/* Optional Image */}
          {post.imageUrl && (
            <div
              className={`relative ${
                isPortrait ? 'w-full md:w-[400px]' : 'w-full  '
              } overflow-hidden rounded-xl mt-2`}
            >
              <ModalImage
                small={post.imageUrl}
                medium={post.imageUrl}
                showRotate={true}
                alt="img"
                className="rounded-xl border border-[#333639]"
              />
            </div>
          )}

          {/* post actions */}
          <div className="flex justify-between w-full h-10">
            <div className="flex items-center justify-center">
              <BiComment className="text-xl text-gray-500 cursor-pointer hover:text-third" />
              <span className="ml-2 text-gray-500">0</span>
            </div>

            <div className="flex items-center justify-center">
              <BiRepost className="text-2xl text-gray-500 cursor-pointer hover:text-green-500" />
              <span className="ml-2 text-gray-500">0</span>
            </div>
            <div className="flex items-center justify-center">
              <BiLike className="text-xl text-gray-500 cursor-pointer hover:text-secondary" />
              <span className="ml-2 text-gray-500">0</span>
            </div>
            <div className="flex items-center justify-center">
              <BiShareAlt className="text-xl text-gray-500 cursor-pointer hover:text-third" />
              <span className="ml-2 text-gray-500">0</span>
            </div>
            <div className="flex items-center justify-center">
              <BiBarChart className="text-2xl text-gray-500 cursor-pointer hover:text-third" />
              <span className="ml-2 text-gray-500">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
