/**
 * TailwindCSS Configuration
 * @type {import('tailwindcss').Config}
 */
const plugin = require('tailwindcss/plugin')

module.exports = {
  // Specify the files Tailwind should purge
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '600px',
      // => @media (min-width: 640px) { ... }

      md: '700px',
      // => @media (min-width: 768px) { ... }

      lg: '850px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      // Custom font families
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Raleway: ['Raleway', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
        Chakra: ['Chakra Petch', 'sans-serif'],
      },
      // Custom animations
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      // Custom color palette
      colors: {
        primary: '#1a0c21',
        secondary: '#ff1053',
        third: '#1dcee9',
        blackBG: '#0c090a',
        purpleBG: '#2b2030',
        grayBorder: '#333639',
      },
      // Additional transition properties
      transitionProperty: {
        height: 'height',
      },
      // Custom drop shadow styles
      dropShadow: {
        before_focus: '15px 10px 5px #00a9a5',
        after_focus: '15px 10px 5px #ff1053',
      },
      // Custom background images
      backgroundImage: {
        'card-bg': "url('https://wallpaperaccess.com/full/1264671.jpg')",
        'home-bg-2':
          "url('https://cdn.thecollector.com/wp-content/uploads/2021/08/scythian-comb-with-battle-scene.jpg')",
        'about-bg': "url('https://wallpaper.dog/large/10978358.jpg')",
        'contact-bg':
          "url('https://www.artmajeur.com/medias/hd/2/0/2017dobro/artwork/14340695_16-scythian-archer.jpg')",
        'login-bg':
          "url('https://www2.buddhistdoor.net/upload/article/8229/60e90b757b844830cfc35df6e54b5a30.jpg')",
        'register-bg':
          "url('https://www.ancient-origins.net/sites/default/files/field/image/Varangians.jpg')",
        'home-hero-bg':
          "url('https://images.unsplash.com/photo-1635614017406-7c192d832072?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80')",
        'nft-bg': "url('https://i.imgur.com/RH91tcz.png')",
        'home-hero-bg-2':
          "url('https://cdn.pixabay.com/photo/2018/05/11/09/29/glass-3389935_1280.jpg')",
        'home-bg-greece':
          "url('https://ancientinsights.net/wp-content/uploads/2023/02/glories-of-ancient-greece-1536x878.png')",
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  // Additional plugins can be added here
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
  ],
}
