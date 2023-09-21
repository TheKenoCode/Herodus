// React and Next.js imports
import React, { useEffect } from 'react'

// Component imports
import PostCard from './PostsCard'
import PostForm from './PostForm'
import loading from '@/public/assets/Ripple-1s-200px.gif'
// Assets
import profileImg from '@/public/assets/Herodotus.png'

// Redux-related imports
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice'
import Image from 'next/image'

interface Post {
  _id: string
  author: { name: string }
  content: string
  createdAt: string
  imageUrl: string
}
interface PostsProps {
  filteredPosts: Post[] | null
  status: 'loading' | 'failed' | 'success'
}

const Posts: React.FC<PostsProps> = ({ filteredPosts, status }) => {
  if (status === 'loading')
    return <Image src={loading} alt="loading" className="w-12 pt-20 mx-auto" />
  if (status === 'failed') return <div>Error</div>
  if (!filteredPosts)
    return (
      <p className="pt-10 text-2xl text-center text-white">No posts yet.</p>
    )
  return (
    <div className="md:border-x border-[#333639] w-screen md:w-[600px] mx-auto flex flex-col shadow-2xl">
      {filteredPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Posts
