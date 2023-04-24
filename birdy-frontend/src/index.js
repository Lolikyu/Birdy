import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	BrowserRouter,
	RouterProvider,
	Link,
	useLocation
  } from "react-router-dom";
import HomePage from './components/HomePage'
import Profile from './components/Profile';
import BirdDetail from './components/BirdDetail';
import App from './App.js'


  

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<React.StrictMode>
			<App/>
		</React.StrictMode>
	</BrowserRouter>
)
