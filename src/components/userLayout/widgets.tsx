// Directive
'use client'

// React imports
import React from 'react'

// 3D Models
import GreekHelmet from '../ThreeJsModels/GreekBuilding'
import RomanBuildingModel from '../ThreeJsModels/JapaneseBuilding'
import Horse from '../ThreeJsModels/Horse'
import HorseWidget from '../ThreeJsModels/HorseWidget'

// Charting Tools
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  // Define your props here
}

const Widgets: React.FC<Props> = (props) => {
  // Render a collection of widgets including NFT display, Spotify playlist, and Pie Chart
  return (
    <div className="hidden pt-2 w-[400px] shadow-2xl lg:ml-4 ml-2 sticky h-screen top-0 overflow-y-auto xl:block">
      <div className="flex flex-col justify-between gap-4 sm:px-10 md:px-0">
        {/* NFT Display */}
        <div className="relative w-full px-4 pb-4 border bg-purpleBG rounded-3xl border-grayBorder">
          <h1 className="p-4 text-2xl font-semibold text-white">
            My NFT <span className="text-lg text-secondary">-coming soon</span>
          </h1>
          <div className="bg-[#00000036] rounded-3xl relative overflow-hidden">
            <HorseWidget />
          </div>
        </div>

        {/* Spotify Playlist */}
        <iframe
          src="https://open.spotify.com/embed/playlist/2Wpqrjr0P5XFK9MRcFlCGq?utm_source=generator&theme=0"
          width="100%"
          className="drop-shadow-lg "
          height="400"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        {/* Ancestry Pie Chart */}
        <div className="relative w-full h-full px-4 pb-8 border bg-purpleBG border-grayBorder rounded-3xl ">
          <h1 className="p-4 text-2xl font-semibold text-center text-white">
            My Ancestry
          </h1>
          <Pie
            data={data}
            height="100%"
            width="100%"
            className="w-full mt-6"
            options={options}
          />
        </div>
      </div>
    </div>
  )
}

export default Widgets

// Pie chart data and options
const data = {
  labels: ['Goths', 'Scythians', 'Gauls', 'Roman', 'Illyrian', 'bos'],
  datasets: [
    {
      label: '%',
      hoverOffset: 4,
      fill: false,
      data: [20, 15, 30, 25, 10, 10, 10, 10, 10, 10], // Example data percentages
      backgroundColor: [
        '#ff1c4c',
        '#ba2b4c',
        '#1586d2',
        '#193d62',
        '#ffba12',
        '#aa8a0a',
        '#f52b00',
        '#9d3400',
        '#00f52b',
        '#196f3d',
      ],
    },
  ],
}

//Chart options
const options = {
  maintainAspectRatio: true,

  plugins: {
    legend: {
      display: false,

      labels: {
        color: 'white',
        font: {
          size: 14, // Adjust this value to your desired font size
        },
      },
    },
  },
}
