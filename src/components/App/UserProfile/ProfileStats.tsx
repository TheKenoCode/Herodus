import Link from 'next/link';
import React from 'react';

type Props = {
  postCount: number;
  followers: number;
  following: number;
  id: string;
};

function ProfileStats({ postCount, followers, following, id }: Props) {
  return (
    <div className='flex items-center justify-start mt-2'>
      <Link
        href={`/app/profile/${id}/following`}
        className='flex items-center justify-center'
      >
        <span className='text-white text-md'>{following}</span>
        <span className='ml-1 text-base text-gray-500'>Following</span>
      </Link>
      <div className='flex items-center justify-center ml-4'>
        <span className='text-white text-md'>{followers}</span>
        <span className='ml-1 text-base text-gray-500'>Followers</span>
      </div>
      <div className='flex items-center justify-center ml-4'>
        <span className='text-white text-md'>{postCount}</span>
        <span className='ml-1 text-base text-gray-500'>Posts</span>
      </div>
    </div>
  );
}

export default ProfileStats;
