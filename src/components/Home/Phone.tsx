import React from 'react'
import Iphone from '../ThreeJsModels/Iphone'
import appStore from '@/public/assets/appstore.png'
import Image from 'next/image'
import blur from '@/public/assets/bbblurry.svg'
interface Props {
  // define your props here
}

const Phone: React.FC<Props> = (props) => {
  return (
    <div className="relative flex flex-row h-screen mx-auto">
      <div className="rounded-full  absolute  -left-80 top-1/2 -translate-y-1/2 border border-secondary w-80 h-80 bg-secondary bg-opacity-90 shadow-[0_0px_500px_300px_rgba(255,16,83,1.000)]"></div>

      <div className="w-full xl:w-1/2">
        <Iphone />
      </div>
      <div className="absolute z-10 flex flex-col items-center justify-center w-full text-center -translate-y-1/2 top-1/2 xl:absolute">
        <h1 className="w-[400px] mr-auto mb-10 mx-auto text-4xl xl:text-5xl font-semibold text-white  xl:w-[500px] shadow-black text-shadow-lg">
          Herodus mobile app coming soon!
        </h1>
        <Image
          src={appStore}
          alt="appstore"
          className="w-40 drop-shadow-2xl xl:w-60"
        />
      </div>
    </div>
  )
}

export default Phone
