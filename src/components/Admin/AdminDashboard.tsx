'use client';

// --- React and related imports ---
import React, { useState } from 'react';
// --- Icons ---
import { RiCloseFill, RiMenuLine } from 'react-icons/ri';

// --- Component imports ---
import Blog from './Blog';
import Dashboard from './Dashboard';
import NFTs from './NFTs';
import Settings from './Settings';
import Users from './Users';

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('Dashboard');
  const [showSidebar, setShowSidebar] = useState(false); // Default to false for mobile screens

  return (
    <div className='relative z-20 flex flex-col w-full h-screen lg:flex-row bg-blackBG'>
      {/* Menu Icon (Visible on small and medium screens) */}
      <div
        className={` lg:hidden mt-4 ml-4  ${
          showSidebar ? ' invisible' : 'block'
        }`}
      >
        <RiMenuLine
          className='text-4xl cursor-pointer text-secondary'
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`transform z-20 absolute lg:relative h-full w-[300px] transition-transform ease-in-out duration-300 bg-primary overflow-hidden ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }  lg:translate-x-0 lg:w-64 lg:block`}
      >
        <div className='flex items-center justify-between'>
          <h1 className='py-4 pl-4 text-4xl text-center text-white'>
            Admin Portal
          </h1>
          <div
            className={`absolute right-0 lg:hidden top-4 z-10 ${
              showSidebar ? 'block' : 'hidden'
            }`}
          >
            <RiCloseFill
              className='relative ml-auto mr-4 text-4xl text-white cursor-pointer'
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex flex-col p-4 space-y-2 '>
          {['Dashboard', 'Users', 'Blog', 'NFTs', 'Settings'].map((tab) => (
            <a
              key={tab}
              href='#'
              onClick={() => {
                setSelectedTab(tab);
                setShowSidebar(false);
              }}
              className={`text-white p-2 rounded ${
                selectedTab === tab ? 'bg-secondary' : 'hover:bg-secondary'
              }`}
            >
              {tab}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-4 overflow-y-auto'>
        {selectedTab === 'Dashboard' && (
          <Dashboard setSelectedTab={setSelectedTab} />
        )}
        {selectedTab === 'Users' && <Users />}
        {selectedTab === 'Blog' && <Blog />}
        {selectedTab === 'NFTs' && <NFTs />}
        {selectedTab === 'Settings' && <Settings />}
      </div>
    </div>
  );
}
