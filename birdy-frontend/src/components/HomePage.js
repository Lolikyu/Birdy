import styles from '../styles/HomePage.module.css'
import PostBird from './PostBird';
import TimeLine from './TimeLine';
import Recherche from './Recherche';

export default function HomePage({isConnected, userInfos, reloadListeBird, setReloadListeBird, dateRecherche, setdateRecherche, reloadUserInfos, setReloadUserInfos}){
    if (isConnected()) {
        if (userInfos) {
            return (
                <div className={styles.homePage}>
                    <div className={styles.title}>Page d'accueil</div>
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
                        reloadUserInfos= {reloadUserInfos}
                        setReloadUserInfos= {setReloadUserInfos}
                    />
                </div>
            )
        }
    }
    else {
        return (
            <div className={styles.homePage}>
                HomePage déconnecté
                <TimeLine
                    isConnected= {isConnected}
                    userInfos= {userInfos}
                    reloadListeBird= {reloadListeBird}
                    setReloadListeBird= {setReloadListeBird}
                    condition= 'private'
                    reloadUserInfos= {reloadUserInfos}
					setReloadUserInfos= {setReloadUserInfos}
                />
            </div>
        )
    }  
}



