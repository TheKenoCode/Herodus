import React from 'react'

interface Props {
  // define your props here
}

const Pricing: React.FC<Props> = (props) => {
  return (
    <section className=" container mx-auto">
      <h1 className=" mb-4 text-4xl  tracking-widest text-center lg:ml-10 xl:text-start text-secondary font-Chakra">
        Pricing
      </h1>
      <div className="w-[250px]  mb-20 mx-auto xl:mx-0 border-secondary border-2"></div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for Historians like you
          </h2>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* Pricing Card - Explorer */}
          <PricingCard
            title="Explorer"
            description="Best option for new users to explore Herodus"
            price="$0"
            features={[
              'Access to basic community forums and discussions.',
              'View public articles and posts.',
              'Limited access to virtual historical tours (e.g., one tour per month).',
              'Basic genealogical search tools.',
            ]}
          />

          {/* Pricing Card - Historian */}
          <PricingCard
            title="Historian"
            description="Relevant for serious users who want more out of Herodus."
            price="$9.99"
            features={[
              'All features from the Free Tier',
              'Unlimited access to virtual historical tours.',
              'Advanced genealogical search tools with historical context.',
              'Access to premium articles and research papers.',
              'Early access to new features and updates.',
              'Ad-free experience.',
            ]}
          />

          {/* Pricing Card - Enterprise */}
          <PricingCard
            title="Scholar"
            description="Best for academics and researchers"
            price="$19.99"
            features={[
              'All features from the Historian Tier.',
              'Personalized genealogical research assistance.',
              'Access to advanced virtual reality historical tours.',
              'Priority support.',
              'Collaborative tools for educators and researchers.',
              'Access to a digital archive of rare historical documents and exclusive research papers.',
            ]}
          />
        </div>
      </div>
    </section>
  )
}
function PricingCard({ title, description, price, features }) {
  return (
    <div className="flex   flex-col p-6 mx-auto max-w-lg text-center text-white  rounded-2xl border-secondary  shadow-black shadow-2xl bg-[#410f5a66]  xl:p-8  ">
      <h3 className="mb-4 text-4xl font-bold text-secondary">{title}</h3>
      <p className="font-light text-gray-200 sm:text-lg ">{description}</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold text-secondary">
          {price}
        </span>
        <span className="text-gray-100 ">/month</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature) => (
          <li key={feature} className="flex items-center space-x-3">
            {/* Icon */}
            <svg
              className="flex-shrink-0 w-8 h-8 text-secondary "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
      >
        Get started
      </a>
    </div>
  )
}
export default Pricing
