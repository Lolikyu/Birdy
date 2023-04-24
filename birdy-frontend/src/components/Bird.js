import '../styles/Bird.css';
import {useState} from 'react';
import PostBird from './PostBird';
import { Link } from 'react-router-dom';

function Bird({idBird, pseudo, avatar, content, date, heure, isPrivate, commentaires, updateIdBirdCourant, updateListeIdCommentairesCourant}) {
    function AfficheDetails(){
        updateIdBirdCourant(idBird);
        updateListeIdCommentairesCourant(commentaires);
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
                <div>
                    {content}
                </div>
                <div>
                    <div>
                        Posté le {date} à {heure}
                    </div>
                    <div>
                        isPrivate : {isPrivate.toString()}
                        <i></i>
                        <i></i>
                        <nav onClick={AfficheDetails}>
                            <Link to='/bird'>Détails</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Bird

