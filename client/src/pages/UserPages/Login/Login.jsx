/** @format */

import React from "react"
import Footer from "../../../components/Footer/Footer"
import NavBar from "../../../components/NavBar/NavBar"
import herodus from "../../../assets/herodotus2.png"
const Login = () => {
	return (
		<div className='bg-primary text-white'>
			<NavBar />
			<section className=''>
				<div className='lg:flex  flex-row-reverse border-[#e6bc6a] border-t-4'>
					<div className='p-5 w-full h-full flex flex-col justify-center  items-center'>
						<form className='flex w-full flex-col justify-between   md:w-[500px] p-5 m-auto'>
							<h1 className='text-center text-xl my-10 md:text-3xl'>
								Login, we've missed you!
							</h1>
							<label className='text-xl  mb-2'>Email</label>
							<input
								type='email'
								className='text-black mb-5  h-10 outline outline-offset-2  focus:outline-third'
								name='user_email'
								id=''
							/>
							<label className='text-xl  mb-2'>Password</label>
							<input
								type='text'
								className='text-black mb-5 h-10 outline outline-offset-2  focus:outline-third'
								name='user_name'
								id=''
							/>
							<input
								className='uppercase font-bold border-third border-2 w-40 py-2 m-auto mt-10 hover:bg-third hover:scale-110 transition duration-500 ease'
								type='submit'
								value='Login'
							/>
						</form>
					</div>
					<div className='text-center w-full  flex flex-col justify-center  items-center bg-login-bg bg-cover bg-no-repeat border-[#e6bc6a] border-t-4 lg:border-none  p-5 lg:h-screen h-[320px] md:h-[660px] '></div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Login
