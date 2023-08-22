import React from 'react'

interface Props {
  // define your props here
}

const FAQ: React.FC<Props> = (props) => {
  return (
    <section className="py-20 bg-primary pt-44">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-4xl font-semibold text-center text-gray-300">
          Frequently Asked Questions
        </h2>
        <div className="space-y-10 text-gray-200">
          <div>
            <h3 className="text-2xl font-semibold">
              1. What is Herodus all about?
            </h3>
            <p className="">
              Herodus is a revolutionary social network focusing on history,
              genetics, linguistics, and archaeology. Our platform enables users
              to explore historical events, analyze artifacts, delve into
              genetic connections, and participate in cutting-edge discussions.
              Herodus is where history meets the future.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">2. Who is Herodus for?</h3>
            <p>
              Herodus is designed for professional historians, archaeologists,
              teachers, students, and enthusiasts alike. Whether you are
              conducting research or just fascinated by the tapestry of human
              history, Herodus offers something for everyone.
            </p>
          </div>
          {/* Add other questions here following the same pattern */}
        </div>
        {/* You can add a contact form or a call to action button here if needed */}
      </div>
    </section>
  )
}

export default FAQ
