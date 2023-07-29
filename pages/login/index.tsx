/** @format */

import React from "react"

interface Props {
	// define your props here
}

const Login: React.FC<Props> = (props) => {
	return (
		<div className='text-white bg-primary'>
			<section className=''>
				<div className='lg:flex  flex-row-reverse border-[#e6bc6a] border-t-4'>
					<div className='flex flex-col items-center justify-center w-full h-full p-5'>
						<form className='flex w-full flex-col justify-between   md:w-[500px] p-5 m-auto'>
							<h1 className='my-10 text-xl text-center md:text-3xl'>
								Login, we've missed you!
							</h1>
							<label className='mb-2 text-xl'>Email</label>
							<input
								type='email'
								className='h-10 mb-5 text-black outline outline-offset-2 focus:outline-third'
								name='user_email'
								id=''
							/>
							<label className='mb-2 text-xl'>Password</label>
							<input
								type='text'
								className='h-10 mb-5 text-black outline outline-offset-2 focus:outline-third'
								name='user_name'
								id=''
							/>
							<input
								className='w-40 py-2 m-auto mt-10 font-bold uppercase transition duration-500 border-2 border-third hover:bg-third hover:scale-110 ease'
								type='submit'
								value='Login'
							/>
						</form>
					</div>
					<div className='text-center w-full  flex flex-col justify-center  items-center bg-login-bg bg-cover bg-no-repeat border-[#e6bc6a] border-t-4 lg:border-none  p-5 lg:h-screen h-[320px] md:h-[660px] '></div>
				</div>
			</section>
		</div>
	)
}

export default Login
