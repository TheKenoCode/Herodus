import React from 'react'

function SideBarAvatarSkeleton() {
  return (
    <div class="lg:flex hidden items-center mt-4 shadow animate-pulse space-x-3 border p-2 rounded-full border-gray-700">
      <svg
        className="w-10 h-10 text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <div>
        <div className="h-2.5  rounded-full bg-gray-700 w-32 "></div>
      </div>
    </div>
  )
}

export default SideBarAvatarSkeleton
