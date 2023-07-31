/** @format */
'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import googleLogo from '../../public/assets/google.png'
import Image from 'next/image'
import heroCard from '../../public/assets/herocard.png'

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
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>()

  const onSubmit = (data: FormInput) => {
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // Pass the data to the function that will handle the registration
    handleRegister(data)
  }

  // Function that handles user registration
  const handleRegister = async (data: FormInput) => {
    console.log(data)

    try {
      const response = await axios.post('http://localhost:8000/api/users', data)

      // Handle the response as needed
      console.log(response.data)
      push('/login')
    } catch (error) {
      // Handle the error as needed
      console.error(error)
    }
  }

  return (
    <div className="text-white ">
      <section className="bg-center bg-no-repeat bg-cover bg-home-hero-bg">
        <div className="items-center justify-center xl:flex ">
          <div className="w-full h-full p-5 pt-32">
            <h1 className="text-center text-md md:text-2xl">
              Sing up and join historians across the world
            </h1>
            <button
              onClick={() => signIn('google')}
              className="flex items-center gap-4 pl-3 mx-auto mt-10 bg-white rounded-lg shadow-xl"
            >
              <Image
                src={googleLogo}
                height={30}
                alt="google"
                width={30}
                className=""
              />

              <span className="px-4 py-3 text-white bg-blue-500 ">
                Sign in with Google
              </span>
            </button>
            <form
              className="flex flex-col  justify-between md:w-[500px] p-5 m-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="mb-2 text-xl">name</label>
              <input
                type="name"
                className="h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary"
                {...register('name', { required: true })}
              />
              <label className="mb-2 text-xl">Username</label>
              <input
                type="name"
                className="h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary"
                {...register('username', { required: true })}
              />
              {/* {errors.username && <p>Username is required</p>} */}
              <label className="mb-2 text-xl">Email</label>
              <input
                type="email"
                className="h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary"
                {...register('email', { required: true })}
              />
              {/* {errors.email && <p>Email is required</p>} */}
              <label className="mb-2 text-xl">Password</label>
              <input
                type="password"
                className="h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary"
                {...register('password', { required: true })}
              />
              {/* {errors.password && <p>Password is required</p>} */}
              <label className="mb-2 text-xl">Confirm Password</label>
              <input
                type="password"
                className="h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary"
                {...register('confirmPassword', { required: true })}
              />
              {/* {errors.confirmPassword && <p>Confirm Password is required</p>} */}
              <input
                className="w-40 py-2 m-auto mt-10 font-bold uppercase transition duration-500 border-2 border-secondary hover:bg-secondary hover:scale-110 ease"
                type="submit"
                value="Register"
              />
            </form>
          </div>
          <div className="text-center w-full  flex flex-col justify-center  items-center    p-5  h-[500px] sm:w-[500px] md:h-[850px] ">
            <Image
              src={heroCard}
              className="w-[800px] relative  transition-hover duration-300 ease-in-out hover:drop-shadow-[0_15px_15px_rgba(211,44,255,0.5)]   herocard"
              alt=""
              priority={true}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
