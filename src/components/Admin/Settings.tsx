import React, { useState } from 'react'

interface Props {
  // define your props here if necessary
}

const Settings: React.FC<Props> = (props) => {
  const [adminName, setAdminName] = useState('Admin Name')
  const [adminEmail, setAdminEmail] = useState('admin@example.com')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handlePasswordChange = () => {
    // Handle the password change logic here
    console.log('Password change requested')
  }

  return (
    <div className="h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">Admin Settings</h1>

      {/* Security Settings */}
      <div className="p-6 mb-6 bg-white rounded shadow">
        <h2 className="mb-4 text-xl font-bold">Security Settings</h2>
        <label className="block mb-2">Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Confirm New Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          onClick={handlePasswordChange}
          className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Change Password
        </button>

        {/* Example: Enable two-factor authentication */}
        <div className="flex items-center mt-8 mb-4">
          <input type="checkbox" id="twoFactorAuth" className="mr-2" />
          <label htmlFor="twoFactorAuth">
            Enable Two-Factor Authentication
          </label>
        </div>
      </div>

      {/* Other settings sections can be added similarly... */}
    </div>
  )
}

export default Settings
