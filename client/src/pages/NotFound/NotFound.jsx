/** @format */
import { Link } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import React from "react"

const NotFound = () => {
	return (
		<div className='bg-primary h-screen text-white flex flex-col justify-center text-center items-center'>
			<h1 className='text-5xl'> Ooops! Not Found! </h1>
			<p className='text-3xl mt-5'>This page does not exist :(</p>
			<div className='p-5'>
				<Link className='text-2xl' to='/'>
					Click to go back
				</Link>
				<a href='/'>
					<AiOutlineArrowLeft className='text-4xl mx-auto my-5' />
				</a>
			</div>
		</div>
	)
}

export default NotFound
