'use client';
// React imports
import { useParams } from 'next/navigation';
// Next imports and hooks
import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserPosts } from '@/lib/redux/slices/UserPostSlice';
import { fetchAllUsers, fetchUserById } from '@/lib/redux/slices/userSlice';
// Redux state and actions
import { RootState } from '@/lib/redux/store';
import { AppDispatch } from '@/lib/redux/store';

// Components and Icons
import Posts from '@/components/App/Posts';
import ProfilePostForm from '@/components/App/UserProfile/ProfilePostForm';
import UserCard from '@/components/App/UserProfile/UserCard';
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
  createdAt: string;
}

export default function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  // Redux state selectors
  const auth = useSelector((state: RootState) => state.auth);
  const posts = useSelector((state: RootState) => state.userPost.posts);
  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.user.allUsers);
  const profileUser = users.find((u: User) => u._id === id);
  const authUser = users.find((u: User) => u._id === auth?.user?._id);
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isAuthenticated
  );
  const [newPostFormOpen, setNewPostFormOpen] = useState(false);
  const [tab, setTab] = useState('Posts');
  const filteredPosts = Array.from(
    new Map(
      posts
        .filter((post: UserPost) => post.author._id === id)
        .map((post) => [post['_id'], post])
    ).values()
  ).reverse();

  const likedFilteredPosts = Array.from(
    new Map(
      (user?.likedPosts || [])
        .filter((post) => {
          return post.likes.filter((like) => like === id);
        })
        .map((post: UserPost) => [post['_id'], post])
    ).values()
  ).reverse();
  useEffect(() => {
    dispatch(fetchAllUsers());
    if (id) {
      dispatch(fetchUserById(id));
    }
    dispatch(fetchUserPosts());
  }, [dispatch]);

  return (
    <div className='flex items-start justify-start h-full py-16 bg-cover md:py-0 bg-blackBG'>
      <div className='flex flex-col '>
        <UserCard
          filteredPosts={filteredPosts}
          user={profileUser}
          userId={userId}
          id={id}
          authUser={authUser}
          isLoggedIn={isLoggedIn}
        />

        <div className='flex justify-between w-full px-4 mt-10 border-b border-grayBorder'>
          {tabNames.map((item) => (
            <button
              key={item.name}
              className={`pb-2 text-base font-bold  border-secondary ${
                tab === item.name ? 'text-white border-b-4' : 'text-gray-500'
              } `}
              onClick={() => {
                setTab(`${item.name}`);
                dispatch(fetchUserPosts());
              }}
            >
              {item.name}
            </button>
          ))}

          <div className='flex max-w-xl pb-2 text-white '>
            {isLoggedIn ? (
              <>
                {auth?.user?._id === id ? (
                  <div className='flex '>
                    <button
                      onClick={() => setNewPostFormOpen(!newPostFormOpen)}
                    >
                      {newPostFormOpen ? (
                        <RiCloseFill className='text-4xl transition-all duration-300 scale-100 opacity-100 text-secondary' />
                      ) : (
                        <IoMdAdd className='text-4xl transition-all duration-300 scale-100 opacity-100 text-secondary ' />
                      )}
                    </button>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
        <ProfilePostForm newPostFormOpen={newPostFormOpen} />
        {tab === 'Posts' && (
          <Posts
            posts={filteredPosts}
            userId={userId}
            id={id}
            isLoggedIn={isLoggedIn}
          />
        )}
        {tab === 'Likes' && (
          <Posts
            posts={likedFilteredPosts}
            userId={userId}
            id={id}
            isLoggedIn={isLoggedIn}
          />
        )}
      </div>
    </div>
  );
}

const tabNames = [
  { name: 'Posts' },
  { name: 'Histories' },
  { name: 'Likes' },
  { name: 'Clubs' },
  { name: 'NFTs' },
];
