import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

// External libraries and utilities
import GreekBuilding from '@/components/ThreeJsModels/GreekBuilding';
import Helmet from '@/components/ThreeJsModels/Helmet';
import Horse from '@/components/ThreeJsModels/Horse';
import KingsHand from '@/components/ThreeJsModels/KingsHand';

// Local imports and assets
import registerButton from '@/public/assets/registerButton.png';

import ButtonRed from '../ButtonRed';

export default function NFT() {
  const [activeComponent, setActiveComponent] = useState<string>('Horse');
  const modelRef = useRef<HTMLDivElement>(null);
  const modelRef2 = useRef<HTMLDivElement>(null);

  const render3DModel = () => (
    <>
      {activeComponent === 'Horse' && <Horse />}
      {/* {activeComponent === 'KingsHand' && <KingsHand />}
          {activeComponent === 'Mexico' && <Helmet />} */}
      {/* <div className='bg-black mb-4 flex rounded-3xl overflow-hidden absolute left-1/2 transform -translate-x-1/2 shadow-2xl shadow-black bg-opacity-50 bottom-0 mx-auto w-[400px] h-10'>
            <button
              className={`h-full w-full hover:bg-gray-700 bg-gray-700 bg-opacity-50 $ text-white ${
                activeComponent === 'Horse' ? 'bg-gray-800' : 'bg-gray-700'
              }`}
              onClick={() => setActiveComponent('Horse')}
            >
              1
            </button>
            <button
              className={`h-full w-full hover:bg-gray-700 bg-gray-700 bg-opacity-50 text-white  ${
                activeComponent === 'KingsHand' ? 'bg-gray-800' : 'bg-gray-700'
              }`}
              onClick={() => setActiveComponent('KingsHand')}
            >
              2
            </button>
            <button
              className={`h-full w-full hover:bg-gray-700 bg-gray-700 bg-opacity-50 text-white  ${
                activeComponent === 'Mexico' ? 'bg-gray-800' : 'bg-gray-700'
              }`}
              onClick={() => setActiveComponent('Mexico')}
            >
              3
            </button>
          </div> */}
    </>
  );

  const renderButtons = () => (
    <div className='flex justify-between mt-10 px-4'>
      <Link href='/auth/register'>
        <ButtonRed buttonImage={registerButton} />
      </Link>
      <Link href='/home/nft'>
        <span className='text-xl xl:text-2xl text-third'>Learn More</span>
      </Link>
    </div>
  );

  const renderSection = (
    title: string,
    description: string,
    model: JSX.Element,
  ) => (
    <div className=' mx-auto isolate  overflow-hidden shadow-2xl rounded-3xl shadow-black border-grayBorder border w-full'>
      <div className='relative h-full  text-transparent bg-opacity-50 bg-primary xl:my-auto overflow-hidden pt-6 xl:pt-0'>
        <div className='bg-blur-class absolute -z-10 bg-opacity-40 w-full h-full bg-secondary'></div>
        <div className=' flex xl:px-8 xl:py-8 flex-col justify-between h-full '>
          <div className='flex flex-col space-x-4'>
            <h3 className='mb-4 ml-4 text-3xl font-semibold text-third'>
              {title}
            </h3>
            <h4 className='text-lg text-gray-200'>{description}</h4>
          </div>
          {renderButtons()}
          <div
            className='bg-black  bg-opacity-50 h-[400px]    w-full rounded-2xl overflow-hidden mt-10 isolate'
            ref={modelRef}
          >
            {model}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='relative py-20 px-4'>
      <div className='container mx-auto mb-10'>
        <h1 className='z-20 mb-4 text-2xl tracking-widest text-center text-secondary font-Chakra'>
          NFT's & Metaverse
        </h1>
        <div className='w-[250px]   mx-auto border-secondary border-2'></div>
      </div>
      <section className='relative z-20 mx-auto container'>
        {/* NFTS Section (No changes) */}
        {/* ... */}
        <div className='flex flex-col xl:flex-row gap-16 mx-auto '>
          {renderSection(
            'History Meets the Future',
            " Dive into a unique blend of past and future as Herodus presents its exclusive NFT collection. Each token represents a digital artifact, merging the wonders of ancient civilizations with cutting-edge blockchain  technology. Own a piece of history, immortalized forever  on the blockchain. Experience the past like never before  and be a part of history's next chapter.",
            render3DModel(),
          )}
          {renderSection(
            'Embark on a Virtual Journey to Diverse Historical Worlds',
            "Wander the bustling streets of Ancient Rome, as chariots clatter and orators declaim. Find tranquility amidst the serene, blossoming gardens of the Tang Dynasty, with fragrant petals perfuming the air. As you journey, transcend the limitations of traditional museums. With our VR-enhanced spaces, historical artifacts aren't just displayed – they're contextualized in their living, breathing worlds.",
            <div
              className='relative overflow-hidden  h-[400px] rounded-2xl bg-black bg-opacity-50'
              ref={modelRef2}
            >
              <GreekBuilding />
            </div>,
          )}
        </div>
      </section>
    </div>
  );
}
