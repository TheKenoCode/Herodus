'use client'

// --- React and related imports ---
import React, { useState } from 'react'

// --- Icons ---
import { RiMenuLine, RiCloseFill } from 'react-icons/ri'

// --- Component imports ---
import Profile from './Profile'
import MyPosts from './MyPosts'
import Notifications from './Notifications'
import MyCollections from './MyCollections'
import AccountSettings from './AccountSettings'

import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

interface Props {
  // define your props here
}

const Dashboard: React.FC<Props> = (props) => {
  const [selectedTab, setSelectedTab] = useState('Profile')
  const [showSidebar, setShowSidebar] = useState(false) // Default to false for mobile screens
  const auth = useSelector((state: RootState) => state.auth)
  const userRole = useSelector((state: RootState) => state.auth?.user?.role)
  return (
    <div className="relative  pt-20 flex w-full h-screen ">
      {/* Menu Icon (Visible on small and medium screens) */}
      <div
        className={`absolute lg:hidden top-4 left-4 z-10  pt-20 ${
          showSidebar ? 'hidden' : 'block'
        }`}
      >
        <RiMenuLine
          className="text-4xl cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`transform absolute lg:relative h-full w-[300px] transition-transform ease-in-out duration-300 bg-primary overflow-hidden ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }  lg:translate-x-0 lg:w-64 lg:block`}
      >
        <div className="flex items-center justify-between">
          <h1 className="py-4 pl-4 mt-10 text-4xl text-center text-white">
            Hi []
          </h1>
          <div
            className={`absolute right-0 lg:hidden top-4 z-10 ${
              showSidebar ? 'block' : 'hidden'
            }`}
          >
            <RiCloseFill
              className="relative ml-auto mr-4 text-4xl text-white cursor-pointer"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 space-y-2">
          {[
            'Feed',
            'My Posts',
            'Notifications',
            'My Collections',
            'Account Settings',
          ].map((tab) => (
            <a
              key={tab}
              href="#"
              onClick={() => {
                setSelectedTab(tab)
                setShowSidebar(false)
              }}
              className={`text-white p-2 rounded ${
                selectedTab === tab ? 'bg-secondary' : 'hover:bg-secondary'
              }`}
            >
              {tab}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 pt-20 overflow-y-auto bg-white">
        <h2 className="mb-4 text-2xl">Welcome to the {selectedTab}</h2>

        {selectedTab === 'Profile' && <div>ddsdsdsdd</div>}
        {selectedTab === 'My Posts' && <div>ddsdsdsdd</div>}
        {selectedTab === 'Notifications' && <div>ddsdsdsdd</div>}
        {selectedTab === 'My Collections' && <div>ddsdsdsdd</div>}
        {selectedTab === 'Account Settings' && <div>ddsdsdsdd</div>}
      </div>
    </div>
  )
}

export default Dashboard
