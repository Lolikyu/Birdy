import '../styles/Panel.css'
import { Link } from 'react-router-dom';
import Authentification from './Authentification';

export default function Panel({isConnected, updateIsConnected, updateUserInfos}){

    function disconnect(){
        updateIsConnected(false);
        updateUserInfos(null);
    }

    if (isConnected){
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
                    updateIsConnected= {updateIsConnected}
                    updateUserInfos= {updateUserInfos}
                />
            </>
        )
    }
    
}