/** @format */
'use client'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import nftGif from '@/public/assets/giphy.gif'
import Image from 'next/image'
import { particleParams } from '@/lib/particleConfig'
interface Props {
  // define your props here
}

const Clubs: React.FC<Props> = (props) => {
  return (
    <div>
      <section className="z-10 flex flex-col justify-center h-full py-32 bg-blackBG">
        <div className="z-10 flex flex-col items-center justify-center p-5">
          <h1 className="text-3xl font-bold text-center text-white">Clubs</h1>
          <Image
            priority={true}
            src={nftGif}
            className="z-10 m-auto "
            alt="NFT gif"
          />
          <TypeAnimation
            sequence={[
              'UNDER CONSTRUCTION..',
              2000,
              'COMING SOON...',
              2000, // Types 'One'
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: '2em', display: 'inline-block' }}
            className="mt-4 text-secondary"
          />
        </div>
      </section>
    </div>
  )
}

export default Clubs
