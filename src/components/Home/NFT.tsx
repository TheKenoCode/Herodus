import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// External libraries and utilities
import { useSpring, animated } from 'react-spring'

// Local imports and assets
import registerButton from '@/public/assets/registerButton.png'
import GreekBuilding from '@/components/ThreeJsModels/GreekBuilding'
import KingsHand from '@/components/ThreeJsModels/KingsHand'
import Horse from '@/components/ThreeJsModels/Horse'
import Helmet from '@/components/ThreeJsModels/Helmet'
import ButtonRed from '../ButtonRed'

const NFT: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('Horse')
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const modelRef = useRef<HTMLDivElement>(null)
  const modelRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentModelRef = modelRef.current
    const currentModelRef2 = modelRef2.current

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        } else {
          // Optional: set isVisible to false if you want to unload the model when not visible
          // setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Adjust if needed
      }
    )

    if (currentModelRef) {
      observer.observe(currentModelRef)
    }
    if (currentModelRef2) {
      observer.observe(currentModelRef2)
    }
    return () => {
      if (currentModelRef) {
        observer.unobserve(currentModelRef)
      }
      if (currentModelRef2) {
        observer.unobserve(currentModelRef2)
      }
    }
  }, [])

  return (
    <section className="relative py-20 mx-auto xl:container">
      {/* NFTS Section */}
      <h1 className="mb-4 text-4xl tracking-widest text-center text-secondary font-Chakra">
        NFTs & VR
      </h1>
      <div className="w-[250px] mx-auto border-secondary border-2"></div>

      <div className="relative mx-auto mt-20 overflow-hidden shadow-2xl rounded-3xl shadow-black">
        <div className="relative grid flex-col-reverse items-start grid-cols-1 xl:gap-2 grid-flow-col-reverse lg:grid-cols-2">
          <div
            className="bg-black bg-opacity-50 h-[400px] relative order-2 w-full overflow-hidden rounded-lg lg:order-1 "
            ref={modelRef}
          >
            {isVisible && (
              <>
                {activeComponent === 'Horse' && <Horse />}
                {activeComponent === 'KingsHand' && <KingsHand />}
                {activeComponent === 'Mexico' && <Helmet />}
              </>
            )}
            <div className="bg-black mb-4 flex rounded-3xl overflow-hidden absolute left-1/2 transform -translate-x-1/2 shadow-2xl shadow-black bg-opacity-50 bottom-0 mx-auto w-[400px] h-10">
              <button
                className={`h-full w-full hover:bg-gray-700 bg-gray-700 bg-opacity-50 ${
                  activeComponent === 'Horse' ? 'bg-gray-800' : 'bg-gray-700'
                }`}
                onClick={() => setActiveComponent('Horse')}
              >
                1
              </button>
              <button
                className={`h-full w-full hover:bg-gray-700 bg-gray-700 bg-opacity-50 ${
                  activeComponent === 'KingsHand'
                    ? 'bg-gray-800'
                    : 'bg-gray-700'
                }`}
                onClick={() => setActiveComponent('KingsHand')}
              >
                2
              </button>
              <button
                className={`h-full w-full hover:bg-gray-700 bg-gray-700 bg-opacity-50 ${
                  activeComponent === 'Mexico' ? 'bg-gray-800' : 'bg-gray-700'
                }`}
                onClick={() => setActiveComponent('Mexico')}
              >
                3
              </button>
            </div>
          </div>

          {/* Museum VR Section */}
          <div className="relative order-1 w-full h-full px-4 py-4 text-transparent bg-primary lg:order-2 xl:my-auto ">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex flex-col space-x-4">
                <h3 className="mb-4 ml-4 text-3xl font-semibold text-secondary animate-type">
                  History Meets the Future
                </h3>
                <h4 className="text-lg text-gray-200">
                  Dive into a unique blend of past and future as Herodus
                  presents its exclusive NFT collection. Each token represents a
                  digital artifact, merging the wonders of ancient civilizations
                  with cutting-edge blockchain technology. Own a piece of
                  history, immortalized forever on the blockchain. Experience
                  the past like never before and be a part of history's next
                  chapter.
                </h4>
              </div>

              {/* Links Section */}
              <div className="flex justify-between mt-20 xl:w-full">
                <Link href="/auth/register">
                  <ButtonRed buttonImage={registerButton} />
                </Link>
                <Link href="/home/nft" className="my-auto">
                  <span className="text-xl xl:text-2xl text-third">
                    Learn More
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 mx-auto ">
        {/* Virtual Journey Section */}
        <div className="grid items-start  grid-cols-1 overflow-hidden shadow-2xl rounded-3xl xl:gap-4 backdrop-blur-lg shadow-black lg:grid-cols-2">
          <div className="flex flex-col justify-between w-full h-[420px] px-8 py-4 my-auto bg-primary backdrop-blur-sm">
            <div className="flex flex-col">
              <h3 className="mb-2 text-3xl font-semibold text-secondary animate-type">
                Embark on a Virtual Journey to Diverse Historical Worlds
              </h3>
              <p className="mt-4 mb-4 text-lg leading-relaxed text-gray-300">
                Wander the bustling streets of Ancient Rome, as chariots clatter
                and orators declaim. Find tranquility amidst the serene,
                blossoming gardens of the Tang Dynasty, with fragrant petals
                perfuming the air. As you journey, transcend the limitations of
                traditional museums. With our VR-enhanced spaces, historical
                artifacts aren't just displayed – they're contextualized in
                their living, breathing worlds.
              </p>
            </div>

            <div className="flex justify-between mt-20">
              <Link href="/auth/register">
                <ButtonRed buttonImage={registerButton} />
              </Link>
              <Link href="/home/nft" className="my-auto">
                <span className="text-xl xl:text-2xl text-third">
                  Learn More
                </span>
              </Link>
            </div>
          </div>

          {/* Roman Building Model */}
          <div
            className="relative w-full h-full  rounded-2xl bg-black bg-opacity-50  "
            ref={modelRef2}
          >
            {isVisible && <GreekBuilding />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NFT
