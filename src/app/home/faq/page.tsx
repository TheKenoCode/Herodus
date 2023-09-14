'use client'
import { useState } from 'react'
import { BiDownArrow, BiUpArrow } from 'react-icons/bi'

const FAQ: React.FC<Props> = (props) => {
  const [openQuestion, setOpenQuestion] = useState(null)
  const toggleAnswer = (index) => {
    if (index === openQuestion) {
      setOpenQuestion(!openQuestion)
    } else {
      setOpenQuestion(index)
    }
  }

  return (
    <section className="py-20 bg-blackBG pt-44">
      <div className="container px-4 mx-auto xl:w-[70%] xl:mx-auto">
        <h2 className="mb-12 text-4xl font-semibold text-center text-gray-300">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-gray-200 xl:w-3/4 xl:mx-auto">
          {questions.map((item, index) => (
            <div
              key={index}
              className="p-4 transition-all duration-200 rounded shadow hover:bg-opacity-50 hover:bg-black"
            >
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-2xl font-semibold text-secondary">
                  {item.question}
                </h3>
                <span
                  className="material-icons"
                  onClick={() => toggleAnswer(index)}
                >
                  {index === openQuestion ? <BiUpArrow /> : <BiDownArrow />}
                </span>
              </div>
              {index === openQuestion && <p>{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
const questions = [
  {
    question: '1. What is Herodus all about?',
    answer:
      'Herodus is a revolutionary social network focusing on history, genetics, linguistics, and archaeology. Our platform enables users to explore historical events, analyze artifacts, delve into genetic connections, and participate in cutting-edge discussions. Herodus is where history meets the future.',
  },
  {
    question: '2. Who is Herodus for?',
    answer:
      'Herodus is designed for professional historians, archaeologists, teachers, students, and enthusiasts alike. Whether you are conducting research or just fascinated by the tapestry of human history, Herodus offers something for everyone.',
  },
  {
    question: '3. How does Herodus integrate with the Metaverse and NFTs?',
    answer:
      "At Herodus, we're at the forefront of integrating historical and archaeological content with the digital age. Users can explore virtual reconstructions of historical sites in the Metaverse, and we offer exclusive NFT artifacts, giving history buffs a chance to own a piece of the past in the digital realm.",
  },
  {
    question: '4. Is there a mobile app for Herodus?',
    answer: 'Not yet, but we are working on it! Thank you for your patience.',
  },
  {
    question: '5. How can I contribute to Herodus or share my findings?',
    answer:
      'Herodus has a robust community platform where members can share their findings, write articles, or participate in discussions. We value contributions from our community and encourage active participation to enrich the platform.',
  },
  {
    question: '6. How does Herodus ensure the accuracy of its content?',
    answer:
      'Content integrity is paramount to us. All submissions and articles undergo a rigorous review process by our team of historians and professionals to ensure accuracy and authenticity.',
  },
  {
    question: '7. How do I get started with Herodus?',
    answer:
      "Getting started is easy! Simply sign up on our platform, and you'll be guided through an intuitive onboarding process. From there, you can start exploring historical events, join discussions, or even dive into the Metaverse reconstructions of famous historical sites.",
  },
  {
    question: '8. Can I collaborate with others on Herodus?',
    answer:
      'Absolutely! Herodus is built on the idea of community. You can join existing projects, collaborate on research, or start your own discussions. We encourage group explorations and collaborative learning.',
  },
  {
    question: '9. How secure is my data with Herodus?',
    answer:
      'We prioritize your data security. Herodus employs state-of-the-art encryption and security protocols to ensure that your personal information and research data remain confidential. We never sell or share your data with third parties.',
  },
  {
    question:
      '10. What makes Herodus different from other historical platforms?',
    answer:
      'Herodus stands out by fusing traditional historical exploration with modern technology. From diving into genetic connections to navigating historical sites in the Metaverse, Herodus offers a unique, immersive experience that no other platform provides.',
  },
]
