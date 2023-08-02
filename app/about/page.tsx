/** @format */

import React from 'react'

interface Props {
  // define your props here
}

const About: React.FC<Props> = (props) => {
  return (
    <div className="text-white bg-primary">
      <section className="text-center  p-5 bg-about-bg bg-center py-[250px] bg-cover h-full flex border-[#e6bc6a] border-t-4  justify-center items-center">
        <div className="bg-opacity-70 bg-black p-5 lg:w-1/2 m-auto border-[#e6bc6a] border-2 h-max rounded-3xl">
          <h1 className="mb-4 text-2xl font-bold md:text-4xl">
            What is Herodus?
          </h1>
          <p className="m-auto mb-4 md:text-md md:pt-6 ">
            Herodus is a modern social network, by historians for historians,
            that strives to create a space where ideas, stories and content can
            be shared and distributed with ease to a global audience. Herodus
            also aims to partake in the development of NFTs, our very own token
            & the metaverse. For information on our NFT project click here to
            learn more.
          </p>
          <div className="bg-secondary w-1/2 mx-auto h-[3px] my-10 "></div>
          <h1 className="mb-4 text-2xl font-bold md:text-4xl ">
            But im still confused!?
          </h1>
          <p className="m-auto mb-4 md:text-md md:py-6">
            No worries! We've got you covered with a FAQ page that will answer
            general and in depth questions about Herodus
          </p>
          <button className="px-6 py-2 transition duration-500 border-2 border-secondary md:text-2xl ease hover:scale-125 hover:bg-secondary">
            F.A.Q
          </button>
        </div>
      </section>
    </div>
  )
}

export default About
