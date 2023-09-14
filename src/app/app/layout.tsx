// React client directive
'use client'
import { useEffect } from 'react'

// Component imports
import SideBar from '@/components/userLayout/SideBar'
import MobileNav from '@/components/userLayout/MobileNav'
import MobileAppBar from '@/components/userLayout/MobileAppBar'
import Widgets from '@/components/userLayout/widgets'

// Next.js and Redux imports
import { usePathname, useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { signIn, signOut, useSession } from 'next-auth/react'
import { RootState } from '@/lib/redux/store'
import { fetchAllUsers } from '@/lib/redux/slices/userSlice'

interface AppLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, params }) => {
  // Redux state selectors
  const auth = useSelector((state: RootState) => state.auth) as AuthState
  const userId = auth?.user?.id
  const users = useSelector((state: any) => state.user.allUsers)
  const user = users.find((u: any) => u._id === userId)
  const isLoggedIn = auth?.isAuthenticated

  // Next.js hooks
  const { status, data: session } = useSession()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    // Fetch all users when the component mounts.
    dispatch(fetchAllUsers())
  }, [dispatch])
  return (
    <section className="justify-center w-full h-auto md:flex md:h-auto bg-blackBG">
      {/* Sidebar with navigation links */}
      <SideBar
        dispatch={dispatch}
        isLoggedIn={isLoggedIn}
        user={user}
        router={router}
      />

      {/* Mobile navigation component */}
      <MobileNav
        dispatch={dispatch}
        router={router}
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        user={user}
      />

      {/* Main content area */}
      <div className="p-0 m-0 md:border-x min-w-min border-grayBorder">
        {children}
      </div>

      {/* Mobile app bar */}
      <MobileAppBar router={router} pathname={pathname} user={user} />

      {/* Additional widgets or functionalities */}
      <Widgets />
    </section>
  )
}

export default AppLayout
