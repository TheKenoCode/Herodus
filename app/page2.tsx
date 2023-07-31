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
import cardImg1 from '../public/assets/icons8-connect-64.png'
import cardImg2 from '../public/assets/icons8-metaverse-64.png'
import cardImg3 from '../public/assets/icons8-metaverse3-64 (1).png'
import zeus from '../public/assets/zeus.png'
import { particleParams } from '../utils/particleConfig'

const Home: NextPage = () => {
  // const particlesInit = async (main: any) => {
  // 	await loadFull(main)
  // }

  const AnimatedText = dynamic(() => import('react-animated-text-content'), {
    ssr: false,
  })
  return (
    <>
      {/* <Particles
				className='absolute w-full h-full'
				params={particleParams}
				init={particlesInit}
			/> */}
      <div className="text-white bg-primary">
        <main className="">
          <div className="relative flex flex-col items-center justify-center h-screen p-5 overflow-hidden text-center lg:flex-row">
            <div className="z-20 px-2">
              <AnimatedText
                className="md:text-6xl z-20 text-3xl leading-normal   md:w-[550px] w-full lg:w-[700px] m-auto "
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
                Join Historians across the world & share your stories
              </AnimatedText>
              {/* <TypeAnimation
                sequence={[
                  'Sign up', // Types 'One'
                  2000, // Waits 1s
                  'Connect', // Deletes 'One' and types 'Two'
                  2000, // Waits 2s
                  'Record',
                  2000, // Types 'Three' without deleting 'Two'
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: '2em', display: 'inline-block' }}
                className="mt-10 text-secondary"
              /> */}
            </div>
            <div className="py-5 z-20 relative w-[350px] md:w-[600px] ">
              <Image
                src={heroImg}
                className="w-[500px] z-20 mx-auto drop-shadow-before_focus hover:scale-110 hover:drop-shadow-after_focus"
                alt=""
                priority={true}
              />
              <Image
                src={heroGif}
                className="w-[250px] z-20 mx-auto absolute top-[50px] left-[50px]"
                alt=""
                priority={true}
              />
              P
            </div>
          </div>

          <section className="bg-card-bg bg-cover border-[#e6bc6a] border-y-4 bg-fixed   bg-center">
            <div className="items-center md:flex p-5 border-[#e6bc6a]  bg-black  bg-opacity-70     text-center ">
              {cards.map((card, index) => {
                return (
                  <div
                    className=" z-10 transition duration-500 ease hover:scale-110 hover:bg-gradient-to-t rounded-[30px] 
               drop-shadow-2xl bg-gradient-to-b  from-secondary to-[#710624] w-48 md:w-60 md:h-60 m-auto my-5 py-3 px-5"
                    key={index}
                  >
                    <h1 className="text-xl font-bold md:text-2xl">
                      {card.header}
                    </h1>
                    <p className="mt-4 md:text-xl">{card.text}</p>
                    <Image
                      className="mx-auto mt-4 md:w-[100px]"
                      src={card.cardImg}
                      alt=""
                      priority={true}
                    />
                  </div>
                )
              })}
            </div>
          </section>

          <section className="bg-fixed bg-center md:bg-cover bg-home-bg-2">
            <div className=" text-center p-5 bg-black border-[#e6bc6a]  bg-opacity-70 ">
              <h1 className="text-3xl font-bold md:text-5xl">
                Contribute & decide
              </h1>
              <p className="my-10 md:text-2xl md:w-[600px] m-auto">
                With your support you can help us create a movement that will
                help educate and entertain millions of people world wide.
              </p>

              <Image
                priority={true}
                src={zeus}
                className="w-1/2 m-auto md:w-80"
                alt=""
              />
            </div>
          </section>
        </main>
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
