/** @format */
'use client'
import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'

import bg from '@/public/assets/bg-greece.png'
import herodutus from '@/public/assets/herodus123.png'
import menuIcon from '@/public/assets/menuIcon.png'
import menuIcon2 from '@/public/assets/menuIcon2.png'
import speachBubble from '@/public/assets/pixel-speech-bubble2.gif'
import Iphone from '@/components/ThreeJsModels/Iphone'
import Link from 'next/link'
const Home: NextPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000) // image will pop up after 3 seconds

    return () => clearTimeout(timer) // clear the timeout if the component is unmounted before the timer finishes
  }, [])

  return (
    <div className="bg-blackBG">
      <div className="relative w-full h-screen text-white home-bg-greece">
        <div className="absolute top-0 z-20 flex items-center justify-center w-full px-4 py-4">
          <h1 className="text-4xl font-bold text-white">Herodus</h1>
        </div>

        <div className="absolute bottom-0 z-20 flex flex-col transform -translate-x-1/2 left-1/2">
          <h1 className="mb-20 text-5xl font-semibold text-center text-white">
            Welcome to Herodus
          </h1>
          <Link href="/home" className="mb-20 text-center animate-bounce">
            <button className="px-6 py-2 text-2xl font-bold transition-all duration-500 ease-in-out border-4 rounded-full hover:bg-secondary border-secondary ">
              Enter
            </button>
          </Link>
          <Image
            src={speachBubble}
            alt="alt"
            className={` relative top-4 left-0 drop-shadow-[0_35px_35px_rgba(0,0,0,0.55)] transition ease-in-out duration-1000   w-[450px] ${
              isVisible ? 'opacity-100' : 'opacity-0'
            } `}
          />

          <Image
            src={herodutus}
            alt="alt"
            className={`relative  drop-shadow-[0_35px_35px_rgba(0,0,0,0.55)]  w-[300px]  transition ease-in-out duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        <div className="absolute w-full h-screen bg-black bg-opacity-30"></div>
        <video
          autoPlay
          muted
          loop
          className="object-cover w-screen h-screen mx-auto "
          title="Embedded video"
        >
          <source src="./assets/videos/Background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <Image src={bg} className='object-cover w-full h-screen ' /> */}
        {/* <Iphone /> */}
      </div>
    </div>
  )
}

export default Home
