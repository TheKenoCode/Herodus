import React from 'react';

export default function ProfileInfo() {
  return (
    <div className='flex flex-col justify-around h-[250px] pt-4 animate-pulse'>
      <div>
        <div className='h-[20px]  rounded-full bg-gray-700 w-32 '></div>
        <div className='h-[20px] mt-2 rounded-full bg-gray-700 w-32 '></div>
      </div>
      <div className='h-[20px]  rounded-full bg-gray-700 w-full '></div>
      <div className='flex items-start space-x-4'>
        <div className='h-[20px]  rounded-full bg-gray-700 w-32 '></div>
        <div className='h-[20px]  rounded-full bg-gray-700 w-32 '></div>
      </div>
      <div className='flex items-start space-x-4'>
        <div className='h-[20px]  rounded-full bg-gray-700 w-32 '></div>
        <div className='h-[20px]  rounded-full bg-gray-700 w-32 '></div>
      </div>
      <div className='flex items-start space-x-8'>
        <div className='h-[20px]  rounded-full bg-gray-700 w-20 '></div>
        <div className='h-[20px]  rounded-full bg-gray-700 w-20 '></div>
        <div className='h-[20px]  rounded-full bg-gray-700 w-20 '></div>
      </div>
    </div>
  );
}
