import styles from '../styles/HomePage.module.css'
import PostBird from './PostBird';
import TimeLine from './TimeLine';
import Recherche from './Recherche';

export default function HomePage({isConnected, userInfos, reloadListeBird, setReloadListeBird, dateRecherche, setdateRecherche, reloadUserInfos, setReloadUserInfos}){

    if (isConnected()){
        return (
            <div className={styles.homePage}>
                HomePage connecté
                <PostBird
                    isConnected= {isConnected}
                    userInfos= {userInfos}
                    reloadListeBird= {reloadListeBird}
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
            <div className={styles.homePage}>
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



