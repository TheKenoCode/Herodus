/** @format */

// components/Layout.tsx
import Link from 'next/link'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className="absolute w-full ">
      <footer>
        <div className="text-center py-10 border-[#3a3a3a74] bg-primary  border-y-2  .footer_bg  text-white">
          <h1 className="text-2xl font-bold text-center lg:text-start lg:ml-20 md:text-4xl">
            Herodus
          </h1>
          <div className="flex justify-between lg:flex-col px-20 py-10 md:w-[500px] lg:w-[600px] m-auto lg:m-0">
            <ul className="text-gray-400 flex flex-col lg:flex-row md:text-xl justify-between lg:w-[320px]">
              <li className="mb-2 font-bold text-white">Explore</li>
              {exploreLinks.map((exploreLinks, index) => {
                return (
                  <li className="mb-2 hover:text-third" key={index}>
                    <Link href={exploreLinks.link}>{exploreLinks.name}</Link>
                  </li>
                )
              })}
            </ul>

            <ul className="flex flex-col justify-between text-gray-400 lg:flex-row md:text-xl">
              <li className="mb-2 font-bold text-white">Follow</li>
              {followLinks.map((followLinks, index) => {
                return (
                  <li className="mb-2 hover:text-third" key={index}>
                    <Link href={followLinks.link}>{followLinks.name}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="w-full h-1 bg-third "></div>
          <ul className="flex justify-between px-5 py-5 md:w-[500px]  md:text-xl m-auto lg:m-0 lg:ml-14">
            {botomLinks.map((botomLinks, index) => {
              return (
                <li className="mb-2 hover:text-third" key={index}>
                  <Link href={botomLinks.link}>{botomLinks.name}</Link>
                </li>
              )
            })}
          </ul>
          <p className="text-center lg:text-start lg:ml-[70px]">
            © 2022 Herodus, All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
const followLinks = [
  { name: 'Twitter', link: '' },
  { name: 'Facebook', link: '' },
  { name: 'Instagram', link: '' },
  { name: 'Youtube', link: '' },
]
const exploreLinks = [
  { name: 'Home', link: '/' },
  { name: 'Blog', link: '/blog' },
  { name: 'NFT', link: '/nft' },
]
const botomLinks = [
  { name: 'Contact', link: '/contact' },
  { name: 'F.A.Q', link: '/faq' },
  { name: 'Cookies', link: '/cookies' },
  { name: 'Legal', link: '/legal' },
  { name: 'Privacy', link: '/privacy' },
]
