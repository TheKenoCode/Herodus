import React from 'react'
interface Props {
  // define your props here
}

const Video: React.FC<Props> = (props) => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 pt-40 video-responsive">
      <h1 className="z-20 mb-4 text-4xl tracking-widest text-center text-secondary font-Chakra">
        What is Herodus?
      </h1>
      <div className="w-[250px] mb-10  mx-auto  border-secondary border-2"></div>

      <video
        width="950"
        height="480"
        controls
        autoPlay
        muted
        loop
        playsInline
        className="object-cover z-10  mx-auto rounded-3xl bg-gradient-to-r p-[6px] from-[#1dcee9] via-[#a14af3] to-[#ff1053]"
        title="Embedded video"
      >
        <source src="./assets/videos/Herodus-Video.m4v" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Video
