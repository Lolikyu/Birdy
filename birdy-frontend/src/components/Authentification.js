import styles from '../styles/Authentification.module.css';
import { useState , useContext } from 'react';
import { useSignIn } from 'react-auth-kit';
import axios from 'axios';
import { AppContext } from '../App';


export default function Authentification(){
    const [afficheFormulaire, updateAfficheFormulaire] = useState(0);
    const signIn = useSignIn();

    const { updateUserInfos } = useContext(AppContext);
    
    async function inscription(formulaire) {
        formulaire.preventDefault();
        if (formulaire.target[4].value != formulaire.target[5].value){
            formulaire.target[4].value = '';
            formulaire.target[5].value = '';
            alert("Les deux mots de passe sont différents !");
        }
        else {
            var retourPseudo = await axios.post('http://localhost:8000/api/user/checkPseudo', {pseudo: formulaire.target[0].value})
            if (!retourPseudo.data.isValid){
                    alert("Ce pseudo est déjà utilisé ! Merci d'en choisir un autre !");
            }
            else {
                var retourEmail = await axios.post('http://localhost:8000/api/user/checkEmail', {email: formulaire.target[3].value})
                if (!retourEmail.data.isValid){
                        alert("Cette adresse mail est déjà utilisée ! Merci d'en choisir une autre !");
                }
                else {
                    var retour = await axios.post('http://localhost:8000/api/user/inscription', 
                        {
                            pseudo: formulaire.target[0].value,
                            nom: formulaire.target[1].value,
                            prenom: formulaire.target[2].value,
                            email: formulaire.target[3].value,
                            password: formulaire.target[4].value,
                            dateNaissance: formulaire.target[6].value,
                            avatar: formulaire.target[7].value,
                            birds: [],
                            follows: [],
                            followers: [],
                            likes: [],
                            rebirds: [],
                            favorites: []
                        }
                    );
                    updateUserInfos(retour.data.userInfos);
                    if (retour.data.isConnected) {
                        alert('Inscription validée !');
                        updateAfficheFormulaire(0);
                        signIn({
                            token: retour.data.userInfos.token,
                            expiresIn: 3600,
                            tokenType: "Bearer",
                            authState: {id: retour.data.userInfos.id, email: retour.data.userInfos.email}
                        });
                    }
                }
            }
        }
    }

    async function connexion(formulaire) {
        formulaire.preventDefault();
        const response = await axios.post('http://localhost:8000/api/user/connexion',
            {
                email: formulaire.target[0].value,
                password: formulaire.target[1].value
            }
        )
        .catch((error) => alert('Email ou mot de passe incorrect'))

        updateUserInfos(response.data.userInfos);
        if (response.data.isConnected){
            signIn({
                token: response.data.userInfos.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {id: response.data.userInfos.id, email: response.data.userInfos.email}
            });
            updateAfficheFormulaire(-1);
        }
        else {
            alert('Email ou mot de passe incorrect');
        }
    }

    switch (afficheFormulaire){
        case 0:
            return (
                //Accueil
                <div className={styles.auth}>
                    <div className={styles.texte}>
                        Pas encore connecté ?<br></br>
                        Connecte-toi ou rejoins la communauté !<br></br>
                    </div>
                    <button onClick={() => updateAfficheFormulaire(1)}>Je me connecte</button>
                    <button onClick={() => updateAfficheFormulaire(2)}>Je m'inscris</button>
                </div>
            );
        
        case 1:
            return (
                //Formulaire de connexion
                <div className={styles.auth}>
                    <form onSubmit={connexion}>
                        <label htmlFor='Email'>Adresse mail </label>
                        <input className={styles.input} name='Email' type='email' required/><br></br>

                        <label htmlFor='Mdp'>Mot de passe </label>
                        <input className={styles.input} name='Mdp' type='password' required/><br></br>

                        <button type='submit'>Connexion</button>
                        <button onClick={() => updateAfficheFormulaire(0)}>Annuler</button>
                    </form>
                </div>
            );
        
        case 2:
            return (
                //Formulaire d'inscription
                <div className={styles.auth}>
                    <form onSubmit={inscription}>
                        <label htmlFor='Pseudo'>Pseudo: </label>
                        <input className={styles.input} name='Pseudo' type='text' required/><br></br>
                        
                        <label htmlFor='Nom'>Nom: </label>
                        <input className={styles.input} name='Nom' type='text' required/><br></br>
                        
                        <label htmlFor='Prénom'>Prénom: </label>
                        <input className={styles.input} name='Prénom' type='text' required/><br></br>

                        <label htmlFor='Email'>Email: </label>
                        <input className={styles.input} name='Email' type='email' required/><br></br>
                        
                        <label htmlFor='Mdp1'>Mot de passe: </label>
                        <input className={styles.input} name='Mdp1' type='password' required/><br></br>
                        
                        <label htmlFor='Mdp2'>Confirmer le mot de passe: </label>
                        <input className={styles.input} name='Mdp2' type='password' required/><br></br>
                        
                        <label htmlFor='dateNaissance'>Date de naissance: </label>
                        <input className={styles.input} name='dateNaissance' type='date' required/><br></br>
                        
                        <label htmlFor='Avatar'>Le lien de ta photo de profil: </label>
                        <input className={styles.input} name='Avatar' type='url' /><br></br>
                        
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