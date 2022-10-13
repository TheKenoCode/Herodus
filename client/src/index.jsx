/** @format */

import React from "react"
import ReactDOM from "react-dom/client"
import "./styles.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
