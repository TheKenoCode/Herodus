/** @format */
'use client';
import type { NextPage } from 'next';

import Features from '@/components/Home/Features';
import Hero from '@/components/Home/Hero';
import LatestBlogPost from '@/components/Home/LatestBlogPost';
import NFT from '@/components/Home/NFT';
import Phone from '@/components/Home/Phone';
import Pricing from '@/components/Home/Pricing';
import Video from '@/components/Home/Video';

const Home: NextPage = () => {
  return (
    <div className='relative'>
      <div className='text-white bg-blackBG'>
        <Hero />

        <Video />

        <Features />

        <Phone />

        <NFT />

        <Pricing />

        <LatestBlogPost />
      </div>
    </div>
  );
};

export default Home;
