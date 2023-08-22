'use client'
// React and Next imports
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

// Redux imports
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

// Assets and styles
import profileImg from '../../../public/assets/Herodotus.png'

// Components and models
import GreekHelmet from '../../../components/ThreeJsModels/GreekHelmet'
import RomanBuildingModel from '../../../components/ThreeJsModels/RomanBuildingModel'

// Chart imports
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

// Icons
import { FaUserPlus, FaRegEnvelope } from 'react-icons/fa'
import { AiOutlineEllipsis } from 'react-icons/ai'

ChartJS.register(ArcElement, Tooltip, Legend)

const UserProfile: NextPage<UserProfileProps> = () => {
  const [displayComponent, setDisplayComponent] = useState('posts') // 'posts' or 'widgets'

  return (
    <div className="flex items-center justify-center h-full bg-cover lg:px-4 bg-primary">
      <div className="grid w-full h-full grid-cols-3 grid-rows-2 gap-4 pt-20 lg:grid-cols-4 xl:grid-cols-3 lg:pb-8 lg:h-screen ">
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
              <div className="hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="tabs"
                  className="bg-[#00a9a5] border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#00a9a5] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setDisplayComponent(e.target.value)}
                >
                  <option value="posts">Posts</option>
                  <option value="widgets">Widgets</option>
                </select>
              </div>
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

          {displayComponent === 'posts' && renderPosts()}

          {/* Widgets for Tablet and Mobile */}
          {displayComponent === 'widgets' ? (
            <div className="grid-cols-1 col-span-3 row-span-4 gap-4 p-4 shadow-2xl lg:h-screen lg:overflow-y-auto  rounded-2xl  bg-[#381947]  justify-evenly shadow-black lg:hidden">
              <WidgetContent />
            </div>
          ) : null}
        </div>

        {/* Widgets for Larger Screens */}
        <div className="hidden grid-cols-1 col-span-1 row-span-2 gap-4 p-4 shadow-2xl xl:col-span-1 lg:col-span-2 lg:overflow-y-auto border-secondary bg-[#381947]  justify-evenly shadow-black rounded-3xl lg:grid">
          <WidgetContent />
        </div>
      </div>
    </div>
  )
}

export default UserProfile

// Function to render posts
const renderPosts = () => (
  <div className="col-span-3 row-span-4 px-2 py-4 overflow-y-auto rounded-none shadow-2xl border-secondary lg:px-4 bg-[#381947] shadow-black rounded-t-2xl lg:rounded-3xl lg:col-span-2">
    <h2 className="mb-4 text-xl font-bold text-white">Recent Posts</h2>
    {tweets.map((tweet) => (
      // Render each post
      <div
        key={tweet.id}
        className="flex flex-col border-b-[0.5px] border-gray-500 bg-[#381947] p-4 last:mb-0"
      >
        <div className="flex">
          <Image
            src={profileImg}
            alt={`${tweet.username}'s profile`}
            width={50}
            height={50}
            className="bg-white rounded-full"
          />
          <h3 className="my-auto ml-2 font-bold text-gray-100 ">
            {tweet.username}
          </h3>
        </div>
        <div>
          <p className="pt-2 pb-2 text-sm leading-snug text-white">
            {tweet.content}
          </p>
          <span className="text-sm text-gray-200 ">{tweet.timestamp}</span>
        </div>
      </div>
    ))}
  </div>
)

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

// Chart Data
const data = {
  labels: ['Goths', 'Scythians', 'Gauls', 'Roman', 'Illyrian'],
  datasets: [
    {
      data: [20, 15, 30, 25, 10], // Example data percentages
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57'],
    },
  ],
}

//Chart options
const options = {
  responsive: true, // make the chart responsive
  maintainAspectRatio: true, // if you don't want to maintain the aspect ratio
  plugins: {
    legend: {
      labels: {
        color: 'white',
        font: {
          size: 20, // Adjust this value to your desired font size
        },
      },
    },
  },
}

const tweets = [
  {
    id: 1,
    username: 'Username',
    profileImg: '/path/to/alice-profile.jpg', // Placeholder path
    content: 'Hello, this is my first tweet! 😃',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    username: 'Username',
    profileImg: '/path/to/bob-profile.jpg', // Placeholder path
    content:
      'We just tell the layout.jsx file to show the specific layout on not that page and everywhere else and if it does come on that page we can show a different layout also you can next the pathnames if you want it on multiple',
    timestamp: '3 hours ago',
  },
  {
    id: 3,
    username: 'Username',
    profileImg: '/path/to/bob-profile.jpg', // Placeholder path
    content:
      'We just tell the layout.jsx file to show the specific layout on not that page and everywhere else and if it does come on that page we can show a different layout also you can next the pathnames if you want it on multiple',
    timestamp: '3 hours ago',
  },
  {
    id: 4,
    username: 'Username',
    profileImg: '/path/to/bob-profile.jpg', // Placeholder path
    content:
      'We just tell the layout.jsx file to show the specific layout on not that page and everywhere else and if it does come on that page we can show a different layout also you can next the pathnames if you want it on multiple',
    timestamp: '3 hours ago',
  },
  {
    id: 5,
    username: 'Username',
    profileImg: '/path/to/bob-profile.jpg', // Placeholder path
    content:
      'We just tell the layout.jsx file to show the specific layout on not that page and everywhere else and if it does come on that page we can show a different layout also you can next the pathnames if you want it on multiple',
    timestamp: '3 hours ago',
  },
  {
    id: 6,
    username: 'Username',
    profileImg: '/path/to/bob-profile.jpg', // Placeholder path
    content:
      'We just tell the layout.jsx file to show the specific layout on not that page and everywhere else and if it does come on that page we can show a different layout also you can next the pathnames if you want it on multiple',
    timestamp: '3 hours ago',
  },
  {
    id: 7,
    username: 'Username',
    profileImg: '/path/to/bob-profile.jpg', // Placeholder path
    content:
      'We just tell the layout.jsx file to show the specific layout on not that page and everywhere else and if it does come on that page we can show a different layout also you can next the pathnames if you want it on multiple',
    timestamp: '3 hours ago',
  },
  // ... Add more mock tweets as required
]
