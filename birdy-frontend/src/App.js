import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { RequireAuth, useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import HomePage from './components/HomePage';
import Panel from './components/Panel';
import Profile from './components/Profile';
import BirdDetail from './components/BirdDetail';
import PostBird from './components/PostBird';
import axios from 'axios';

export default function App (){
	const userAuthInfos = useAuthUser();
	const isConnected = useIsAuthenticated();
	const [userInfos, updateUserInfos] = useState(null);
	const [reloadListeBird, setReloadListeBird] = useState(0);
	const [dateRecherche, setdateRecherche] = useState([Date.now()-(12*3600*1000),Date.now()+1800000]);

	async function userInfosRefresh() {
        var retour = await axios.post('http://localhost:8000/api/user/getuserinfos',
            {
                id: userAuthInfos().id,
            }
        );
        updateUserInfos(retour.data.userInfos);
		}

	useEffect(() => {
		if (isConnected()) {
			if (!userInfos) {
				userInfosRefresh();
			}
		}
	}
	, []);

	return (
		<div>
			<Panel
				isConnected= {isConnected}
				updateUserInfos= {updateUserInfos}
			/>
			<Routes>
				<Route
					path= '/'
					element= {
						<>
						<HomePage
							isConnected= {isConnected}
							userInfos= {userInfos}
							reloadListeBird= {reloadListeBird}
							setReloadListeBird= {setReloadListeBird}
							dateRecherche= {dateRecherche}
							setdateRecherche= {setdateRecherche}
						/>
						</>
					}
				/>
				<Route
					path= '/profile'
					element= {
						<RequireAuth loginPath='/'>
							<Profile
								isConnected= {isConnected}
								userInfos= {userInfos}
							/>
						</RequireAuth>
					}
				/>
				<Route
					path= '/bird/:id'
					element= {
						<>
							<BirdDetail
								isConnected= {isConnected}
								userInfos= {userInfos}
								reloadListeBird= {reloadListeBird}
								setReloadListeBird= {setReloadListeBird}
								dateRecherche= {dateRecherche}
								setdateRecherche= {setdateRecherche}
							/>
							<RequireAuth loginPath='/'>
								<PostBird
									isConnected= {isConnected}
									userInfos= {userInfos}
									reloadListeBird= {reloadListeBird}
									setReloadListeBird= {setReloadListeBird}
									isCommentaire= {true}
								/>
							</RequireAuth>
						</>
					}
				/>
			</Routes>
		</div>
	)
}