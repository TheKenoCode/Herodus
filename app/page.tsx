/** @format */
'use client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
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
        <main className="bg-center bg-no-repeat bg-cover bg-home-hero-bg h-[80vh]">
          <div className="relative flex flex-col items-center justify-center h-[80vh] p-5  text-center backdrop-brightness-75 lg:flex-row">
            <div className="z-20 mt-40  sm:mt-[500px] lg:mt-0 lg:w-1/5">
              <AnimatedText
                className="md:text-6xl z-20 text-5xl leading-normal text-center lg:text-start  md:w-[550px] w-full lg:w-[700px] mx-auto "
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
              <div className="flex flex-col lg:flex-row lg:w-[730px] xl:w-[730px] ">
                <AnimatedText
                  className="z-20 w-full text-4xl leading-normal text-center lg:text-6xl lg:text-start "
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
                  Unearth Your
                </AnimatedText>
                <TypeAnimation
                  sequence={[
                    'History', // Types 'One'
                    2000, // Waits 1s
                    'Legacy', // Deletes 'One' and types 'Two'
                    2000, // Waits 2s
                    'Heritage',
                    2000, // Types 'Three' without deleting 'Two'
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  style={{ display: 'inline-block' }}
                  className="w-full lg:mt-[4px] lg:text-6xl text-4xl font-semibold  text-secondary lg:text-start"
                />
              </div>
            </div>
            <div className="relative z-20 lg:right-0 full ">
              {/* <Image
                  src={heroImg}
                  className="w-[500px] z-20 mx-auto drop-shadow-before_focus hover:scale-110 hover:drop-shadow-after_focus"
                  alt=""
                  priority={true}
                />
                <Image
                  src={heroGif}
                  className="w-[250px] z-20 mx-auto absolute top-[50px] left-[50px]"
                  alt=""
                  priority={true}/> */}
              <Image
                src={heroCard}
                className="w-[800px] sm:w-[600px] lg:w-[800px] relative  top-32 lg:top-32 sm:top-10 lg:left-48 transition-hover duration-300 ease-in-out hover:drop-shadow-[0_15px_15px_rgba(211,44,255,0.5)]   herocard"
                alt=""
                priority={true}
              />
            </div>
          </div>
        </main>

        <section className=" container mx-auto py-20 pt-[300px] lg:pt-[100px] sm:pt-[500px] full ">
          <h1 className="mb-20 text-6xl tracking-widest text-center lg:ml-10 lg:text-start text-secondary font-Chakra">
            Features
          </h1>
          <div className="container grid grid-cols-1 mx-auto lg:grid-cols-1 xl:grid-cols-3 gap-x-12">
            <div className="relative -mb-36 lg:col-span-1 xl:col-span-1">
              <Image
                src={cardImg1}
                className="w-full lg:w-[600px] xl:w-full mx-auto transition-hover duration-300 ease-in-out hover:drop-shadow-[0_15px_15px_rgba(211,44,255,0.5)]"
                alt=""
                priority={true}
              />
              <div className="relative lg:w-[600px]  xl:w-[400px] mx-auto lg:px-0">
                <Image
                  src={cardBottom}
                  alt=""
                  className="w-full hover:drop-shadow-[0_15px_5px_rgba(221,68,216,0.9)] relative -top-28 mx-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
                  priority={true}
                />
                <div className=" pt-4 relative -top-[300px] mx-auto">
                  <span className="ml-20 text-2xl font-semibold text-secondary font-Montserrat">
                    Social History
                  </span>
                  <p className="text-lg  text-gray-300  w-full px-8 md:w-[400px] mt-4 font-Raleway">
                    Dive into the social media for history enthusiasts. Connect
                    with like-minded individuals
                  </p>
                </div>
              </div>
            </div>

            <div className="relative -mb-32 lg:col-span-1 xl:col-span-1">
              <Image
                src={cardImg2}
                className="w-full lg:w-[600px] xl:w-full mx-auto transition-hover duration-300 ease-in-out hover:drop-shadow-[0_15px_15px_rgba(211,44,255,0.5)]"
                alt=""
                priority={true}
              />
              <div className="relative lg:w-[600px]  xl:w-[400px] mx-auto lg:px-0">
                <Image
                  src={cardBottom}
                  alt=""
                  className="w-full hover:drop-shadow-[0_15px_5px_rgba(221,68,216,0.9)] relative -top-28 mx-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
                  priority={true}
                />
                <div className=" pt-4 relative -top-[300px] mx-auto">
                  <span className="ml-20 text-2xl font-semibold text-secondary font-Montserrat">
                    HaploExplorer
                  </span>
                  <p className="text-lg  text-gray-300  w-full px-8 md:w-[400px] mt-4 font-Raleway">
                    Trace back your roots. Input your haplogroup information to
                    connect your past with the present
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto lg:col-span-1 lg:justify-self-center xl:col-span-1">
              <Image
                src={cardImg3}
                className="w-full lg:w-[600px] xl:w-full mx-auto transition-hover duration-300 ease-in-out hover:drop-shadow-[0_15px_15px_rgba(211,44,255,0.5)]"
                alt=""
                priority={true}
              />
              <div className="relative lg:w-[600px]  xl:w-[400px] mx-auto lg:px-0">
                <Image
                  src={cardBottom}
                  alt=""
                  className="w-full hover:drop-shadow-[0_15px_5px_rgba(221,68,216,0.9)] relative -top-28 mx-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]"
                  priority={true}
                />
                <div className=" pt-4 relative -top-[300px] mx-auto">
                  <span className="ml-20 text-2xl font-semibold text-secondary font-Montserrat">
                    Artifact Recognition
                  </span>
                  <p className="text-lg  text-gray-300  w-full px-8 md:w-[400px] mt-4 font-Raleway">
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
