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

const Posts: React.FC = ({ filteredPosts, loadingPostsStatus }) => {
  return (
    <div className=" md:border-x border-[#333639] w-screen md:w-[600px]  mx-auto  flex flex-col   shadow-2xl">
      {loadingPostsStatus === 'loading' ? (
        <Image src={loading} alt="loading" className="w-12 pt-20 mx-auto" />
      ) : (
        <>
          {filteredPosts.length === 0 ? (
            <>
              <p className="pt-10 text-2xl text-center text-white">
                No posts yet.
              </p>
            </>
          ) : (
            filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </>
      )}
    </div>
  )
}

export default Posts
