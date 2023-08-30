import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// External libraries and utilities
import { useSpring, animated } from 'react-spring'
import { Canvas } from '@react-three/fiber'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { motion } from 'framer-motion'
import { Html, useProgress } from '@react-three/drei'

// Local imports and assets
import GreekHelmet from '../ThreeJsModels/GreekBuilding'
import img1 from '../../public/assets/giphy.gif'
import romeGif from '../../public/assets/rome.gif'
import registerButton from '../../public/assets/registerButton.png'
import dash from '../../public/assets/Group 225.png'
import GreekBuilding from '../ThreeJsModels/GreekBuilding'
import loadingModel from '../../public/assets/loadingmodel.gif'
import KingsHand from '../ThreeJsModels/KingsHand'
import Horse from '../ThreeJsModels/Horse'
import Mexico from '../ThreeJsModels/Mexico'

const NFT: React.FC = () => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const [activeComponent, setActiveComponent] = useState('Horse')

  return (
    <div className="">
      <section className=" xl:container relative  py-20 mx-auto">
        {/* Header Section */}
        <h1 className=" mb-4 text-4xl  tracking-widest text-center lg:ml-10 xl:text-start text-secondary font-Chakra">
          NFTs & VR
        </h1>
        <div className="w-[300px]  mb-20 mx-auto xl:mx-0 border-secondary border-2"></div>

        <div className=" relative  mx-auto rounded-3xl overflow-hidden">
          <div className="grid relative lg:gap-2 flex-col-reverse items-start grid-cols-1  grid-flow-col-reverse md:grid-cols-2">
            <div className="bg-black bg-opacity-50  h-[500px] relative order-2 w-full  overflow-hidden rounded-lg md:order-1 ">
              {activeComponent === 'Horse' && <Horse />}
              {activeComponent === 'KingsHand' && <KingsHand />}
              {activeComponent === 'Mexico' && <Mexico />}

              <div className="bg-black mb-4 flex rounded-3xl overflow-hidden absolute left-1/2 transform -translate-x-1/2 shadow-2xl shadow-black bg-opacity-50 bottom-0 mx-auto w-[400px] h-14">
                <button
                  className={`h-full w-full hover:bg-gray-700  bg-gray-700 bg-opacity-50
                  ${activeComponent === 'Horse' ? 'bg-gray-800' : 'bg-gray-700'}
                  `}
                  onClick={() => setActiveComponent('Horse')}
                >
                  1
                </button>
                <button
                  className={`h-full w-full hover:bg-gray-700  bg-gray-700 bg-opacity-50
                  ${
                    activeComponent === 'KingsHand'
                      ? 'bg-gray-800'
                      : 'bg-gray-700'
                  }
                  `}
                  onClick={() => setActiveComponent('KingsHand')}
                >
                  2
                </button>
                <button
                  className={`h-full w-full hover:bg-gray-700  bg-gray-700 bg-opacity-50
                 ${activeComponent === 'Mexico' ? 'bg-gray-800' : 'bg-gray-700'}
                 `}
                  onClick={() => setActiveComponent('Mexico')}
                >
                  3
                </button>
              </div>
            </div>

            {/* History Information Section */}
            <div className="relative order-1 bg-black bg-opacity-50  backdrop-blur-sm w-full h-full py-4 px-4  text-transparent  md:order-2 lg:my-auto ">
              <div className="relative h-full z-10   flex flex-col justify-between">
                <div className="flex flex-col  space-x-4">
                  <h3 className="mb-4 ml-4 text-3xl font-semibold text-secondary animate-type">
                    History Meets the Future
                  </h3>
                  <h4 className="text-lg text-gray-200">
                    Dive into a unique blend of past and future as Herodus
                    presents its exclusive NFT collection. Each token represents
                    a digital artifact, merging the wonders of ancient
                    civilizations with cutting-edge blockchain technology. Own a
                    piece of history, immortalized forever on the blockchain.
                    Experience the past like never before and be a part of
                    history's next chapter. Feel free to adjust any element to
                    better fit your platform's tone and style.
                  </h4>
                </div>

                {/* Links Section */}
                <div className="flex lg:w-full justify-between mt-20">
                  <Link href="/register">
                    <Image
                      src={registerButton}
                      className="w-[150px] lg:w-[90%] hover:scale-110 transition duration-500 ease-in-out drop-shadow-[0_15px_10px_rgba(0,0,0,0.5)]"
                      alt="register"
                    />
                  </Link>
                  <Link href="/nft" className="my-auto">
                    <span className="text-xl lg:text-2xl text-third">
                      Learn More
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="  mx-auto py-24 ">
          {/* Virtual Journey Section */}
          <div className="grid rounded-3xl overflow-hidden items-start grid-cols-1  lg:gap-4 backdrop-blur-lg shadow-black rounded-2xl md:grid-cols-2">
            <div className="w-full h-full flex flex-col justify-between px-8 my-auto bg-black bg-opacity-50  backdrop-blur-sm py-4">
              <div className="flex flex-col">
                <h3 className="mb-2 text-3xl font-semibold text-secondary animate-type">
                  Embark on a Virtual Journey to Diverse Historical Worlds
                </h3>
                <p className="mt-4 mb-4 text-lg leading-relaxed text-gray-300">
                  Wander the bustling streets of Ancient Rome, as chariots
                  clatter and orators declaim. Find tranquility amidst the
                  serene, blossoming gardens of the Tang Dynasty, with fragrant
                  petals perfuming the air. As you journey, transcend the
                  limitations of traditional museums. With our VR-enhanced
                  spaces, historical artifacts aren't just displayed – they're
                  contextualized in their living, breathing worlds.
                </p>
              </div>

              <div className="flex justify-between mt-20">
                <Link href="/register">
                  <Image
                    src={registerButton}
                    className="w-[150px] lg:w-[90%] hover:scale-110 transition duration-500 ease-in-out drop-shadow-[0_15px_10px_rgba(0,0,0,0.5)]"
                    alt="register"
                  />
                </Link>
                <Link href="/nft" className="my-auto">
                  <span className="text-xl lg:text-2xl text-third">
                    Learn More
                  </span>
                </Link>
              </div>
            </div>

            {/* Roman Building Model */}
            <div className="relative w-full h-[500px]  rounded-2xl bg-black bg-opacity-50  ">
              <GreekHelmet />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NFT
