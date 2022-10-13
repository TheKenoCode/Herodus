/** @format */

import React from "react"
import Footer from "../../components/Footer/Footer"
import NavBar from "../../components/NavBar/NavBar"
import Typist from "react-typist"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import nftGif from "../../assets/giphy.gif"

const NFT = () => {
	const particlesInit = async (main) => {
		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(main)
	}
	const particleParams = {
		fullScreen: { enable: false },
		background: {},
		fpsLimit: 120,
		interactivity: {
			events: {
				onClick: {
					enable: false,
					mode: "push",
				},
				onHover: {
					enable: true,
					mode: "repulse",
				},
				resize: true,
			},
			modes: {
				push: {
					quantity: 4,
				},
				repulse: {
					distance: 200,
					duration: 0.4,
				},
			},
		},
		particles: {
			color: {
				value: "#ffffff",
			},
			links: {
				color: "#ffffff",
				distance: 150,
				enable: true,
				opacity: 0.5,
				width: 1,
			},
			collisions: {
				enable: true,
			},
			move: {
				direction: "none",
				enable: true,
				outModes: {
					default: "bounce",
				},
				random: false,
				speed: 6,
				straight: false,
			},
			number: {
				density: {
					enable: true,
					area: 800,
				},
				value: 80,
			},
			opacity: {
				value: 0.2,
			},
			shape: {
				type: "circle",
			},
			size: {
				value: { min: 1, max: 5 },
			},
		},
		detectRetina: true,
	}
	return (
		<div>
			<Particles
				className='absolute h-screen'
				params={particleParams}
				init={particlesInit}
			/>
			<NavBar />
			<section className='bg-primary h-screen flex flex-col justify-center  '>
				<div className=' p-5'>
					<h1 className='text-white font-bold text-6xl flex flex-col justify-center items-center text-center'>
						NFTs
					</h1>
					<img src={nftGif} className='m-auto' alt='' />
					<Typist className=''>
						<h1 className='text-secondary text-4xl  mx-auto text-center'>
							UNDER CONSTRUCTION...
						</h1>
					</Typist>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default NFT
