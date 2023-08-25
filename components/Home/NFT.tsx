import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// External libraries and utilities
import { useSpring, animated } from 'react-spring'
import { Canvas } from '@react-three/fiber'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { motion } from 'framer-motion'

// Local imports and assets
import { particleParams } from '../../utils/particleConfig'
import GreekHelmet from '../ThreeJsModels/GreekHelmet'
import RomanBuildingModel from '../ThreeJsModels/JapaneseBuilding'
import img1 from '../../public/assets/giphy.gif'
import romeGif from '../../public/assets/rome.gif'
import registerButton from '../../public/assets/registerButton.png'
import dash from '../../public/assets/Group 225.png'

const NFT: React.FC = () => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const particlesInit = async (main: any) => {
    await loadFull(main)
  }
  return (
    <div className="bg-top bg-no-repeat md:bg-center">
      <section className="container relative px-2 py-20 mx-auto">
        {/* Header Section */}
        <h1 className="mb-20 text-4xl tracking-widest text-center lg:ml-10 xl:text-start text-secondary font-Chakra">
          NFTs & Metaverse
        </h1>

        <div className="container p-4 mx-auto">
          {/* Greek Helmet Section */}
          <div className="grid flex-col-reverse items-start grid-cols-1 gap-4 grid-flow-col-reverse md:grid-cols-2">
            <div className="relative order-2 w-full h-auto overflow-hidden rounded-lg md:order-1 md:h-auto">
              <GreekHelmet height={'500px'} />
            </div>

            {/* History Information Section */}
            <div className="relative order-1 w-full px-4 text-transparent backdrop-blur-md rounded-2xl md:order-2 lg:my-auto bg-clip-text bg-gradient-to-r">
              <div className="relative z-10 pb-4 lg:pl-4 md:pr-12">
                <h3 className="mb-2 text-5xl font-semibold text-secondary animate-type">
                  History Meets the Future
                </h3>
                <ul className="mt-6 space-y-2">
                  <li className="py-2">
                    <div className="flex items-center space-x-4">
                      <h4 className="text-lg text-gray-200">
                        Imagine stepping into a vivid virtual reality to explore
                        ancient civilizations...
                        {/* Rest of the content here */}
                      </h4>
                    </div>
                  </li>
                </ul>
                {/* Links Section */}
                <div className="flex lg:w-[500px] justify-between mt-20">
                  <Link href="/register">
                    <Image
                      src={registerButton}
                      className="w-[150px] lg:w-[90%] hover:scale-110 transition duration-500 ease-in-out drop-shadow-[0_15px_10px_rgba(0,0,0,0.5)]"
                      alt="register"
                    />
                  </Link>
                  <Link href="/nft" className="my-auto">
                    <span className="text-xl lg:text-2xl text-third">
                      Learn More Here
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container p-4 mx-auto lg:py-24">
          {/* Virtual Journey Section */}
          <div className="grid items-start grid-cols-1 gap-4 backdrop-blur-lg shadow-black rounded-2xl md:grid-cols-2">
            <div className="w-full px-4 my-auto">
              <h3 className="mb-2 text-3xl font-semibold text-secondary animate-type">
                Embark on a Virtual Journey to Diverse Historical Worlds
              </h3>
              <p className="mt-4 mb-4 text-lg leading-relaxed text-gray-300">
                Brace yourself for an immersive digital adventure...
                {/* Rest of the content here */}
              </p>

              <div className="flex lg:w-[500px] justify-between mt-20">
                <Link href="/register">
                  <Image
                    src={registerButton}
                    className="w-[150px] lg:w-[90%] hover:scale-110 transition duration-500 ease-in-out drop-shadow-[0_15px_10px_rgba(0,0,0,0.5)]"
                    alt="register"
                  />
                </Link>
              </div>
            </div>

            {/* Roman Building Model */}
            <div className="relative w-full h-auto md:h-auto rounded-2xl">
              <RomanBuildingModel />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NFT

const NFT_Text = [
  {
    text: '',
  },
]
