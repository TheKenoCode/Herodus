/** @format */
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiMenuLine } from 'react-icons/ri'
import { RiCloseFill } from 'react-icons/ri'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { logout } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import logo from '../../public/assets/logo2.png'
import Image from 'next/image'
interface Props {
  // define your props here
}

const NavBar: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const { status, data: session } = useSession()
  console.log(status)
  const [toggle, setToggle] = useState(false)
  const auth = useSelector((state: RootState) => state.auth)
  const userRole = useSelector((state: RootState) => state.auth?.user?.role)
  let currentMenuItems
  //checks if user is logged in
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isAuthenticated
  )
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Blog', link: '/blog' },
    { name: 'NFTs', link: '/nft' },
  ]

  const UserMenuItems = [
    { name: 'Dashboard', link: '/dashboard' },
    {
      name: 'Profile',
      link: `/profile/${session?.user?._id || auth?.user?.id}`,
    },
    { name: 'Settings', link: '/settings' },
    { name: 'NFTs', link: '/nft' },
  ]
  const AdminMenuItems = [
    { name: 'Dashboard', link: '/dashboard' },
    {
      name: 'Profile',
      link: `/profile/${session?.user?._id || auth?.user?.id}`,
    },
    { name: 'Settings', link: '/settings' },
    { name: 'NFTs', link: '/nft' },
    { name: 'Admin Portal', link: '/admin-portal' },
  ]

  //checks user role to display correct menu items
  if (userRole === 'admin') {
    currentMenuItems = AdminMenuItems
  } else if (status === 'authenticated' || isLoggedIn) {
    currentMenuItems = UserMenuItems
  } else {
    currentMenuItems = menuItems
  }

  function toggleOnMenu(event: React.MouseEvent) {
    setToggle(!toggle)
    event.preventDefault()
  }
  return (
    <div className="absolute w-screen bg-black bg-opacity-30">
      <nav className="relative w-screen lg:container  h-[70px]  z-50 flex  mx-auto text-white flex-col justify-between text-center px-5 items-center">
        <div className="flex items-center justify-between w-full my-auto ">
          <h1 className="">
            <Link
              onClick={() => {
                setToggle(false)
              }}
              className="text-3xl font-bold "
              href="/"
            >
              <Image src={logo} className="my-auto w-40" />
            </Link>
          </h1>

          <div className="my-auto lg:hidden ">
            {toggle ? (
              <RiCloseFill
                onClick={toggleOnMenu}
                className="relative z-10 my-auto text-3xl cursor-pointer md:text-5xl "
              />
            ) : (
              <RiMenuLine
                onClick={toggleOnMenu}
                className="my-auto text-3xl cursor-pointer md:text-5xl "
              />
            )}
          </div>

          <ul
            className={`lg:relative absolute top-20 left-0 lg:top-0 uppercase lg:text-lg flex font-semibold lg:visible lg:opacity-100 lg:w-[800px] lg:flex-row items-center my-auto bg-primary w-full  text-white transition-all ease-in-out duration-700 ${
              toggle ? ' visible max-h-[800px]' : 'opacity-0  invisible max-h-0'
            }  flex-col justify-between border-secondary py-5 lg:py-0 border-b-2 lg:border-none`}
          >
            {currentMenuItems.map((menuItem, index) => (
              <li className="my-5 " key={index}>
                <Link
                  className="font-normal text-white hover:text-secondary font-Montserrat"
                  href={menuItem.link}
                  onClick={() => {
                    setToggle(false)
                  }}
                >
                  {menuItem.name}
                </Link>
              </li>
            ))}
            {status === 'authenticated' || isLoggedIn ? (
              <button
                className="w-32 py-1 text-white uppercase transition duration-500 transform border-2 rounded-full cursor-pointer border-secondary hover:scale-125 hover:bg-secondary"
                onClick={() => {
                  signOut()
                  dispatch(logout())
                }}
              >
                signout
              </button>
            ) : (
              <>
                <Link href="/register">
                  <button
                    onClick={() => {
                      setToggle(false)
                    }}
                    className="cursor-pointer border-secondary border-2 lg:mr-[-10px]  w-32 mb-2 lg:mb-0 py-1 uppercase transform text-white hover:scale-125 transition duration-500 rounded-full hover:bg-secondary"
                  >
                    Register
                  </button>
                </Link>
                <Link href="/login">
                  <button
                    onClick={() => {
                      setToggle(false)
                    }}
                    className="w-32 py-1 text-white uppercase transition duration-500 transform border-2 rounded-full cursor-pointer border-third hover:scale-125 hover:bg-third"
                  >
                    Login
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
