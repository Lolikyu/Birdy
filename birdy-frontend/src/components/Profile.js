import '../styles/Profile.css';
import { Link } from 'react-router-dom';


export default function Profile ({isConnected, userInfos}){
    if (isConnected()){
        return (
            <div>
                Pseudo : {userInfos.pseudo}<br></br>
                Prénom : {userInfos.prenom}<br></br>
                Nom : {userInfos.nom}<br></br>
                Adresse mail : {userInfos.email}<br></br>
                Date de naissance : {userInfos.dateNaissance}<br></br>
                Avatar : <br></br>
                <img className="avatar" src={userInfos.avatar} rel="pdp"></img>
            </div>
        )
    }
    else {
        return (
            <div>
                Il faut se connecter pour pouvoir accéder au profil utilisateur 😉<br></br>
                <nav>
                    <Link to='/'>Retourner à l'écran d'accueil</Link>
                </nav>
            </div>
        )
    }
    
}


