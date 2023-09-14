// React imports
import React, { useState, useEffect, useRef } from 'react'

// Next.js components and hooks
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUserPosts,
  createUserPost,
} from '@/lib/redux/slices/UserPostSlice'
import { fetchAllUsers } from '@/lib/redux/slices/userSlice'

// External libraries and components
import axios from 'axios'
import ModalImage from 'react-modal-image'

// Icons
import { IoMdAdd } from 'react-icons/io'
import { RiCloseFill } from 'react-icons/ri'
import { BsCardImage } from 'react-icons/bs'

// Assets
import profileImg from '@/public/assets/Herodotus.png'

interface AuthState {
  user?: {
    role: string
  }
  isAuthenticated?: boolean
}

const ProfilePostForm: React.FC = ({ id }) => {
  const auth = useSelector((state: RootState) => state.auth) as AuthState
  const userId = auth?.user?.id
  const users = useSelector((state: any) => state.user.allUsers)
  const user = users.find((u: any) => u._id === userId)
  const isLoggedIn = auth?.isAuthenticated
  const dispatch = useDispatch()
  const [newPostFormOpen, setNewPostFormOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [content, setContent] = useState('')
  const [feedback, setFeedback] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Fetch all users when the component mounts.
    dispatch(fetchAllUsers())
  }, [dispatch])

  const handleClick = () => {
    ref.current?.click()
    setSelectedImage(null)
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target.files[0])
  }
  const handleImageCancel = () => {
    setSelectedImage(null)
  }
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    // Reset the height to 'auto' to get the scroll height correctly
    e.target.style.height = 'auto'
    // Set the height to scrollHeight to grow as content is added
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  useEffect(() => {
    if (selectedImage) {
      URL.revokeObjectURL(URL.createObjectURL(selectedImage))
    }
  }, [selectedImage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem('authToken')
    if (!token) {
      console.error('No token found in local storage.')
      setFeedback('Error: No token found in local storage.')
      return
    }
    const formData = new FormData()
    formData.append('content', content)
    if (selectedImage != null) {
      formData.append('image', selectedImage)
    }

    try {
      const response = await axios.post('/api/userposts', formData, {
        headers: {
          authToken: `Bearer ${token}`,
        },
      })
      dispatch(fetchUserPosts())
      setNewPostFormOpen(false)
      setContent('')
      setSelectedImage(null) // Reset the selected image
      setFeedback('Post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      setFeedback(`Error: ${error.message}`)
    }
  }

  const contentPercentage = Math.min((content.length / 280) * 100, 100)

  // Define the border background for the progress circle
  const borderBackground =
    contentPercentage === 100
      ? 'conic-gradient(red 0% 100%)' // When the content is at the limit, use red
      : `conic-gradient(green 0% ${contentPercentage}%, transparent ${contentPercentage}% 100%)` // Otherwise, fill with green up to the percentage used

  return (
    <div className="border-b pt-10 md:border-x border-grayBorder z-40 bg-blackBG   min-h-[50px]  md:w-[600px]   relative transition-all transform duration-300 ease-in-out">
      <div className="flex items-center justify-between w-full px-4 -mb-1 ">
        <button className="pb-2 text-base font-bold text-white border-b-4 border-secondary ">
          Posts
        </button>
        <button className="pb-2 text-base font-semibold text-gray-500">
          Histories
        </button>
        <button className="pb-2 text-base font-semibold text-gray-500">
          Likes
        </button>
        <button className="pb-2 text-base font-semibold text-gray-500">
          Clubs
        </button>
        <button className="pb-2 text-base font-semibold text-gray-500">
          NFTs
        </button>
        <div className="flex max-w-xl pb-2 text-white ">
          {isLoggedIn ? (
            <>
              {auth.user.id === id ? (
                <div className="flex ">
                  <button onClick={() => setNewPostFormOpen(!newPostFormOpen)}>
                    {newPostFormOpen ? (
                      <RiCloseFill className="text-4xl transition-all duration-300 scale-100 opacity-100 text-secondary" />
                    ) : (
                      <IoMdAdd className="text-4xl transition-all duration-300 scale-100 opacity-100 text-secondary " />
                    )}
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      <div
        className={`pt-2  max-w-2xl mx-auto px-4 transform origin-top h-0 ease-in-out
    transition-all duration-300 
    ${
      newPostFormOpen
        ? 'opacity-100  border-t border-grayBorder h-full visible '
        : 'opacity-0 scale-y-0 h-0 collapse '
    }`}
      >
        <div className="flex mt-8 ">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col justify-between w-full h-full mb-4 "
          >
            <textarea
              value={content}
              name="content"
              onChange={handleContentChange}
              className="w-full py-2 mb-2 text-white resize-none focus:outline-none rounded-2xl bg-blackBG"
              placeholder="What's happening?"
              style={{ minHeight: '60px', overflow: 'hidden' }} // Set a minimum height to establish an initial size
            />

            <div className={`relative group w-full overflow-hidden rounded-xl`}>
              {selectedImage && (
                <>
                  <RiCloseFill
                    className="absolute z-10 hidden text-5xl text-gray-200 cursor-pointer group-hover:block hover:text-secondary top-2 right-2"
                    onClick={() => {
                      handleImageCancel()
                    }}
                  />
                  <ModalImage
                    small={URL.createObjectURL(selectedImage)}
                    medium={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className=" group-hover:opacity-50 border transition-all duration-300 ease-in border-[#333639]  rounded-2xl  "
                  />
                </>
              )}
            </div>

            <div className="sticky bottom-0 flex items-center justify-between pt-2 text-white border-t border-secondary bg-blackBG">
              <div className="relative my-auto " onClick={handleClick}>
                <BsCardImage className="top-0 my-auto text-2xl cursor-pointer text-secondary" />
                <input
                  type="file"
                  ref={ref}
                  name="image"
                  className="absolute hidden"
                  onChange={handleImageChange}
                />
              </div>

              <div className="flex">
                <span
                  className={`text-sm text-gray-300 ${
                    content.length > 280 ? 'text-red-500' : ''
                  } my-auto`}
                >
                  {content.length}/280
                </span>
                <button
                  type="submit"
                  className="px-4 text-sm py-[4px]  ml-2   text-white border-2 rounded-full border-secondary hover:bg-secondary transition-all duration-300 ease-in cursor-pointer"
                  disabled={content.length > 280}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePostForm
