/** @format */

import React from "react"
import Footer from "../../../components/Footer/Footer"
import NavBar from "../../../components/NavBar/NavBar"
import herodus3 from "../../../assets/herodus3.png"
const Register = () => {
	return (
		<div className='bg-primary text-white '>
			<NavBar />
			<section className=''>
				<div className='lg:flex justify-center items-center border-[#e6bc6a] border-t-4 '>
					<div className='p-5  w-full h-full'>
						<h1 className='text-center text-md md:text-2xl'>
							Sing up and join historians across the world
						</h1>
						<form className='flex flex-col justify-between md:w-[500px] p-5 m-auto'>
							<label className='text-xl  mb-2'>Username</label>
							<input
								type='name'
								className='text-black mb-5  h-10 outline outline-offset-2  focus:outline-secondary'
								name='user_email'
								id=''
							/>
							<label className='text-xl  mb-2'>Email</label>
							<input
								type='email'
								className='text-black mb-5  h-10 outline outline-offset-2  focus:outline-secondary'
								name='user_email'
								id=''
							/>
							<label className='text-xl  mb-2'>Password</label>
							<input
								type='text'
								className='text-black mb-5 h-10 outline outline-offset-2  focus:outline-secondary'
								name='user_name'
								id=''
							/>
							<label className='text-xl  mb-2'>Confirm Password</label>
							<input
								type='text'
								className='text-black mb-5 h-10 outline outline-offset-2  focus:outline-secondary'
								name='user_name'
								id=''
							/>
							<input
								className='uppercase font-bold border-secondary border-2 w-40 py-2 m-auto mt-10 hover:bg-secondary hover:scale-110 transition duration-500 ease'
								type='submit'
								value='Register'
							/>
						</form>
					</div>
					<div className='text-center w-full  flex flex-col justify-center  items-center bg-register-bg bg-cover bg-no-repeat border-[#e6bc6a] border-t-4 lg:border-none  p-5 lg:h-screen h-[220px] md:h-[550px] '></div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Register
