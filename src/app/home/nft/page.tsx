/** @format */
'use client';
import Helmet from '@/components/ThreeJsModels/Helmet';
import Horse from '@/components/ThreeJsModels/Horse';
import KingsHand from '@/components/ThreeJsModels/KingsHand';
import logo from '@/public/assets/logo-head.png';
import Image from 'next/image';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { useSelector } from 'react-redux';

export default function NFT() {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <div className='flex h-screen text-white'>
      {/* Main Content */}
      <main className='flex-1 p-2 text-white bg-blackBG'>
        {/* Navigation Bar */}
        <nav className='flex items-center justify-between px-4 mb-8'>
          {/* Greeting */}
          <div className='hidden text-lg xl:block'>
            Hello, {auth?.user?.name}
          </div>

          {/* Right section */}
          <div className='flex items-center justify-between w-full xl:w-max xl:justify-normal '>
            <input
              type='search'
              placeholder='Search'
              className='p-2 mr-4 text-white bg-gray-700 border-none rounded-md shadow-md outline-none'
            />
            <div className='flex'>
              <div className='mr-4 cursor-pointer'>🔔</div>
              <Image
                width={40}
                height={40}
                src={auth?.user?.imageUrl}
                alt='User Avatar'
                className='w-8 h-8 bg-black rounded-full'
              />
            </div>
          </div>
        </nav>
        {/* Heading Component */}
        <div className='flex flex-col items-center justify-between px-4 mb-8 xl:flex-row'>
          {/* Wider Box */}
          <div className='flex-1 p-10  xl:mr-4 min-h-[350px] flex justify-between flex-col bg-gradient-to-r from-secondary to-purple-600 opacity-80  rounded-xl shadow-md'>
            <h2 className='text-3xl md:text-4xl leading-normal		 mb-8 font-semibold w-[90%] md:w-[90%] lg:w-[60%]'>
              Artifacts not only represent the outward appearance of things, but
              their inward significance.
            </h2>
            <div className='flex space-x-4'>
              <button className='px-6 py-3 text-lg font-medium text-black bg-white rounded-md '>
                Explore Now
              </button>
              <button className='px-6 py-3 text-lg font-medium border-2 border-white rounded-md shadow-md'>
                Create Now
              </button>
            </div>
          </div>
          {/* Smaller Box */}
          <div className='w-1/4  min-h-[350px] hidden xl:block  bg-gradient-to-l from-secondary to-purple-600 p-6 rounded-xl shadow-lg'>
            <div className='flex flex-col items-start justify-between'>
              <div>
                <h3 className='mb-1 text-2xl font-semibold'>Current Bid</h3>
                <p className='mt-2 text-4xl font-bold '>5.00 ETH</p>
                <p className='mt-2 text-base'>$11,735.25</p>
              </div>
              <div>
                <p className='my-4 mb-1 text-xl'>Auction ends in</p>
                <div className='flex space-x-2'>
                  <div className='flex flex-col items-center'>
                    <span className='text-4xl font-bold text-white '>16</span>
                    <span className='text-white'>Hours</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='text-4xl font-bold text-white '>30</span>
                    <span className='text-white'>Minutes</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='text-4xl font-bold text-white '>60</span>
                    <span className='text-white'>Seconds</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex mt-6 space-x-4'>
              <button className='w-1/2 px-4 py-2 text-lg font-medium text-gray-800 bg-white rounded-lg'>
                Bid Now
              </button>
              <button className='w-1/2 px-4 py-2 text-lg font-medium text-white border-2 border-white rounded-lg shadow-md'>
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Special item */}
        <div className='px-4'>
          <h1 className='mb-8 text-xl font-semibold text-white'>
            Special Items
          </h1>
          {/* buttons */}
          <div className='flex justify-between'>
            <div className='grid grid-cols-3 grid-rows-2 md:grid-rows-1 sm:grid-cols-4 md:grid-cols-4 gap-y-4 gap-x-4'>
              <button className='w-32 py-2 rounded-lg bg-gradient-to-l from-secondary to-purple-600'>
                Collections
              </button>
              <button className='w-32 px-6 py-2 rounded-lg bg-purpleBG'>
                Art
              </button>
              <button className='w-32 px-6 py-2 rounded-lg bg-purpleBG'>
                Music
              </button>
              <button className='w-32 px-6 py-2 rounded-lg bg-purpleBG'>
                Game
              </button>
            </div>
            {/* arrows */}
            <div className='hidden space-x-4 md:flex '>
              <BsArrowLeftCircle className='text-3xl text-purple-400 opacity-50 ' />
              <BsArrowRightCircle className='text-3xl text-purple-400' />
            </div>
          </div>
          {/* cards */}
          <div className='flex flex-wrap justify-center mt-8 space-x-4 space-y-4 xl:justify-start'>
            <div className='p-6  bg-purpleBG rounded-xl w-[400px] h-[400px]'>
              <div className='overflow-hidden h-[250px] rounded-xl'>
                <Horse />
              </div>
              <div className='flex justify-between mt-8'>
                <div className='flex flex-col'>
                  <h1 className='mb-2 text-xl font-semibold text-white'>
                    Lorem ipsum
                  </h1>
                  <span className='text-third'>165.01 ETH</span>
                </div>
                <button className='px-4 py-2 uppercase rounded-lg text-semibold bg-gradient-to-l from-secondary to-purple-600'>
                  bid
                </button>
              </div>
            </div>

            <div className='p-6  bg-purpleBG rounded-xl w-[400px] '>
              <div className='overflow-hidden h-[250px] rounded-xl'>
                <KingsHand />
              </div>
              <div className='flex justify-between mt-8'>
                <div className='flex flex-col'>
                  <h1 className='mb-2 text-xl font-semibold text-white'>
                    Lorem ipsum
                  </h1>
                  <span className='text-third'>165.01 ETH</span>
                </div>
                <button className='px-4 py-2 uppercase rounded-lg text-semibold bg-gradient-to-l from-secondary to-purple-600'>
                  bid
                </button>
              </div>
            </div>

            <div className='p-6  bg-purpleBG rounded-xl w-[400px] '>
              <div className='overflow-hidden h-[250px] rounded-xl'>
                <Helmet />
              </div>
              <div className='flex justify-between mt-8'>
                <div className='flex flex-col'>
                  <h1 className='mb-2 text-xl font-semibold text-white'>
                    Lorem ipsum
                  </h1>
                  <span className='text-third'>165.01 ETH</span>
                </div>
                <button className='px-4 py-2 uppercase rounded-lg text-semibold bg-gradient-to-l from-secondary to-purple-600'>
                  bid
                </button>
              </div>
            </div>

            <div className='p-6  bg-purpleBG rounded-xl w-[400px]'>
              <div className='overflow-hidden h-[250px] rounded-xl'>
                <Horse />
              </div>
              <div className='flex justify-between mt-8'>
                <div className='flex flex-col'>
                  <h1 className='mb-2 text-xl font-semibold text-white'>
                    Lorem ipsum
                  </h1>
                  <span className='text-third'>165.01 ETH</span>
                </div>
                <button className='px-4 py-2 uppercase rounded-lg text-semibold bg-gradient-to-l from-secondary to-purple-600'>
                  bid
                </button>
              </div>
            </div>

            <div className='p-6  bg-purpleBG rounded-xl w-[400px] '>
              <div className='overflow-hidden h-[250px] rounded-xl'>
                <KingsHand />
              </div>
              <div className='flex justify-between mt-8'>
                <div className='flex flex-col'>
                  <h1 className='mb-2 text-xl font-semibold text-white'>
                    Lorem ipsum
                  </h1>
                  <span className='text-third'>165.01 ETH</span>
                </div>
                <button className='px-4 py-2 uppercase rounded-lg text-semibold bg-gradient-to-l from-secondary to-purple-600'>
                  bid
                </button>
              </div>
            </div>

            <div className='p-6  bg-purpleBG rounded-xl w-[400px] '>
              <div className='overflow-hidden h-[250px] rounded-xl'>
                <Helmet />
              </div>
              <div className='flex justify-between mt-8'>
                <div className='flex flex-col'>
                  <h1 className='mb-2 text-xl font-semibold text-white'>
                    Lorem ipsum
                  </h1>
                  <span className='text-third'>165.01 ETH</span>
                </div>
                <button className='px-4 py-2 uppercase rounded-lg text-semibold bg-gradient-to-l from-secondary to-purple-600'>
                  bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
