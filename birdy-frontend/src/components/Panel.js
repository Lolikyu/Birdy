import '../styles/Panel.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import Authentification from './Authentification';

export default function Panel({isConnected, updateUserInfos}){

    const signOut = useSignOut();
    const navigate = useNavigate();

    function disconnect(){
        updateUserInfos(null);
        signOut();
        navigate('/');
    }

    if (isConnected()){
        return (
            <>
                Panel connecté
                <nav>
                    <Link to='/'>HomePage</Link>
                    <Link to='/profile'>Profil</Link>
                </nav>
                <button onClick={disconnect}>Déconnexion</button>
            </>
        )
    }
    else {
        return (
            <>
                Panel déconnecté<br></br>
                <nav>
                    <Link to='/'>HomePage</Link>
                </nav>
                <Authentification
                    updateUserInfos= {updateUserInfos}
                />
            </>
        )
    }
    
}