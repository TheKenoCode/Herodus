/** @format */

import React from "react"
import Home from "./pages/Home/Home"
import "./styles.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import NFT from "./pages/NFTs/NFT"
import Login from "./pages/UserPages/Login/Login"
import Register from "./pages/UserPages/Register/Register"
import UserHome from "./pages/UserPages/UserHome/UserHome"
import NotFound from "./pages/NotFound/NotFound"
const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/About' element={<About />} />
			<Route path='/Contact' element={<Contact />} />
			<Route path='/NFTs' element={<NFT />} />
			<Route path='/Login' element={<Login />} />
			<Route path='/Register' element={<Register />} />
			<Route path='/' element={<UserHome />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
