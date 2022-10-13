/** @format */

import React, { useRef, useState, useEffect } from "react"
import emailjs from "@emailjs/browser"

import Footer from "../../components/Footer/Footer"
import NavBar from "../../components/NavBar/NavBar"

const Contact = () => {
	const form = useRef()

	const sendEmail = (e) => {
		e.preventDefault()

		emailjs
			.sendForm(
				"service_tggrrjp",
				"template_r0tlx6z",
				form.current,
				"_qJZpr-lCj6BHVfrt"
			)
			.then(
				(result) => {
					console.log(result.text)
					clear()
				},
				(error) => {
					console.log(error.text)
				}
			)
	}
	const [formData, setFormData] = useState({
		user_name: "",
		user_email: "",
		message: "",
	})

	const clear = () => {
		setFormData({
			user_name: "",
			user_email: "",
			message: "",
		})
	}
	const onChange = (e) => {
		setFormData({
			user_name: e.target.user_name,
			user_email: e.target.user_email,
			message: e.target.message,
		})
	}

	return (
		<div className='text-white  '>
			<NavBar />
			<section className='h-screen flex-col flex  bg-contact-bg  p-5  bg-center bg-no-repeat bg-cover border-[#e6bc6a] border-t-4 justify-center items-center'>
				<div className=' bg-black bg-opacity-60  w-full border-[#e6bc6a] border-2 lg:w-[800px]'>
					<h1 className='text-4xl font-bold text-center p-5'>Contact us</h1>

					<form
						className='flex flex-col justify-between  p-5 m-auto'
						ref={form}
						onSubmit={sendEmail}>
						<label className='text-xl  mb-2'>Name</label>
						<input
							type='text'
							className='text-black mb-5 h-10 outline outline-offset-2  focus:outline-secondary'
							name='user_name'
							id=''
						/>
						<label className='text-xl  mb-2'>Email</label>
						<input
							type='email'
							className='text-black mb-5  h-10 outline outline-offset-2  focus:outline-secondary'
							name='user_email'
							id=''
						/>
						<label className='text-xl mb-2'>Message</label>
						<textarea
							className=' text-black h-40  outline outline-offset-2  focus:outline-secondary'
							name='message'
							onChange={() => {}}
						/>
						<input
							className='uppercase font-bold border-secondary border-2 w-40 py-2 m-auto mt-10 hover:bg-secondary hover:scale-110 transition duration-500 ease'
							type='submit'
							value='Send'
						/>
					</form>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Contact
