import Image from 'next/image'
import React from 'react'
import ReadMore from '@/public/assets/ReadMoreButton.png'
interface Props {
  // define your props here
}

const ButtonRed: React.FC<Props> = ({ buttonImage }) => {
  return (
    <>
      <Image
        src={buttonImage}
        className="w-[150px] hover:scale-110 transition duration-500 ease-in-out drop-shadow-[0_15px_10px_rgba(0,0,0,0.5)]"
        alt="ReadMore"
      />
    </>
  )
}

export default ButtonRed
