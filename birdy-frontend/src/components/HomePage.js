import PostBird from './PostBird';
import TimeLine from './TimeLine';
import Recherche from './Recherche';
import '../styles/HomePage.css';

export default function HomePage({isConnected, userInfos, reloadListeBird, setReloadListeBird, dateRecherche, setdateRecherche}){

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
                    reloadListeBird= {reloadListeBird}
                    condition= 'private'
                    dateRecherche= {dateRecherche}
                    setdateRecherche= {setdateRecherche}
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
                    reloadListeBird= {reloadListeBird}
                    condition= 'public'
                    dateRecherche= {dateRecherche}
                    setdateRecherche= {setdateRecherche}
                />
            </div>
        )
    }
        
    
    
}



