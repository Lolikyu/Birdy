import '../styles/Authentification.css';
import {useState } from 'react';
import axios from 'axios';


function Authentification({updatePage, isConnected, updateIsConnected, updateUserInfos}){
    const [afficheFormulaire, updateAfficheFormulaire] = useState(0);
    
    async function inscription(formulaire) {
        formulaire.preventDefault();
        var retour = await axios.post('http://localhost:8000/api/user/inscription', 
            {
                pseudo: formulaire.target[0].value,
                nom: formulaire.target[1].value,
                prenom: formulaire.target[2].value,
                email: formulaire.target[3].value,
                password: formulaire.target[4].value,
                dateNaissance: formulaire.target[6].value,
                avatar: formulaire.target[7].value,
                listeAmis: []
            });
        updateIsConnected(retour.data.isConnected);
        updateUserInfos(retour.data.userInfos);
        updateAfficheFormulaire(0);
    }

    async function connexion(formulaire) {
        formulaire.preventDefault();
        var retour = await axios.post('http://localhost:8000/api/user/connexion',
            {
                email: formulaire.target[0].value,
                password: formulaire.target[1].value
            }
        );
        updateIsConnected(retour.data.isConnected);
        updateUserInfos(retour.data.userInfos);
        updateAfficheFormulaire(-1);
    }

    switch (afficheFormulaire){
        case 0:
            return (
                <div className='formulaireOff'>
                    Pas encore connecté ?<br></br>
                    Connecte-toi ou rejoins la communauté !<br></br>
                    <button onClick={() => updateAfficheFormulaire(1)}>Je me connecte</button>
                    <button onClick={() => updateAfficheFormulaire(2)}>Je m'inscris</button>
                </div>
            );
        
        case 1:
            return (
                <div className='formulaireConnexion'>
                    <form onSubmit={connexion}>
                        <label htmlFor='Email'>Adresse mail </label>
                        <input name='Email' type='email' required/><br></br>

                        <label htmlFor='Mdp'>Mot de passe </label>
                        <input name='Mdp' type='password' required/><br></br>

                        <button type='submit'>Connexion</button>
                        <button onClick={() => updateAfficheFormulaire(0)}>Annuler</button>
                    </form>
                </div>
            );
        
        case 2:
            return (
                <div className='formulaireInscription'>
                    <form onSubmit={inscription}>
                        <label htmlFor='Pseudo'>Pseudo: </label>
                        <input name='Pseudo' type='text' required/><br></br>
                        
                        <label htmlFor='Nom'>Nom: </label>
                        <input name='Nom' type='text' required/><br></br>
                        
                        <label htmlFor='Prénom'>Prénom: </label>
                        <input name='Prénom' type='text' required/><br></br>

                        <label htmlFor='Email'>Email: </label>
                        <input name='Email' type='email' required/><br></br>
                        
                        <label htmlFor='Mdp1'>Mot de passe: </label>
                        <input name='Mdp1' type='password' required/><br></br>
                        
                        <label htmlFor='Mdp2'>Confirmer le mot de passe: </label>
                        <input name='Mdp2' type='password' required/><br></br>
                        
                        <label htmlFor='dateNaissance'>Date de naissance: </label>
                        <input name='dateNaissance' type='date' required/><br></br>
                        
                        <label htmlFor='Avatar'>Le lien de ta photo de profil: </label>
                        <input name='Avatar' type='url' /><br></br>
                        
                        <button type='submit'>Rejoindre Birdy</button>
                        <button onClick={() => updateAfficheFormulaire(0)}>Annuler</button>
                    </form>
                </div>
            );
        
        case -1:
            return (
                null
            )
    }
}
export default Authentification