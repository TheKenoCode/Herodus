'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { BsPlusSquare } from 'react-icons/bs'
import { RiCloseFill } from 'react-icons/ri'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

interface Props {
  // define your props here
}
const timeAgo = (dateString) => {
  const now = new Date()
  const postDate = new Date(dateString)
  const secondsPast = (now.getTime() - postDate.getTime()) / 1000

  if (secondsPast < 60) {
    return `${parseInt(secondsPast)} seconds ago`
  }
  if (secondsPast < 3600) {
    return `${parseInt(secondsPast / 60)} minutes ago`
  }
  if (secondsPast <= 86400) {
    return `${parseInt(secondsPast / 3600)} hours ago`
  }
  if (secondsPast > 86400) {
    const day = parseInt(secondsPast / 86400)
    return day > 1 ? `${day} days ago` : '1 day ago'
  }
}
const Posts: React.FC<Props> = ({ filteredPosts, profileImg }) => {
  const auth = useSelector((state: RootState) => state.auth)
  const userRole = useSelector((state: RootState) => state.auth?.user?.role)
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isAuthenticated
  )

  const [newPostFormOpen, setNewPostFormOpen] = useState(false)
  const [content, setContent] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem('authToken')
    if (!token) {
      console.error('No token found in local storage.')
      setFeedback('Error: No token found in local storage.')
      return
    }

    try {
      const response = await axios.post(
        `/api/userposts`,
        { content },
        { headers: { authToken: `Bearer ${token}` } }
      )

      console.log('Post created:', response.data)

      setContent('') // Clear the input after submitting
      setFeedback('Post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      setFeedback(`Error: ${error.message}`)
    }
    // Clear the input after submitting
  }

  return (
    <div className="col-span-3 relative row-span-4 px-2 py-4 overflow-y-auto rounded-none shadow-2xl lg:px-4 bg-[#381947] shadow-black rounded-t-2xl lg:rounded-3xl lg:col-span-2">
      <div className="flex justify-between text-white1 mx-2">
        <h2 className="mb-4 pl-2 text-xl font-bold text-white">Recent Posts</h2>
        {status === 'authenticated' || isLoggedIn ? (
          <div className="">
            <button
              onClick={() => {
                setNewPostFormOpen(!newPostFormOpen)
              }}
            >
              <RiCloseFill
                className={` transform text-5xl text-secondary  ease-in-out transition-all duration-500 ${
                  newPostFormOpen
                    ? ' opacity-100 scale-100  '
                    : '  scale-95 opacity-0 w-0 '
                }`}
              />
            </button>

            <button
              onClick={() => {
                setNewPostFormOpen(!newPostFormOpen)
              }}
            >
              <BsPlusSquare
                className={` transform  text-4xl text-secondary  ease-in-out transition-all duration-500 ${
                  newPostFormOpen
                    ? ' scale-95 opacity-0 w-0 '
                    : ' opacity-100 scale-100 mr-2'
                }`}
              />
            </button>
          </div>
        ) : null}
      </div>
      <div
        className={`pt-8 px-2  transform origin-top ease-in-out transition-all duration-500 ${
          newPostFormOpen
            ? 'opacity-100 scale-y-100 h-[300px]'
            : 'opacity-0 scale-y-95 h-0'
        }`}
      >
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="w-full h-[200px] p-2 mb-2 focus:outline-none  rounded-2xl bg-primary resize-none text-white"
            placeholder="What's happening?"
          ></textarea>
          <div className="flex px-2 justify-between text-white">
            <span className={`${content.length > 280 ? 'text-red-500' : ''}`}>
              {content.length}/280
            </span>
            <button
              type="submit"
              className="px-8 py-2 text-white border-2 rounded-full border-secondary"
              disabled={content.length === 0 || content.length > 280}
            >
              Post
            </button>
          </div>
        </form>
      </div>
      {filteredPosts === undefined || filteredPosts.length === 0 ? (
        <p className="text-white">No posts available.</p>
      ) : (
        filteredPosts.map((post) => (
          // Render each post
          <div
            key={post._id}
            className="flex flex-col rounded-b-2xl mt-2  border-b-[0.5px] border-gray-500 bg-[#381947] p-4 last:mb-0"
          >
            <div className="flex">
              <Image
                src={profileImg}
                alt={`${post.author.name}'s profile`}
                width={50}
                height={50}
                className="bg-white rounded-xl border-2 border-black"
              />
              <h3 className="my-auto ml-2 font-bold text-gray-100 ">
                {post.author.name}
              </h3>
            </div>
            <div>
              <p className="pt-6 pb-2  text-base leading-snug text-white break-words whitespace-break-spaces">
                {post.content}
              </p>
              {/* You can format the timestamp if needed */}
              <span className="text-sm text-gray-200 ">
                {timeAgo(post.createdAt)}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Posts
