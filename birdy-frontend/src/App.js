import styles from './styles/App.module.css'
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { RequireAuth, useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import HomePage from './components/HomePage';
import Panel from './components/Panel';
import Profile from './components/Profile';
import BirdDetail from './components/BirdDetail';
import PostBird from './components/PostBird';
import ListeUsers from './components/ListeUsers';
import axios from 'axios';

export default function App (){
	const userAuthInfos = useAuthUser();
	const isConnected = useIsAuthenticated();
	const [userInfos, updateUserInfos] = useState(null);
	const [reloadUserInfos, setReloadUserInfos] = useState(0);
	const [reloadListeBird, setReloadListeBird] = useState(0);
	const [dateRecherche, setdateRecherche] = useState([Date.now()-(12*3600*1000),Date.now()+1800000]);

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
		else {
			setReloadUserInfos(null);
		}
	}, [reloadUserInfos]);

	return (
		<div className={styles.app}>

			<Panel
				isConnected= {isConnected}
				userInfos= {userInfos}
				updateUserInfos= {updateUserInfos}
			/>
			<Routes>
				<Route
					path= '/'
					element= {
						<HomePage
							isConnected= {isConnected}
							userInfos= {userInfos}
							reloadListeBird= {reloadListeBird}
							setReloadListeBird= {setReloadListeBird}
							dateRecherche= {dateRecherche}
							setdateRecherche= {setdateRecherche}
							reloadUserInfos= {reloadUserInfos}
							setReloadUserInfos= {setReloadUserInfos}
						/>
					}
				/>
				<Route
					path= '/profile/:pseudo'
					element= {
						<RequireAuth loginPath='/'>
							<Profile
								isConnected= {isConnected}
								userInfos= {userInfos}
								reloadListeBird= {reloadListeBird}
								setReloadListeBird= {setReloadListeBird}
								dateRecherche= {dateRecherche}
								setdateRecherche= {setdateRecherche}
								reloadUserInfos= {reloadUserInfos}
								setReloadUserInfos= {setReloadUserInfos}
							/>
						</RequireAuth>
					}
				/>
				<Route
					path= '/bird/:id'
					element= {
						<div className={styles.details}>
							<BirdDetail
								isConnected= {isConnected}
								userInfos= {userInfos}
								reloadListeBird= {reloadListeBird}
								setReloadListeBird= {setReloadListeBird}
								dateRecherche= {dateRecherche}
								setdateRecherche= {setdateRecherche}
								reloadUserInfos= {reloadUserInfos}
								setReloadUserInfos= {setReloadUserInfos}
								
							/>
							<PostBird
								isConnected= {isConnected}
								userInfos= {userInfos}
								reloadListeBird= {reloadListeBird}
								setReloadListeBird= {setReloadListeBird}
							/>
						</div>
					}
				/>
				<Route
					path= '/follows'
					element= {
						<div className={styles.details}>
							<ListeUsers
								isConnected= {isConnected}
								userInfos= {userInfos}
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
								isConnected= {isConnected}
								userInfos= {userInfos}
								mode= 'followers'
							/>
						</div>
					}
				/>
			</Routes>
		</div>
	)
}