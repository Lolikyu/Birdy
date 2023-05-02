import styles from '../styles/Bird.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Bird({idBird, pseudo, avatar, content, date, heure, isPublic, isComment, isRebird, likes, rebirds, userInfos, isConnected, reloadListeBird, setReloadListeBird, reloadUserInfos, setReloadUserInfos}) {
    const navigate = useNavigate();

    function checkProfile(e) {
        e.stopPropagation();

        navigate('/profile/' + String(pseudo));
    }
    
    function isInArray(elem, array){
        for (var i=0; i < array.length; i++){
            if (array[i] === elem){
                return true;
            }
        }
        return false;
    }

    async function likeBird(e) {
        e.stopPropagation();

        if (isInArray(idBird, userInfos.likes)) {
            await axios.post("http://localhost:8000/api/bird/dislikeBird", 
                {
                    idBirdCible: idBird,
                    idUser: userInfos.id
                }
            )
            setReloadUserInfos(reloadUserInfos +1);
            setReloadListeBird(reloadListeBird +1);
        }
        else {
            await axios.post("http://localhost:8000/api/bird/likeBird", 
                {
                    idBirdCible: idBird,
                    idUser: userInfos.id
                }
            )
            setReloadUserInfos(reloadUserInfos +1);
            setReloadListeBird(reloadListeBird +1);
        }
    }

    async function favBird(e) {
        e.stopPropagation();

        if (isInArray(idBird, userInfos.favorites)) {
            await axios.post("http://localhost:8000/api/bird/unfavBird", 
                {
                    idBirdCible: idBird,
                    idUser: userInfos.id
                }
            )
            setReloadUserInfos(reloadUserInfos +1);
            setReloadListeBird(reloadListeBird +1);
        }
        else {
            await axios.post("http://localhost:8000/api/bird/favBird", 
                {
                    idBirdCible: idBird,
                    idUser: userInfos.id
                }
            )
            setReloadUserInfos(reloadUserInfos +1);
            setReloadListeBird(reloadListeBird +1);
        }
    }

    function details() {
        navigate('/bird/' + String(idBird));
    }

    if (isConnected()) {
        if (userInfos) {
            return (
                <div className={styles.bird} onClick={details}>
                    <div>
                        <div onClick={checkProfile}>
                            <img className={styles.avatar} src={avatar}/>

                            <div className={styles.pseudo}>{pseudo}</div>

                        </div>

                        <div className={styles.content}>
                            {content}
                        </div>
                        <div>
                            <div className={styles.date}>
                                Posté le {date} à {heure}
                            </div>
                            <div>
                                isPublic : {isPublic.toString()}<br></br>
                                isComment : {(isComment)? isComment : "None"}<br></br>
                                isRebird : {(isRebird)? isRebird : "None"}<br></br>
                                <div onClick={likeBird}>Likes : {likes.length}<br></br></div>
                                Rebirds : {rebirds.length}<br></br>
                                <div onClick={favBird}>Favoris : {isInArray(idBird, userInfos.favorites)? "Oui" : "Non"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <h2>Loading ...</h2>
            )
        }
    }
    else {
        return (
            <div className={styles.bird} onClick={details}>
                <div>
                    <div>
                        <img className={styles.avatar} src={avatar}/>
                        <div>
                            <div className={styles.pseudo}>{pseudo}</div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        {content}
                    </div>
                    <div>
                        <div className={styles.date}>
                            Posté le {date} à {heure}
                        </div>
                        <div>
                            isPublic : {isPublic.toString()}<br></br>
                            Likes : {likes.length}<br></br>
                            Rebirds : {rebirds.length}<br></br>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}