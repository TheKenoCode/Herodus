// React imports
import { useState, useEffect } from 'react'

// Next.js imports
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// Icon imports
import { FaUserPlus, FaRegEnvelope } from 'react-icons/fa'
import {
  BiLocationPlus,
  BiLink,
  BiDotsHorizontalRounded,
  BiShareAlt,
  BiBlock,
  BiFlag,
  BiArrowBack,
  BiDna,
} from 'react-icons/bi'
import { MdVerified } from 'react-icons/md'
// Assets imports
import userCoverPhoto from '@/public/assets/blogcardimage.jpg'
import ReactHashtag from 'react-hashtag'
import loading from '@/public/assets/Ripple-1s-200px.gif'
import CoverImageSkeleton from '../UI/Skeletons/CoverImageSkeleton'
import ProfileImageSkeleton from '../UI/Skeletons/ProfileImageSkeleton'
import ProfileInfo from '../UI/Skeletons/ProfileInfo'

// Main UserCard component
const UserCard: React.FC<Props> = ({
  filteredPosts,
  user,
  isLoggedIn,
  userId,
  id,
}) => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  // Message component to display based on authentication status
  const Message = () => {
    if (status === 'authenticated' || (isLoggedIn && userId === id)) return null

    return (
      <button className="flex p-2 my-auto text-white border border-gray-500 rounded-full ">
        <FaRegEnvelope className="mx-auto my-auto text-lg" />
      </button>
    )
  }

  // Profile edit button or follow/unfollow based on user status
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
          {true ? 'Unfollow' : 'Follow'}
        </button>
      )
    }
  }

  return (
    <div className="flex mx-auto flex-col w-screen md:w-[600px]    justify-center  col-span-3 row-span-1   bg-blackBG md:border-x border-grayBorder xl:col-span-2  ">
      {user?.coverImage ? (
        <div className="relative h-[200px] ">
          <Image
            fill
            src={user?.coverImage}
            alt="cover photo"
            className="object-cover "
          />
        </div>
      ) : (
        <CoverImageSkeleton />
      )}

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
        <div className="absolute overflow-hidden -top-[50px] sm:-top-[70px] w-[100px] h-[100px]  sm:w-[134px] sm:h-[134px] border-4 border-black rounded-full bg-black">
          {user?.imageUrl ? (
            <Image
              fill
              src={user?.imageUrl}
              alt={user?.name || 'user profile picture'}
              className="object-contain scale-[.75] "
            />
          ) : (
            <ProfileImageSkeleton />
          )}
        </div>
        {user ? (
          <>
            <div className="mt-4 md:mt-8 text-start">
              <div className="flex items-center w-min">
                <h2 className="mx-auto mr-1 text-xl font-bold text-white">
                  {user?.name}
                </h2>
                {user?.role === 'admin' && (
                  <MdVerified className="mt-1 text-2xl text-third" />
                )}
              </div>
              <h2 className="mx-auto text-base text-gray-500">@{user?.name}</h2>
            </div>

            {/* bio */}
            {user?.bio && (
              <p className="mt-4 text-sm text-gray-100 text-start">
                <ReactHashtag>{user?.bio}</ReactHashtag>
              </p>
            )}

            {/* location and link */}
            <div className="flex flex-col w-full mt-2">
              <div className="flex w-full mt-2">
                <div className="flex items-center justify-center">
                  <BiLocationPlus className="text-xl text-gray-500" />
                  <span className="ml-1 text-base text-gray-500">
                    {user?.location}
                  </span>
                </div>
                <div className="flex items-center justify-center ml-4">
                  <BiLink className="text-xl text-gray-500" />
                  <a
                    href={`https://${user?.userLink}`}
                    className="ml-1 text-base text-secondary"
                  >
                    {user?.userLink}
                  </a>
                </div>
              </div>

              <div className="flex w-full mt-2">
                <div className="flex items-center justify-center">
                  <BiDna className="text-xl text-gray-500" />
                  <span className="flex items-center ml-1 text-base text-secondary">
                    <span className="mr-2 text-gray-500">YDNA</span>{' '}
                    {user?.YHaplogroup}
                  </span>
                </div>
                <div className="flex items-center justify-center ml-4">
                  <BiDna className="text-xl text-gray-500" />
                  <span className="flex items-center ml-1 text-base text-secondary">
                    <span className="mr-2 text-gray-500">MtDNA</span>
                    {user?.MtHaplogroup}
                  </span>
                </div>
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
                <span className="text-white text-md">
                  {filteredPosts.length}
                </span>
                <span className="ml-1 text-base text-gray-500">Posts</span>
              </div>
            </div>
          </>
        ) : (
          <ProfileInfo />
        )}
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
