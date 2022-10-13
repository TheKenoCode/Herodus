/** @format */

import React from "react"

const Footer = () => {
	return (
		<div>
			<footer>
				<div className='text-center py-10 border-[#e6bc6a] border-y-4  bg-primary  text-white'>
					<h1 className='text-2xl text-center lg:text-start lg:ml-20 md:text-4xl font-bold'>
						Herodus
					</h1>
					<div className='flex justify-between lg:flex-col px-20 py-10 md:w-[500px] lg:w-[600px] m-auto lg:m-0'>
						<ul className='text-gray-400 flex flex-col lg:flex-row md:text-xl justify-between lg:w-[320px]'>
							<li className='mb-2 font-bold text-white'>Explore</li>
							{exploreLinks.map((exploreLinks, index) => {
								return (
									<li className='mb-2 hover:text-third' key={index}>
										<a href={exploreLinks.link}>{exploreLinks.name}</a>
									</li>
								)
							})}
						</ul>

						<ul className='text-gray-400 flex lg:flex-row  md:text-xl flex-col justify-between'>
							<li className='mb-2 text-white font-bold'>Follow</li>
							{followLinks.map((followLinks, index) => {
								return (
									<li className='mb-2 hover:text-third' key={index}>
										<a href={followLinks.link}>{followLinks.name}</a>
									</li>
								)
							})}
						</ul>
					</div>
					<div className='bg-third w-full h-1 '></div>
					<ul className='flex justify-between px-5 py-5 md:w-[500px]  md:text-xl m-auto lg:m-0 lg:ml-14'>
						{botomLinks.map((botomLinks, index) => {
							return (
								<li className='mb-2 hover:text-third' key={index}>
									<a href={botomLinks.link}>{botomLinks.name}</a>
								</li>
							)
						})}
					</ul>
					<p className='text-center lg:text-start lg:ml-[70px]'>
						© 2022 Herodus, All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	)
}
const followLinks = [
	{ name: "Twitter", link: "" },
	{ name: "Facebook", link: "" },
	{ name: "Instagram", link: "" },
	{ name: "Youtube", link: "" },
]
const exploreLinks = [
	{ name: "Jobs", link: "" },
	{ name: "Blog", link: "" },
	{ name: "News", link: "" },
]
const botomLinks = [
	{ name: "Contact", link: "" },
	{ name: "F.A.Q", link: "" },
	{ name: "Cookies", link: "" },
	{ name: "Legal", link: "" },
	{ name: "Privacy", link: "" },
]
export default Footer
