import React from 'react';
import { MdVerified } from 'react-icons/md';

type Props = {
  name: string;
  role: string;
};
export default function Name({ name, role }: Props) {
  return (
    <div className='mt-4 md:mt-8 text-start'>
      <div className='flex items-center'>
        <h2 className='mr-1  text-xl font-bold text-white '>{name}</h2>
        {role === 'admin' && (
          <MdVerified className='mt-1 text-2xl text-third' />
        )}
      </div>
      <h2 className='mx-auto text-base text-gray-500'>@{name}</h2>
    </div>
  );
}
