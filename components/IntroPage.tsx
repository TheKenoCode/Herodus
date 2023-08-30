'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import GreekHelmet from './ThreeJsModels/GreekHelmet'
import GreekHelmetCopy from './ThreeJsModels/GreekHelmetCopy'
import Image from 'next/image'
import herodus from '../public/assets/logo.png'
import { TypeAnimation } from 'react-type-animation'
import JapaneseBuildingcopy from './ThreeJsModels/JapaneseBuildingcopy'
interface Props {
  // define your props here
}
function ModelAsset(props) {
  return <h1>hi</h1>
}

const IntroPage: React.FC<Props> = ({ setUnderConstruction }) => {
  return (
    <div className="h-screen bg-black w-full flex flex-col justify-center items-center">
      {/* <div className="h-screen w-screen absolute z-10 opacity-30 bg-black"></div> */}
      <div className="h-screen w-screen opacity-80">
        <GreekHelmetCopy height={'100%'} />
      </div>

      <div
        className={`absolute comingSoon   bg-opacity-20 transform-all duration-500 ease-in-out   drop-shadow-lg  pb-10 rounded-3xl  z-20  flex flex-col justify-center items-center`}
      >
        <Image src={herodus} className=" w-80 text-4xl  comingSoon" />
        <button
          onClick={() => {
            setUnderConstruction(false)
          }}
          className="text-3xl text-white border-secondary border-2 w-[200px] py-2 rounded-full hover:bg-secondary transition-all transform duration-300 ease-in"
        >
          Enter
        </button>
      </div>
    </div>
  )
}

export default IntroPage
