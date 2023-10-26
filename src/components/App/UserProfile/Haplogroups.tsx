import React from 'react';
import { BiDna } from 'react-icons/bi';
type Props = {
  YHaplogroup: string;
  MtHaplogroup: string;
};

function Haplogroups({ YHaplogroup, MtHaplogroup }: Props) {
  return (
    <div className='flex w-full mt-2'>
      {YHaplogroup && (
        <div className='flex items-center justify-center'>
          <BiDna className='text-xl text-gray-500' />

          <span className='flex items-center ml-1 text-base text-secondary'>
            <span className='mr-2 text-gray-500'>YDNA</span> {YHaplogroup}
          </span>
        </div>
      )}
      {MtHaplogroup && (
        <div className='flex items-center justify-center ml-4'>
          <BiDna className='text-xl text-gray-500' />
          <span className='flex items-center ml-1 text-base text-secondary'>
            <span className='mr-2 text-gray-500'>MtDNA</span>
            {MtHaplogroup}
          </span>
        </div>
      )}
    </div>
  );
}

export default Haplogroups;
