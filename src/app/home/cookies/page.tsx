import React from 'react';

export default function Cookies() {
  return (
    <div className='py-20'>
      <div className='max-w-4xl  mx-auto p-6 space-y-8 bg-white shadow-lg rounded-lg '>
        <h1 className='text-3xl font-semibold mb-4'>
          Cookies Policy for Herodus
        </h1>

        <p className='text-gray-600'>
          At Herodus, your privacy is paramount. This Cookies Policy explains
          what cookies are, how we use them, the types of cookies we use, and
          how third-party affiliates may use them on our website. Please read
          our Cookies Policy to understand how we use and protect the
          information obtained from using our website.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>1. What are cookies?</h2>
        <p className='text-gray-600'>
          Cookies are small text files that are placed on your computer or
          mobile device by websites you visit. These files often contain
          information about your device or preferences, making your next visit
          more tailored and efficient.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>
          2. How does Herodus use cookies?
        </h2>
        <p className='text-gray-600'>We use cookies to:</p>
        <ul className='list-disc pl-5 space-y-2 text-gray-600'>
          <li>Understand and save your preferences for future visits.</li>
          <li>
            Keep track of advertisements and compile aggregate data about site
            traffic and interactions.
          </li>
          <li>
            Enhance and personalize your user experience on our platform,
            helping us understand your preferences based on previous or current
            site activity.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold mt-4'>
          3. Types of cookies we use:
        </h2>
        <ul className='list-disc pl-5 space-y-2 text-gray-600'>
          <li>
            <strong>Functional cookies:</strong> These are necessary for our
            website to function correctly. They include login details, site
            preferences, and other information to enhance your user experience.
          </li>
          <li>
            <strong>Analytical cookies:</strong> These allow us to recognize and
            count the number of visitors while also seeing how visitors move
            around our website. This helps us improve the site's functionality,
            ensuring users find what they need easily.
          </li>
          <li>
            <strong>Advertising cookies:</strong> These are placed on your
            computer by advertisers and ad servers. They collect data about your
            online activity, helping advertisers deliver more relevant
            advertising or limit how many times you see an ad.
          </li>
        </ul>

        <h2 className='text-2xl font-semibold mt-4'>
          4. Third-party cookies on our site:
        </h2>
        <p className='text-gray-600'>
          We may collaborate with third-party partners who use cookies on our
          site to:
        </p>
        <ul className='list-disc pl-5 space-y-2 text-gray-600'>
          <li>Deliver advertising tailored to your interests.</li>
          <li>Measure the effectiveness of an advertising campaign.</li>
        </ul>
        <p className='text-gray-600'>
          Note: Third-party vendors, including Google, use cookies to serve ads
          based on a user's previous visits to our website or other websites.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>
          5. How can you manage or opt-out of cookies?
        </h2>
        <p className='text-gray-600'>
          Most web browsers automatically accept cookies, but you can modify
          your browser setting to decline cookies if you prefer. However, this
          may prevent you from taking full advantage of the website. Visit the
          'Help' or 'Setting' section of your browser to find out how to manage
          your cookie settings.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>
          6. Updates to this Cookies Policy:
        </h2>
        <p className='text-gray-600'>
          We may update our Cookies Policy from time to time to reflect changes
          in technology, legislation, or our data use practices. Any updates
          will be made on this page, and if significant, we'll provide a more
          prominent notice.
        </p>

        <h2 className='text-2xl font-semibold mt-4'>7. Contact Us:</h2>
        <p className='text-gray-600'>
          If you have questions about our Cookies Policy or our practices,
          please contact us at{' '}
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
