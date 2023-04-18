import '../styles/Profile.css';
import {useState} from 'react';


function Profile ({updatePage, userInfos}){
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
export default Profile


