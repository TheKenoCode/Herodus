import React from 'react';
interface PriceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
}
export default function Pricing() {
  return (
    <div className='relative z-50 py-20'>
      <div className='rounded-full   bg-blur-class absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  w-full container mx-auto h-[1700px] lg:h-[500px] bg-[#56022b] '></div>

      <section className='container relative  mx-auto z-10'>
        <div className='max-w-screen-xl px-4 mx-auto  xl:px-6 z-20'>
          <div className='container mx-auto mb-10'>
            <h1 className='z-20 mb-4 text-2xl tracking-widest text-center text-secondary font-Chakra'>
              Pricing
            </h1>
            <div className='w-[250px]   mx-auto border-secondary border-2'></div>
          </div>
          <div className='space-y-8 xl:grid xl:grid-cols-3 sm:gap-6 xl:gap-10 xl:space-y-0'>
            {/* Pricing Card - Explorer */}
            <PricingCard
              title='Explorer'
              description='Best option for new users to explore Herodus'
              price='$0'
              features={[
                'Access to basic community forums and discussions.',
                'View public articles and posts.',
                'Limited access to virtual historical tours (e.g., one tour per month).',
                'Basic genealogical search tools.',
              ]}
            />

            {/* Pricing Card - Historian */}
            <PricingCard
              title='Historian'
              description='Relevant for serious users who want more out of Herodus.'
              price='$9.99'
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
              title='Scholar'
              description='Best for academics and researchers'
              price='$19.99'
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
    </div>
  );
}
function PricingCard({ title, description, price, features }: PriceCardProps) {
  return (
    <div className='flex flex-col max-w-lg p-6 mx-auto text-center text-white shadow-2xl rounded-2xl shadow-black bg-primary xl:p-8 '>
      <h3 className='mb-4 text-4xl font-bold text-secondary'>{title}</h3>
      <p className='font-light text-gray-200 sm:text-lg '>{description}</p>
      <div className='flex items-baseline justify-center my-8'>
        <span className='mr-2 text-5xl font-extrabold text-secondary'>
          {price}
        </span>
        <span className='text-gray-100 '>/month</span>
      </div>
      <ul role='list' className='mb-8 space-y-4 text-left'>
        {features.map((feature) => (
          <li key={feature} className='flex items-center space-x-3'>
            {/* Icon */}
            <svg
              className='flex-shrink-0 w-8 h-8 text-secondary '
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='text-white'>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href='#'
        className='text-third mt-auto bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
      >
        Get started
      </a>
    </div>
  );
}
