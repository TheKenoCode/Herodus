// React imports
import { useState, useEffect } from 'react'

// Next.js and NextAuth utilities
import { useSession } from 'next-auth/react'

// Redux-related imports
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice'

// Component imports
import Posts from '@/components/UserProfile/Posts'
import PostForm from '@/components/UserProfile/PostForm'

interface Props {
  // define your props here
}

const AppHome: React.FC<Props> = (props) => {
  // Redux hooks for state and dispatch
  const posts = useSelector((state: any) => state.userPost.posts)
  const status = useSelector((state: any) => state.userPost.status)

  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)
  const isLoggedIn = auth?.isAuthenticated

  // Filter and unique posts based on the author ID
  const filteredPosts = Array.from(
    new Map(posts.map((post) => [post['_id'], post])).values()
  ).reverse()

  // Fetch user posts on component mount
  useEffect(() => {
    dispatch(fetchUserPosts())
  }, [dispatch])

  return (
    <div className="flex   items-start justify-center h-full py-20 bg-cover md:pt-0 bg-blackBG">
      <div className="flex md:w-full	 flex-col justify-start w-screen">
        {isLoggedIn ? (
          <div className=" md:border-x border-grayBorder">
            <div className="h-[53px] flex justify-center items-center pb-4">
              <button className="w-full">
                <span className="pb-3 text-lg font-semibold text-white border-b-4 border-secondary">
                  For you
                </span>
              </button>
              <button className="w-full">
                <span className="pb-3 text-lg font-semibold text-gray-500 border-secondary">
                  Following
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="items-center flex flex-col justify-center border-b border-grayBorder h-[100px]">
            <h1 className="text-2xl text-white">Please Login!</h1>
          </div>
        )}
        {isLoggedIn && <PostForm isLoggedIn={isLoggedIn} />}

        <Posts filteredPosts={filteredPosts} status={status} />
      </div>
    </div>
  )
}

export default AppHome
