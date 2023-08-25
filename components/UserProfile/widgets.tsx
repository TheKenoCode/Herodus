import React from 'react'
// Components and models
import GreekHelmet from '../ThreeJsModels/GreekHelmet'
import RomanBuildingModel from '../ThreeJsModels/JapaneseBuilding'

// Chart imports
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  // define your props here
}

const Widgets: React.FC<Props> = (props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:px-20 sm:px-10 py-4 lg:px-4 xl:px-20 ">
      <h2 className="mb-4 text-xl font-bold text-white">Widgets</h2>

      <div className="relative w-full px-4 pb-4 bg-primary rounded-3xl">
        <h1 className="p-4 text-2xl font-semibold text-white">
          My NFT <span className="text-lg text-secondary">-coming soon</span>
        </h1>
        <div className="bg-[#00000036] rounded-3xl relative  overflow-hidden">
          <GreekHelmet height={'300px'} />
          <div className=" z-10 relative flex w-full justify-between p-4 text-sm md:text-lg opacity-75   text-white bg-[#00000052]">
            <span>Found: Greece</span>
            <span>Culture: Greek</span>
            <span>Date: 1200BC</span>
          </div>
        </div>
      </div>

      <div className="relative w-full px-4 pb-4 bg-primary rounded-3xl">
        <h1 className="p-4  text-2xl font-semibold text-white">My Ancestry</h1>
        <Pie
          data={data}
          height="200px"
          width="200px"
          className=""
          options={options}
        />
      </div>

      <iframe
        src="https://open.spotify.com/embed/playlist/2Wpqrjr0P5XFK9MRcFlCGq?utm_source=generator&theme=0"
        width="100%"
        className=""
        height="400"
        frameBorder="0"
        allowFullScreen="true"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>

      <div className="bg-[#b81845] w-full h-[200px] rounded-3xl"></div>
    </div>
  )
}

export default Widgets
// Chart Data
const data = {
  labels: ['Goths', 'Scythians', 'Gauls', 'Roman', 'Illyrian', 'bos'],
  datasets: [
    {
      data: [20, 15, 30, 25, 10, 10, 10, 10, 10, 10], // Example data percentages
      backgroundColor: [
        '#FF6384',
        '#D54A6A',
        '#36A2EB',
        '#1F4C7A',
        '#FFCE56',
        '#D4AC0D',
        '#FF5733',
        '#C44100',
        '#33FF57',
        '#1F8B4C',
      ],
    },
  ],
}

//Chart options
const options = {
  plugins: {
    legend: {
      labels: {
        color: 'white',
        font: {
          size: 18, // Adjust this value to your desired font size
        },
      },
    },
  },
}
