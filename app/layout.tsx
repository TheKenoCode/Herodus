'use client'
// components/Layout.tsx
import React, { useState } from 'react'
import Navbar from '../components/Layout/NavBar'
import Footer from '../components/Layout/Footer'
import { NextAuthProvider } from './Providers'
import './globals.css'
import { store, persistor } from '../redux/store'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { PersistGate } from 'redux-persist/integration/react'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

import { Provider } from 'react-redux'
import { signIn, signOut } from '../redux/slices/authSlice'
import ComingSoon from '../components/ComingSoon'
const underConstruction = true
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>Herodus - History Meets The Future</title>
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NextAuthProvider>
              {underConstruction ? (
                <ComingSoon />
              ) : (
                <>
                  <Navbar />
                  {children}
                  <Footer />
                </>
              )}
            </NextAuthProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
