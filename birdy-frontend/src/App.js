import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import Panel from './components/Panel';
import Profile from './components/Profile';
import BirdDetail from './components/BirdDetail';
import PostBird from './components/PostBird';

export default function App (){
	const [isConnected, updateIsConnected] = useState(false);
	const [userInfos, updateUserInfos] = useState({id: 'non défini'});
	const [reloadListeBird, setReloadListeBird] = useState(0);
	const [dateRecherche, setdateRecherche] = useState([Date.now()-(12*3600*1000),Date.now()+1800000]);

	return (
		<div>
			<Panel
				isConnected= {isConnected}
				updateIsConnected= {updateIsConnected}
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
						/>
					}
				/>
				<Route
					path= '/profile'
					element= {
						<Profile
							isConnected= {isConnected}
							userInfos= {userInfos}
						/>
					}
				/>
				<Route
					path= '/bird/:id'
					element= {
						<>
							<BirdDetail
								reloadListeBird= {reloadListeBird}
								dateRecherche= {dateRecherche}
								setdateRecherche= {setdateRecherche}
							/>

							<PostBird
								isConnected= {isConnected}
								userInfos= {userInfos}
								reloadListeBird= {reloadListeBird}
								setReloadListeBird= {setReloadListeBird}
								isCommentaire= {true}
							/>
						</>
					}
				/>
			</Routes>
		</div>
	)
}