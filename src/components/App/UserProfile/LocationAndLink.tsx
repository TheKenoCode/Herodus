import React from 'react';
import { BiLink, BiLocationPlus } from 'react-icons/bi';
type Props = {
  location: string;
  link: string;
};

export default function LocationAndLink({ location, link }: Props) {
  return (
    <div className='flex w-full mt-2'>
      {location && (
        <div className='flex items-center justify-center'>
          <BiLocationPlus className='text-xl text-gray-500' />
          <span className='ml-1 text-base text-gray-500'>{location}</span>
        </div>
      )}

      {link && (
        <div className='flex items-center justify-center ml-4'>
          <BiLink className='text-xl text-gray-500' />
          <a href={`https://${link}`} className='ml-1 text-base text-secondary'>
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
