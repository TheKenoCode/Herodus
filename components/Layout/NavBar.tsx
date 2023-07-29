/** @format */

import Link from "next/link"
import React, { useState } from "react"
import { RiMenuLine } from "react-icons/ri"
import { RiCloseFill } from "react-icons/ri"
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
		<div
			className='
	 bg-primary lg:h-24 '>
			<nav
				className='  relative w-screen h-[70px] md:h-24 z-50 flex max-w-[1500px] mx-auto text-white
		  flex-col justify-between text-center p-5 items-center'>
				<div className='w-full flex justify-between items-center  '>
					<h1>
						<Link
							className='text-3xl font-bold lg:text-5xl md:text-5xl'
							href='/'>
							Herodus
						</Link>
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
									<Link
										className=' hover:text-secondary uppercase'
										href={menuItem.link}>
										{menuItem.name}
									</Link>
								</li>
							)
						})}
						<Link href='/register'>
							<button className='cursor-pointer border-secondary border-2 lg:mr-[-10px]  w-32 mb-2 lg:mb-0 py-1 uppercase transform hover:scale-125 transition duration-500 rounded-full hover:bg-secondary'>
								Register
							</button>
						</Link>
						<Link href='/login'>
							<button className='cursor-pointer border-third border-2 w-32 py-1 uppercase transform hover:scale-125 transition duration-500 hover:bg-third rounded-full'>
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
	{ name: "Home", link: "/" },
	{ name: "About", link: "/about" },
	{ name: "Contact", link: "/contact" },
	{ name: "NFTs", link: "/nft" },
]
