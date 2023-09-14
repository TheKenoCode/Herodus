'use client'

// React imports
import { useState, useEffect } from 'react'

// Next imports and hooks
import { useSession } from 'next-auth/react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'

// Redux state and actions
import { RootState } from '@/lib/redux/store'
import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice'
import { fetchAllUsers } from '@/lib/redux/slices/userSlice'

// Components
import Posts from '@/components/UserProfile/Posts'
import UserCard from '@/components/UserProfile/UserCard'
import ProfilePostForm from '@/components/UserProfile/ProfilePostForm'

const UserProfile: NextPage<UserProfileProps> = () => {
  const posts = useSelector((state: RootState) => state.userPost.posts)
  const loadingPostsStatus = useSelector(
    (state: RootState) => state.userPost.status,
  )
  const userId = useSelector((state: RootState) => state.auth?.user?.id)
  const { status, data: session } = useSession()
  const dispatch = useDispatch()
  const { id } = useParams()
  const users = useSelector((state: any) => state.user.allUsers)
  const user = users.find((u: any) => u._id === id)

  // Filter unique posts based on the author ID and reverse the order
  const filteredPosts = Array.from(
    new Map(
      posts
        .filter((post) => post.author._id === id)
        .map((post) => [post['_id'], post]),
    ).values(),
  ).reverse()

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isAuthenticated,
  )

  // Fetch user posts and all users on component mount
  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchUserPosts())
  }, [dispatch])

  return (
    <div className="flex items-start justify-start h-full py-16 bg-cover md:py-0 bg-blackBG">
      <div className="flex flex-col ">
        <UserCard
          filteredPosts={filteredPosts}
          user={user}
          userId={userId}
          id={id}
          isLoggedIn={isLoggedIn}
        />

        <ProfilePostForm id={id} />

        <Posts
          filteredPosts={filteredPosts}
          loadingPostsStatus={loadingPostsStatus}
        />
      </div>
    </div>
  )
}

export default UserProfile
