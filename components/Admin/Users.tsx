// --- React and related imports ---
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// --- Redux imports ---
import { fetchAllUsers } from '../../redux/slices/userSlice'

const Users: React.FC = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')

  // Selectors to extract data from the Redux store
  const users = useSelector((state: any) => state.user.allUsers)
  const status = useSelector((state: any) => state.user.status)
  const error = useSelector((state: any) => state.user.error)

  // Effect to fetch all users when the component mounts
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">User Management</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full p-2 mb-6 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {status === 'loading' && <p>Loading users...</p>}
      {status === 'succeeded' && (
        <table className="min-w-full table-auto">
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={index % 2 ? 'bg-gray-300' : 'bg-gray-100'}
              >
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user._id}</td>
                <td className="px-4 py-2 border">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {status === 'failed' && (
        <p className="mt-6 text-red-600">Error: {error}</p>
      )}
    </div>
  )
}

export default Users
