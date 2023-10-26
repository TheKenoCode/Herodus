// React and Next.js imports
import React from 'react';

import PostCard from './PostCard';

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  role: string;
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
interface PostsProps {
  posts: UserPost[] | null;
  userId: string;
  id: string;
  isLoggedIn?: boolean;
}

export default function Posts({ posts, userId, id, isLoggedIn }: PostsProps) {
  return (
    <div className='md:border-x border-[#333639] w-screen md:w-[600px] mx-auto flex flex-col shadow-2xl'>
      {posts?.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          userId={userId}
          id={id}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
}
