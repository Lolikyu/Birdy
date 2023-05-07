import styles from '../styles/Panel.module.css'
import logo from '../assets/Birdy.png'
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { AppContext } from '../App';
import { useContext } from 'react';
import Authentification from './Authentification';

export default function Panel () {
    const { isConnected, userInfos, updateUserInfos } = useContext(AppContext);

    const signOut = useSignOut();
    const navigate = useNavigate();

    function disconnect(){
        updateUserInfos(null);
        signOut();
        navigate('/');
    }

    function goToHome(){
        navigate('/');
    }

    function goToProfile(){
        navigate('/profile/' + String(userInfos.pseudo));
    }
    
    function goToFollows(){
        navigate('/follows');
    }

    function goToFollowers(){
        navigate('/followers');
    }

    function goToRecherche(){
        navigate('/recherche');
    }

    if (isConnected()){
        if (userInfos) {
            return (
                <div className={styles.panel}>
                    <img className={styles.logo} src={logo} alt="icôneBirdy"/>
                    <div className={styles.title}>Birdy</div>
                    <nav>
                        <div className={styles.elemMenu} onClick={goToHome}>
                            <i className={styles.icon}><i className="material-icons">home</i></i>
                            HomePage
                        </div><br></br>
                        <div className={styles.elemMenu} onClick={goToProfile}>
                            <i className={styles.icon}><i class="material-symbols-outlined">account_circle</i></i>
                            Profile
                        </div><br></br>
                        <div className={styles.elemMenu} onClick={goToFollows}>
                            <i className={styles.icon}><i class="material-symbols-outlined">group</i></i>
                            Follows
                        </div><br></br>
                        <div className={styles.elemMenu} onClick={goToFollowers}>
                            <i className={styles.icon}><i class="material-symbols-outlined">groups</i></i>
                            Followers
                        </div><br></br>   
                        <div className={styles.elemMenu} onClick={goToRecherche}>
                            <i className={styles.icon}><i class="material-symbols-outlined">search</i></i>
                            Recherche
                        </div><br></br>      
                    </nav>
                    <button className={styles.deconnexion} onClick={disconnect}>Déconnexion</button><br></br>
                </div>
            )
        }
        else {
            return (
                <h2>Loading ...</h2>
            )
        }
    }
    else {
        return (
            <div className={styles.panel}>
                <img className={styles.logo} src={logo} alt="icôneBirdy"/>
                <div className={styles.title}>Birdy</div>
                <nav>
                    <div className={styles.elemMenu} onClick={goToHome}>
                        <i className={styles.icon}><i className="material-icons">home</i></i>
                        HomePage
                    </div><br></br>
                </nav>
                <Authentification
                    updateUserInfos= {updateUserInfos}
                />
            </div>
        )
    }
}