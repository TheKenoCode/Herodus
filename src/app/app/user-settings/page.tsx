/** @format */
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '@/lib/redux/slices/userSlice'
import { fetchAllUsers } from '@/lib/redux/slices/userSlice'
import userCoverPhoto from '@/public/assets/blogcardimage.jpg'

import Image from 'next/image'
import { BiCamera } from 'react-icons/bi'
import axios from 'axios'

const UserSettings: React.FC<Props> = (props) => {
  const userId = useSelector((state: RootState) => state.auth?.user?.id)
  const users = useSelector((state: any) => state.user.allUsers)
  const userFromUsers = users.find((u: any) => u._id === userId)
  const defaultUserData = {
    name: '',
    bio: '',
    imageUrl: '',
    coverImage: '',
    location: '',
    userLink: '',
    YHaplogroup: '',
    MtHaplogroup: '',
  }
  // const userFromAuth = useSelector((state: RootState) => state.auth?.user);
  const [userData, setUserData] = useState(
    userFromUsers ? userFromUsers : defaultUserData
  )
  const dispatch = useDispatch()
  const avatarRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)

  const [selectedAvatarImage, setSelectedAvatarImage] = useState(null)
  const [selectedCoverImage, setSelectedCoverImage] = useState(null)
  const handleAvatarClick = () => {
    avatarRef.current?.click()
  }
  const handleCoverClick = () => {
    coverRef.current?.click()
  }
  const handleAvatarImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAvatarImage(e.target.files[0])
  }
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCoverImage(e.target.files[0])
  }

  useEffect(() => {
    return () => {
      if (selectedAvatarImage) {
        URL.revokeObjectURL(URL.createObjectURL(selectedAvatarImage))
      }

      console.log(selectedCoverImage)
      if (selectedCoverImage) {
        URL.revokeObjectURL(URL.createObjectURL(selectedCoverImage))
      }
    }
  }, [selectedAvatarImage, selectedCoverImage])

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    // Fetch all users when the component mounts.
    dispatch(fetchAllUsers())
  }, [dispatch])

  useEffect(() => {
    // Update userData when userFromUsers changes.
    if (userFromUsers) {
      setUserData(userFromUsers)
    }
  }, [userFromUsers])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = localStorage.getItem('authToken')
    if (!token) {
      console.error('No token found in local storage.')
      setFeedback('Error: No token found in local storage.')
      return
    }
    const formData = new FormData()

    // Add the selected avatar image to formData
    if (selectedAvatarImage) {
      formData.append('avatarImage', selectedAvatarImage)
    }
    console.log(formData.get('avatarImage'))
    if (selectedCoverImage) {
      formData.append('coverImage', selectedCoverImage)
    }

    // Add other user details to formData
    formData.append('name', userData.name)
    formData.append('email', userData.email)
    formData.append('bio', userData.bio)
    formData.append('location', userData.location)
    formData.append('userLink', userData.userLink)
    formData.append('YHaplogroup', userData.YHaplogroup)
    formData.append('MtHaplogroup', userData.MtHaplogroup)

    try {
      // Make a PUT request to update user details
      const response = await axios.put(`/api/users/${userId}`, formData, {
        headers: {
          authToken: `Bearer ${token}`,
        },
      })
      console.log('Profile updated successfully!')
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error('Failed to update profile:', error)
      alert(error.message || 'Failed to update profile.')
    }
  }

  return (
    <div className="   w-screen md:w-[600px] text-white py-20 md:py-0">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="relative ">
          {/* Cover Image */}
          <div
            className="relative h-[200px] group cursor-pointer overflow-hidden rounded-md"
            onClick={handleCoverClick}
          >
            <span className="absolute z-10 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <BiCamera className="hidden text-5xl group-hover:text-secondary group-hover:block" />{' '}
            </span>
            <div className="absolute z-10 w-full h-full group-hover:bg-black group-hover:bg-opacity-30"></div>
            <Image
              src={
                selectedCoverImage
                  ? URL.createObjectURL(selectedCoverImage)
                  : userData.coverImage
              }
              fill
              alt="Cover"
              className="object-cover w-full h-full bg-black"
            />
            <input
              type="file"
              ref={coverRef}
              name="coverImage"
              className="absolute z-50 hidden w-full h-full cursor-pointer top-1/2 "
              onChange={handleCoverImageChange}
            />
          </div>

          {/* Avatar Image */}
          <div className="absolute mb-4 -mt-8 transform -translate-x-1/2 left-1/2">
            <div className="flex justify-center">
              <div
                className="relative overflow-hidden rounded-full cursor-pointer group w-28 h-28"
                onClick={handleAvatarClick}
              >
                <span className="absolute z-20 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <BiCamera className="hidden text-5xl group-hover:text-secondary group-hover:block" />{' '}
                </span>
                <div className="absolute z-10 w-full h-full group-hover:bg-black group-hover:bg-opacity-30"></div>
                {userData.imageUrl && (
                  <Image
                    src={
                      selectedAvatarImage
                        ? URL.createObjectURL(selectedAvatarImage)
                        : userData.imageUrl
                    }
                    fill
                    alt="Avatar"
                    className="object-contain  rounded-full scale-[.85]  bg-black"
                  />
                )}

                <input
                  type="file"
                  ref={avatarRef}
                  name="avatarImage"
                  className="absolute z-50 hidden w-full h-full cursor-pointer top-1/2 "
                  onChange={handleAvatarImageChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-4">
          <div className="pt-20">
            <div className="p-2 overflow-hidden border border-grayBorder rounded-xl">
              <label
                className="block ml-2 text-sm font-medium text-gray-500"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData?.name}
                onChange={handleChange}
                className="w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG"
              />
            </div>
          </div>
          <div className="p-2 overflow-hidden border border-grayBorder rounded-xl">
            <label
              className="block ml-2 text-sm font-medium text-gray-500"
              htmlFor="location"
            >
              location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={userData?.location}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG"
            />
          </div>
          <div className="p-2 overflow-hidden border border-grayBorder rounded-xl">
            <label
              className="block ml-2 text-sm font-medium text-gray-500"
              htmlFor="userLink"
            >
              Link
            </label>
            <input
              type="text"
              id="userLink"
              name="userLink"
              value={userData?.userLink}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG"
            />
          </div>

          <div className="p-2 overflow-hidden border border-grayBorder rounded-xl">
            <label
              className="block ml-2 text-sm font-medium text-gray-500"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={userData?.bio}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG"
              rows="4"
            ></textarea>
          </div>

          <div className="p-2 overflow-hidden border border-grayBorder rounded-xl">
            <label
              className="block ml-2 text-sm font-medium text-gray-500"
              htmlFor="YHaplogroup"
            >
              YDNA-Haplogroup
            </label>
            <input
              type="text"
              id="YHaplogroup"
              name="YHaplogroup"
              value={userData?.YHaplogroup}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG"
            />
          </div>
          <div className="p-2 overflow-hidden border border-grayBorder rounded-xl">
            <label
              className="block ml-2 text-sm font-medium text-gray-500"
              htmlFor="MtHaplogroup"
            >
              MtDNA-Haplogroup
            </label>
            <input
              type="text"
              id="MtHaplogroup"
              name="MtHaplogroup"
              value={userData?.MtHaplogroup}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-white border-transparent !outline-none !focus:border-transparent !focus:ring-0 bg-blackBG"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white border-2 rounded-full border-third hover:bg-third"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserSettings
