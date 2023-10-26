import React from 'react';

export default function Video() {
  return (
    <div className='relative  container mx-auto py-20'>
      {/* <div className='rounded-full bg-blur-class absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  w-full max-w-[950px] lg:h-[300px] h-[100px] bg-gradient-to-b from-secondary  to-[#d339f9] -third '></div> */}

      <div className='relative  flex flex-col items-center justify-center px-4  video-responsive'>
        <h1 className='z-20 mb-4 text-2xl tracking-widest text-center text-secondary font-Chakra'>
          What is Herodus?
        </h1>
        <div className='w-[250px] mb-10  mx-auto  border-secondary border-2'></div>

        <video
          width='950'
          height='480'
          controls
          autoPlay
          muted
          loop
          playsInline
          className='object-cover z-10 animate-fade-up animate-once animate-fill-both  mx-auto rounded-3xl bg-gradient-to-r p-[6px] from-[#1dcee9] via-[#a14af3] to-[#ff1053]'
          title='Embedded video'
        >
          <source src='./assets/videos/Herodus-Video.m4v' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
