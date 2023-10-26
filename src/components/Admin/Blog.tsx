// --- React and related imports ---
import axios from 'axios';
import React, { useState } from 'react';
import * as ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
// --- Third-party libraries and CSS ---

export default function Blog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in local storage.'); // eslint-disable-line
      setFeedback('Error: No token found in local storage.');
      return;
    }

    axios
      .post(
        `/api/blogposts`,
        { title, content },
        { headers: { authToken: `Bearer ${token}` } }
      )
      .then(() => {
        setTitle('');
        setContent('');
        setFeedback('Post created successfully!');
      })
      .catch((error) => {
        console.error('Error creating post:', error); // eslint-disable-line
        setFeedback(`Error: ${error.message}`);
      });
  };
  const modules = {
    toolbar: [
      [{ color: ['#abc123'] }], // add this line for font and background colors

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
  };

  return (
    <div className='container h-screen px-8 text-white bg-blackBG'>
      <h1 className='mb-6 text-2xl font-bold '>Create a New Blog Post</h1>

      <form onSubmit={handleSubmit} className='container space-y-4'>
        <div>
          <label htmlFor='title' className='block mb-2 text-lg font-bold'>
            Title:
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-2 text-black border rounded'
            required
          />
        </div>

        <div className='text-white'>
          <label htmlFor='content' className='block mb-2 text-lg font-bold'>
            Content:
          </label>
          <ReactQuill
            theme='bubble'
            value={content}
            onChange={setContent}
            modules={modules}
            className='border my-quill-editor text-xl bg-white text-black rounded-3xl min-h-[500px] p-2'
          />
        </div>

        <div>
          <button
            type='submit'
            className='p-2 text-white bg-purple-500 rounded hover:bg-purple-600'
          >
            Create Blog Post
          </button>
        </div>
      </form>

      {feedback && <div className='mt-4 text-center'>{feedback}</div>}
    </div>
  );
}
