'use client'
// components/Layout.tsx
import React, { useState } from 'react'
import Navbar from '@/components/Layout/NavBar'
import Footer from '@/components/Layout/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Herodus - History Meets The Future</title>
      </head>
      <body suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
