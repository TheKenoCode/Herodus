import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

import logo from '@/public/assets/logo2.png';

import HeroStatue from '../ThreeJsModels/HeroStatue';

export default function Hero() {
  return (
    <div className='relative z-10'>
      <video
        autoPlay
        muted
        loop
        playsInline
        className='absolute object-cover w-screen h-screen mx-auto'
        title='Embedded video'
      >
        <source src='./assets/videos/Background.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>{' '}
      <div className='w-full h-full absolute bg-black bg-opacity-30 backdrop-blur-sm '></div>
      <main className='relative h-screen  bg-center bg-no-repeat bg-cover  backdrop-brightness-75 border-secondary'>
        <div className='container pt-20 md:pt-40 lg:pt-20 xl:pt-0 relative flex flex-col items-center justify-center mx-auto text-center h-screen xl:flex-row'>
          {/* Text Section */}
          <div className='relative animate-fade  animate-once z-20 flex justify-center items-center   h-screen w-full pt-10 font-bold xl:pl-20 xl:text-start lg:pt-0'>
            <div className='w-full h-fit'>
              <Image
                alt='logo'
                src={logo}
                className='my-auto mx-auto xl:mx-0 w-[300px] lg:w-[400px]  mb-6 '
              />

              <div className='lg:h-[70px] xl:h-[50px] flex justify-center xl:justify-start'>
                <TypeAnimation
                  sequence={[
                    'Preserve.',
                    2000,
                    'Share.',
                    2000,
                    'Explore.',
                    2000,
                  ]}
                  wrapper='span'
                  cursor={true}
                  repeat={Infinity}
                  className='text-4xl font-semibold text-center xl:text-start md:text-5xl text-secondary'
                />
              </div>

              <div className='flex justify-center mt-8 xl:justify-start '>
                <Link href='/auth/register'>
                  <button className='cursor-pointer rounded-full w-[150px] xl:w-[200px] mb-2 lg:mb-0 py-4 xl:py-4 uppercase transform text-white hover:scale-110 transition duration-500 hover:bg-secondary  border-2 border-secondary'>
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className='absolute w-screen h-screen  '>
            <HeroStatue />
          </div>
        </div>
      </main>
    </div>
  );
}
