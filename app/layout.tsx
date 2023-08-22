'use client'
// components/Layout.tsx
import React from 'react'
import Navbar from '../components/Layout/NavBar'
import Footer from '../components/Layout/Footer'
import { NextAuthProvider } from './Providers'
import './globals.css'
import { store, persistor } from '../redux/store'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux'
import { signIn, signOut } from '../redux/slices/authSlice'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NextAuthProvider>
              <Navbar />
              {children}
              <Footer />
            </NextAuthProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
