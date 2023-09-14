import React from 'react'

interface Props {
  // define your props here
}

const Dashboard: React.FC<Props> = (props) => {
  return (
    <div className="h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>

      {/* Overview statistics */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded shadow">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <p className="text-sm text-gray-600">Total Posts</p>
          <p className="text-3xl font-bold">567</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <p className="text-sm text-gray-600">Total Comments</p>
          <p className="text-3xl font-bold">8,910</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-3xl font-bold">345</p>
        </div>
      </div>

      {/* Recent activity */}
      <div className="p-6 mb-8 bg-white rounded shadow">
        <h2 className="mb-4 text-xl font-bold">Recent Activity</h2>
        {/* Sample list of recent activities. Ideally, this would be dynamic and fetched from a server. */}
        <ul>
          <li className="mb-2">User John Doe created a new post.</li>
          <li className="mb-2">Jane Smith commented on a post.</li>
          <li className="mb-2">New user registration: Mark Twain.</li>
        </ul>
      </div>

      {/* Action buttons or quick links */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Create New Post
        </button>
        <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
          Manage Users
        </button>
      </div>

      {/* Add more components or information as needed */}
    </div>
  )
}

export default Dashboard
