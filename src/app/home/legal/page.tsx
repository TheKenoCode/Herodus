import React from 'react';

export default function Legal() {
  return (
    <div className='py-20'>
      <div className='max-w-4xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg mt-12'>
        <h1 className='text-3xl font-semibold mb-4'>
          Terms of Service for Herodus
        </h1>

        <p className='text-gray-600'>
          Welcome to Herodus! These terms and conditions outline the rules and
          regulations for the use of Herodus's Website. By accessing this
          website, we assume you accept these terms and conditions. Do not
          continue to use Herodus if you do not agree to all the terms and
          conditions stated on this page.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>1. License</h2>
        <p className='text-gray-600'>
          Unless otherwise stated, Herodus and/or its licensors own the
          intellectual property rights for all material on Herodus. All
          intellectual property rights are reserved.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>
          2. User Comments and Content
        </h2>
        <p className='text-gray-600'>
          Users may post comments, articles, and other content as long as it is
          not invasive, offensive, or causes harm to any person in any way.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>3. Privacy Policy</h2>
        <p className='text-gray-600'>Please read our Privacy Policy.</p>

        <h2 className='text-2xl font-semibold mt-4'>4. Termination</h2>
        <p className='text-gray-600'>
          We may terminate your access to our website, without cause or notice,
          which may result in the forfeiture and destruction of all information
          associated with your account.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>5. Changes to Terms</h2>
        <p className='text-gray-600'>
          Herodus reserves the right to change these conditions from time to
          time as it sees fit and your continued use of the site will signify
          your acceptance of any adjustment to these terms.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>6. Governing Law</h2>
        <p className='text-gray-600'>
          Any claim related to Herodus's website shall be governed by the laws
          of [Your Country/State] without regard to its conflict of law
          provisions.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>7. Contact Us</h2>
        <p className='text-gray-600'>
          For any questions about these Terms of Service or any other issue
          regarding Herodus, please email us at{' '}
          <a
            href='mailto:contact@herodus.com'
            className='text-blue-500 underline'
          >
            contact@herodus.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
