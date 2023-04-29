import PostBird from './PostBird';
import TimeLine from './TimeLine';
import Recherche from './Recherche';
import '../styles/HomePage.css';

export default function HomePage({isConnected, userInfos, reloadListeBird, setReloadListeBird, dateRecherche, setdateRecherche, reloadUserInfos, setReloadUserInfos}){

    if (isConnected()){
        return (
            <div>
                HomePage connecté
                <PostBird
                    isConnected= {isConnected}
                    userInfos= {userInfos}
                    reloadListeBird= {reloadListeBird}
                    setReloadListeBird= {setReloadListeBird}
                    isCommentaire= {false}
                />
                <Recherche
                    setdateRecherche= {setdateRecherche}
                    setReloadListeBird= {setReloadListeBird}
                />
                <TimeLine
                    isConnected= {isConnected}
                    userInfos= {userInfos}
                    reloadListeBird= {reloadListeBird}
                    setReloadListeBird= {setReloadListeBird}
                    condition= 'private'
                    dateRecherche= {dateRecherche}
                    setdateRecherche= {setdateRecherche}
                    reloadUserInfos= {reloadUserInfos}
					setReloadUserInfos= {setReloadUserInfos}
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
                    reloadListeBird= {reloadListeBird}
                    setReloadListeBird= {setReloadListeBird}
                    condition= 'public'
                    dateRecherche= {dateRecherche}
                    setdateRecherche= {setdateRecherche}
                    reloadUserInfos= {reloadUserInfos}
					setReloadUserInfos= {setReloadUserInfos}
                />
            </div>
        )
    }  
}



