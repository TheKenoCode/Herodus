/** @format */

import React from "react"
import PostCard from "./PostCard/PostCard"
const Posts = () => {
	return (
		<div>
			{/* posts menu */}
			<div className='menu border-gray-600 border-b-4 h-10  sticky '></div>

			<div className='posts '>
				<PostCard />
			</div>
		</div>
	)
}

export default Posts
