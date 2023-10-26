// Directive
'use client';

// React imports
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
// Charting Tools
import { Pie } from 'react-chartjs-2';

import { SiEthereum } from 'react-icons/si';
// 3D Models
import HorseWidget from '../../ThreeJsModels/HorseWidget';
ChartJS.register(ArcElement, Tooltip, Legend);
interface User {
  _id: string;
  name: string;
  email: string;
  followers: string[];
  following: string[];
  bio: string;
  location: string;
  userLink: string;
  playlistLink: string;

  imageUrl: string;
  coverImage: string;
  YHaplogroup: string;
  MtHaplogroup: string;
  createdAt: string;
}
interface widgetsProps {
  user: User;
}
export default function Widgets({ user }: widgetsProps) {
  return (
    <div className='hidden pt-2 w-[400px] shadow-2xl lg:ml-4 ml-2 sticky h-screen top-0 overflow-y-auto xl:block'>
      <div className='flex flex-col justify-between gap-4 sm:px-10 md:px-0'>
        {/* Trending */}
        <div className='relative px-4 py-4 border bg-[#1c1c2d]  rounded-3xl border-grayBorder'>
          <h1 className='text-2xl font-semibold text-white '>
            What's trending
          </h1>
          <div className='flex flex-col gap-4 mt-4'>
            <div>
              <div>
                <span className='text-sm text-gray-400'>Archeology</span>
                <h1 className='text-base font-semibold text-white'>
                  #LostCities
                </h1>
                <span className='text-sm text-gray-400'>2,304 posts</span>
              </div>
            </div>
            <div>
              <span className='text-sm text-gray-400'>Africa</span>
              <h1 className='text-base font-semibold text-white'>
                #TribalTraditions
              </h1>
              <span className='text-sm text-gray-400'>2,304 posts</span>
            </div>
            <div>
              <span className='text-sm text-gray-400'>Genetics</span>
              <h1 className='text-base font-semibold text-white'>
                #MigrationEra
              </h1>
              <span className='text-sm text-gray-400'>2,304 posts</span>
            </div>
            <div>
              <span className='text-sm text-gray-400'>South America</span>
              <h1 className='text-base font-semibold text-white'>
                #WeLovePeru
              </h1>
              <span className='text-sm text-gray-400'>2,304 posts</span>
            </div>
            <div>
              <span className='text-sm text-gray-400'>News</span>
              <h1 className='text-base font-semibold text-white'>
                {' '}
                #GobekliTepe
              </h1>
              <span className='text-sm text-gray-400'>2,304 posts</span>
            </div>
          </div>
        </div>

        {/* NFT Display */}
        <div className='p-1 rounded-3xl'>
          <div className='relative w-full max-w-md mx-auto p-4 bg-[#1c1c2d]    rounded-3xl shadow-lg'>
            <div className='overflow-hidden border-2 rounded-3xl border-secondary'>
              <HorseWidget />
            </div>

            <div className='bg-[#202032] p-4 mt-2 relative overflow-hidden  rounded-3xl border border-grayBorder'>
              <h1 className='mb-4 text-2xl font-semibold text-white'>
                Horse of Hellas #1
              </h1>
              <p className='mt-4 text-white'>The collections of Hellas</p>
              <div className='flex items-center justify-between mt-4'>
                <div className='flex items-center space-x-2'>
                  <div className='p-1 text-xl rounded text-third'>
                    <SiEthereum />
                  </div>
                  <p className='text-white'>0.041 ETH</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spotify Playlist */}
        <iframe
          src={`https://open.spotify.com/embed/playlist/${user?.playlistLink}?`}
          width='100%'
          className='drop-shadow-lg '
          height='400'
          frameBorder='0'
          allowFullScreen={true}
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        ></iframe>

        {/* Ancestry Pie Chart */}
        {/* <div className='relative w-full h-full px-4 pb-8 border bg-purpleBG border-grayBorder rounded-3xl '>
          <h1 className='p-4 text-2xl font-semibold text-center text-white'>
            My Ancestry
          </h1>
          <Pie
            data={data}
            height='100%'
            width='100%'
            className='w-full mt-6'
            options={options}
          />
        </div> */}
      </div>
    </div>
  );
}

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
};

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
};
