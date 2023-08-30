// --- React and related imports ---
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// --- Third-party libraries and CSS ---
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// --- Redux imports ---
import { createPost } from '../../redux/slices/blogPostSlice'

interface Props {
  // define your props here if necessary
}

const Blog: React.FC<Props> = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [feedback, setFeedback] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem('authToken')
    if (!token) {
      console.error('No token found in local storage.')
      setFeedback('Error: No token found in local storage.')
      return
    }

    try {
      const response = await axios.post(
        `/api/blogposts`,
        { title, content },
        { headers: { authToken: `Bearer ${token}` } }
      )

      console.log('Post created:', response.data)

      setTitle('')
      setContent('')
      setAuthor('')
      setFeedback('Post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      setFeedback(`Error: ${error.message}`)
    }
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  return (
    <div className="h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">Create a New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 text-lg font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-2 text-lg font-bold">
            Content:
          </label>
          <ReactQuill value={content} onChange={setContent} modules={modules} />
        </div>

        <div>
          <button
            type="submit"
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Create Post
          </button>
        </div>
      </form>

      {feedback && <div className="mt-4 text-center">{feedback}</div>}
    </div>
  )
}

export default Blog
