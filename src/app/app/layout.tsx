// React client directive
'use client';
// Next.js and Redux imports
import { usePathname, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllUsers, fetchUserById } from '@/lib/redux/slices/userSlice';
import { RootState } from '@/lib/redux/store';
import { AppDispatch } from '@/lib/redux/store';

import MobileAppBar from '@/components/App/userLayout/MobileAppBar';
import MobileNav from '@/components/App/userLayout/MobileNav';
// Component imports
import SideBar from '@/components/App/userLayout/SideBar';
import Widgets from '@/components/App/userLayout/Widgets';
import WidgetsProfile from '@/components/App/userLayout/WidgetsProfile';
interface AppLayoutProps {
  children: React.ReactNode;
}
interface User {
  _id: string;
  name: string;
  email: string;
  followers: string[];
  following: string[];
  bio: string;
  location: string;
  userLink: string;
  playlistLink: string;
  imageUrl: string;
  coverImage: string;
  YHaplogroup: string;
  MtHaplogroup: string;
  createdAt: string;
}

export default function AppLayout({ children }: AppLayoutProps) {
  // Redux state selectors
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth?.user?._id;
  const users = useSelector((state: RootState) => state.user.allUsers);
  const user = users.find((u: User) => u._id === userId);
  const currentProfileUser = useSelector(
    (state: RootState) => state?.user?.currentUser,
  );
  const authUser = useSelector((state: RootState) => state?.auth?.user);

  const isLoggedIn = auth?.isAuthenticated;

  // Next.js hooks
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(fetchAllUsers());
  }, [dispatch]);
  return (
    <section className='justify-center gap-8 w-full h-auto md:flex md:h-auto bg-blackBG'>
      {/* Sidebar with navigation links */}
      <SideBar isLoggedIn={isLoggedIn} user={user} pathname={pathname} />

      {/* Mobile navigation component */}
      <MobileNav pathname={pathname} isLoggedIn={isLoggedIn} user={user} />

      {/* Main content area */}
      <div className=' md:border-x border-grayBorder'>{children}</div>

      {/* Mobile app bar */}
      <MobileAppBar pathname={pathname} />

      {/* Additional widgets or functionalities */}
      {id != authUser?._id && pathname === `/app/profile/${id}` ? (
        <WidgetsProfile user={currentProfileUser} />
      ) : (
        <>{authUser && <Widgets user={authUser} />}</>
      )}
    </section>
  );
}
