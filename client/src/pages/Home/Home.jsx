/** @format */

import React from "react"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import AnimatedText from "react-animated-text-content"
import Typist from "react-typist"

import NavBar from "../../components/NavBar/NavBar"
import heroImg from "../../assets/heroimg.png"
import heroGif from "../../assets/pixel-speech-bubble.gif"
import cardImg1 from "../../assets/icons8-connect-64.png"
import cardImg2 from "../../assets/icons8-metaverse-64.png"
import cardImg3 from "../../assets/icons8-metaverse3-64 (1).png"
import zeus from "../../assets/zeus.png"
import Footer from "../../components/Footer/Footer"
import UserHome from "../UserPages/UserHome/UserHome"
const Home = () => {
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
				value: { min: 1, max: 8 },
			},
		},
		detectRetina: true,
	}
	const user = false
	return (
		<>
			{user ? (
				<UserHome />
			) : (
				<>
					<Particles
						className='absolute h-screen w-screen'
						params={particleParams}
						init={particlesInit}
					/>
					<div className=' text-white bg-primary '>
						<NavBar />
						<main className=''>
							<div className='text-center p-5 h-screen flex flex-col lg:flex-row justify-center items-center'>
								<div className='px-2'>
									<AnimatedText
										className='md:text-6xl text-3xl leading-normal   md:w-[550px] w-full lg:w-[700px] m-auto '
										type='words' // animate words or chars
										animation={{
											x: "200px",
											y: "-20px",
											scale: 1.1,
											ease: "ease-in-out",
										}}
										animationType='lights'
										interval={0.06}
										duration={0.8}
										tag='p'
										includeWhiteSpaces
										threshold={0.1}
										rootMargin='20%'>
										Join Historians across the world & share your stories
									</AnimatedText>
									<Typist className='md:text-4xl md:leading-normal  lg:w-[500px] md:w-[450px] w-[350px] text-2xl m-auto my-10'>
										<span>
											<a href='/Register' className='text-secondary'>
												Sign up{" "}
											</a>
											& get connected with the world of Histories
										</span>
									</Typist>
								</div>
								<div className='py-5 relative w-[350px] md:w-[600px] '>
									<img
										src={heroImg}
										className='w-[500px] mx-auto drop-shadow-before_focus hover:scale-110 hover:drop-shadow-after_focus'
										alt=''
									/>
									<img
										src={heroGif}
										className='w-[250px] mx-auto absolute top-[50px] left-[50px]'
										alt=''
									/>
								</div>
							</div>

							<section className='bg-card-bg bg-cover border-[#e6bc6a] border-y-4 bg-fixed   bg-center'>
								<div className='items-center md:flex p-5 border-[#e6bc6a]  bg-black  bg-opacity-70     text-center '>
									{cards.map((card, index) => {
										return (
											<div
												className=' z-10 transition duration-500 ease hover:scale-110 hover:bg-gradient-to-t rounded-[30px] 
									 drop-shadow-2xl bg-gradient-to-b  from-secondary to-[#710624] w-48 md:w-60 md:h-60 m-auto my-5 py-3 px-5'
												key={index}>
												<h1 className='text-xl font-bold md:text-2xl'>
													{card.header}
												</h1>
												<p className='mt-4 md:text-xl'>{card.text}</p>
												<img
													className='mx-auto mt-4 md:w-[100px]'
													src={card.cardImg}
													alt=''
												/>
											</div>
										)
									})}
								</div>
							</section>

							<section className='bg-home-bg-2  bg-cover  bg-center bg-fixed'>
								<div className=' text-center p-5 bg-black border-[#e6bc6a]  bg-opacity-70 '>
									<h1 className='text-3xl md:text-5xl font-bold'>
										Contribute & decide
									</h1>
									<p className='my-10 md:text-2xl md:w-[600px] m-auto'>
										With your support you can help us create a movement that
										will help educate and entertain millions of people world
										wide.
									</p>
									<img src={zeus} className='w-1/2 m-auto md:w-80' alt='' />
								</div>
							</section>
						</main>
						<Footer />
					</div>
				</>
			)}
		</>
	)
}

export default Home

const cards = [
	{
		header: "Connect",
		text: "Post, chat, and share with others!",
		cardImg: cardImg1,
	},
	{ header: "Play", text: "Enter the metaverse & explore!", cardImg: cardImg2 },
	{
		header: "Earn",
		text: "Earn and unlock NFTs and tokens!",
		cardImg: cardImg3,
	},
]
