/** @format */

import React, { useState, navRef } from "react"
import { RiMenuLine } from "../../../node_modules/react-icons/ri"
import { RiCloseFill } from "../../../node_modules/react-icons/ri"

const menuItems = [
	{ name: "Home", link: "/" },
	{ name: "About", link: "/About" },
	{ name: "Contact", link: "/Contact" },
	{ name: "NFTs", link: "/NFTs" },
]

const NavBar = () => {
	const [toggle, setToggle] = useState(false)
	function toggleOnMenu(event) {
		setToggle(!toggle)

		event.preventDefault()
	}
	return (
		<div
			className='
		 bg-primary lg:h-24 '>
			<nav
				className='  relative w-screen h-[70px] md:h-24 z-50 flex max-w-[1500px] mx-auto text-white
			  flex-col justify-between text-center p-5 items-center'>
				<div className='w-full flex justify-between items-center  '>
					<h1>
						<a className='text-3xl font-bold lg:text-5xl md:text-5xl' href='/'>
							Herodus
						</a>
					</h1>

					<div className='h-[20px] lg:hidden '>
						{toggle ? (
							<RiCloseFill
								onClick={toggleOnMenu}
								className='cursor-pointer relative text-3xl md:text-5xl z-10  '
							/>
						) : (
							<RiMenuLine
								onClick={toggleOnMenu}
								className='cursor-pointer text-3xl md:text-5xl '
							/>
						)}
					</div>

					<ul
						className={`lg:relative absolute top-16 left-0 lg:top-0  lg:text-lg flex font-semibold lg:visible lg:opacity-100 lg:w-1/2 lg:flex-row items-center bg-primary w-full  text-white transition-all ease-in-out duration-700 ${
							toggle ? " visible max-h-[800px]" : "opacity-0  invisible max-h-0"
						}  flex-col justify-between border-secondary py-5 lg:py-0 border-b-2 lg:border-none`}>
						{menuItems.map((menuItem, index) => {
							return (
								<li className=' my-5  ' key={index}>
									<a
										className=' hover:text-secondary uppercase'
										href={menuItem.link}>
										{menuItem.name}
									</a>
								</li>
							)
						})}
						<a href='/Register'>
							<button className='cursor-pointer border-secondary border-2 lg:mr-[-10px]  w-32 mb-2 lg:mb-0 py-1 uppercase transform hover:scale-125 transition duration-500 rounded-full hover:bg-secondary'>
								Register
							</button>
						</a>
						<a href='/Login'>
							<button className='cursor-pointer border-third border-2 w-32 py-1 uppercase transform hover:scale-125 transition duration-500 hover:bg-third rounded-full'>
								Login
							</button>
						</a>
					</ul>
				</div>
			</nav>
		</div>
	)
}

export default NavBar
