import styles from '../styles/Panel.module.css'
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import Authentification from './Authentification';
import { AppContext } from '../App';
import { useContext } from 'react';

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

    if (isConnected()){
        if (userInfos) {
            return (
                <div className={styles.panel}>
                    <div className={styles.title}>Birdy</div>
                    <nav>
                        <div className={styles.elemMenu} onClick={goToHome}>
                            <i className={styles.icon}><span className="material-icons">home</span></i>
                            HomePage
                        </div><br></br>
                        <div className={styles.elemMenu} onClick={goToProfile}>
                            Profile
                        </div><br></br>
                        <div className={styles.elemMenu} onClick={goToFollows}>
                            Follows
                        </div><br></br>
                        <div className={styles.elemMenu} onClick={goToFollowers}>
                            Followers
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
                Panel déconnecté<br></br>
                <nav>
                    <div className={styles.elemMenu} onClick={goToHome}>
                        <i className={styles.icon}></i>
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