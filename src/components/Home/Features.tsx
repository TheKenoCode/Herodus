import React from 'react'
import Image from 'next/image'
import cardImg1 from '@/public/assets/cards/card1.png'
import cardImg2 from '@/public/assets/cards/card2.png'
import cardImg3 from '@/public/assets/cards/card3.png'

interface Props {
  // define your props here
}

const Features: React.FC<Props> = (props) => {
  return (
    <section className="relative z-10 flex items-center justify-center py-20 mx-auto xl:h-screen ">
      <div>
        {/* Header Section */}
        <div className="container mx-auto">
          <h1 className="mb-4 text-4xl tracking-widest text-center text-secondary font-Chakra">
            Features
          </h1>
          <div className="w-[250px]   mx-auto border-secondary border-2"></div>
        </div>

        {/* Cards Section */}
        <div className="container flex flex-col mx-auto mt-20 xl:flex-row ">
          {/* First Card */}
          <div className="relative">
            <Image
              src={cardImg1}
              className="w-[450px] md:w-[500px] xl:w-full mx-auto transition-hover duration-300 ease-in-out drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] "
              alt="Card 1"
              priority={true}
            />
          </div>

          {/* Second Card */}
          <div className="relative my-10 xl:my-0">
            <Image
              src={cardImg2}
              className="w-[450px] md:w-[500px] xl:w-full mx-auto transition-hover duration-300 ease-in-out drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] "
              alt="Card 2"
              priority={true}
            />
          </div>

          {/* Third Card */}
          <div className="relative">
            <Image
              src={cardImg3}
              className="w-[450px] md:w-[500px] xl:w-full mx-auto transition-hover duration-300 ease-in-out drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] "
              alt="Card 3"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
