/** @format */
'use client'
import type { NextPage } from 'next'
import Link from 'next/link'

import Head from 'next/head'
import Image from 'next/image'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { BiDna } from 'react-icons/bi'
import { PiUsersThreeDuotone } from 'react-icons/pi'
import { AiOutlineScan } from 'react-icons/ai'

// import AnimatedText from "react-animated-text-content"
import { TypeAnimation } from 'react-type-animation'
import dynamic from 'next/dynamic'
import heroImg from '../public/assets/heroimg.png'
import heroGif from '../public/assets/pixel-speech-bubble.gif'
import cardImg1 from '../public/assets/cards/card1.png'
import cardImg2 from '../public/assets/cards/card2.png'
import cardImg3 from '../public/assets/cards/card3.png'
import heroCard from '../public/assets/herocard.png'
import cardBottom from '../public/assets/cards/cardbottom.png'
import andMeLogo from '../public/assets/logos/23andMe_logo.svg.png'
import ancestryLogo from '../public/assets/logos/Ancestry-Logo.png'
import myHeritageLogo from '../public/assets/logos/myheritage-icon-2048x2048-5gjar2wh.png'
import zeus from '../public/assets/zeus.png'
import { particleParams } from '../utils/particleConfig'

const Home: NextPage = () => {
  //   const particlesInit = async (main: any) => {
  //     await loadFull(main)
  //   }

  const AnimatedText = dynamic(() => import('react-animated-text-content'), {
    ssr: false,
  })
  return (
    <>
      {/* <Particles
        className="absolute w-full h-[80vh]"
        params={particleParams}
        init={particlesInit}
      /> */}
      <div className="text-white bg-primary">
        <main className="h-full pt-20 bg-center bg-no-repeat bg-cover lg:pt-0 backdrop-brightness-75 bg-home-hero-bg">
          <div className="container relative flex flex-col items-center justify-center mx-auto text-center lg:flex-row">
            <div className="relative xl:pl-20 lg:text-start   z-20 lg:w-1/2 xl:w-[70%]   font-bold   pt-10 lg:pt-0 lg:h-[300px] text-center ">
              <AnimatedText
                className="z-20 leading-norma text-6xl lg:text-[5rem] pb-4"
                type="words" // animate words or chars
                animation={{
                  x: '200px',
                  y: '-20px',
                  scale: 1.1,
                  ease: 'ease-in-out',
                }}
                animationType="lights"
                interval={0.06}
                duration={0.8}
                tag="p"
                includeWhiteSpaces
                threshold={0.1}
                rootMargin="20%"
              >
                Herodus
              </AnimatedText>

              <div className="lg:h-[70px] xl:h-[50px]">
                <TypeAnimation
                  sequence={[
                    'Unearth Your History', // Types 'One'
                    2000, // Waits 1s
                    'Unearth Your Legacy', // Deletes 'One' and types 'Two'
                    2000, // Waits 2s
                    'Unearth Your Origins',
                    2000, // Types 'Three' without deleting 'Two'
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="text-4xl font-semibold md:text-5xl text-secondary "
                />
              </div>

              <p className="pt-20  mx-auto text-2xl font-normal w-[400px] md:w-[500px] lg:w-[400px] xl:mx-0">
                Explore. Discover. Share. A platform where history is alive and
                personal
              </p>
              <div className="flex justify-center mt-8 lg:justify-start">
                <Link href="/register">
                  <button className="cursor-pointer heroButton   w-[200px] mb-2 lg:mb-0 py-2 uppercase transform text-white hover:scale-125 transition duration-500  bg-secondary">
                    Get Started
                  </button>
                </Link>
                <Link href="/about">
                  <button className="cursor-pointer heroButton   w-[200px] mb-2 lg:mb-0 py-2 uppercase transform text-white hover:scale-125 transition duration-500  bg-secondary">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative z-20 w-full">
              <Image
                src={heroCard}
                className="w-full  top-32 mx-auto relative transition-hover duration-300 ease-in-out hover:drop-shadow-[0_15px_15px_rgba(211,44,255,0.5)]   herocard"
                alt=""
                priority={true}
              />
            </div>
          </div>
        </main>

        <section className="container h-full mx-auto pt-72 lg:pt-20 ">
          <h1 className="mb-20 text-6xl tracking-widest text-center lg:ml-10 lg:text-start text-secondary font-Chakra">
            Features
          </h1>
          <div className="container grid grid-cols-1 mx-auto xl:grid-cols-3 gap-x-8">
            <div className="relative -mb-48 lg:col-span-1 xl:col-span-1">
              <Image
                src={cardImg1}
                className="w-[600px] lg:w-[600px] xl:w-full mx-auto transition-hover duration-300 ease-in-out hover:drop-shadow-[0_15px_15px_rgba(211,44,255,0.5)]"
                alt=""
                priority={true}
              />
              <div className="relative px-8 mx-auto lg:px-0">
                <Image
                  src={cardBottom}
                  alt=""
                  className=" w-[450px] hover:drop-shadow-[0_15px_5px_rgba(221,68,216,0.9)] relative -top-28 mx-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
                  priority={true}
                />

                <div className="pt-2 w-[400px] relative -top-[300px] mx-auto">
                  <div className="absolute  flex justify-center my-auto right-0 w-24 h-24 text-black bg-secondary bottom-[100px] diamond">
                    <PiUsersThreeDuotone className="relative z-20 text-[3rem] black top-[20px]" />
                  </div>
                  <span className="pl-10 text-2xl font-semibold text-secondary font-Montserrat">
                    Social History
                  </span>
                  <p className="w-full px-2 mt-4 text-lg text-gray-300 font-Raleway ">
                    Dive into the social media for history enthusiasts. Connect
                    with like-minded individuals
                  </p>
                </div>
              </div>
            </div>

            <div className="relative -mb-48 lg:col-span-1 xl:col-span-1">
              <Image
                src={cardImg2}
                className="w-[600px] lg:w-[600px] xl:w-full mx-auto transition-hover duration-300 ease-in-out hover:drop-shadow-[0_15px_15px_rgba(211,44,255,0.5)]"
                alt=""
                priority={true}
              />
              <div className="relative px-8 mx-auto lg:px-0">
                <Image
                  src={cardBottom}
                  alt=""
                  className=" w-[450px] hover:drop-shadow-[0_15px_5px_rgba(221,68,216,0.9)] relative -top-28 mx-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
                  priority={true}
                />

                <div className="pt-2 w-[400px] relative -top-[300px] mx-auto">
                  <div className="absolute  flex justify-center my-auto right-0 w-24 h-24 text-black bg-secondary bottom-[100px] diamond">
                    <BiDna className="relative z-20 text-[3rem] black top-[20px]" />
                  </div>
                  <span className="pl-10 text-2xl font-semibold text-secondary font-Montserrat">
                    HaploExplorer
                  </span>
                  <p className="w-full px-2 mt-4 text-lg text-gray-300 font-Raleway ">
                    Trace back your roots. Input your haplogroup information to
                    connect your past with the present
                  </p>
                </div>
              </div>
            </div>

            <div className="relative -mb-52 lg:col-span-1 xl:col-span-1">
              <Image
                src={cardImg3}
                className="w-[600px] lg:w-[600px] xl:w-full mx-auto transition-hover duration-300 ease-in-out hover:drop-shadow-[0_15px_15px_rgba(211,44,255,0.5)]"
                alt=""
                priority={true}
              />
              <div className="relative px-8 mx-auto lg:px-0">
                <Image
                  src={cardBottom}
                  alt=""
                  className=" w-[450px] hover:drop-shadow-[0_15px_5px_rgba(221,68,216,0.9)] relative -top-28 mx-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
                  priority={true}
                />

                <div className="pt-2 w-[400px] relative -top-[300px] mx-auto">
                  <div className="absolute  flex justify-center my-auto right-0 w-24 h-24 text-black bg-secondary bottom-[100px] diamond">
                    <AiOutlineScan className="relative z-20 text-[3rem] black top-[20px]" />
                  </div>
                  <span className="pl-10 text-2xl font-semibold text-secondary font-Montserrat">
                    Artifact Recognition
                  </span>
                  <p className="w-full px-2 mt-4 text-lg text-gray-300 font-Raleway ">
                    Unearth secrets of the past. Use our AI-powered recognition
                    tool to identify & learn more about artifacts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home

const cards = [
  {
    header: 'Connect',
    text: 'Post, chat, and share with others!',
    cardImg: cardImg1,
  },
  { header: 'Play', text: 'Enter the metaverse & explore!', cardImg: cardImg2 },
  {
    header: 'Earn',
    text: 'Earn and unlock NFTs and tokens!',
    cardImg: cardImg3,
  },
]
