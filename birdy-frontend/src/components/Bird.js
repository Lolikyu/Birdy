import '../styles/Bird.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Bird({idBird, pseudo, avatar, content, date, heure, isPublic, likes, rebirds, userInfos, isConnected, reloadListeBird, setReloadListeBird, reloadUserInfos, setReloadUserInfos}) {
    const navigate = useNavigate();

    function checkProfile() {
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

    async function likeBird() {
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

    async function favBird() {
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

    if (isConnected()) {
        if (userInfos) {
            return (
                <div className='bird'>
                    <div>
                        <div onClick={checkProfile}>
                            <img className='avatar' src={avatar}/>
                            <div>
                                <div>{pseudo}</div>
                            </div>
                        </div>
                        <div>
                            {content}
                        </div>
                        <div>
                            <div>
                                Posté le {date} à {heure}
                            </div>
                            <div>
                                isPublic : {isPublic.toString()}<br></br>
                                <div onClick={likeBird}>Likes : {likes.length}<br></br></div>
                                Rebirds : {rebirds.length}<br></br>
                                <div onClick={favBird}>Favoris : {isInArray(idBird, userInfos.favorites)? "Oui" : "Non"}</div>
                                <i></i>
                                <i></i>
                                <nav>
                                    <Link to={'/bird/' + String(idBird)}>Détails</Link>
                                </nav>
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
            <div className='bird'>
                <div>
                    <div>
                        <img className='avatar' src={avatar}/>
                        <div>
                            <div>{pseudo}</div>
                        </div>
                    </div>
                    <div>
                        {content}
                    </div>
                    <div>
                        <div>
                            Posté le {date} à {heure}
                        </div>
                        <div>
                            isPublic : {isPublic.toString()}<br></br>
                            Likes : {likes.length}<br></br>
                            Rebirds : {rebirds.length}<br></br>
                            <i></i>
                            <i></i>
                            <nav>
                                <Link to={'/bird/' + String(idBird)}>Détails</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}