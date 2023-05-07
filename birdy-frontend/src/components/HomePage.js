import styles from '../styles/HomePage.module.css'
import PostBird from './PostBird';
import TimeLine from './TimeLine';
import { AppContext } from '../App';
import { useContext } from 'react';

export default function HomePage () {
    const { isConnected, userInfos } = useContext(AppContext);
    
    if (isConnected()) {
        if (userInfos) {
            return (
                <div className={styles.homePage}>
                    <div className={styles.title}>Page d'accueil</div>
                    <PostBird />
                    <TimeLine
                        condition= 'private'
                    />
                </div>
            )
        }
    }
    else {
        return (
            <div className={styles.homePage}>
                <div className={styles.title}>Page d'accueil</div>
                <TimeLine
                    condition= 'private'
                />
            </div>
        )
    }  
}



