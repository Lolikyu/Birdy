import {useState, useEffect} from 'react';
import Authentification from './Authentification';
import Profile from './Profile';
import PostBird from './PostBird';
import TimeLine from './TimeLine';
import Recherche from './Recherche';
import BirdDetail from './BirdDetail';

function MainPage(){
    const [isConnected, updateIsConnected] = useState(false);
    const [userInfos, updateUserInfos] = useState({id: 'non défini'});
    const [reloadListeBird, setReloadListeBird] = useState(true);
    const [dateRecherche, setdateRecherche] = useState([Date.now()-(12*3600*1000),Date.now()+1800000]);
    const [page, updatePage] = useState('Mainpage');
    const [birds, setBirds] = useState(0);
    const [idBirdCourant, updateIdBirdCourant] = useState({id: 'non défini'});
    const [listeIdCommentairesCourant, updateListeIdCommentairesCourant] = useState([{id: 'non défini'}]);
    
    switch (page){
        case 'Mainpage':
            return (
                <div>
                    {(isConnected) 
                    ?
                        <div>
                            <h1>I am connected uwu</h1><br></br>
                            <div>isConnected : {(isConnected) ? "True" : "False"}</div><br></br>

                            <Profile
                                updatePage= {updatePage}
                                userInfos= {userInfos}
                                isConnected= {isConnected}
                            />
                            <PostBird
                                updatePage= {updatePage}
                                page= {page}
                                userInfos= {userInfos}
                                setReloadListeBird= {setReloadListeBird}
                                isCommentaire= {false}
                                idBirdCible= {null}
                                birds= {birds}
                            />
                            <Recherche
                                updatePage= {updatePage}
                                setdateRecherche= {setdateRecherche}
                                setReloadListeBird= {setReloadListeBird}
                            />
                            <TimeLine
                                updatePage= {updatePage}
                                userInfos= {userInfos}
                                isConnected= {isConnected}
                                updateUserInfos= {updateUserInfos}
                                birds= {birds}
                                setBirds= {setBirds}
                                reloadListeBird= {reloadListeBird}
                                setReloadListeBird= {setReloadListeBird}
                                condition= 'private'
                                dateRecherche= {dateRecherche}
                                setdateRecherche= {setdateRecherche}
                                updateIdBirdCourant= {updateIdBirdCourant}
                                updateListeIdCommentairesCourant= {updateListeIdCommentairesCourant}
                            />
                        </div>
                    :
                        <div>
                            <h1>I am disconnected uwu</h1><br></br>
                            
                            <div>isConnected : {(isConnected) ? "True" : "False"}</div><br></br>

                            <Authentification
                                updatePage= {updatePage}
                                isConnected = {isConnected}
                                updateIsConnected = {updateIsConnected}
                                userInfos = {userInfos}
                                updateUserInfos = {updateUserInfos}
                            />
                            <Recherche
                                updatePage= {updatePage}
                                setdateRecherche= {setdateRecherche}
                                setReloadListeBird= {setReloadListeBird}
                            />
                            <TimeLine
                                updatePage= {updatePage}
                                userInfos= {userInfos}
                                isConnected= {isConnected}
                                updateUserInfos= {updateUserInfos}
                                birds= {birds}
                                setBirds= {setBirds}
                                reloadListeBird= {reloadListeBird}
                                setReloadListeBird= {setReloadListeBird}
                                condition= 'public'
                                dateRecherche= {dateRecherche}
                                setdateRecherche= {setdateRecherche}
                                updateIdBirdCourant= {updateIdBirdCourant}
                                updateListeIdCommentairesCourant= {updateListeIdCommentairesCourant}
                            />
                        </div>
                    }
                </div>
            )
        case 'Profile':
            return (
                <div>
                    Case Profile
                </div>
            )
        
        case 'Bird':
            return (
                <div>
                    <BirdDetail
                        updatePage= {updatePage}
                        isConnected= {isConnected}
                        idBirdCourant= {idBirdCourant}
                        listeIdCommentairesCourant= {listeIdCommentairesCourant}
                        dateRecherche= {dateRecherche}
                        reloadListeBird= {reloadListeBird}
                        setReloadListeBird= {setReloadListeBird}
                        page= {page}
                        birds= {birds}
                        setBirds= {setBirds}
                        userInfos= {userInfos}
                        updateUserInfos= {updateUserInfos}
                        updateIdBirdCourant= {updateIdBirdCourant}
                        updateListeIdCommentairesCourant= {updateListeIdCommentairesCourant}
                    />
                </div>
            )
    }
}
export default MainPage


