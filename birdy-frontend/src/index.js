import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit"
import App from './App.js'


ReactDOM.createRoot(document.getElementById('root')).render(
	<div>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
		<link rel="stylesheet" href="App.css"></link>
		<link rel="preconnect" href="https://fonts.googleapis.com"></link>
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'></link>
		<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></link>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0" />
		
		<AuthProvider 
			authType= {"cookie"}
			authName= {"_auth"}
			cookieDomain= {window.location.hostname}
			cookieSecure= {false}
		>
			<BrowserRouter>

					<App/>

			</BrowserRouter>
		</AuthProvider>
	</div>
)
