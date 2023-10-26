// 'use client';
// import Image from 'next/image';
// import React, { useEffect, useRef, useState } from 'react';
// import { TypeAnimation } from 'react-type-animation';

// import GreekHelmetCopy from './ThreeJsModels/GreekHelmetCopy';
// import JapaneseBuildingcopy from './ThreeJsModels/JapaneseBuildingcopy';
// import herodus from '../public/assets/logo.png';
// interface Props {
//   // define your props here
// }
// function ModelAsset(props) {
//   return <h1>hi</h1>;
// }

// const ComingSoon: React.FC<Props> = (props) => {
//   const [selectedTab, setSelectedTab] = useState('Greek');
//   const [isDragging, setIsDragging] = useState(true);
//   const divRef = useRef(null);
//   useEffect(() => {
//     // Handler for mousedown and touchstart events

//     const handleStart = (event) => {
//       // Check if the clicked element is outside the referenced div
//       if (!divRef.current.contains(event.target)) {
//         setIsDragging(false);
//       }
//     };
//     const handleEnd = (event) => {
//       // Check if the clicked element is outside the referenced div

//       setIsDragging(true);
//     };

//     // Add event listeners
//     window.addEventListener('mousedown', handleStart);
//     window.addEventListener('touchstart', handleStart);

//     window.addEventListener('mouseup', handleEnd);
//     window.addEventListener('touchend', handleEnd);

//     return () => {
//       // Cleanup - remove the event listeners when the component is unmounted
//       window.removeEventListener('mousedown', handleStart);
//       window.removeEventListener('touchstart', handleStart);

//       window.removeEventListener('mouseup', handleEnd);
//       window.removeEventListener('touchend', handleEnd);
//     };
//   }, []);
//   return (
//     <div className='flex flex-col items-center justify-center w-full h-screen bg-black'>
//       {/* <div className="absolute z-10 w-screen h-screen bg-black opacity-30"></div> */}
//       <div className='w-screen h-screen opacity-60'>
//         {selectedTab === 'Greek' && <GreekHelmetCopy height='100%' />}
//         {selectedTab === 'Roman' && <div>ss</div>}
//         {selectedTab === 'Egyptian' && <div>ss</div>}
//         {selectedTab === 'Japanese' && <JapaneseBuildingcopy height='100%' />}
//       </div>

//       <div
//         className={`absolute comingSoon ${
//           isDragging ? 'opacity-100' : 'opacity-0'
//         }   bg-opacity-20 transform-all duration-500 ease-in-out   drop-shadow-lg  pb-10 rounded-3xl  z-20  flex flex-col justify-center items-center`}
//       >
//         <Image
//           src={herodus}
//           alt='herodus'
//           className='text-4xl  w-80 comingSoon'
//         />
//         <TypeAnimation
//           sequence={[
//             'UNDER CONSTRUCTION',
//             2000,
//             'COMING SOON',
//             2000, // Types 'One'
//           ]}
//           wrapper='span'
//           cursor={true}
//           repeat={Infinity}
//           style={{ display: 'inline-block' }}
//           className='text-center md:text=2xl lg:text-3xl -mt-10 text-lg text-secondary font-bold comingSoon'
//         />
//         <p className='mt-10 mb-4 font-bold text-white uppercase 2xl'>
//           Select Model
//         </p>
//         <ul
//           ref={divRef}
//           class=' text-sm rounded-r-full overflow-hidden rounded-l-full  font-medium text-center text-gray-500 divide-x divide-gray-200 shadow flex dark:divide-gray-700 dark:text-gray-400'
//         >
//           {['Greek', 'Japanese'].map((tab, index) => (
//             <li class='w-[100px]  ' key={index}>
//               <a
//                 href='#'
//                 class={`inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50   focus:outline-none  ${
//                   selectedTab === tab
//                     ? 'dark:bg-gray-600 dark:text-white'
//                     : 'dark:bg-gray-800'
//                 }    `}
//                 onClick={() => {
//                   setSelectedTab(tab);
//                 }}
//                 aria-current='page'
//               >
//                 {tab}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ComingSoon;
