import styles from '../styles/Profile.module.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProfileBirds from './ProfileBirds';
import { AppContext } from '../App';


export default function Profile () {
    const [userInfosCible, updateUserInfosCible] = useState(null); 
    const [mode, updateMode] = useState("birds");

    const { isConnected, userInfos, reloadUserInfos, setReloadUserInfos } = useContext(AppContext);
    
    const params = useParams();
    
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
        var retour = await axios.post('http://localhost:8000/api/user/getUserInfosByPseudo',
            {
                pseudo: params.pseudo,
            }
        );
        updateUserInfosCible(retour.data.userInfos)
	}

    async function followUser() {
        await axios.post('http://localhost:8000/api/user/FollowUser',
            {
                idUser: userInfos.id,
                idUserCible: userInfosCible.id
            }
        );
        setReloadUserInfos(reloadUserInfos +1);
	}

    async function unfollowUser() {
        await axios.post('http://localhost:8000/api/user/UnfollowUser',
            {
                idUser: userInfos.id,
                idUserCible: userInfosCible.id
            }
        );
        setReloadUserInfos(reloadUserInfos +1);
	}


    useEffect(() => {
        getUserInfos();
    }, [params, reloadUserInfos]);


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
                        <div className={styles.title}>Profil utilisateur</div>
                        <div className={styles.infos}>
                            <div className={styles.infosBis}>
                                <div className={styles.avatarContainer}>
                                    <img className={styles.avatar} src={userInfosCible.avatar} alt="Avatar de l'utilisateur" />
                                    <div className={styles.username}>{userInfosCible.pseudo}</div>
                                </div>
                                <div className={styles.infosTri}>
                                    <div className={styles.flex}><div className={styles.infosText}>Nom & Prénom : </div>{userInfosCible.prenom} {userInfosCible.nom}</div>
                                    <div className={styles.flex}><div className={styles.infosText}>Adresse mail : </div>{userInfosCible.email}</div>
                                    <div className={styles.flex}><div className={styles.infosText}>Date de naissance : </div>{userInfosCible.dateNaissance}</div>     
                                </div>
                            </div>
                            <div className={styles.stats}>
                                <div>
                                <div className={styles.followNum}>{userInfosCible.follows.length}</div>
                                <div className={styles.followText}>FOLLOWS</div>
                                </div>
                                <div>
                                <div className={styles.followNum}>{userInfosCible.followers.length}</div>
                                <div className={styles.followText}>FOLLOWERS</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <button className={styles.button1} onClick={modeBirds}>Birds</button><br></br>
                            <button className={styles.button2} onClick={modeLikes}>Likes</button><br></br>
                            <button className={styles.button3} onClick={modeFavorites}>Favoris</button><br></br>
                        </div>

                        <ProfileBirds
                            mode= {mode}
                            userInfosCible= {userInfosCible}
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
                            <div className={styles.title}>Profil utilisateur</div>
                            <div className={styles.infos}>
                                <div className={styles.infosBis}>
                                    <div className={styles.avatarContainerFollow}>
                                        <img className={styles.avatarFollow} src={userInfosCible.avatar} alt="Avatar de l'utilisateur" />
                                        <div className={styles.username}>{userInfosCible.pseudo}</div>
                                        <div className={styles.buttonFollow}><button onClick={unfollowUser}>Unfollow</button></div>
                                    </div>
                                    <div className={styles.infosTri}>
                                        <div className={styles.flex}><div className={styles.infosText}>Nom & Prénom : </div>{userInfosCible.prenom} {userInfosCible.nom}</div>
                                        <div className={styles.flex}><div className={styles.infosText}>Adresse mail : </div>{userInfosCible.email}</div>
                                        <div className={styles.flex}><div className={styles.infosText}>Date de naissance : </div>{userInfosCible.dateNaissance}</div>     
                                    </div>
                                </div>
                                <div className={styles.stats}>
                                    <div>
                                    <div className={styles.followNum}>{userInfosCible.follows.length}</div>
                                    <div className={styles.followText}>FOLLOWS</div>
                                    </div>
                                    <div>
                                    <div className={styles.followNum}>{userInfosCible.followers.length}</div>
                                    <div className={styles.followText}>FOLLOWERS</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.button}>
                                <button className={styles.button1} onClick={modeBirds}>Birds</button><br></br>
                                <button className={styles.button2} onClick={modeLikes}>Likes</button><br></br>
                            </div>
    
                            <ProfileBirds
                                mode= {mode}
                                userInfosCible= {userInfosCible}
                            />
                        </div>
                    )
                }
                //SI ON NE FOLLOW PAS L'UTILISATEUR
                else {
                    return (
                        <div className={styles.profile}>
                            <div className={styles.title}>Profil utilisateur</div>
                            <div className={styles.infos}>
                                <div className={styles.infosBis}>
                                    <div className={styles.avatarContainerFollow}>
                                        <img className={styles.avatarFollow} src={userInfosCible.avatar} alt="Avatar de l'utilisateur" />
                                        <div className={styles.username}>{userInfosCible.pseudo}</div>
                                        <div className={styles.buttonFollow}><button onClick={followUser}>Follow</button></div>
                                    </div>
                                    <div className={styles.infosTri}>
                                        <div className={styles.flex}><div className={styles.infosText}>Nom & Prénom : </div>{userInfosCible.prenom} {userInfosCible.nom}</div>
                                        <div className={styles.flex}><div className={styles.infosText}>Adresse mail : </div>{userInfosCible.email}</div>
                                        <div className={styles.flex}><div className={styles.infosText}>Date de naissance : </div>{userInfosCible.dateNaissance}</div>     
                                    </div>
                                </div>
                                <div className={styles.stats}>
                                    <div>
                                    <div className={styles.followNum}>{userInfosCible.follows.length}</div>
                                    <div className={styles.followText}>FOLLOWS</div>
                                    </div>
                                    <div>
                                    <div className={styles.followNum}>{userInfosCible.followers.length}</div>
                                    <div className={styles.followText}>FOLLOWERS</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.button}>
                                <button className={styles.button1} onClick={modeBirds}>Birds</button><br></br>
                                <button className={styles.button2} onClick={modeLikes}>Likes</button><br></br>
                            </div>
    
                            <ProfileBirds
                                mode= {mode}
                                userInfosCible= {userInfosCible}
                            />
                        </div>
                    )
                }
            }
        }
        //SI ON EST SUR UN PROFIL INVALIDE
        else {
            return (
                <div>
                    Utilisateur introuvable<br></br>
                    <nav>
                        <Link to='/'>Retourner à l'écran d'accueil</Link>
                    </nav>
                </div>
            )
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