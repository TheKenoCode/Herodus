'use client';

import Image from 'next/image';
import logo from '@/public/assets/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Error404 = () => {
  const router = useRouter();

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#1a0c21] via-[#ff1053] to-[#1dcee9]'>
      <div className='text-center'>
        <Image src={logo} alt='logo' className='mx-auto  w-1/2' />

        <div className='text-white text-9xl font-bold'>404</div>
        <div className='text-white text-xl mt-4'>Page not found</div>
        <div className='text-white mt-4'>
          The Page you are looking for doesn't exist or another error occurred.{' '}
          <button
            type='button'
            onClick={() => router.back()}
            className='text-third font-semibold underline'
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
