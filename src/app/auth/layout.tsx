'use client';
// components/Layout.tsx
import React from 'react';

import Footer from '@/components/Home/Layout/Footer';
import Navbar from '@/components/Home/Layout/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' />
        <title>Herodus - History Meets The Future</title>
      </head>
      <body suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
