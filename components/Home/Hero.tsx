'use client'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import Link from 'next/link'
import AnimatedText from 'react-animated-text-content'
import dynamic from 'next/dynamic'
import heroCard from '../../public/assets/herocard.png'
import Image from 'next/image'

const Hero: React.FC = () => {
  const AnimatedText = dynamic(() => import('react-animated-text-content'), {
    ssr: false,
  })

  return (
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
              <button className="cursor-pointer heroButton   w-[200px] mb-2 lg:mb-0 py-2 uppercase transform text-white hover:scale-110 transition duration-500  bg-secondary">
                Get Started
              </button>
            </Link>
            <Link href="/about">
              <button className="cursor-pointer heroButton -ml-10   w-[200px] mb-2 lg:mb-0 py-2 uppercase transform text-white hover:scale-110 transition duration-500  bg-third">
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
  )
}

export default Hero
