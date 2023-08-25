'use client'
// React and Next imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

// Redux imports
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

// Assets and styles
import profileImg from '../../../public/assets/Herodotus.png'

// Icons
import { FaUserPlus, FaRegEnvelope } from 'react-icons/fa'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { fetchUserPosts } from '../../../redux/slices/UserPostSlice'
import Posts from '../../../components/UserProfile/Posts'
import Widgets from '../../../components/UserProfile/widgets'

const UserProfile: NextPage<UserProfileProps> = () => {
  const [displayComponent, setDisplayComponent] = useState('posts') // 'posts' or 'widgets'
  const posts = useSelector((state: RootState) => state.userPost.posts)
  const { id } = useParams()
  const userPosts = Array.from(
    new Map(posts.map((post) => [post['_id'], post])).values()
  )
  const filteredPosts = userPosts
    .reverse()
    .filter((post) => post.author._id === id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserPosts())
  }, [dispatch])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // 1024px is the 'lg' breakpoint in TailwindCSS
        setDisplayComponent('posts')
      }
    }

    // Add the event listener when the component mounts
    window.addEventListener('resize', handleResize)

    // Check initial window width in case the component mounts when window is already at 'lg' or beyond
    handleResize()

    // Remove the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className="flex items-center justify-center h-full bg-cover lg:px-4 bg-primary">
      <div className="grid w-full h-full grid-cols-3 grid-rows-2 gap-4 pt-20 lg:grid-cols-4 xl:grid-cols-4 lg:pb-8 lg:h-screen ">
        <div className="grid col-span-3 row-span-2 gap-4 lg:col-span-2">
          {/* User Profile Section */}
          <div className="flex flex-col py-6 items-center justify-center w-full col-span-3 row-span-1 p-4 shadow-2xl bg-[#381947] lg:col-span-2 shadow-black rounded-2xl">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative">
                <Image
                  src={profileImg}
                  alt="User Profile"
                  width={100}
                  height={100}
                  className="mx-auto bg-white rounded-full "
                />
              </div>
              <div className="mx-auto mt-4 text-center ">
                <h2 className="mx-auto text-xl font-bold text-white">
                  Username
                </h2>
              </div>
            </div>
            <p className="px-8 mt-4 text-sm text-center text-gray-100">
              Love history and Archeology, check out some of my posts and NFTs!
            </p>
            <div className="flex mt-4 space-x-2">
              <button className="flex p-3 my-auto text-white rounded-full bg-secondary ">
                <FaUserPlus className="my-auto text-xl" />
              </button>
              <button className="flex p-3 my-auto text-white rounded-full bg-secondary ">
                <FaRegEnvelope className="mx-auto my-auto text-xl" />
              </button>
            </div>

            {/* Toggle Buttons for Tablet and Mobile */}
            <div className="flex mt-4 space-x-2 lg:hidden">
              <ul className="flex text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow dark:divide-gray-700 dark:text-gray-400">
                <li className="w-full">
                  <button
                    onClick={() => setDisplayComponent('posts')}
                    className={`transition-all ease-in-out duration-300 inline-block w-[100px] px-4 py-2 ${
                      displayComponent === 'posts'
                        ? 'text-white bg-[#ff1053] dark:bg-[#ff1053]'
                        : 'bg-[#ff1053] hover:bg-[#ff105474] hover:text-white dark:hover:text-white dark:bg-gray-800 dark:hover:bg-[#ff105476]'
                    }   rounded-l-2xl focus:outline-none`}
                  >
                    Posts
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => setDisplayComponent('widgets')}
                    className={`transition-all duration-300 ease-in-out inline-block w-[100px]  px-4 py-2  ${
                      displayComponent === 'widgets'
                        ? 'text-white bg-[#ff1053] dark:bg-[#ff1053]'
                        : 'bg-white hover:bg-[#ff105479] hover:text-white dark:hover:text-white dark:bg-gray-800 dark:hover:bg-[#ff10547d]'
                    }   rounded-r-2xl focus:outline-none`}
                  >
                    Widgets
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Posts Section */}

          {displayComponent === 'posts' && (
            <Posts filteredPosts={filteredPosts} profileImg={profileImg} />
          )}

          {/* Widgets for Tablet and Mobile */}
          {displayComponent === 'widgets' ? (
            <div className="grid-cols-1 col-span-3 row-span-4 gap-4 p-4 shadow-2xl lg:h-screen lg:overflow-y-auto  rounded-2xl  bg-[#381947]  justify-evenly shadow-black lg:hidden">
              <Widgets />
            </div>
          ) : null}
        </div>

        {/* Widgets for Larger Screens */}
        <div className="hidden grid-cols-1 col-span-2 row-span-2 gap-4 p-4 shadow-2xl xl:col-span-2 lg:col-span-2 lg:overflow-y-auto border-secondary bg-[#381947]  justify-evenly shadow-black rounded-3xl lg:grid">
          <Widgets />
        </div>
      </div>
    </div>
  )
}

export default UserProfile

// Function to render posts

// Widget content component
const WidgetContent = () => (
  <div className="grid grid-cols-1 gap-4 py-4 lg:px-4 ">
    <h2 className="mb-4 text-xl font-bold text-white">Widgets</h2>

    <div className="px-4 relative bg-[#b81845] w-full  rounded-3xl pb-4">
      <h1 className="p-4 text-2xl font-semibold text-white">My NFT</h1>
      <div className="bg-[#00000036] rounded-3xl relative  overflow-hidden">
        <GreekHelmet height={'300px'} />
        <div className=" z-10 relative flex w-full justify-between p-4 text-sm md:text-lg opacity-75   text-white bg-[#00000052]">
          <span>Found: Greece</span>
          <span>Culture: Greek</span>
          <span>Date: 1200BC</span>
        </div>
      </div>
    </div>

    <div className="px-4 relative bg-[#b81845] w-full  rounded-3xl pb-4">
      <h1 className="p-4 text-2xl font-semibold text-white">My Ancestry</h1>
      <div className="bg-[#00000036] rounded-3xl p-8 flex justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>

    <div className="bg-[#b81845] w-full h-[200px] rounded-3xl"></div>
    <div className="bg-[#b81845] w-full h-[200px] rounded-3xl"></div>
  </div>
)
