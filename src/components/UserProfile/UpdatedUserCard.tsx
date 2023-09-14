import { useState, useEffect } from 'react'
import profileImg from '@/public/assets/Herodotus.png'
import { useRouter } from 'next/navigation'
import { RootState } from '@/lib/redux/store'
import { useSelector } from 'react-redux'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { fetchAllUsers } from '@/lib/redux/slices/userSlice'
import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice'

import { FaUserPlus, FaRegEnvelope } from 'react-icons/fa'
import {
  BiLocationPlus,
  BiLink,
  BiDotsHorizontalRounded,
  BiShareAlt,
  BiBlock,
  BiFlag,
  BiArrowBack,
} from 'react-icons/bi'
import Image from 'next/image'
import userCoverPhoto from '@/public/assets/blogcardimage.jpg'
import Link from 'next/link'
interface Props {}

const UserCard: React.FC<Props> = () => {
  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const { status, data: session } = useSession()
  const auth = useSelector((state: RootState) => state.auth)
  const userRole = useSelector((state: RootState) => state.auth?.user?.role)
  const userId = useSelector((state: RootState) => state.auth?.user?.id)
  const users = useSelector((state: any) => state.user.allUsers)
  const posts = useSelector((state: RootState) => state.userPost.posts)
  const { id } = useParams()

  const filteredPosts = Array.from(
    new Map(
      posts
        .filter((post) => post.author._id === id)
        .map((post) => [post['_id'], post]),
    ).values(),
  )

  // Check if the current user is following the profile being viewed
  const isFollowing = currentUser?.following.includes(user._id)

  const handleFollow = () => {
    dispatch(followUser(user._id))
  }

  const handleUnfollow = () => {
    dispatch(unfollowUser(user._id))
  }
  const user = useSelector((state: any) =>
    state.user.allUsers.find((u: any) => u._id === id),
  )

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isAuthenticated,
  )

  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchUserPosts())
  }, [dispatch])

  const Message = () => {
    if (status === 'authenticated' || (isLoggedIn && userId === id)) {
      return null
    } else {
      return (
        <button className="flex p-2 my-auto text-white border border-gray-500 rounded-full ">
          <FaRegEnvelope className="mx-auto my-auto text-lg" />
        </button>
      )
    }
  }
  const EditProfile = () => {
    if (status === 'authenticated' || (isLoggedIn && userId === id)) {
      return (
        <button className="border border-gray-500 py-[5px] font-semibold px-4 text-white hover:bg-gray-900 bg-blackBG rounded-full ">
          Edit profile
        </button>
      )
    } else {
      return (
        <button className="border border-gray-500 py-[5px] font-semibold px-4 text-white hover:bg-gray-900 bg-blackBG rounded-full ">
          Follow
        </button>
      )
    }
  }
  return (
    <div className="flex mx-auto flex-col md:w-[600px]   justify-center  col-span-3 row-span-1   bg-blackBG md:border-x border-grayBorder xl:col-span-2  ">
      <div className="h-[53px] z-10 flex items-center">
        <div className="flex flex-col items-center ">
          <h1 className="ml-4 -mb-1 text-xl font-bold text-white">
            {user?.name}
          </h1>
          <p className="ml-4 text-base text-gray-500">@{user?.name}</p>
        </div>
      </div>
      <Image
        src={userCoverPhoto}
        alt="cover photo"
        className="h-[200px] object-cover "
      />

      <div className="relative flex flex-col px-4">
        {/* buttons */}
        <div className="flex items-end justify-end mt-4 space-x-2">
          <div className="relative">
            <Menu menuOpen={menuOpen} />

            <button
              onClick={() => {
                setMenuOpen(!menuOpen)
              }}
              className="flex p-2 my-auto text-white border border-gray-500 rounded-full "
            >
              <BiDotsHorizontalRounded className="my-auto text-lg" />
            </button>
          </div>

          <Message />
          <EditProfile />
        </div>
        {/* UserInfo */}
        <div className="absolute -top-[70px] w-[134px]">
          <Image
            src={profileImg}
            alt={user?.name}
            className="bg-white border-4 border-black rounded-full "
          />
        </div>
        <div className="mt-8 text-start">
          <h2 className="mx-auto text-xl font-bold text-white">{user?.name}</h2>
          <h2 className="mx-auto text-base text-gray-500">@{user?.name}</h2>
        </div>
        {/* bio */}
        <p className="mt-4 text-sm text-gray-100 text-start">
          Combining principles of archaeological prospection & documentation
          with innovative tech to revolutionize the study and preservation of
          heritage #archaeology
        </p>
        {/* location and link */}
        <div className="flex w-full mt-2">
          <div className="flex items-center justify-center">
            <BiLocationPlus className="text-xl text-gray-500" />
            <a href="#" className="ml-1 text-base text-gray-500">
              Earth
            </a>
          </div>
          <div className="flex items-center justify-center ml-4">
            <BiLink className="text-xl text-gray-500" />
            <a href="#" className="ml-1 text-base text-secondary">
              Herodus.io
            </a>
          </div>
        </div>

        {/* followers, flowing and num of posts */}
        <div className="flex items-center justify-start mt-2">
          <div className="flex items-center justify-center">
            <span className="text-white text-md">0</span>
            <span className="ml-1 text-base text-gray-500">Following</span>
          </div>
          <div className="flex items-center justify-center ml-4">
            <span className="text-white text-md">0</span>
            <span className="ml-1 text-base text-gray-500">Followers</span>
          </div>
          <div className="flex items-center justify-center ml-4">
            <span className="text-white text-md">{filteredPosts.length}</span>
            <span className="ml-1 text-base text-gray-500">Posts</span>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={isFollowing ? handleUnfollow : handleFollow}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  )
}

export default UserCard

const Menu = ({ menuOpen }) => {
  return (
    <div
      id="dropdownDotsHorizontal"
      className={`z-10 ${
        menuOpen ? 'block' : ' hidden'
      } absolute bg-blackBG divide-y top-10   rounded-lg shadow shadow-gray-500 -right-32 w-[250px]  `}
    >
      <ul
        className="text-base text-white "
        aria-labelledby="dropdownMenuIconHorizontalButton"
      >
        <li className="flex justify-start items-center cursor-pointer px-4 text-start py-2 hover:bg-[#272727]  text-white w-full">
          <BiShareAlt />
          <span className="ml-2 font-semibold text-white">
            Share profile via...
          </span>
        </li>
        <li className="flex justify-start items-center cursor-pointer px-4 text-start py-2 hover:bg-[#272727]  text-white w-full">
          <BiLink />
          <span className="ml-2 font-semibold text-white">
            Copy link to profile
          </span>
        </li>
        <li className="flex justify-start items-center cursor-pointer px-4 text-start py-2 hover:bg-[#272727]  text-white w-full">
          <BiBlock />
          <span className="ml-2 font-semibold text-white">Block @username</span>
        </li>
        <li className="flex justify-start items-center cursor-pointer px-4 text-start py-2 hover:bg-[#272727]  text-white w-full">
          <BiFlag />
          <span className="ml-2 font-semibold text-white">
            Report @username
          </span>
        </li>
      </ul>
    </div>
  )
}
