/** @format */

import Link from 'next/link'
import React, { useState } from 'react'
import { RiMenuLine } from 'react-icons/ri'
import { RiCloseFill } from 'react-icons/ri'
interface Props {
  // define your props here
}

const NavBar: React.FC<Props> = (props) => {
  const [toggle, setToggle] = useState(false)
  function toggleOnMenu(event: React.MouseEvent) {
    setToggle(!toggle)
    event.preventDefault()
  }
  return (
    <div className="absolute w-screen bg-black bg-opacity-30">
      <nav className="relative w-screen max-w-[1500px]  h-[70px]  z-50 flex  mx-auto text-white flex-col justify-between text-center p-5 items-center">
        <div className="flex items-center justify-between w-full ">
          <h1>
            <Link className="text-3xl font-bold " href="/">
              Herodus
            </Link>
          </h1>

          <div className="h-[20px] lg:hidden ">
            {toggle ? (
              <RiCloseFill
                onClick={toggleOnMenu}
                className="relative z-10 text-3xl cursor-pointer md:text-5xl "
              />
            ) : (
              <RiMenuLine
                onClick={toggleOnMenu}
                className="text-3xl cursor-pointer md:text-5xl "
              />
            )}
          </div>

          <ul
            className={`lg:relative absolute top-20 left-0 lg:top-0  lg:text-lg flex font-semibold lg:visible lg:opacity-100 lg:w-1/2 lg:flex-row items-center my-auto bg-primary w-full  text-white transition-all ease-in-out duration-700 ${
              toggle ? ' visible max-h-[800px]' : 'opacity-0  invisible max-h-0'
            }  flex-col justify-between border-secondary py-5 lg:py-0 border-b-2 lg:border-none`}
          >
            {menuItems.map((menuItem, index) => {
              return (
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
              )
            })}
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
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
const menuItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
  { name: 'NFTs', link: '/nft' },
]
