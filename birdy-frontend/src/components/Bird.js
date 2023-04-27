import '../styles/Bird.css';
import { Link } from 'react-router-dom';

function Bird({idBird, pseudo, avatar, content, date, heure, isPublic, likes, rebirds}) {
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

export default Bird

