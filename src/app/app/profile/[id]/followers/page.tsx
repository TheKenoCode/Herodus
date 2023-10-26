import React from 'react';
import { useParams } from 'next/navigation';

type Props = {};

export default function page({}: Props) {
  const { id } = useParams<{ id: string }>();
  console.log('id' + id);
  return (
    <div className='w-screen md:w-[600px] pt-20 text-white py-6 px-4 md:py-0 md:px-6 rounded-lg'>
      page
    </div>
  );
}
