import Link from 'next/link'
import React from 'react'
import footerLogo from '@/public/assets/logo.png'
import Image from 'next/image'

// Link groups for the footer
const exploreLinks = [
  { name: 'Home', link: '/home' },
  { name: 'Blog', link: '/home/blog' },
  { name: 'NFT', link: '/home/nft' },
]

const followLinks = [
  { name: 'Twitter', link: 'https://twitter.com/HerodusOfficial' },
  { name: 'Instagram', link: 'https://www.instagram.com/herodusofficial/' },
  {
    name: 'Youtube',
    link: 'https://www.youtube.com/@HerodusOfficial/featured',
  },
]

const botomLinks = [
  { name: 'Contact', link: '/home/contact' },
  { name: 'F.A.Q', link: '/home/faq' },
  { name: 'Cookies', link: '/home/cookies' },
  { name: 'Legal', link: '/home/legal' },
  { name: 'Privacy', link: '/home/privacy' },
]

const Footer: React.FC = () => {
  return (
    <div className="relative w-full text-white border-t border-grayBorder bg-blackBG">
      <footer className="py-10 border-t-[#3a3a3a74] border-b-[#3a3a3a74]">
        <div className="px-5 mx-auto ">
          <Image
            src={footerLogo}
            alt="footer logo"
            className="mx-auto mb-10 w-36 lg:mx-0"
          />

          <div className="flex mb-8 justify-between w-[200px] lg:w-full mx-auto lg:mx-0 lg:flex-col  ">
            <div className="text-center lg:flex lg:mb-2">
              <h3 className="mb-2 font-bold lg:mb-0 lg:mr-4">Explore</h3>
              <ul className="text-gray-400 flex flex-col lg:flex-row lg:w-[130px] justify-between ">
                {exploreLinks.map((item, index) => (
                  <Link href={item.link} key={index} className="">
                    <li key={index} className="mb-2">
                      <span className="my-auto transition-all duration-300 hover:text-third hover:underline">
                        {item.name}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="text-center lg:flex">
              <h3 className="mb-2 font-bold lg:mb-0 lg:mr-4">Follow</h3>
              <ul className="text-gray-400 justify-between lg:flex lg:w-[200px]">
                {followLinks.map((item, index) => (
                  <a href={item.link} key={index}>
                    <li key={index} className="mb-2">
                      <span className="transition-all duration-300 hover:text-third hover:underline">
                        {item.name}
                      </span>
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full h-1 mb-10 bg-third"></div>

          <ul className="flex justify-center mb-10 space-x-5 lg:justify-start">
            {botomLinks.map((item, index) => (
              <Link href={item.link} key={index}>
                <li key={index}>
                  <span className="transition-all duration-300 hover:text-third hover:underline">
                    {item.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>

          <p className="text-center lg:text-left">
            © 2022 Herodus, All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
