/** @format */

import React from "react"
import UserAvatar from "../../../assets/user.jpg"
import Posts from "../../../components/Posts/Posts"
const UserHome = () => {
	return (
		<div className='bg-primary text-white '>
			<section className='grid  grid-col-2 2xl:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-4 h-screen '>
				{/* menu */}
				<div className='w-full hidden h-screen   md:flex  rounded-l-3xl  ml-auto lg:flex flex-col item-end text-end py-5 pr-5'>
					<h1 className='text-xl'>Herodus</h1>
				</div>

				{/* posts */}
				<div className='w-full md:w-[500px]   overflow-auto m-auto border-gray-600 border-[1px] h-full 2xl:col-span-1  xl:col-span-2 md:col-span-4 lg:col-span-3  col-span-2 rounded 3xl '>
					<Posts />
				</div>

				{/* widgets */}
				<div className='  hidden xl:flex md:hidden lg:flex  h-screen rounded-r-3xl lg:col-span-1 item-center text-center'>
					<h1>search</h1>
				</div>
			</section>
		</div>
	)
}

export default UserHome
