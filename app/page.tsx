/** @format */
'use client'
import type { NextPage } from 'next'
import Image from 'next/image'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'

const Home: NextPage = () => {
  return (
    <>
      <div className="text-white bg-primary">
        <Hero />
        <Features />
      </div>
    </>
  )
}

export default Home
