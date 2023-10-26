import Image from 'next/image';
import { StaticImageData } from 'next/image';
import React from 'react';

interface Props {
  buttonImage: StaticImageData;
}

export default function ButtonRed({ buttonImage }: Props) {
  return (
    <>
      <Image
        src={buttonImage}
        className='w-[150px] hover:scale-110 transition duration-500 ease-in-out drop-shadow-[0_15px_10px_rgba(0,0,0,0.5)]'
        alt='ReadMore'
      />
    </>
  );
}
