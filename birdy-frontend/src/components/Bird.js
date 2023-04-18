import '../styles/Bird.css';
import {useState} from 'react';
import axios from 'axios';
import PostBird from './PostBird';

function Bird({updatePage, isConnected, userInfos, updateUserInfos, reloadListeBird, setReloadListeBird, page, idBird, pseudo, avatar, content, date, heure, isPrivate, dateDepuis70, commentaires, updateIdBirdCourant, updateListeIdCommentairesCourant, birds}) {
    const [afficheCommentaire, updateAfficheCommentaire] = useState(-1);

    function setAfficheCommentaire(){
        if (afficheCommentaire === 0){
            updateAfficheCommentaire(-1);
        }
        else {
            if (afficheCommentaire === -1){
                updateAfficheCommentaire(0);
            }
        }
    }

    function AfficheDetails(){
        updateIdBirdCourant(idBird);
        updateListeIdCommentairesCourant(commentaires);
        updatePage('Bird');
    }

    return (
        <div className='bird'>
            <div>
                <div>
                    <img className='avatar' src={avatar}/>
                    <div>
                        <div>{pseudo}</div>
                    </div>
                </div>
                <div onClick={AfficheDetails}>
                    {content}
                </div>
                <div>
                    <div>
                        Posté le {date} à {heure}
                    </div>
                    <div>
                        isPrivate : {isPrivate.toString()}
                        {
                            (isConnected) ?
                            <button onClick={setAfficheCommentaire}>Commenter</button>
                            :
                            null
                        }
                        {
                        (afficheCommentaire === 0)?
                        <PostBird
                            updatePage= {updatePage}
                            page= {page}
                            userInfos= {userInfos}
                            reloadListeBird= {reloadListeBird}
                            setReloadListeBird= {setReloadListeBird}
                            isCommentaire= {true}
                            idBirdCible= {idBird}
                            birds= {birds}
                        />
                        :
                        null
                        }
                        <i></i>
                        <i></i>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Bird

