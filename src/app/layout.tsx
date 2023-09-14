'use client'
// components/Layout.tsx
import React, { useState } from 'react'
import Navbar from '../components/Layout/NavBar'
import Footer from '../components/Layout/Footer'
import { NextAuthProvider } from './Providers'
import './globals.css'
import { store, persistor } from '@/lib/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ComingSoon from '@/components/ComingSoon'
import IntroPage from '@/components/IntroPage'
import { usePathname } from 'next/navigation'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { useParams } from 'next/navigation'
import { Roboto } from 'next/font/google'
import NavBar from '../components/Layout/NavBar'
import { Analytics } from '@vercel/analytics/react'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
TimeAgo.addLocale(en)
TimeAgo.addDefaultLocale(en)

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    id: string
  }
}) {
  const { id } = useParams()

  const [underConstruction, setUnderConstruction] = useState(false)
  const pathname = usePathname()
  const noLayout = [`/`]

  return (
    <html lang="en" className={roboto.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Herodus - History Meets The Future</title>
      </head>
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NextAuthProvider>
              {underConstruction ? (
                <>
                  {/* <ComingSoon /> */}
                  <IntroPage setUnderConstruction={setUnderConstruction} />
                </>
              ) : (
                <>
                  {noLayout.includes(pathname) ? <NavBar /> : null}
                  {children}
                  <Analytics />
                  {noLayout.includes(pathname) ? <Footer /> : null}
                </>
              )}
            </NextAuthProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
