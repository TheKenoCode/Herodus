'use state'
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@/public/assets/logo.png'
import { logout } from '@/lib/redux/slices/authSlice'
import loading from '@/public/assets/Ripple-1s-200px.gif'

// Icons
import { TbUsersGroup } from 'react-icons/tb'
import { BiMenu } from 'react-icons/bi'

import {
  BiHome,
  BiBell,
  BiBookmark,
  BiEnvelope,
  BiPyramid,
  BiSearch,
  BiUser,
  BiCog,
  BiLogOutCircle,
  BiLogInCircle,
} from 'react-icons/bi'
import Link from 'next/link'
import AvatarSkeleton from '../UI/Skeletons/AvatarSkeleton'

const MobileNav: React.FC<Props> = ({
  dispatch,
  user,
  isLoggedIn,
  pathname,
  router,
}) => {
  const [menuOpen, setMenuOpen] = useState(true)
  // Menu items configuration
  const menuItems = [
    {
      icon: BiHome,
      title: 'Home',
      tooltip: 'Home',
      link: '/app',
      userAuth: true,
    },
    {
      icon: BiBell,
      title: 'Notification',
      tooltip: 'Notifications',
      link: '/app/notifications',
      userAuth: isLoggedIn,
    },
    {
      icon: BiEnvelope,
      title: 'Messages',
      tooltip: 'Messages',
      link: '/app/messages',
      userAuth: isLoggedIn,
    },
    {
      icon: TbUsersGroup,
      title: 'Clubs',
      tooltip: 'Clubs',
      link: '/app/clubs',
    },
    {
      icon: BiBookmark,
      title: 'Bookmarks',
      tooltip: 'Bookmarks',
      link: '/app/bookmarks',
      userAuth: isLoggedIn,
    },
    {
      icon: BiPyramid,
      title: 'web3',
      tooltip: 'web3',
      link: '/app/web3',
      userAuth: isLoggedIn,
    },
    {
      icon: BiSearch,
      title: 'Search',
      tooltip: 'Search',
      link: '/app/search',
      userAuth: true,
    },
    {
      icon: BiUser,
      title: 'User Settings',
      tooltip: 'User Settings',
      link: '/app/user-settings',
      userAuth: isLoggedIn,
    },
    {
      icon: BiCog,
      title: 'Customization',
      tooltip: 'Customization',
      link: '/app/customization',
      userAuth: isLoggedIn,
    },
  ]
  return (
    <div className="fixed top-0 z-50 w-full bg-opacity-50 bg-blackBG backdrop-blur-lg drop-shadow-lg">
      <div className="md:hidden   h-[70px] flex items-center relative z-50">
        <button
          onClick={() => {
            setMenuOpen(!menuOpen)
          }}
          className="absolute left-0"
        >
          <BiMenu className="ml-4 text-4xl text-white" />
        </button>

        <div className="flex items-center justify-center w-full">
          <Image src={logo} alt="logo" className="w-20 p-2" />
        </div>
        {isLoggedIn ? (
          <>
            {user?.imageUrl ? (
              <Link
                href={`/app/profile/${user?._id}`}
                className="absolute right-0 mr-4"
              >
                <div className="relative w-10 h-10 overflow-hidden bg-black border-2 rounded-full border-third lg:hidden">
                  <Image
                    fill
                    src={user?.imageUrl}
                    alt={user?.name}
                    className="object-contain scale-[.85] "
                  />
                </div>
              </Link>
            ) : (
              <AvatarSkeleton />
            )}
          </>
        ) : (
          <>
            <Link href="/auth/login" className="absolute right-0">
              <button className="px-2 py-2 mr-4 text-white uppercase transition duration-500 transform border-2 rounded-full cursor-pointer border-third hover:scale-125 hover:bg-third">
                <BiLogInCircle className="text-2xl " />
              </button>
            </Link>
          </>
        )}
      </div>

      <div
        className={`absolute border-r border-grayBorder h-screen flex flex-col justify-between  transition-all transform-gpu  duration-500 ease-in-out  z-40 md:hidden   ${
          menuOpen
            ? '  w-0 opacity-0 collapse'
            : 'visible opacity-100 w-full bg-blackBG '
        }`}
      >
        <div className="relative flex flex-col px-4 ">
          {menuItems.map((item, index) => {
            // Check if the current path matches the item's link.
            const isActive = pathname === item.link

            return (
              <>
                {item.userAuth && (
                  <div
                    className={`flex items-center py-4  cursor-pointer  hover:bg-secondary ${
                      isActive ? 'bg-secondary' : ''
                    }`}
                    key={index}
                    data-te-toggle="tooltip"
                    title={item.tooltip}
                    onClick={() => {
                      router.push(`${item.link}`, { scroll: true })
                      setMenuOpen(!menuOpen)
                    }}
                  >
                    <button
                      className={`flex flex-col items-center justify-between w-10 p-1 transition-all duration-300 ease-in-out rounded-full  `}
                    >
                      <item.icon className="text-2xl text-white" />
                    </button>

                    <span className="ml-2 text-lg text-white cursor-pointer">
                      {item.title}
                    </span>
                  </div>
                )}
              </>
            )
          })}
        </div>
        <div className="px-4 pb-24 ">
          {isLoggedIn ? (
            <div
              onClick={() => {
                dispatch(logout())
              }}
              className="flex items-center px-1 py-1 border-2 rounded-full w-max border-secondary group hover:bg-secondary"
            >
              <div className="flex flex-col items-center mx-2">
                <div className="flex items-center justify-center ">
                  <button
                    className={`flex flex-col items-center justify-between w-10 p-1 text-secondary group-hover:text-white transition-all duration-300 ease-in-out rounded-full  `}
                  >
                    <BiLogOutCircle className="text-3xl " />
                  </button>
                  <span className="my-auto mr-2 text-xl text-white transition-all duration-500 ease-in-out cursor-pointer ">
                    Logout
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default MobileNav
