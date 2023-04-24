import {useState} from 'react';
import Profile from './Profile';
import PostBird from './PostBird';
import TimeLine from './TimeLine';
import Recherche from './Recherche';
import BirdDetail from './BirdDetail';
import Panel from './Panel';

import '../styles/HomePage.css';

export default function HomePage({isConnected, updateIsConnected, userInfos, updateUserInfos, birds, setBirds, reloadListeBird, setReloadListeBird, dateRecherche, setdateRecherche, updateIdBirdCourant, updateListeIdCommentairesCourant}){

    if (isConnected){
        return (
            <div>
                HomePage connecté
                <PostBird
                    isConnected= {isConnected}
                    userInfos= {userInfos}
                    reloadListeBird= {reloadListeBird}
                    setReloadListeBird= {setReloadListeBird}
                    isCommentaire= {false}
                    idBirdCible= {null}
                />
                <Recherche
                    setdateRecherche= {setdateRecherche}
                    setReloadListeBird= {setReloadListeBird}
                />
                <TimeLine
                    isConnected= {isConnected}
                    userInfos= {userInfos}
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
        )
    }
    else {
        return (
            <div>
                HomePage déconnecté
                <Recherche
                    setdateRecherche= {setdateRecherche}
                    setReloadListeBird= {setReloadListeBird}
                />
                <TimeLine
                    isConnected= {isConnected}
                    userInfos= {userInfos}
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
        )
    }
        
    
    
}



