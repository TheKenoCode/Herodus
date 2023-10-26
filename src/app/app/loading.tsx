import Image from 'next/image';

import loadingGif from '@/public/assets/giphy.gif';

export default function Loading() {
  return (
    <div className='w-screen md:w-[600px] h-full flex flex-col justify-center items-center pt-20 text-white py-6 px-4 md:py-0 md:px-6 rounded-lg'>
      <Image src={loadingGif} alt='loading gif' className='w-1/2 mx-auto' />
      <h1 className='text-4xl text-center text-secondary'>loading...</h1>
    </div>
  );
}
