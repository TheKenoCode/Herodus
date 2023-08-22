'use client'
import { getApiUrl } from '../../utils/API_URL'
const API_URL = getApiUrl()
// React imports
import React from 'react'

// Next.js imports
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Redux imports
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/authSlice'

// Other utility and library imports
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { signIn } from 'next-auth/react'

// Assets
import googleLogo from '../../public/assets/google.png'

interface Props {
  // Define props here if needed
}

interface LoginFormInput {
  user_email: string
  user_password: string
}

const Login: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>()

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email: data.user_email,
        password: data.user_password,
      })

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token)
        dispatch(
          login({ token: response.data.token, user: response.data.user })
        )
        router.push('/')
      } else {
        console.error('Error logging in:', response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="pt-10 text-white bg-center bg-no-repeat bg-cover mt bg-home-hero-bg">
      <section>
        <div className="flex-row-reverse lg:flex">
          <div className="flex flex-col items-center justify-center w-full h-full p-5 my-auto">
            <form
              className="flex w-full flex-col justify-between md:w-[500px] p-5 m-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="my-10 text-xl text-center md:text-3xl">
                Login, we've missed you!
              </h1>

              <button
                onClick={() => signIn('google')}
                className="flex items-center gap-4 pl-3 mx-auto mt-10 bg-white rounded-full shadow-xl"
              >
                <Image src={googleLogo} height={30} alt="google" width={30} />
                <span className="px-4 py-3 font-bold text-white duration-300 ease-in-out rounded-r-full transition-bg bg-secondary hover:bg-primary">
                  Sign in with Google
                </span>
              </button>

              <label className="mb-2 text-xl">Email</label>
              <input
                type="email"
                className="h-10 pl-4 mb-5 text-black rounded-full focus:outline-secondary"
                {...register('user_email', { required: true })}
              />
              {errors.user_email && <p>Email is required</p>}

              <label className="mb-2 text-xl">Password</label>
              <input
                type="password"
                className="h-10 pl-4 mb-5 text-black rounded-full focus:outline-secondary"
                {...register('user_password', { required: true })}
              />
              {errors.user_password && <p>Password is required</p>}

              <input
                className="w-40 py-2 m-auto mt-10 font-bold uppercase transition duration-500 border-2 border-third hover:bg-third hover:scale-110 ease"
                type="submit"
                value="Login"
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
