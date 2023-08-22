/** @format */
'use client'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import nftGif from '../../public/assets/giphy.gif'
import Image from 'next/image'
import { particleParams } from '../../utils/particleConfig'
interface Props {
  // define your props here
}

const NFT: React.FC<Props> = (props) => {
  // const particlesInit = async (main: any) => {
  // 	await loadFull(main)
  // }
  return (
    <div>
      {/* <Particles
				className='absolute z-0 h-screen '
				params={particleParams}
				init={particlesInit}
			/> */}
      <section className="z-10 flex flex-col justify-center h-full py-32 bg-primary">
        <div className="z-10 flex flex-col items-center justify-center p-5">
          <h1 className="text-6xl font-bold text-center text-white">NFTs</h1>
          <Image
            priority={true}
            src={nftGif}
            className="z-10 m-auto "
            alt="s"
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
            className="mt-10 text-secondary"
          />
        </div>
      </section>
    </div>
  )
}

export default NFT
