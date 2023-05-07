import styles from '../styles/Bird.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext } from 'react';

export default function Bird({idBird, pseudo, avatar, content, date, heure, isPublic, isComment, isRebird, likes, rebirds, favorites}) {
    const navigate = useNavigate();

    const { isConnected, userInfos, reloadUserInfos, setReloadUserInfos } = useContext(AppContext);

    function checkProfile(e) {
        e.stopPropagation();
        navigate(0);
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

    function deleteFromArray(array, elem) {
        const index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
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
            deleteFromArray(likes, userInfos.id);
            setReloadUserInfos(reloadUserInfos +1);
        }
        else {
            await axios.post("http://localhost:8000/api/bird/likeBird", 
                {
                    idBirdCible: idBird,
                    idUser: userInfos.id
                }
            )
            likes.push(userInfos.id);
            setReloadUserInfos(reloadUserInfos +1);
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
            deleteFromArray(favorites, userInfos.id);
            setReloadUserInfos(reloadUserInfos +1);
        }
        else {
            await axios.post("http://localhost:8000/api/bird/favBird", 
                {
                    idBirdCible: idBird,
                    idUser: userInfos.id
                }
            )
            favorites.push(userInfos.id);
            setReloadUserInfos(reloadUserInfos +1);
        }
    }

    function details() {
        navigate('/');
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
                                <div className={styles.visibilite}>Bird {(isPublic) ? 'public' : 'privé'}<br></br></div>
                                {(isComment) ? <div className={styles.reponse}>En réponse à un Bird<br></br></div> : null}
                                {(isInArray(idBird, userInfos.likes))? <div className={styles.likesTrue} onClick={likeBird}><i className={styles.icon}><i class="material-symbols-outlined">favorite</i></i> {likes.length}<br></br></div> : <div className={styles.likesFalse} onClick={likeBird}><i className={styles.icon}><i class="material-symbols-outlined">favorite</i></i> {likes.length}<br></br></div>} 
                                {(isInArray(idBird, userInfos.favorites))? <div className={styles.favorisTrue} onClick={favBird}><i className={styles.icon}><i class="material-symbols-outlined">star</i></i></div> : <div className={styles.favorisFalse} onClick={favBird}><i className={styles.icon}><i class="material-symbols-outlined">star</i></i></div>}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    else {
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
                            <div className={styles.visibilite}>Bird {(isPublic) ? 'public' : 'privé'}<br></br></div>
                            {(isComment) ? <div className={styles.reponse}>En réponse à un Bird<br></br></div> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}