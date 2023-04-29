import '../styles/Panel.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import Authentification from './Authentification';

export default function Panel({isConnected, userInfos, updateUserInfos}){

    const signOut = useSignOut();
    const navigate = useNavigate();

    function disconnect(){
        updateUserInfos(null);
        signOut();
        navigate('/');
    }

    if (isConnected()){
        if (userInfos) {
            return (
                <>
                    Panel connecté
                    <nav>
                        <Link to='/'>HomePage</Link><br></br>
                        <Link to={'/profile/' + String(userInfos.pseudo)}>Profil</Link><br></br>
                    </nav>
                    <button onClick={disconnect}>Déconnexion</button><br></br>
                </>
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
            <>
                Panel déconnecté<br></br>
                <nav>
                    <Link to='/'>HomePage</Link><br></br>
                </nav>
                <Authentification
                    updateUserInfos= {updateUserInfos}
                />
            </>
        )
    }
}