'use client';
// components/Layout.tsx
import React from 'react';

import Footer from '@/components/Home/Layout/Footer';
import Navbar from '@/components/Home/Layout/NavBar';
import { usePathname } from 'next/navigation';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const pathname = usePathname();
  const noLayout = [`/home/nft`];
  return (
    <>
      {noLayout.includes(pathname) ? null : <Navbar />}
      {children}
      {noLayout.includes(pathname) ? null : <Footer />}
    </>
  );
}
