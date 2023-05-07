import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit'
import {QueryClient, QueryClientProvider} from 'react-query'
import App from './App.js'

const client = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root')).render(
	<div>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
		<link rel="preconnect" href="https://fonts.googleapis.com"></link>
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'></link>
		<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></link>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0"></link>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,500,0,0"></link>
		
		<AuthProvider 
			authType= {"cookie"}
			authName= {"_auth"}
			cookieDomain= {window.location.hostname}
			cookieSecure= {false}
		>
			<BrowserRouter>
				<QueryClientProvider client={client}>
					<App/>
				</QueryClientProvider>
			</BrowserRouter>
		</AuthProvider>
	</div>
)