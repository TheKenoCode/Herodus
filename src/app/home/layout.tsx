'use client'
// components/Layout.tsx
import React, { useState } from 'react'
import Navbar from '@/components/Layout/NavBar'
import Footer from '@/components/Layout/Footer'

interface HomeLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children, params }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
export default HomeLayout
