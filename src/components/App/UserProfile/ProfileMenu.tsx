import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  BiBlock,
  BiDotsHorizontalRounded,
  BiFlag,
  BiLink,
  BiShareAlt,
} from 'react-icons/bi';
import { FaRegEnvelope } from 'react-icons/fa';
import api from '@/lib/utils/axiosConfig';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchUserById, fetchAllUsers } from '@/lib/redux/slices/userSlice';

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

type Props = {
  status: string;
  isLoggedIn: boolean;
  userId?: string;
  id: string;
  username?: string;
  authUser: User;
  user: User;
};

type MenuItem = {
  icon: JSX.Element;
  text: string;
};
function Message({ status, isLoggedIn, userId, id }: Props) {
  if (status === 'authenticated' || (isLoggedIn && userId === id)) return null;

  return (
    <button className='flex p-2 my-auto text-white border border-gray-500 rounded-full '>
      <FaRegEnvelope className='mx-auto my-auto text-lg' />
    </button>
  );
}

function EditProfile({
  status,
  isLoggedIn,
  userId,
  id,
  authUser,
  user,
}: Props) {
  const isFollowing = authUser?.following.includes(user?._id);
  const dispatch = useDispatch<AppDispatch>(); // Determine image orientation (portrait or landscape)
  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch]);

  const handleFollow = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    api
      .put(`/users/follow/${id}`, {})
      .then(() => {
        if (id) {
          dispatch(fetchUserById(id));
          dispatch(fetchAllUsers());
        }
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message to the user)
        console.error('Failed to follow:', error); //eslint-disable-line
        alert(error.message || 'Failed to follow');
      });
  };
  if (status === 'authenticated' || (isLoggedIn && userId === id)) {
    return (
      <Link
        href='/app/edit-profile'
        className='border border-gray-500 py-[5px] font-semibold px-4 text-white hover:bg-gray-900 bg-blackBG rounded-full '
      >
        Edit profile
      </Link>
    );
  } else {
    return (
      <button
        className={`border border-gray-500 py-[5px] font-semibold px-4   ${
          isFollowing
            ? ' bg-white text-black hover:bg-gray-200'
            : 'bg-blackBG text-white hover:bg-gray-900'
        } rounded-full `}
        onClick={handleFollow}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    );
  }
}
export default function ProfileMenu({
  username,
  status,
  isLoggedIn,
  userId,
  id,
  authUser,
  user,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { icon: <BiShareAlt />, text: 'Share profile via...' },
    { icon: <BiLink />, text: 'Copy link to profile' },
    { icon: <BiBlock />, text: `Block @${username}` },
    { icon: <BiFlag />, text: `Report @${username}` },
  ];

  return (
    <div className='flex items-end justify-end mt-4 space-x-2'>
      <div className='relative'>
        <div
          id='dropdownDotsHorizontal'
          className={`z-10 ${
            menuOpen ? 'block' : ' hidden'
          } absolute bg-blackBG divide-y top-10   rounded-lg shadow shadow-gray-500 -right-32 w-[250px]  `}
        >
          <ul
            className='text-base text-white '
            aria-labelledby='dropdownMenuIconHorizontalButton'
          >
            {menuItems.map((item, index) => (
              <li
                key={index}
                className='flex justify-start items-center cursor-pointer px-4 text-start py-2 hover:bg-[#272727]  text-white w-full'
              >
                {item.icon}
                <span className='ml-2 font-semibold text-white'>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className='flex p-2 my-auto text-white border border-gray-500 rounded-full '
        >
          <BiDotsHorizontalRounded className='my-auto text-lg' />
        </button>
      </div>
      <Message
        status={status}
        isLoggedIn={isLoggedIn}
        userId={userId}
        id={id}
        username={username}
      />
      <EditProfile
        user={user}
        authUser={authUser}
        status={status}
        isLoggedIn={isLoggedIn}
        userId={userId}
        id={id}
        username={username}
      />
    </div>
  );
}
