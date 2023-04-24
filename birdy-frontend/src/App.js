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
	const [birds, setBirds] = useState(0);
	const [idBirdCourant, updateIdBirdCourant] = useState({id: 'non défini'});
	const [listeIdCommentairesCourant, updateListeIdCommentairesCourant] = useState([{id: 'non défini'}]);


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
							updateIsConnected= {updateIsConnected}
							userInfos= {userInfos}
							updateUserInfos= {updateUserInfos}
							idBirdCourant= {idBirdCourant}
							updateIdBirdCourant= {updateIdBirdCourant}
							listeIdCommentairesCourant= {listeIdCommentairesCourant}
							updateListeIdCommentairesCourant= {updateListeIdCommentairesCourant}
							dateRecherche= {dateRecherche}
							setdateRecherche= {setdateRecherche}
							reloadListeBird= {reloadListeBird}
							setReloadListeBird= {setReloadListeBird}
							birds= {birds}
							setBirds= {setBirds}
							
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
					path= '/bird'
					element= {
						<>
							<BirdDetail
								isConnected= {isConnected}
								updateUserInfos= {updateUserInfos}
								idBirdCourant= {idBirdCourant}
								updateIdBirdCourant= {updateIdBirdCourant}
								listeIdCommentairesCourant= {listeIdCommentairesCourant}
								updateListeIdCommentairesCourant= {updateListeIdCommentairesCourant}
								dateRecherche= {dateRecherche}
								reloadListeBird= {reloadListeBird}
								setReloadListeBird= {setReloadListeBird}
								birds= {birds}
								setBirds= {setBirds}
								userInfos= {userInfos}
							/>
							<PostBird
								isConnected= {isConnected}
								userInfos= {userInfos}
								reloadListeBird= {reloadListeBird}
								setReloadListeBird= {setReloadListeBird}
								isCommentaire= {true}
								idBirdCible= {idBirdCourant}
							/>
						</>
					}
				/>
			</Routes>
		</div>
	)
}