'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';

type Props = {};

export default function following() {
  const { id } = useParams<{ id: string }>();
  const users = useSelector((state: RootState) => state.user.allUsers);
  const profileUser = users.find((u: User) => u._id === id);
  const usersFollowing = users.filter((user: User) =>
    profileUser.following.includes(user._id),
  );

  return (
    <div className='w-screen md:w-[600px] pt-20 text-white py-6 md:py-0 rounded-lg'>
      <div className='flex items-center justify-between w-1/2 py-8 mx-auto '>
        <Link href={`/app/profile/${id}/following`}>Following</Link>
        <Link href={`/app/profile/${id}/followers`}>Followers</Link>
      </div>
      <div className='border-t border-grayBorder'>
        {usersFollowing?.map((user, index) => (
          <div key={index}>
            <Link
              href={`/app/profile/${user._id}`}
              className='flex items-center p-2 space-x-4 min-h-[100px] border-grayBorder  cursor-pointer border-b hover:bg-purpleBG'
            >
              <Image
                width={50}
                height={50}
                src={user.imageUrl}
                alt={user.name}
                className='object-contain border rounded-full border-grayBorder w-14 h-14 scale-70 bg-blackBG'
              />
              <div>
                <div className='font-bold text-white'>{user.name}</div>
                <div className='text-base text-gray-500'>@{user.name}</div>

                <div className='text-gray-400'>{user.bio}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
