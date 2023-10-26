import React from 'react';

export default function Privacy() {
  return (
    <div className='py-20'>
      <div className='max-w-4xl mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg mt-12'>
        <h1 className='text-3xl font-semibold mb-4'>Herodus Privacy Policy</h1>

        <p className='text-gray-600'>
          At Herodus, one of our main priorities is the privacy of our visitors.
          This Privacy Policy document contains types of information that are
          collected and recorded by Herodus and how we use it.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>
          1. Personal Data Collection
        </h2>
        <p className='text-gray-600'>
          We may ask you to provide certain personal data, such as email
          address, name, etc. This information is primarily used to improve user
          experience and for communication purposes.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>
          2. Cookies and Web Beacons
        </h2>
        <p className='text-gray-600'>
          Like any other website, Herodus uses 'cookies'. These cookies are used
          to store information including visitors' preferences, and the pages on
          the website that the visitor accessed or visited.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>
          3. Third-Party Privacy Policies
        </h2>
        <p className='text-gray-600'>
          Herodus's Privacy Policy does not apply to other advertisers or
          websites. Thus, we advise you to consult the respective privacy
          policies of third-party services for more detailed information.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>
          4. Children's Information
        </h2>
        <p className='text-gray-600'>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents to observe, participate in,
          and/or monitor their online activity.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>5. Consent</h2>
        <p className='text-gray-600'>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms and conditions.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>
          6. GDPR Data Protection Rights
        </h2>
        <p className='text-gray-600'>
          If you are within the European Union, you are entitled to certain data
          protection rights. We aim to take reasonable steps to allow you to
          correct, amend, or delete personal information we hold about you.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>7. Contact Us</h2>
        <p className='text-gray-600'>
          For any questions about this Privacy Policy or any other issue
          regarding Herodus, please email us at{' '}
          <a
            href='mailto:privacy@herodus.com'
            className='text-blue-500 underline'
          >
            privacy@herodus.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
