/** @format */

import React from 'react'

const About: React.FC = () => {
  return (
    <div className="text-white bg-primary ">
      <section className="text-center   p-5 bg-home-hero-bg bg-center bg-no-repeat py-[250px] bg-cover h-full flex   justify-center items-center">
        <div className="container p-5 m-auto bg-black border-2 bg-opacity-70 border-third h-max rounded-3xl">
          <h1 className="mb-4 text-2xl font-bold md:text-4xl">
            What is Herodus?
          </h1>
          <p className="mb-4 md:text-xl md:pt-6 text-start md:px-8">
            Herodus isn't just another social network. It's a vibrant community
            built by and for historians, where the past is brought to life in
            breathtaking detail. In the world of Herodus, every event, every
            artifact, and every personal story becomes part of a shared
            historical tapestry, making history not only accessible but also
            engaging.
          </p>
          <p className="m-auto mb-4 md:text-xl md:pt-6 text-start md:px-8">
            At Herodus, we believe in the power of stories - stories of
            individuals, civilizations, and cultures that have shaped the world
            we live in today. We offer a dynamic platform where historians,
            students, and history enthusiasts can create, share, and explore
            historical narratives, uncovering the fascinating connections that
            weave our past together.
          </p>
          <p className="m-auto mb-4 md:text-xl md:pt-6 text-start md:px-8">
            With our innovative features like the HaploExplorer, Historical
            Artifact Recognition, and our unique timeline visualization, Herodus
            is revolutionizing the way we interact with history. These features
            allow users to delve into their genetic roots, identify historical
            artifacts using AI, and stroll through the annals of history with
            ease.
          </p>
          <p className="m-auto mb-4 md:text-xl md:pt-6 text-start md:px-8">
            Looking towards the future, Herodus is not just embracing the
            digital revolution; we're helping shape it. We're pioneering the
            integration of history with cutting-edge technologies such as
            Non-Fungible Tokens (NFTs), our very own cryptocurrency, and the
            burgeoning realm of the metaverse. We envision a future where
            history is not only read and written, but also experienced in
            immersive, interactive digital environments.
          </p>
          <p className="m-auto mb-4 md:text-xl md:pt-6 text-start md:px-8">
            Embark on a journey of discovery, delve into the rich tapestry of
            our shared heritage, and chronicle your own unique narrative on
            Herodus. Explore the past like never before and become part of a
            global community that values learning, exploration, and the stories
            that make us who we are.
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
