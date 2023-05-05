import styles from './styles/App.module.css'
import { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { RequireAuth, useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import HomePage from './components/HomePage';
import Panel from './components/Panel';
import Profile from './components/Profile';
import BirdDetail from './components/BirdDetail';
import ListeUsers from './components/ListeUsers';
import axios from 'axios';

export const AppContext = createContext();

export default function App (){
	const [userInfos, updateUserInfos] = useState(null);
	const [reloadUserInfos, setReloadUserInfos] = useState(0);
	const [reloadListeBird, setReloadListeBird] = useState(0);
	const userAuthInfos = useAuthUser();
	const isConnected = useIsAuthenticated();

	async function userInfosRefresh() {
        var retour = await axios.post('http://localhost:8000/api/user/getUserInfosById',
            {
                id: userAuthInfos().id,
            }
        );
        updateUserInfos(retour.data.userInfos);
	}

	useEffect(() => {
		if (isConnected()) {
			userInfosRefresh();
		}
	}, [reloadUserInfos]);

	return (
		<AppContext.Provider
			value= {
				{isConnected,
				userInfos,
				updateUserInfos,
				reloadUserInfos,
				setReloadUserInfos,
				reloadListeBird,
				setReloadListeBird}
			}
		>
			<div className={styles.app}>
				<Panel />
				<Routes>
					<Route
						path= '/'
						element= {
							<HomePage />
						}
					/>
					<Route
						path= '/profile/:pseudo'
						element= {
							<RequireAuth loginPath='/'>
								<Profile />
							</RequireAuth>
						}
					/>
					<Route
						path= '/bird/:id'
						element= {
							<div className={styles.details}>
								<BirdDetail />
							</div>
						}
					/>
					<Route
						path= '/follows'
						element= {
							<div className={styles.details}>
								<ListeUsers
									mode= 'follows'
								/>
							</div>
						}
					/>
					<Route
						path= '/followers'
						element= {
							<div className={styles.details}>
								<ListeUsers
									mode= 'followers'
								/>
							</div>
						}
					/>
				</Routes>
			</div>
		</AppContext.Provider>
	)
}