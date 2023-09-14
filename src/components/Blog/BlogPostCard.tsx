import React, { useEffect } from 'react'
import blogCardImage from '@/public/assets/blogcardimage.jpg'
import Link from 'next/link'
import Image from 'next/image'
import ButtonRed from '../ButtonRed'
import ReadMore from '@/public/assets/ReadMoreButton.png'

const BlogPostCard: React.FC = ({ post }) => {
  // Utility function to create a summary of the content
  const createSummary = (content, wordLimit = 20) => {
    const words = content.split(' ')
    if (words.length <= wordLimit) {
      return content
    }
    return `${words.slice(0, wordLimit).join(' ')}...Read more`
  }
  return (
    <div
      key={post._id}
      className="overflow-hidden shadow-2xl shadow-black rounded-3xl bg-primary"
    >
      <Image
        src={blogCardImage}
        alt={post.title}
        className="object-cover w-full h-48"
      />
      <div className="p-5">
        <Link href={`/home/blog/${post._id}`}>
          <h5 className="mb-4 text-2xl font-semibold tracking-tight text-gray-300 hover:underline">
            {post.title}
          </h5>
        </Link>
        <Link href={`/home/blog/${post._id}`}>
          <p
            className="mb-4 text-gray-400"
            dangerouslySetInnerHTML={{
              __html: createSummary(post.content),
            }}
          ></p>
        </Link>
        <Link
          className="inline-flex items-center py-2 text-sm font-medium text-white rounded-lg "
          href={`/home/blog/${post._id}`}
        >
          <ButtonRed buttonImage={ReadMore} />
        </Link>
      </div>
    </div>
  )
}

export default BlogPostCard
