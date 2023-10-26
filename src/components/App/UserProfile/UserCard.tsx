// React imports
import Image from 'next/image';
// Next.js imports
import ReactHashtag from 'react-hashtag';

// Icon imports
// Assets imports
import Haplogroups from './Haplogroups';
import LocationAndLink from './LocationAndLink';
import Name from './Name';
import ProfileMenu from './ProfileMenu';
import ProfileStats from './ProfileStats';
import CoverImageSkeleton from '../../UI/Skeletons/CoverImageSkeleton';
import ProfileImageSkeleton from '../../UI/Skeletons/ProfileImageSkeleton';
import ProfileInfoSkeleton from '../../UI/Skeletons/ProfileInfoSkeleton';
interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  role: string;
  followers: string[];
  following: string[];
  location: string;
  userLink: string;
  imageUrl: string;
  coverImage: string;
  YHaplogroup: string;
  MtHaplogroup: string;
  likedPosts: UserPost[];
  createdAt: string;
}
interface UserPost {
  _id: string;
  content: string;
  author: User;
  imageUrl: string;
  likes: string[];
}
interface UserCardProps {
  filteredPosts: UserPost[];
  user?: User;
  authUser?: User;
  isLoggedIn: boolean;
  userId?: string;
  id: string;
}
// Main UserCard component
export default function UserCard({
  filteredPosts,
  user,
  isLoggedIn,
  userId,
  id,
  authUser,
}: UserCardProps) {
  return (
    <div className='flex mx-auto flex-col w-screen md:w-[600px]    justify-center  col-span-3 row-span-1   bg-blackBG md:border-x border-grayBorder xl:col-span-2  '>
      {user?.coverImage ? (
        <div className='relative h-[200px] '>
          <Image
            fill
            src={user?.coverImage}
            alt='cover photo'
            className='object-cover '
          />
        </div>
      ) : (
        <CoverImageSkeleton />
      )}

      <div className='relative flex flex-col px-4'>
        {/* buttons */}
        <ProfileMenu
          user={user}
          username={user?.name}
          status={status}
          isLoggedIn={isLoggedIn}
          userId={userId}
          id={id}
          authUser={authUser}
        />

        {/* UserInfo */}
        <div className='absolute overflow-hidden -top-[50px] sm:-top-[70px] w-[100px] h-[100px]  sm:w-[134px] sm:h-[134px] border border-grayBorder rounded-full bg-black '>
          {user?.imageUrl ? (
            <Image
              fill
              src={user?.imageUrl}
              alt={user?.name || 'user profile picture'}
              className='object-contain scale-[.75]  '
            />
          ) : (
            <ProfileImageSkeleton />
          )}
        </div>
        {user ? (
          <>
            {/* name */}
            <Name name={user?.name} role={user?.role} />
            {/* bio */}
            {user?.bio ? (
              <p className='mt-4 text-sm text-gray-100 text-start'>
                <ReactHashtag>{user?.bio}</ReactHashtag>
              </p>
            ) : (
              <p className='mt-4 text-sm text-gray-100 text-start'>
                No bio yet.
              </p>
            )}

            {/* location and link */}
            <LocationAndLink location={user?.location} link={user?.userLink} />
            <Haplogroups
              YHaplogroup={user?.YHaplogroup}
              MtHaplogroup={user?.MtHaplogroup}
            />

            {/* followers, flowing and num of posts */}
            <ProfileStats
              postCount={filteredPosts.length}
              followers={user.followers.length}
              following={user.following.length}
              id={id}
            />
          </>
        ) : (
          <ProfileInfoSkeleton />
        )}
      </div>
    </div>
  );
}
