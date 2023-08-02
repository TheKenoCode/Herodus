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
          '_qJZpr-lCj6BHVfrt'
        )
        .then(
          (result) => {
            console.log(result.text)
            clear() // make sure that this function is defined in your code
          },
          (error) => {
            console.log(error.text)
          }
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="text-white ">
      <section className="h-full py-[250px] flex-col flex  bg-contact-bg  p-5  bg-center bg-no-repeat bg-cover border-[#e6bc6a] border-t-4 justify-center items-center">
        <div className=" bg-black bg-opacity-60 h-max w-full border-[#e6bc6a] border-2 lg:w-[800px] rounded-3xl">
          <h1 className="p-5 text-4xl font-bold text-center">Contact us</h1>

          <form
            className="flex flex-col justify-between p-5 m-auto"
            ref={form}
            onSubmit={sendEmail}
          >
            <label className="mb-2 text-xl">Name</label>
            <input
              type="text"
              className="h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary"
              name="user_name"
              onChange={onChange}
              id=""
            />
            <label className="mb-2 text-xl">Email</label>
            <input
              type="email"
              className="h-10 mb-5 text-black outline outline-offset-2 focus:outline-secondary"
              name="user_email"
              onChange={onChange}
              id=""
            />
            <label className="mb-2 text-xl">Message</label>
            <textarea
              className="h-40 text-black outline outline-offset-2 focus:outline-secondary"
              name="message"
              onChange={onChange}
            />
            <input
              className="w-40 py-2 m-auto mt-10 font-bold uppercase transition duration-500 border-2 border-secondary hover:bg-secondary hover:scale-110 ease"
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
