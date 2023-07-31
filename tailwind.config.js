/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Raleway: ['Raleway', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
        Chakra: ['Chakra Petch', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        primary: '#1a0c21',
        secondary: '#ff1053',
        third: '#00a9a5',
      },
      transitionProperty: {
        height: 'height',
      },
      dropShadow: {
        before_focus: ' 15px 10px 5px #00a9a5',
        after_focus: '15px 10px 5px #ff1053',
      },
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
      },
    },
  },
  plugins: [],
}
