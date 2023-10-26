import Image from 'next/image';
import React from 'react';

import cardImg1 from '@/public/assets/cards/card1.png';
import cardImg2 from '@/public/assets/cards/card2.png';
import cardImg3 from '@/public/assets/cards/card3.png';

export default function Features() {
  return (
    <>
      <section className='relative group z-10 flex items-center justify-center py-20 mx-auto  container'>
        {/* <div className='rounded-full bg-blur-class absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  w-full h-[100px] bg-gradient-to-b from-secondary group-hover:animate-pulse to-[#d339f9] -third '></div> */}
        <div className='rounded-full bg-blur-class absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  w-[400px] xl:max-w-[950px] xl:w-full xl:h-[300px] h-[1000px] bg-[#930137]  '></div>

        <div>
          {/* Header Section */}
          <div className='container mx-auto'>
            <h1 className='z-20 mb-4 text-2xl tracking-widest text-center text-secondary font-Chakra'>
              Features
            </h1>
            <div className='w-[250px]   mx-auto border-secondary border-2'></div>
          </div>

          {/* Cards Section */}
          <div className='container flex flex-col mx-auto mt-20 xl:flex-row '>
            {/* First Card */}
            <div className='relative'>
              <Image
                src={cardImg1}
                className='w-[400px] md:w-[500px] xl:w-full mx-auto transition-hover duration-300 ease-in-out drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] '
                alt='Card 1'
                priority={true}
              />
            </div>

            {/* Second Card */}
            <div className='relative my-10 xl:my-0 z-10'>
              <Image
                src={cardImg2}
                className='w-[400px] md:w-[500px] xl:w-full mx-auto transition-hover duration-300 ease-in-out drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] '
                alt='Card 2'
                priority={true}
              />
            </div>

            {/* Third Card */}
            <div className='relative'>
              <Image
                src={cardImg3}
                className='w-[400px] md:w-[500px] xl:w-full mx-auto transition-hover duration-300 ease-in-out drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] '
                alt='Card 3'
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
