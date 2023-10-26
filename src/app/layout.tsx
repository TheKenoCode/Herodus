'use client';
// components/Layout.tsx
import { Analytics } from '@vercel/analytics/react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { Inter, Roboto_Mono } from 'next/font/google';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './globals.css';

import { persistor, store } from '@/lib/redux/store';

// import IntroPage from '@/components/IntroPage';
import { NextAuthProvider } from './Providers';
import Footer from '../components/Home/Layout/Footer';
import NavBar from '../components/Home/Layout/NavBar';
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});
TimeAgo.addLocale(en);
TimeAgo.addDefaultLocale(en);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [underConstruction] = useState(false);
  const pathname = usePathname();
  const noLayout = [`/`];

  return (
    <html lang='en' className={` ${roboto_mono.variable}`}>
      <head>
        <link rel='icon' href='/favicon.ico' />
        <title>Herodus - History Meets The Future</title>
      </head>
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NextAuthProvider>
              {underConstruction ? (
                <>
                  {/* <ComingSoon /> */}
                  {/* <IntroPage setUnderConstruction={setUnderConstruction} /> */}
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
  );
}
