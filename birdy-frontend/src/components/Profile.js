import styles from '../styles/Profile.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfileBirds from './ProfileBirds';


export default function Profile ({isConnected, userInfos, reloadListeBird, setReloadListeBird, dateRecherche, setdateRecherche, reloadUserInfos, setReloadUserInfos}){
    const params = useParams();
    const navigate = useNavigate();

    const [isLoading, updateIsLoading] = useState(true);
    const [userInfosCible, updateUserInfosCible] = useState(null); 
    const [mode, updateMode] = useState("birds");

    function modeBirds(){
        updateMode('birds');
    }
    function modeLikes(){
        updateMode('likes');
    }
    function modeFavorites(){
        updateMode('favorites');
    }

    function isInArray(elem, array){
        for (var i=0; i < array.length; i++){
            if (array[i] === elem){
                return true;
            }
        }
        return false;
    }

    async function getUserInfos() {
        updateIsLoading(true);
        var retour = await axios.post('http://localhost:8000/api/user/getUserInfosByPseudo',
            {
                pseudo: params.pseudo,
            }
        );
        updateUserInfosCible(retour.data.userInfos)
        updateIsLoading(false);
	}

    async function followUser() {
        updateIsLoading(true);
        var retour = await axios.post('http://localhost:8000/api/user/FollowUser',
            {
                idUser: userInfos.id,
                idUserCible: userInfosCible.id
            }
        );
        setReloadUserInfos(reloadUserInfos +1);
        updateIsLoading(false);
	}

    async function unfollowUser() {
        updateIsLoading(true);
        var retour = await axios.post('http://localhost:8000/api/user/UnfollowUser',
            {
                idUser: userInfos.id,
                idUserCible: userInfosCible.id
            }
        );
        setReloadUserInfos(reloadUserInfos +1);
        updateIsLoading(false);
	}

    

    useEffect(() => {
        getUserInfos();
    }, [params, reloadUserInfos]);

    //SI LE CHARGEMENT DES RESSOURCES N'EST PAS ENCORE TERMINE
    if (isLoading){
        return (
            <h2>Loading ...</h2>
        )
    }

    if (isConnected()){
        //SI ON EST SUR UN PROFIL VALIDE
        if (userInfosCible) {
            //SI IL Y A UN PB AU NIVEAU DE USERINFOS
            if (!userInfos){
                return (
                    <h2>Loading ...</h2>
                )
            }
            //SINON,
            //SI ON EST SUR SON PROPRE PROFIL
            if (userInfosCible.id === userInfos.id){
                return (
                    <div className={styles.profile}>
                        Pseudo : {userInfosCible.pseudo}<br></br>
                        Prénom : {userInfosCible.prenom}<br></br>
                        Nom : {userInfosCible.nom}<br></br>
                        Adresse mail : {userInfosCible.email}<br></br>
                        Date de naissance : {userInfosCible.dateNaissance}<br></br>
                        Avatar : <br></br>
                        <img className={styles.avatar} src={userInfosCible.avatar} rel="pdp"></img><br></br>

                        <button onClick={modeBirds}>Birds</button><br></br>
                        <button onClick={modeLikes}>Likes</button><br></br>
                        <button onClick={modeFavorites}>Favoris</button><br></br>

                        <ProfileBirds
                            mode= {mode}
                            userInfosCible= {userInfosCible}
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
            //SI ON EST SUR LE PROFIL D'UN AUTRE UTILISATEUR
            else {
                //SI ON FOLLOW DEJA L'UTILISATEUR
                if (isInArray(userInfosCible.id, userInfos.follows)){
                    
                    return (
                        <div className={styles.profile}>
                            Pseudo : {userInfosCible.pseudo}<br></br>
                            Prénom : {userInfosCible.prenom}<br></br>
                            Nom : {userInfosCible.nom}<br></br>
                            Adresse mail : {userInfosCible.email}<br></br>
                            Date de naissance : {userInfosCible.dateNaissance}<br></br>
                            Avatar : <br></br>
                            <img className={styles.avatar} src={userInfosCible.avatar} rel="pdp"></img><br></br>
                            <button onClick={unfollowUser}>Unfollow</button><br></br><br></br>
                            <button onClick={modeBirds}>Birds</button><br></br>
                            <button onClick={modeLikes}>Likes</button><br></br>
    
                            <ProfileBirds
                                mode= {mode}
                                userInfosCible= {userInfosCible}
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
                //SI ON NE FOLLOW PAS L'UTILISATEUR
                else {
                    return (
                        <div className={styles.profile}>
                            Pseudo : {userInfosCible.pseudo}<br></br>
                            Prénom : {userInfosCible.prenom}<br></br>
                            Nom : {userInfosCible.nom}<br></br>
                            Adresse mail : {userInfosCible.email}<br></br>
                            Date de naissance : {userInfosCible.dateNaissance}<br></br>
                            Avatar : <br></br>
                            <img className={styles.avatar} src={userInfosCible.avatar} rel="pdp"></img><br></br>
                            <button onClick={followUser}>Follow</button><br></br><br></br>
                            <button onClick={modeBirds}>Birds</button><br></br>
                            <button onClick={modeLikes}>Likes</button><br></br>
    
                            <ProfileBirds
                                mode= {mode}
                                userInfosCible= {userInfosCible}
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
            }
        }
        //SI ON EST SUR UN PROFIL INVALIDE
        else {
            navigate('/');
        }
    }

    else {
        //SI ON EST DECONNECTE
        return (
            <div>
                Il faut se connecter pour pouvoir accéder aux profils utilisateurs 😉<br></br>
                <nav>
                    <Link to='/'>Retourner à l'écran d'accueil</Link>
                </nav>
            </div>
        )
    }
    
}