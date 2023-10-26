// Next.js components
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BiBell,
  BiBookmark,
  BiCog,
  BiEnvelope,
  BiHome,
  BiLogInCircle,
  BiLogOutCircle,
  BiPyramid,
  BiSearch,
  BiUser,
} from 'react-icons/bi';
// Icons
import { TbUsersGroup } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

import { logout } from '@/lib/redux/slices/authSlice';
import { AppDispatch } from '@/lib/redux/store';

import loading from '@/public/assets/Ripple-1s-200px.gif';

import AvatarSkeleton from '../../UI/Skeletons/AvatarSkeleton';
import SideBarAvatarSkeleton from '../../UI/Skeletons/SideBarAvatarSkeleton';

interface User {
  _id: string;
  name: string;
  email: string;
  followers: string[];
  following: string[];
  bio: string;
  location: string;
  userLink: string;
  imageUrl: string;
  coverImage: string;
  YHaplogroup: string;
  MtHaplogroup: string;
  createdAt: string;
}
interface SideBarProps {
  user?: User | null;
  isLoggedIn?: boolean;
  pathname?: string;
}
export default function SideBar({ user, isLoggedIn, pathname }: SideBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Menu items configuration
  const menuItems = [
    {
      icon: BiHome,
      title: 'Home',
      tooltip: 'Home',
      link: '/app',
      userAuth: true,
    },
    {
      icon: BiBell,
      title: 'Notification',
      tooltip: 'Notifications',
      link: '/app/notifications',
      userAuth: isLoggedIn,
    },
    {
      icon: BiEnvelope,
      title: 'Messages',
      tooltip: 'Messages',
      link: '/app/messages',
      userAuth: isLoggedIn,
    },
    {
      icon: TbUsersGroup,
      title: 'Clubs',
      tooltip: 'Clubs',
      link: '/app/clubs',
    },
    {
      icon: BiBookmark,
      title: 'Bookmarks',
      tooltip: 'Bookmarks',
      link: '/app/bookmarks',
      userAuth: isLoggedIn,
    },
    {
      icon: BiPyramid,
      title: 'web3',
      tooltip: 'web3',
      link: '/app/web3',
      userAuth: isLoggedIn,
    },
    {
      icon: BiSearch,
      title: 'Search',
      tooltip: 'Search',
      link: '/app/search',
      userAuth: true,
    },
    {
      icon: BiUser,
      title: 'User Settings',
      tooltip: 'User Settings',
      link: '/app/user-settings',
      userAuth: isLoggedIn,
    },
    {
      icon: BiCog,
      title: 'Customization',
      tooltip: 'Customization',
      link: '/app/customization',
      userAuth: isLoggedIn,
    },
  ];

  // Render the sidebar with navigation links, profile image, and login/logout buttons
  return (
    <div className='sticky top-0 right-0 flex-col items-center justify-between hidden w-20 h-screen pr-4 lg:w-60 md:flex border-grayBorder'>
      <div className='flex flex-col px-4 '>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.link;
          return (
            <div key={index}>
              {item.userAuth && (
                <div
                  className={`flex  py-4  cursor-pointer   group ${
                    isActive ? 'text-secondary' : ''
                  }`}
                  key={index}
                  data-te-toggle='tooltip'
                  title={item.tooltip}
                  onClick={() => {
                    router.push(`${item.link}`, { scroll: true });
                  }}
                >
                  <button
                    className={`flex flex-col items-center justify-between w-10 p-1 group-hover:text-secondary transition-all duration-300 ease-in-out rounded-full  ${
                      isActive ? 'text-secondary' : 'text-white'
                    }`}
                  >
                    <item.icon className='text-3xl ' />
                  </button>
                  <span className='hidden my-auto ml-2 text-xl text-white transition-all duration-500 ease-in-out cursor-pointer lg:block'>
                    {item.title}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className='px-4 pb-6 '>
        {isLoggedIn ? (
          // Render logout button if user is logged in

          <>
            {user?.imageUrl ? (
              <>
                <div
                  onClick={() => {
                    // signOut()
                    dispatch(logout());
                  }}
                  className='items-center hidden w-full px-1 py-1 border-2 rounded-full cursor-pointer lg:flex border-secondary group hover:bg-secondary'
                >
                  <div className='flex items-center justify-center '>
                    <button
                      className={`flex flex-col items-center justify-between w-10 p-1 text-secondary group-hover:text-white transition-all duration-300 ease-in-out rounded-full  `}
                    >
                      <BiLogOutCircle className='text-3xl ' />
                    </button>
                    <span className='hidden my-auto mr-2 text-xl text-white transition-all duration-500 ease-in-out cursor-pointer lg:block'>
                      Logout
                    </span>
                  </div>
                </div>

                <Link
                  href={`/app/profile/${user?._id}`}
                  className='items-center hidden w-full px-1 py-1 mt-2 rounded-full lg:flex group bg-secondary'
                >
                  <div className='relative w-10 h-10 overflow-hidden bg-black rounded-full '>
                    <Image
                      fill
                      src={user?.imageUrl}
                      alt={user?.name}
                      className='object-contain scale-[.85] '
                    />
                  </div>

                  <div className='flex items-center justify-center '>
                    <span className='hidden my-auto ml-2 mr-2 text-base text-white transition-all duration-500 ease-in-out cursor-pointer lg:block'>
                      @{user?.name}
                    </span>
                  </div>
                </Link>
              </>
            ) : (
              <SideBarAvatarSkeleton />
            )}
          </>
        ) : (
          // Render login button if user is not logged in

          <Link
            href='/auth/login'
            className='items-center hidden w-full px-1 py-1 border-2 rounded-full lg:flex border-third group hover:bg-third'
          >
            <div className='flex items-center justify-center '>
              <button
                className={`flex flex-col items-center justify-between w-10 p-1 text-third group-hover:text-white transition-all duration-300 ease-in-out rounded-full  `}
              >
                <BiLogInCircle className='text-3xl ' />
              </button>
              <span className='hidden my-auto mr-2 text-xl text-white transition-all duration-500 ease-in-out cursor-pointer lg:block'>
                Login
              </span>
            </div>
          </Link>
        )}
        {user?.imageUrl ? (
          <div className='relative w-10 h-10 overflow-hidden bg-black border-2 rounded-full border-secondary lg:hidden'>
            <Image
              fill
              src={user?.imageUrl || loading}
              alt={user?.name}
              className='object-contain scale-[.85] '
            />
          </div>
        ) : (
          <AvatarSkeleton />
        )}
      </div>
    </div>
  );
}
