/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#161828",
				secondary: "#ff1053",
				third: "#00a9a5",
			},
			transitionProperty: {
				height: "height",
			},
			dropShadow: {
				before_focus: " 15px 10px 5px #00a9a5",
				after_focus: "15px 10px 5px #ff1053",
			},
			backgroundImage: {
				"card-bg": "url('https://wallpaperaccess.com/full/1264671.jpg')",
				"home-bg-2":
					"url('https://cdn.thecollector.com/wp-content/uploads/2021/08/scythian-comb-with-battle-scene.jpg')",
				"about-bg": "url('https://wallpaper.dog/large/10978358.jpg')",
				"contact-bg":
					"url('https://www.artmajeur.com/medias/hd/2/0/2017dobro/artwork/14340695_16-scythian-archer.jpg')",
				"login-bg":
					"url('https://www2.buddhistdoor.net/upload/article/8229/60e90b757b844830cfc35df6e54b5a30.jpg')",
				"register-bg":
					"url('https://www.ancient-origins.net/sites/default/files/field/image/Varangians.jpg')",
			},
		},
	},
	plugins: [],
}
