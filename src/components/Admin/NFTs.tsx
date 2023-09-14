'use state'
import React, { useState } from 'react'
import axios from 'axios'

const NFTs: React.FC = () => {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const API_URL = '/api/files/upload' // Adjust this if your endpoint URL is different.

  const onFileChange = (e) => {
    setFile(e.target.files[0])
    setUploadStatus('') // Reset upload status message
  }

  const onUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    console.log(file)

    try {
      const response = await axios.post(API_URL, formData)
      setUploadStatus(response.data.message)
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.response?.data || error.message}`)
    }
  }

  return (
    <div className="file-uploader">
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  )
}

export default NFTs
