import Image from 'next/image';
import React from 'react';

import appStore from '@/public/assets/appstore.png';

import Iphone from '../ThreeJsModels/Iphone';

export default function Phone() {
  return (
    <>
      <div className='relative h-[1000px] flex flex-row  mx-auto py-20 xl:h-screen  container'>
        <div className='rounded-full   bg-blur-class absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  w-full xl:w-[700px] h-[300px] bg-[#2a99b4] '></div>

        <div className='w-full h-[800px] md:h-full my-auto  z-10'>
          <Iphone />
        </div>
        <div className='absolute z-10 flex flex-col items-center justify-center w-full text-center -translate-y-1/2 top-1/2 xl:absolute'>
          <h1 className='w-[400px] mr-auto mb-10 mx-auto text-4xl xl:text-5xl font-semibold text-white  xl:w-[500px] shadow-black text-shadow-lg'>
            Herodus mobile app coming soon!
          </h1>
          <Image
            src={appStore}
            alt='appstore'
            className='w-40 drop-shadow-2xl xl:w-60'
          />
        </div>
      </div>
    </>
  );
}
