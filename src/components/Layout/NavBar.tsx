/** @format */
'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiMenuLine } from 'react-icons/ri'
import { RiCloseFill } from 'react-icons/ri'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { logout } from '@/lib/redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import logo from '@/public/assets/logo2.png'
import Image from 'next/image'
import { isJwtExpired } from '@/lib/utils/isJwtExpired'
import { useRouter } from 'next/navigation'
interface Props {
  // define your props here
}

const NavBar: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { status, data: session } = useSession()
  const [toggle, setToggle] = useState(false)
  const auth = useSelector((state: RootState) => state.auth)
  const userRole = useSelector((state: RootState) => state.auth?.user?.role)
  const token = localStorage.getItem('authToken')
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isAuthenticated,
  )
  useEffect(() => {
    if (status === 'authenticated' || (isLoggedIn && isJwtExpired(token))) {
      dispatch(logout())
      router.push('/login')
    }
  }, [dispatch, router, token, status, isLoggedIn])

  let currentMenuItems
  //checks if user is logged in

  const menuItems = [
    { name: 'App', link: '/app' },
    { name: 'About', link: '/home/about' },
    { name: 'Blog', link: '/home/blog' },
    { name: 'NFTs', link: '/home/nft' },
  ]

  const AdminMenuItems = [
    { name: 'App', link: '/app' },
    { name: 'About', link: '/home/about' },
    { name: 'Blog', link: '/home/blog' },
    { name: 'NFTs', link: '/home/nft' },
    { name: 'Admin Portal', link: '/admin-portal' },
  ]

  //checks user role to display correct menu items
  if (userRole === 'admin') {
    currentMenuItems = AdminMenuItems
  } else if (status === 'authenticated' || isLoggedIn) {
    currentMenuItems = menuItems
  } else {
    currentMenuItems = menuItems
  }

  function toggleOnMenu(event: React.MouseEvent) {
    setToggle(!toggle)
    event.preventDefault()
  }
  return (
    <div className="absolute z-50 w-screen bg-black bg-opacity-50 ">
      <nav className="relative w-screen xl:container  h-[70px]  z-50 flex  mx-auto text-white flex-col justify-between text-center px-5 items-center">
        <div className="flex items-center justify-between w-full my-auto ">
          <h1 className="">
            <Link
              onClick={() => {
                setToggle(false)
              }}
              className="text-3xl font-bold "
              href="/"
            >
              <Image src={logo} alt="logo" className="w-40 my-auto" />
            </Link>
          </h1>

          <div className="my-auto xl:hidden ">
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
            className={`xl:relative absolute top-16 left-0 xl:top-0 uppercase xl:text-lg flex font-semibold xl:visible xl:opacity-100 xl:w-[800px] xl:flex-row items-center my-auto bg-primary w-full  text-white transition-all ease-in-out duration-700 ${
              toggle ? ' visible max-h-[800px]' : 'opacity-0  invisible max-h-0'
            }  flex-col justify-between border-secondary py-5 xl:py-0 border-b-2 xl:border-none`}
          >
            {currentMenuItems.map((menuItem, index) => (
              <li className="my-5 " key={index}>
                <Link
                  className="text-base font-semibold tracking-widest text-white transition duration-300 ease-in-out hover:text-secondary font-Montserrat"
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
                <Link href="/auth/register">
                  <button
                    onClick={() => {
                      setToggle(false)
                    }}
                    className="cursor-pointer border-secondary border-2 xl:mr-[-10px]  w-32 mb-2 xl:mb-0 py-1 uppercase transform text-white hover:scale-125 transition duration-500 rounded-full hover:bg-secondary"
                  >
                    Register
                  </button>
                </Link>
                <Link href="/auth/login">
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
