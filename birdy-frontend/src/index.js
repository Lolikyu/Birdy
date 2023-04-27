import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit"
import App from './App.js'

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider 
		authType= {"cookie"}
		authName= {"_auth"}
		cookieDomain= {window.location.hostname}
		cookieSecure= {false}
	>
		<BrowserRouter>
			<React.StrictMode>
				<App/>
			</React.StrictMode>
		</BrowserRouter>
	</AuthProvider>
)
