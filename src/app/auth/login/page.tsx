'use client';

// React imports
import axios from 'axios';
// Next.js imports
import { useRouter } from 'next/navigation';
import React from 'react';
// Other utility and library imports
import { useForm } from 'react-hook-form';
// Redux imports
import { useDispatch } from 'react-redux';

import { login } from '@/lib/redux/slices/authSlice';
import { AppDispatch } from '@/lib/redux/store';

// Assets

interface LoginFormInput {
  user_email: string;
  user_password: string;
}

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await axios.post(`/api/users/login`, {
        email: data.user_email,
        password: data.user_password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        dispatch(
          login({ token: response.data.token, user: response.data.user }),
        );
        router.push('/app');
      } else {
        console.error('Error logging in:', response.data.message); // eslint-disable-line
      }
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  };

  return (
    <section className='flex items-center justify-center pb-24 text-white bg-center bg-no-repeat bg-cover pt-28 bg-home-hero-bg'>
      <form
        className='flex w-full flex-col justify-between md:w-[500px] p-5 m-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='my-10 text-xl text-center md:text-3xl'>
          Login, we've missed you!
        </h1>

        {/* <button
                onClick={() => signIn('google')}
                className="flex items-center gap-4 pl-3 mx-auto mt-10 bg-white rounded-full shadow-xl"
              >
                <Image src={googleLogo} height={30} alt="google" width={30} />
                <span className="px-4 py-3 font-bold text-white duration-300 ease-in-out rounded-r-full transition-bg bg-secondary hover:bg-primary">
                  Sign in with Google
                </span>
              </button> */}

        <label className='mb-2 text-xl'>Email</label>
        <input
          type='email'
          className='h-10 pl-4 mb-5 text-black rounded-full focus:outline-secondary'
          {...register('user_email', { required: true })}
        />
        {errors.user_email && <p>Email is required</p>}

        <label className='mb-2 text-xl'>Password</label>
        <input
          type='password'
          className='h-10 pl-4 mb-5 text-black rounded-full focus:outline-secondary'
          {...register('user_password', { required: true })}
        />
        {errors.user_password && <p>Password is required</p>}

        <input
          className='w-40 py-2 m-auto mt-10 font-bold uppercase transition duration-500 border-2 rounded-full cursor-pointer border-third hover:bg-third hover:scale-110 ease'
          type='submit'
          value='Login'
        />
      </form>
    </section>
  );
}
