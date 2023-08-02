/** @format */


import { ISourceOptions } from "tsparticles-engine"
export const particleParams: ISourceOptions = {
	fullScreen: { enable: false },
	background: {},
	fpsLimit: 30,
	interactivity: {
		events: {
			onHover: {
				enable: false,
				mode: "repulse",
			},
		},
		modes: {
			bubble: {
				distance: 250,
				duration: 2,
				size: 0,
				opacity: 0,
			},
		},
	},
	particles: {
		number: {
			value: 200,
			density: {
				enable: true,
				area: 1000,
			},
		},
		size: {
			value: 3,
			random: true,
		},
		move: {
			enable: true,
			speed: 0.5,
			direction: "none",
			random: false,
			straight: false,
			out_mode: "bounce", // Use this instead of "bounce"
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
		},
		links: {
			enable: true,
			distance: 100,
			color: "#ffffff",
			opacity: 0.4,
			width: 1,
		},
		opacity: {
			value: 0.5,
			random: true,
		},
		color: {
			value: "#ffffff",
		},
	},
	retina_detect: true,
}
