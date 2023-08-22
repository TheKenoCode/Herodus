/** @format */

// components/Layout.tsx
import React from 'react'
import Navbar from './NavBar'
import Footer from './Footer'
import { NextAuthProvider } from '../../app/Providers'
import { useRouter } from 'next/navigation'

type Props = {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NextAuthProvider>
        <Navbar />
        {children}
        <Footer />
      </NextAuthProvider>
    </>
  )
}

export default Layout
