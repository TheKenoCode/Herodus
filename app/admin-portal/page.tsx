'use client'

// External and third-party imports
import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Internal imports
// import AdminDashboard from '../../components/Admin/AdminDashboard'
import { RootState } from '../../redux/store'
import notFound from '../../public/assets/404.png'
const AdminDashboard = dynamic(
  () => import('../../components/Admin/AdminDashboard'),
  { ssr: false }
)
interface Props {
  // Define your props here if any
}

const AdminPortal: React.FC<Props> = () => {
  // Redux state and hooks
  const auth = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  // Ensure user is authenticated and has the 'admin' role

  return (
    <>
      {!auth?.user || auth?.user?.role !== 'admin' ? (
        <div className="flex flex-col items-center justify-center h-screen pt-32">
          <Image src={notFound} alt="Permission Denied" />
          <p className="mt-5 text-2xl text-center text-white">
            You don't have permission to view this page. Please login with an
            administrative account.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-32 py-1 mt-10 text-white uppercase transition duration-500 transform border-2 rounded-full border-secondary hover:scale-125 hover:bg-secondary"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="pt-20">
          <AdminDashboard />
        </div>
      )}
    </>
  )
}

export default AdminPortal
