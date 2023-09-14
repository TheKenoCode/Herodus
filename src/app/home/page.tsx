/** @format */
'use client'
import type { NextPage } from 'next'
import Image from 'next/image'
import Hero from '@/components/Home/Hero'
import Features from '@/components/Home/Features'
import NFT from '@/components/Home/NFT'
import Pricing from '@/components/Home/Pricing'
import LatestBlogPost from '@/components/Home/LatestBlogPost'
import Phone from '@/components/Home/Phone'
import Video from '@/components/Home/Video'

const Home: NextPage = () => {
  return (
    <>
      <div className="text-white bg-blackBG">
        <Hero />
        <Video />
        <Features />
        <Phone />
        <NFT />
        <Pricing />
        <LatestBlogPost />
      </div>
    </>
  )
}

export default Home
