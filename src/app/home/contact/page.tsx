/** @format */
'use client'
import React, { useRef, useState, useEffect, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
interface Props {
  // define your props here
}

const Contact: React.FC<Props> = (props) => {
  const form = useRef<HTMLFormElement>(null)

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.current !== null) {
      emailjs
        .sendForm(
          'service_tggrrjp',
          'template_r0tlx6z',
          form.current,
          '_qJZpr-lCj6BHVfrt',
        )
        .then(
          (result) => {
            console.log(result.text)
            clear() // make sure that this function is defined in your code
          },
          (error) => {
            console.log(error.text)
          },
        )
    }
  }
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  })

  const clear = () => {
    setFormData({
      user_name: '',
      user_email: '',
      message: '',
    })
  }
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="text-white">
      <section className="h-full py-[250px] flex-col flex bg-home-hero-bg p-5 bg-center bg-no-repeat bg-cover justify-center items-center">
        <div className="bg-black bg-opacity-60 h-max w-full border-third border-2 lg:w-[800px] rounded-3xl shadow-lg transform hover:scale-105 transition-transform">
          <h1 className="p-5 text-4xl font-bold text-center">Contact Us</h1>
          <form
            className="flex flex-col justify-between p-8 m-auto"
            ref={form}
            onSubmit={sendEmail}
          >
            <label className="mb-2 text-xl font-semibold">Name</label>
            <input
              type="text"
              className="h-10 p-2 mb-5 text-black bg-white rounded outline-none focus:border-secondary transition-border"
              name="user_name"
              onChange={onChange}
            />
            <label className="mb-2 text-xl font-semibold">Email</label>
            <input
              type="email"
              className="h-10 p-2 mb-5 text-black bg-white rounded outline-none focus:border-secondary transition-border"
              name="user_email"
              onChange={onChange}
            />
            <label className="mb-2 text-xl font-semibold">Message</label>
            <textarea
              className="h-40 p-2 text-black bg-white rounded outline-none focus:border-secondary transition-border"
              name="message"
              onChange={onChange}
            />
            <input
              className="w-full py-2 mt-10 font-bold text-white uppercase transition-all transform border-none rounded cursor-pointer bg-secondary hover:scale-105"
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact
