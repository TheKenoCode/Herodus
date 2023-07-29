/** @format */

import React from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/router"

interface Props {
	// define your props here
}

interface FormInput {
	name: string
	username: string
	email: string
	password: string
	confirmPassword: string
}

const Register: React.FC<Props> = (props) => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInput>()

	const onSubmit = (data: FormInput) => {
		// Check if passwords match
		if (data.password !== data.confirmPassword) {
			alert("Passwords do not match")
			return
		}

		// Pass the data to the function that will handle the registration
		handleRegister(data)
	}

	// Function that handles user registration
	const handleRegister = async (data: FormInput) => {
		console.log(data)

		try {
			const response = await axios.post("http://localhost:8000/api/users", data)

			// Handle the response as needed
			console.log(response.data)
			router.push("/login")
		} catch (error) {
			// Handle the error as needed
			console.error(error)
		}
	}

	return (
		<div className='text-white bg-primary '>
			<section className=''>
				<div className='lg:flex justify-center items-center border-[#e6bc6a] border-t-4 '>
					<div className='w-full h-full p-5'>
						<h1 className='text-center text-md md:text-2xl'>
							Sing up and join historians across the world
						</h1>
						<form
							className='flex flex-col justify-between md:w-[500px] p-5 m-auto'
							onSubmit={handleSubmit(onSubmit)}>
							<label className='mb-2 text-xl'>name</label>
							<input
								type='name'
								className='h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary'
								{...register("name", { required: true })}
							/>
							<label className='mb-2 text-xl'>Username</label>
							<input
								type='name'
								className='h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary'
								{...register("username", { required: true })}
							/>
							{/* {errors.username && <p>Username is required</p>} */}
							<label className='mb-2 text-xl'>Email</label>
							<input
								type='email'
								className='h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary'
								{...register("email", { required: true })}
							/>
							{/* {errors.email && <p>Email is required</p>} */}
							<label className='mb-2 text-xl'>Password</label>
							<input
								type='password'
								className='h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary'
								{...register("password", { required: true })}
							/>
							{/* {errors.password && <p>Password is required</p>} */}
							<label className='mb-2 text-xl'>Confirm Password</label>
							<input
								type='password'
								className='h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary'
								{...register("confirmPassword", { required: true })}
							/>
							{/* {errors.confirmPassword && <p>Confirm Password is required</p>} */}
							<input
								className='w-40 py-2 m-auto mt-10 font-bold uppercase transition duration-500 border-2 border-secondary hover:bg-secondary hover:scale-110 ease'
								type='submit'
								value='Register'
							/>
						</form>
					</div>
					<div className='text-center w-full  flex flex-col justify-center  items-center bg-register-bg bg-cover bg-no-repeat border-[#e6bc6a] border-t-4 lg:border-none  p-5 lg:h-screen h-[220px] md:h-[550px] '></div>
				</div>
			</section>
		</div>
	)
}

export default Register
